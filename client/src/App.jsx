import "./App.css";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage.jsx";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import Register from "./pages/Register";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import ProfilePage from "./pages/ProfilePage";
import PlacesPage from "./pages/PlacesPage";
import PlacesFormPage from "./pages/PlacesFormPage";
import PlacePage from "./pages/PlacePage";
import BookingsPage from "./pages/BookingsPage";
import BookingPage from "./pages/BookingPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Favorites from "./pages/Favorites";
import PrivateRoutes from "./components/PrivateRoutes";

axios.defaults.baseURL = "http://127.0.0.1:4000";
axios.defaults.withCredentials = true;
function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account" element={<PrivateRoutes />}>
              <Route path="/account" element={<ProfilePage />} />
            </Route>
            <Route path="/account/places" element={<PrivateRoutes />}>
              <Route path="/account/places" element={<PlacesPage />} />
            </Route>
            <Route path="/account/places/new" element={<PrivateRoutes />}>
              <Route path="/account/places/new" element={<PlacesFormPage />} />
            </Route>
            <Route path="/account/places/:id" element={<PrivateRoutes />}>
              <Route path="/account/places/:id" element={<PlacesFormPage />} />
            </Route>
            <Route path="/place/:id" element={<PlacePage />} />
            <Route path="/account/bookings" element={<PrivateRoutes />}>
              <Route path="/account/bookings" element={<BookingsPage />} />
            </Route>
            <Route path="/account/bookings/:id" element={<PrivateRoutes />}>
              <Route path="/account/bookings/:id" element={<BookingPage />} />
            </Route>
            <Route path="/account/favorites" element={<PrivateRoutes />}>
              <Route path="/account/favorites" element={<Favorites />} />
            </Route>
          </Route>
        </Routes>
      </UserContextProvider>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
