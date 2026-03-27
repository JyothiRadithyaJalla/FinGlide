import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import api from "../api/axios";
import Loader from "./Loader";
import { fetchCoreData,fetchReportsData } from "../redux/coreThunks";

export function ProtectedRoute({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/auth/check", { withCredentials: true });
        setAuthenticated(true);
      } catch {
        setAuthenticated(false);
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (authenticated) {
      dispatch(fetchCoreData());
      dispatch(fetchReportsData())
    }
  }, [authenticated, dispatch]);

  if (checkingAuth) {
    return <Loader />;
  }

  return authenticated ? children : <Navigate to="/login" replace />;
}



export function PublicRoute({ children }) {
  const isUserLoggedIn = useSelector(
    (state) => state.core.isUserLoggedIn
  );

  return isUserLoggedIn
    ? <Navigate to="/" replace />
    : children;
}


