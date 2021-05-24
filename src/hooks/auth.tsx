import { useRouter } from "next/router";
import {
  createContext,
  FC,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { api } from "../services/api";

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

const AuthProvider: FC = ({ children }) => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = useMemo(() => !!user, [user]);

  const signIn = useCallback(async (credentials: SignInCredentials) => {
    try {
      const response = await api.post("/sessions", credentials);

      const { permissions, roles, name, avatar } = response.data;

      setUser({
        email: credentials.email,
        permissions,
        roles,
        name,
        avatar,
      });

      router.push("/dashboard");
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
