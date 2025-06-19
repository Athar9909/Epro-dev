import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Toaster } from "react-hot-toast";
import i18next from "i18next";
import StartSignUp from "./webDesk/Auth/StartSignUp";
import SignupForm from "./webDesk/Auth/SignupForm";
import SignUpMain from "./webDesk/Auth/SignUpMain";
import SignupSubscription from "./webDesk/Auth/SignupSubscription";
import SignupSubscriptionView from "./webDesk/Auth/SignupSubscriptionView";
import Homepage from "./webDesk/pages/Homepage";
import ProductListing from "./webDesk/pages/product/ProductListing";
import ProductDetail from "./webDesk/pages/product/ProductDetails";
import Categories from "./webDesk/pages/product/Categories";
import Layout from "./webDesk/components/Layout";
import NoPageFound from "./webDesk/pages/NoPageFound";
import Login from "./webDesk/auth/Login";
import SubCategories from "./webDesk/pages/product/SubCategories";
import VendorDetails from "./webDesk/pages/vendor/VendorDetails";
import VendorProfile from "./webDesk/pages/vendor/VendorProfile";
import SOW from "./webDesk/pages/document/SOW";
import Meeting from "./webDesk/pages/meeting/Meeting";
import Index from "./webDesk/pages/meeting/Index";
import SelectProfile from "./webDesk/Auth/SelectProfile";
import ForgotPassword from "./webDesk/Auth/ForgotPassword";
import VerifyOTP from "./webDesk/Auth/VerifyOTP";
import ResetPassword from "./webDesk/Auth/ResetPassword";

const Splash1 = lazy(() => import("./webDesk/Auth/SelectUser"));

const Loading = () => (
  <div
    style={{ height: "100vh" }}
    className="d-flex justify-content-center align-items-center h-100vh">
    <div className="logo">
      <img alt="" src="/resources/imgs/navLogo.svg" />
    </div>
  </div>
);

function ScrollToTopOnNavigation() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function App() {
  return (
    <div className={i18next.language === "ar" ? "ArabicRtl" : "App"}>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Toaster
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover={false}
            toastClassName="custom-toast"
            bodyClassName="custom-toast-body"
            progressClassName="custom-toast-progress"
          />

          <RecoilRoot>
            <ScrollToTopOnNavigation />
            <Routes>
              <Route path="/" element={<Splash1 />} />
              <Route
                path="/User-web/Profile-Selection"
                element={<SelectProfile />}
              />
              <Route path="/User-web/SignUp" element={<StartSignUp />} />
              <Route path="/SignUpNow" element={<SignUpMain />} />
              <Route path="/Sign-Up/Process-one" element={<SignupForm />} />
              <Route
                path="/Sign-Up/Subscription"
                element={<SignupSubscription />}
              />
              <Route
                path="/Sign-Up/Subscription-view"
                element={<SignupSubscriptionView />}
              />
              <Route path="/Login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/verify-otp" element={<VerifyOTP />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              <Route path="/Dashboard" element={<Layout />}>
                <Route index element={<Homepage />} />
                <Route path="Categories" element={<Categories />} />
                <Route
                  path="Categories/Sub-Categories"
                  element={<SubCategories />}
                />
                <Route
                  path="Categories/Sub-Categories/Product-Listing"
                  element={<ProductListing />}
                />
                <Route
                  path="Categories/Sub-Categories/Product-Details"
                  element={<ProductDetail />}
                />
                <Route path="Vendor-Details" element={<VendorDetails />} />
                <Route
                  path="Vendor-Details/Vendor-Profile"
                  element={<VendorProfile />}
                />
                <Route path="Documents/SOW" element={<SOW />} />
                <Route path="Meeting" element={<Index />} />
                <Route path="*" element={<NoPageFound />} />
              </Route>
            </Routes>
          </RecoilRoot>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
