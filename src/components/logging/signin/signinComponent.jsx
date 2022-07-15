import {
  faCircleUser,
  faUnlock,
  faLock,
  faEnvelope,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
  import { Link } from "react-router-dom";
  import axios from '../../../api/axios';
  import { useForm } from "react-hook-form";
  import {useNavigate} from 'react-router-dom'
import React, { useState ,useContext } from "react";
import socialMediaAuth from "../../../services/auth";
import AuthContext from '../../../context/AuthProvider' ;
import ReCAPTCHA from "../../reCAPTCHA/reCAPTCHAComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import VerifyEmail from "../../VerifyEmail/verifyemailComponent";
import ForgotPassword from "../../forgotpassword/forgotPasswordComponent";
import SetANewPassWord from "../../setanewpassword/SetANewPassWordComponent";
import { faFacebook, faGooglePlus } from "@fortawesome/free-brands-svg-icons";
import { facebookProvider ,googleProvider } from "../../../services/authMethods";


let Signin = ({user,setUser}) => {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState('');
  const {auth, setAuth } = useContext(AuthContext);
  const [notArobot, setnotArobot] = useState(false);
  const [isloading, setIsLooading] = useState(false);

    const {
      register,
      handleSubmit,
      formState: { errors },
      trigger,
    } = useForm();
    
    const handleSocialLogin = async (provider) => {
      setIsLooading(true)
      let res = await socialMediaAuth(provider);
      let user = res?.additionalUserInfo?.profile
      console.log(user);
      if(user){
        let sname = user.name;
        let semail=user.email;
        let simg  =user.picture;
        if(simg.data?.url){
          simg =simg.data.url;
        }
        try {
          console.log(  simg);
          const response = await axios.post('/api/registerSocialite',
              JSON.stringify({name: sname,email: semail,img : simg}),
              {
                  headers: { 'Content-Type': 'application/json' },
                  withCredentials: true,
              }
          );
          console.log(response.data);
          const aid = response?.data?.user.id;
          const aname = response?.data?.user.name;
          const aemail = response?.data?.user.email;
          const arole = response?.data?.user?.role?.role_person_id;
          const arolename = response?.data?.user?.role?.role_person_name;
          const atoken = response?.data?.token;
          const aphone = response?.data?.user.phone;
          const aimg = response?.data?.user.img;
          const alevel = response?.data?.user.level;
          const ablocked = response?.data?.user.is_active;
          const ais_registerd = response?.data?.user.is_registered;
          const ais_verifay = response?.data?.user.is_verifaied;
          setAuth({ aid, aname,aemail, arole,arolename, atoken,aphone,aimg,alevel,ais_verifay,ablocked,ais_registerd});
          console.log(aid, aname,aemail, arole,arolename, atoken,aphone,aimg,alevel,ais_verifay,ablocked,ais_registerd);
          setIsLooading(false);
          if(ais_registerd === 0){
            setErrMsg(`Hi plase Set A new Password to your acount so you can log in normaly in future `);
          }
          if(ais_registerd === 1){
            navigate('./home')
          }
      }
      catch (err) {
        console.log(err);
        setIsLooading(false);
        if (!err?.message) {
            setErrMsg('No Server Response');
            console.log('No Server Response');
        } 
        else if (err?.response?.status === 0) {
            setErrMsg(err.message);
            console.log(errMsg);
        }
        else if (err?.response?.status === 400) {
            setErrMsg(err.response.data.message);
            console.log(errMsg);
        } 
        else if (err?.response?.status === 401) {
            setErrMsg(err.response.data.message);
            console.log(errMsg);
        }
        else {
            setErrMsg('Register Failed');
            console.log(errMsg);
        }
    }
  }
  else
  console.log(res);
      
    }


    const onSubmit = async ({email,password}) => {
      setIsLooading(true)
      try {
        const response = await axios.post('/api/login',
            JSON.stringify({ email,password}),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            }
        );
        console.log(response.data);
        const aname = response?.data?.user.name;
        const aemail = response?.data?.user.email;
        const arole = response?.data?.user?.role_person_id;
        const arolename = response?.data?.user?.role_person_name;
        const atoken = response?.data?.token;
        const aphone = response?.data?.user.phone;
        const aimg = response?.data?.user.img;
        const alevel = response?.data?.user.level;
        const ais_verifay = response?.data?.user.is_verifaied;
        setAuth({ aname,aemail, arole,arolename, atoken,aphone,aimg,alevel,ais_verifay});
        console.log(aname,aemail, arole,arolename, atoken,aphone,aimg,alevel,ais_verifay);
        setIsLooading(false);
        if(ais_verifay === 0){
          setErrMsg(`sorry but It looks you have not verify your email yat`);
        }
        else if(ais_verifay === 1){
          navigate('/home')
      }
    }
    catch (err) {
      console.log(err);
      setIsLooading(false);
      if (!err?.message) {
          setErrMsg('No Server Response');
          console.log('No Server Response');
      } 
      else if (err?.response?.status === 0) {
          setErrMsg(err.message);
          console.log(errMsg);
      }
      else if (err?.response?.status === 400) {
          setErrMsg(err.response.data.message);
          console.log(errMsg);
      } 
      else if (err?.response?.status === 401) {
          setErrMsg(err.response.data.message);
          console.log(errMsg);
      }
      else {
          setErrMsg('Register Failed');
          console.log(errMsg);
      }
  }
  };
          
  return (
    <>
      <div className="sginin-container">
        <div className="row sign-in g-0">
          <div className="col-12 col-md-8  sign-in-fildes-box">
          <h1 className="col-12 text-center offset-sm-1 title">Log in</h1>

      {auth.ais_registerd ===0 ?
        (<>
            <div className="row d-felx justify-content-center alighn-content-center">
            <div class="alert alert-success col-8 offset-sm-2" role="alert">
                <h4 class="alert-heading ">Thanks for using Social Acount With Trip Tips!</h4>
                <p> <b>Congrats!</b>  You successfully Sing up in Trip Tips with Your Socail Email ,<br/> So Plase Set A new Password to your acount so you can log in normaly in future </p>
                <hr/>
                <p class="mb-0"> So please click on the New Password icon.</p>
            </div>
            <button
            className="verify-icon col-4 offset-sm-2"
            style={{cursor:'pointer'}}
            type="button"
            data-bs-toggle={`modal`}
            data-bs-target={`#setnewpassword`}
            >
            Set A New Password
            </button>
            {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            Launch static backdrop modal
            </button> */}
            <SetANewPassWord redirect={'./home'}
            //  success={success} setSuccess ={setSuccess}
              url={'/api/addPasswordSocialite'}/> 
            <img  className={'col-7 mt-4 offset-1'} src='/logo/spassword.svg' alt='none'/> 
            </div>
        </>
        ) : (
    <>
      <VerifyEmail/>
      <ForgotPassword/>
        { isloading ? (<h1 className='offset-5'>isloading</h1> ) : (
          <>
            <div className="row  g-0">
              <div className="col-12 offset-sm-1  ">
                <h3 className="sub-title  text-center ">Your Acount Info...</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="col-11 col-sm-8 offset-sm-1 ">
                    <div className="input-group input-group-lg   mb-3 ms-sm-5 ">
                      <span
                        className="input-group-text fs-3 filed filed-icon"
                      >
                        <FontAwesomeIcon icon={faEnvelope} />
                      </span>
                      <input
                        type="email"
                        className={`form-control filed 
                        ${errors.email && "invalid"}`
                        }
                        {...register("email", { required: "Email is Required" ,
                        // pattern: {
                        //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        //   message: "Invalid email address",
                        // }
                      })}
                        onKeyUp={() => {
                            trigger("email");
                          }}
                        placeholder="Mail Address"
                      />
                      {/* {errors.email && (<small className="text-danger ">{errors.email.message}</small>)} */}

                    </div>
                    <div className="input-group input-group-lg  mb-1 ms-sm-5">
                      <span
                        className="input-group-text fs-3  filed-icon"
                        id="basic-addon1"
                      >
                        <FontAwesomeIcon icon={faLock} />
                      </span>
                      <input
                        type="password"
                        className={`form-control filed ${errors.password && "invalid"}`}
                        {...register("password", { required: "password is Required",
                        // minLength: {
                        //   value: 8,
                        //   message: "Minimum Required length is 8",
                        // },
                        // maxLength: {
                        //   value: 20,
                        //   message: "Maximum allowed length is 20 ",
                        // }
                        })}
                        onKeyUp={() => {
                        trigger("password");
                        }}
                        placeholder="Password"
                      />
                     {/* {errors.password && ( <small className="text-danger">{errors.password.message}</small>)} */}
                    </div>
                    <h6 className="forgotpas offset-2 ">
                      <u 
                        className="forgotpass "
                        data-bs-toggle="modal"
                        href="#forgotpassword"
                        role="button"
                      >
                        Forgot Your Password ?
                      </u>
                    </h6>
                    {errMsg && <div className={ `alert alert-${auth.ais_verifay ===0 ? "warning":"danger"} d-flex align-items-center col-11 offset-2 server-errors `} role="alert">
                    <FontAwesomeIcon icon={faExclamationTriangle} className="bi flex-shrink-1 me-4 " width="24" height="24" role="img" aria-label="Danger:"></FontAwesomeIcon>
                        <div className='text-center'>
                        {errMsg}
                        </div>
                    </div> 
                    }
                    <button
                      className={`verify-icon offset-5 ${auth.ais_verifay ===1 ? "d-none":(auth.ais_verifay ===0 ? "d-block":"d-none")}`}
                      disabled={!notArobot}
                      type="button"
                      data-bs-toggle={`${auth.ais_verifay !==1 && "modal"}`}
                      data-bs-target={`${auth.ais_verifay !==1 && "#verifyEmail"}`}
                      onClick={() =>{setErrMsg('')}}
                    >
                      Click Here To Verify
                    </button> 
                    <ReCAPTCHA 
                      notArobot={notArobot}
                      setnotArobot={setnotArobot}
                    />
                  </div>
                  <div className="div-icon">
                    <button
                      className={`one-icon   ${auth.ais_verifay ===0 && "d-none"}`}
                      disabled={!notArobot}
                      type="submit"
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
              <div className="col-12 offset-sm-1 or-box">
                <div className="line "></div>
                <div className="or fs-3">Or</div>
                <div className="line"></div>
              </div>
              <div className="col-12 offset-sm-1">
                <h3 className="sub-title">Also, You Can Continue With .. </h3>
                <div className="div-soc-icon ">
                  <Link className="socail-icon " to="./">
                    <FontAwesomeIcon 
                    icon={faFacebook}
                    onClick={() => handleSocialLogin(facebookProvider)}
                    >
                    </FontAwesomeIcon>
                  </Link>
                  <Link className="socail-icon " to="./">
                    <FontAwesomeIcon
                    icon={faGooglePlus}
                    onClick={() => handleSocialLogin(googleProvider)}
                    >
                    </FontAwesomeIcon>
                  </Link>
                </div>
              </div>
            </div>
            </> )}
            </>
            )}
          </div>
          <div className="col-12  order-first order-md-last col-md-4  sign-in-img-box ">
            <div className="img-box"></div>
            <div className="myoverlay row g-0 justify-content-center  text-center">
              <div className="text-boxx    ">
                <img
                  className="trip-logo col-12 "
                  src="/logo/55.png"
                  alt="Trip Tips"
                ></img>
                <h1 className="title">Welcome Back !</h1>
                <p className="description">
                  To Keep Connected With Us Please Login With <br /> Your
                  Personal Info
                </p>
                <h3 className="dont  ">Don't Have Acount Yet ?</h3>
                <Link className="create-acount" to="/logging/signup">
                  Create Acount
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
