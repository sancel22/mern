import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { ApiResponseError, IUser } from "../interface/app";
import UserApi, { useUserApi } from "../services/UserApi";

interface ISessionValues {
  setSession: ({ user, token }: { user: IUser; token: string }) => void;
  user?: IUser;
  setUser: Dispatch<SetStateAction<IUser | undefined>>;
  isLoggedIn: boolean;
  userApi: UserApi;
  logout: () => void;
}

const SessionContext = createContext({} as ISessionValues);

const SessionProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<IUser>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userApi = useUserApi();

  const setSession = ({ user, token }: { user: IUser; token: string }) => {
    setUser(user);
    setIsLoggedIn(true);
    localStorage.setItem("jwt", token);
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      setIsLoggedIn(false);
    }

    if (jwt && !user) {
      (async () => {
        try {
          const { data } = await userApi.getMe();
          setIsLoggedIn(true);
          setUser(data);
        } catch (error) {
          const err = error as ApiResponseError;
          console.log(err.message.message);
          setIsLoggedIn(false);
        } finally {
          // setIsLoading(false);
        }
      })();
    }
  }, [setIsLoggedIn, user, userApi]);

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
  };

  return (
    <SessionContext.Provider
      value={{ user, setUser, setSession, isLoggedIn, userApi, logout }}
    >
      {children}
    </SessionContext.Provider>
  );
};

const useSession = () => useContext(SessionContext);
export { SessionProvider, useSession };
