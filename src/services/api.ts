import axios, { AxiosError } from "axios";
import { parseCookies, setCookie } from "nookies";

let cookies = parseCookies();
let isRefreshing = false;
let failedRequestQueue = [];

export const api = axios.create({
  baseURL: "http://localhost:3333/",
  headers: {
    ...(cookies &&
      cookies["dashgo.token"] && {
        Authorization: `Bearer ${cookies["dashgo.token"]}`,
      }),
  },
});

api.interceptors.response.use(
  (success) => success,
  (error: AxiosError) => {
    if (error.response.status === 401) {
      if (error.response.data?.code === "token.expired") {
        cookies = parseCookies();

        const { "dashgo.refresh-token": refreshToken } = cookies;
        const originalConfig = error.config;

        if (!isRefreshing) {
          isRefreshing = true;

          api
            .post("/refresh", { refreshToken })
            .then((response) => {
              const { token } = response.data;

              setCookie(undefined, "dashgo.token", token, {
                maxAge: 60 * 60 * 24 * 7,
                path: "/",
              });

              api.defaults.headers.Authorization = `Bearer ${token}`;

              setCookie(
                undefined,
                "dashgo.refresh-token",
                response.data.refreshToken,
                {
                  maxAge: 60 * 60 * 24 * 7,
                  path: "/",
                }
              );

              failedRequestQueue.forEach((request) => request.onSuccess(token));
              failedRequestQueue = [];
            })
            .catch((err) => {
              failedRequestQueue.forEach((request) => request.onFailure(err));
              failedRequestQueue = [];
            })
            .finally(() => {
              isRefreshing = false;
            });
        }

        return new Promise((resolve, reject) => {
          failedRequestQueue.push({
            onSuccess: (token: string) => {
              originalConfig.headers.Authorization = `Bearer ${token}`;

              resolve(api(originalConfig));
            },
            onFailure: (err: AxiosError) => {
              reject(err);
            },
          });
        });
      } else {
      }
    }
  }
);
