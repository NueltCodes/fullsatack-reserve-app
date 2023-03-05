import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import { UserContext } from "../UserContext";
import PlacesPage from "./PlacesPage";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [loggedout, setLoggedout] = useState(false);
  const { user, ready, setUser } = useContext(UserContext);
  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = "profile";
  }

  async function logout() {
    await axios.post("/logout");
    // setLoggedout(true);
    setUser(null);
    navigate("/");
  }

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !loggedout) {
    return navigate("/login");
  }

  return (
    <div>
      <div className="sm:block hidden">
        <AccountNav />
      </div>
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user?.name} ({user?.email}) <br />{" "}
          <button onClick={logout} className="primary max-w-sm mt-2">
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && <PlacesPage />}
    </div>
  );
}
