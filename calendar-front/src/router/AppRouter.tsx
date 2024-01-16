import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";

type Auth = 'authenticated' | 'not-authenticated';

export const AppRouter = () => {
  // const authStatus = 'not-authenticated';
  const authStatus: Auth = 'authenticated';

  return (
    <Routes>
      {
        (authStatus === 'not-authenticated')
         ? (<Route path="/auth/*" element={<LoginPage />} />)
         : (<Route path="/*" element={<CalendarPage />} />)
      }

      {/* Other routes */}
      <Route path="/*" element={ <Navigate to="/auth/login" />} />
    </Routes>
  );
};
