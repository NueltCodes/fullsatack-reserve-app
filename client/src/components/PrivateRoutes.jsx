import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import Spinner from "./Spinner";

export default function PrivateRoutes() {
  const { user, ready } = useContext(UserContext);

  if (!ready) {
    return <Spinner />;
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
}
