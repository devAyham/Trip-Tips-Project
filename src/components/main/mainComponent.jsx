import { Route, Routes, Navigate, Outlet } from "react-router";
import AboutUs from "../aboutus/aboutusComponent";
import AddPalce from "../addplace/addplaceComponent";
import Dashboard from "../dashboard/dashboardComponent";
import HelpCenter from "../help_center/helpcenterComponent";
import Home from "../home/homeComponent";
import Signin from "../logging/signin/signinComponent";
import Signup from "../logging/signup/signupComponent";
import Logging from "../logging/loggingComponent";
import Logout from "../logout/logoutComponent";
import Navbar from "../navbar/navbarComponent";
import Profile from "../profile/profileComponent";
import Settings from "../settings/settingsComponent";
import AuthContext from "../../context/AuthProvider";
import { useState, useContext } from "react";
import Users from "../dashboard/users/usersComponent";
import Packages from "../dashboard/packages/packagesComponent";
import Visitors from "../dashboard/visitors/visitorsComponent";
import Requests from "../dashboard/requests/requestsComponent";
import Contracts from "../dashboard/contracts/contractsComponent";
import Earnings from "../dashboard/earnings/earningsComponent";
import AddPackage from "../dashboard/addpackage/addpackageComponent";

let Main = () => {
  const { auth } = useContext(AuthContext);
  let ProtectedRoutes = () => {
    return auth.ais_verifay === 1 ? <Outlet /> : <Navigate to="/logging" />;
  };
  console.log(auth);
  return (
    <>
      <Navbar auth={auth.ais_verifay} />
      <Routes>
        {/* <Route element={<ProtectedRoutes />}> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/users" element={<Users />} />
          <Route path="/dashboard/packages" element={<Packages />} />
          <Route path="/dashboard/packages/addpackage" element={<AddPackage />} />
          <Route path="/dashboard/visitors" element={<Visitors />} />
          <Route path="/dashboard/requests" element={<Requests />} />
          <Route path="/dashboard/contracts" element={<Contracts />} />
          <Route path="/dashboard/earnings" element={<Earnings />} />
          <Route path="/addplace" element={<AddPalce />} />
          <Route path="/mangeplaces" element={<Home />} />
        {/* </Route> */}
        <Route path="/home" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/helpcenter" element={<HelpCenter />} />
        <Route path="/logging" element={<Logging />} />
        <Route path="/logging/signin" element={<Signin />} />
        <Route path="/logging/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/*" element={<Navigate to="/home" />} />
      </Routes>
    </>
  );
};

export default Main;
