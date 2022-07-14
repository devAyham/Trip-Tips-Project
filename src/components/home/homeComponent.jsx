import React, { useState } from "react";
import VerifyEmail from "../VerifyEmail/verifyemailComponent";
import ReactDOM from "react-dom";

import SocialButton from "../SocialButton/SocialButton";
import ForgotPassword from "../forgotpassword/forgotPasswordComponent";
import { Bar, Doughnut } from "react-chartjs-2";
import {Chart as ChartJS} from 'chart.js/auto'
import BarChart from "../charts/barchart/barChart";
import LineChart from "../charts/linerchart/linerChart";
import PieChart from "../charts/piechart/pieChart";
// import LineChart from "../charts/linerchart/linerChart";
// import PieChart from "../charts/piechart/pieChart";

let Home = () => {


  return (
    <>
    <div className="row offset-1"   >
    {/* <div style={{ width: 500 }}>
        <BarChart chartData={userData} />
      </div>
      <div style={{ width: 500 }}>
        <LineChart chartData={userData} />
      </div> 
      <div style={{ width: 500 }}>
        <PieChart chartData={userData} />
      </div>  */}
    </div>
    </>
  );
};
export default Home;

// the old way to social log in without firebase
/*  
          const handleSocialLogin = (user) => {
        console.log(user);
      };
      
      const handleSocialLoginFailure = (err) => {
        console.error(err);
      }; 
      <SocialButton
      provider="facebook"
      appId="721781095771833"
      onLoginSuccess={handleSocialLogin}
      onLoginFailure={handleSocialLoginFailure}
    >
      Login with Facebook
    </SocialButton>
      <SocialButton
      provider="google"
    //   appId='617240276947'
    //   appId='triptips-355000'
    //   appId='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'
      appId='617240276947-jud8pa6nneeqvgv2vna600gg0j9qaf9t.apps.googleusercontent.com'
      onLoginSuccess={handleSocialLogin}
      onLoginFailure={handleSocialLoginFailure}
    >
      google
      
    </SocialButton>
 */
