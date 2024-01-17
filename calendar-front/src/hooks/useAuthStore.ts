import { useAppDispatch, useAppSelector } from ".";
import { calendarApi } from "../api";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store";

export const useAuthStore = () => {
  const { errorMessage, status, user } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  type LoginObject = {
    email: string;
    password: string;
  }
  const startLogin = async ({ email, password }: LoginObject) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post('/auth/login', { email, password });
      // console.log({ data });
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', `${new Date().getTime()}`);
      dispatch(onLogin({ name: data.name, email: data.email }));

    } catch (error) {
      console.log({ error });
      dispatch(onLogout('Invalid credentials'));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 100);
    }
  };

  return {
    //? properties
    errorMessage,
    status,
    user,
    //? methods
    startLogin,
  };
};
