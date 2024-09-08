import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./component/Footer";
import Navbar from "./component/Navbar";
import ProtectedRoute from "./miniComponent/ProtectedRoute";
import HeroSection from "./component/HeroSection";
import ErrorPage from "./miniComponent/Error";
import HotelPage from "./miniComponent/HotelDetails";
import PackgeDdetails from "./miniComponent/packge_details";
import PaymentFailed from "./miniComponent/PaymentFailed";
import PaymentSuccess from "./miniComponent/PaymentSucccess";
import TourDetails from "./miniComponent/TourDetails";
import { HotelComponent } from "./miniComponent/Tourpackage";
import Contact from "./pages/Contact";
import Hotel from "./pages/Hotel";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { setUser } from "./redux/reducers/user";
import Cart from "./pages/Order";
import LoadingPage from "./component/BlurLoading";
function App() {
  const { user, loading } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const getUser = async () => {
    const res = await axios.get("http://localhost:3000/api/user/me", {
      withCredentials: true,
    });
    dispatch(setUser(res.data.userId));
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]);

  loading && <LoadingPage />;

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={<ProtectedRoute element={Login} isPublic={true} />}
        />
        <Route
          path="/signup"
          element={<ProtectedRoute element={Signup} isPublic={true} />}
        />

        {/* Protected Routes */}
        <Route path="/" element={<ProtectedRoute element={Hotel} />} />
        <Route path="/order" element={<ProtectedRoute element={Cart} />} />
        <Route
          path="/hotelcomponent"
          element={<ProtectedRoute element={HotelComponent} />}
        />
        <Route
          path="/holiday"
          element={<ProtectedRoute element={HeroSection} />}
        />
        <Route path="/contact" element={<ProtectedRoute element={Contact} />} />
        <Route
          path="/package-details"
          element={<ProtectedRoute element={PackgeDdetails} />}
        />
        <Route
          path="holiday/tour-details/:tourid"
          element={<ProtectedRoute element={TourDetails} />}
        />
        <Route
          path="hotelcomponent/hotel-details/:hotelId/:checkin/:checkout/:adult/:children?"
          element={<ProtectedRoute element={HotelPage} />}
        />
        <Route
          path="/payment-success"
          element={<ProtectedRoute element={PaymentSuccess} />}
        />
        <Route
          path="/payment-failed"
          element={<ProtectedRoute element={PaymentFailed} />}
        />

        {/* Fallback for undefined routes */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
      <Toaster position="bottom-center" />
    </BrowserRouter>
  );
}

export default App;
