import Router from "next/router";
import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";

import { apiClient } from "../services/api";

interface SignInCredentials {
  email: string;
  password: string;
}

interface User {
  email: string;
  name: string;
  avatar?: string;
  permissions: string[];
  roles: string[];
}

interface IAuthContextData {
  signIn(credentials: SignInCredentials): Promise<void>;
  isAuthenticated: boolean;
  user: User;
}

const AuthContext = createContext({} as IAuthContextData);

export function signOut(): void {
  destroyCookie(undefined, "dashgo.token");
  destroyCookie(undefined, "dashgo.refresh-token");

  Router.push("/");
}

const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState({} as User);

  const isAuthenticated = useMemo(() => !!user, [user]);

  useEffect(() => {
    (async () => {
      const { "dashgo.token": token } = parseCookies();

      if (token) {
        try {
          const response = await apiClient.get("/me");

          const { name, avatar, email, permissions, roles } = response.data;

          setUser({ name, avatar, email, permissions, roles });
        } catch {
          signOut();
        }
      }
    })();
  }, []);

  const signIn = useCallback(async (credentials: SignInCredentials) => {
    try {
      const response = await apiClient.post("/sessions", credentials);

      const { permissions, roles, name, avatar, token, refreshToken } =
        response.data;

      setCookie(undefined, "dashgo.token", token, {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

      apiClient.defaults.headers.Authorization = `Bearer ${token}`;

      setCookie(undefined, "dashgo.refresh-token", refreshToken, {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

      setUser({
        email: credentials.email,
        permissions,
        roles,
        name,
        avatar,
      });

      Router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): IAuthContextData => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
