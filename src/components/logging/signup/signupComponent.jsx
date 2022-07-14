import {
  faCircleUser,
  faUnlock,
  faLock,
  faEnvelope,
  faPhone,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import axios from "../../../api/axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import AuthContext from "../../../context/AuthProvider";
import { useState, useContext, useEffect } from "react";
import ReCAPTCHA from "../../reCAPTCHA/reCAPTCHAComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import VerifyEmail from "../../VerifyEmail/verifyemailComponent";
import { faFacebook, faGooglePlus } from "@fortawesome/free-brands-svg-icons";
import socialMediaAuth from "../../../services/auth";
import SetANewPassWord from "../../setanewpassword/SetANewPassWordComponent";
import { facebookProvider, googleProvider } from "../../../services/authMethods";

// import {useGetFetch, usePostFetch} from '../../../api/usefetch';
let Signup = () => {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);
  const [notArobot, setnotArobot] = useState(false);
  const [isloading, setIsLooading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
  } = useForm();

  const handleSocialLogin = async (provider) => {
    setIsLooading(true);
    let res = await socialMediaAuth(provider);
    let user = res?.additionalUserInfo?.profile;
    console.log(user);
    if (user) {
      let sname = user.name;
      let semail = user.email;
      let simg = user.picture;
      if (simg.data?.url) {
        simg = simg.data.url;
      }
      try {
        console.log(simg);
        const response = await axios.post(
          "/api/registerSocialite",
          JSON.stringify({ name: sname, email: semail, img: simg }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        console.log(response.data);
        const aname = response?.data?.user.name;
        const aemail = response?.data?.user.email;
        const arole = response?.data?.user.role.id;
        const arolename = response?.data?.user.role.role_name;
        const atoken = response?.data?.token;
        const aphone = response?.data?.user.phone;
        const aimg = response?.data?.user.img;
        const alevel = response?.data?.user.level;
        const ablocked = response?.data?.user.is_active;
        const ais_registerd = response?.data?.user.is_registered;
        const ais_verifay = response?.data?.user.is_verifaied;
        setAuth({
          aname,
          aemail,
          arole,
          arolename,
          atoken,
          aphone,
          aimg,
          alevel,
          ais_verifay,
          ablocked,
          ais_registerd,
        });
        console.log(
          aname,
          aemail,
          arole,
          arolename,
          atoken,
          aphone,
          aimg,
          alevel,
          ais_verifay,
          ablocked,
          ais_registerd
        );
        setIsLooading(false);
        if (ais_registerd === 0) {
          setErrMsg(
            `Hi plase Set A new Password to your acount so you can log in normaly in future `
          );
        }
        if (ais_registerd === 1) {
          navigate("./home");
        }
      } catch (err) {
        console.log(err);
        setIsLooading(false);
        if (!err?.message) {
          setErrMsg("No Server Response");
          console.log("No Server Response");
        } else if (err?.response?.status === 0) {
          setErrMsg(err.message);
          console.log(errMsg);
        } else if (err?.response?.status === 400) {
          setErrMsg(err.response.data.message);
          console.log(errMsg);
        } else if (err?.response?.status === 401) {
          setErrMsg(err.response.data.message);
          console.log(errMsg);
        } else {
          setErrMsg("Register Failed");
          console.log(errMsg);
        }
      }
    } else console.log(res);
  };

  const OnSubmit = async ({
    name,
    email,
    country,
    phone,
    password,
    c_password,
  }) => {
    setIsLooading(true);
    try {
      const response = await axios.post(
        "/api/register",
        JSON.stringify({
          name,
          email,
          password,
          c_password,
          phone: phone + country,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response.data);
      const aname = response?.data?.user.name;
      const aemail = response?.data?.user.email;
      const arole = response?.data?.user.role.id;
      const arolename = response?.data?.user.role.role_name;
      const atoken = response?.data?.token;
      const aphone = response?.data?.user.phone;
      const aimg = response?.data?.user.img;
      const alevel = response?.data?.user.level;
      const ais_verifay = response?.data?.user.is_verifaied;
      setAuth({
        aname,
        aemail,
        arole,
        arolename,
        atoken,
        aphone,
        aimg,
        alevel,
        ais_verifay,
      });
      console.log(
        aname,
        aemail,
        arole,
        arolename,
        atoken,
        aphone,
        aimg,
        alevel,
        ais_verifay
      );
      setIsLooading(false);
      if (ais_verifay === 1) {
        navigate("/home");
      }
      setSuccess(true);
    } catch (err) {
      setIsLooading(false);
      if (!err?.message) {
        setErrMsg("No Server Response");
        console.log("No Server Response");
      } else if (err?.response?.status === 0) {
        setErrMsg(err.message);
        console.log(errMsg);
      } else if (err?.response?.status === 400) {
        setErrMsg(err.response.data.message);
        console.log(errMsg);
      } else if (err?.response?.status === 401) {
        setErrMsg(err.response.data.message);
        console.log(errMsg);
      } else {
        setErrMsg("Register Failed");
        console.log(err);
      }
    }
  };

  let errorSize = Object.keys(errors).length;
  console.log(errorSize);

  return (
    <>
      <div className="sginin-container">
        <div className="row sign-up g-0">
          <div className="col-12 col-md-8 sign-up-fildes-box">
            <h1 className="col-12 text-center offset-sm-1 title">Registrar</h1>
            {auth.ais_registerd === 0 ? (
              <>
                <div className="row d-felx justify-content-center alighn-content-center">
                  <div
                    class="alert alert-success col-8 offset-sm-2"
                    role="alert"
                  >
                    <h4 class="alert-heading ">
                      Thanks for using Social Acount With Trip Tips!
                    </h4>
                    <p>
                      {" "}
                      <b>Congrats!</b> You successfully Sing up in Trip Tips
                      with Your Socail Email ,<br /> So Plase Set A new Password
                      to your acount so you can log in normaly in future{" "}
                    </p>
                    <hr />
                    <p class="mb-0">
                      {" "}
                      So please click on the New Password icon.
                    </p>
                  </div>
                  <button
                    className="verify-icon col-4 offset-sm-2"
                    style={{ cursor: "pointer" }}
                    type="button"
                    data-bs-toggle={`modal`}
                    data-bs-target={`#setnewpassword`}
                  >
                    Set A New Password
                  </button>
                  {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            Launch static backdrop modal
            </button> */}
                  <SetANewPassWord
                    redirect={"./home"}
                    url={"/api/addPasswordSocialite"}
                  />
                  <img
                    className={"col-7 mt-4 offset-1"}
                    src="/logo/spassword.svg"
                    alt="none"
                  />
                </div>
              </>
            ) : (
              <>
                {success ? (
                  <>
                    <div className="row d-felx justify-content-center alighn-content-center">
                      <div
                        class="alert alert-success col-8 offset-sm-2"
                        role="alert"
                      >
                        <h4 class="alert-heading ">Well done!</h4>
                        <p>
                          {" "}
                          <b>Congrats!</b> You successfully Sing up with Trip
                          Tips But due to security reasons, we need to verify
                          the ownership of your account with a second step{" "}
                        </p>
                        <hr />
                        <p class="mb-0">
                          {" "}
                          So please click on the verification icon.
                        </p>
                      </div>
                      <button
                        className="verify-icon col-4 offset-sm-2"
                        disabled={!notArobot}
                        type="submit"
                        data-bs-toggle={`${
                          auth.ais_verifay !== 1 && errorSize === 0 && "modal"
                        }`}
                        data-bs-target={`${
                          auth.ais_verifay !== 1 &&
                          errorSize === 0 &&
                          "#verifyEmail"
                        }`}
                      >
                        Verify Your Account
                      </button>
                      <VerifyEmail success={success} setSuccess={setSuccess} />
                      <img
                        className={"col-7 mt-4 offset-1"}
                        src="/logo/auth.svg"
                        alt="none"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {isloading ? (
                      <h1 className="offset-5">isloading</h1>
                    ) : (
                      <>
                        <div className="row  g-0">
                          <div className="col-12 col-md-8 offset-sm-1  ">
                            <h3 className="sub-title  text-center ">
                              We Will Need...
                            </h3>

                            <form onSubmit={handleSubmit(OnSubmit)}>
                              <div className="col-11 col-sm-8 offset-sm-1 ">
                                <div className="input-group input-group-lg   mb-1 ms-sm-5 ">
                                  <span
                                    className={`input-group-text fs-3 filed filed-icon `}
                                  >
                                    <FontAwesomeIcon icon={faCircleUser} />
                                  </span>
                                  <input
                                    type="text"
                                    className={`form-control filed 
                                      ${errors.name && "invalid"}`}
                                    {...register("name", {
                                      required: "Name is Required",
                                      minLength: {
                                        value: 3,
                                        message: "Minimum Required length is 3",
                                      },
                                      maxLength: {
                                        value: 20,
                                        message:
                                          "Maximum allowed length is 20 ",
                                      },
                                    })}
                                    onKeyUp={() => {
                                      trigger("name");
                                      // errorSize = Object.keys(errors).length
                                      // seterrorSize ( Object.keys(errors).length)
                                    }}
                                    // onKeyDown={() => {
                                    //     // trigger("name");
                                    //     errorSize = Object.keys(errors).length
                                    //     // seterrorSize ( Object.keys(errors).length)
                                    // }}
                                    placeholder="Full Name"
                                  />
                                  {errors.name && (
                                    <small className="text-danger">
                                      {errors.name.message}
                                    </small>
                                  )}
                                </div>

                                <div className="input-group input-group-lg   mb-1 ms-sm-5 ">
                                  <span
                                    className="input-group-text fs-3 filed filed-icon"
                                    id="basic-addon1"
                                  >
                                    <FontAwesomeIcon icon={faEnvelope} />
                                  </span>
                                  <input
                                    type="text"
                                    className={`form-control filed ${
                                      errors.email && "invalid"
                                    }`}
                                    {...register("email", {
                                      required: "Email is Required",
                                      pattern: {
                                        value:
                                          /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address",
                                      },
                                    })}
                                    onKeyUp={() => {
                                      trigger("email");
                                      // errorSize = Object.keys(errors).length
                                      // seterrorSize ( Object.keys(errors).length)
                                    }}
                                    //   onKeyDown={() => {
                                    //     // trigger("name");
                                    //     errorSize = Object.keys(errors).length
                                    //     // seterrorSize ( Object.keys(errors).length)
                                    // }}
                                    placeholder="Mail Address"
                                  />
                                  {errors.email && (
                                    <small className="text-danger ">
                                      {errors.email.message}
                                    </small>
                                  )}
                                </div>

                                <div className="input-group input-group-lg mb-1 ms-sm-5">
                                  <span
                                    className="input-group-text fs-3  filed-icon"
                                    id="basic-addon1"
                                  >
                                    <FontAwesomeIcon icon={faPhone} />
                                  </span>
                                  <select
                                    className={`form-select  filed ${
                                      errors.country && "invalid"
                                    }`}
                                    {...register("country", {
                                      required: "Country is Required",
                                    })}
                                    onKeyUp={() => {
                                      trigger("country");
                                      errorSize = Object.keys(errors).length;
                                      // seterrorSize ( Object.keys(errors).length)
                                    }}
                                    onKeyDown={() => {
                                      // trigger("name");
                                      errorSize = Object.keys(errors).length;
                                      // seterrorSize ( Object.keys(errors).length)
                                    }}
                                    aria-label="Default select example"
                                  >
                                    <option value="">Country </option>
                                    <option value="+963">Syria </option>
                                    <option value="+777">Egypt </option>
                                    <option value="+45 ">Jordun</option>
                                    <option value="+343">KSA </option>
                                    <option value="+111">Qatar </option>
                                    <option value="+86 ">Turke </option>
                                  </select>
                                  <input
                                    type="text"
                                    className={`form-control tel filed ${
                                      errors.phone && "invalid"
                                    }`}
                                    {...register("phone", {
                                      required: "Phone is Required",
                                      pattern: {
                                        value:
                                          /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{2})[-. )]*(\d{2})[-. ]*(\d{2})(?: *x(\d+))?\s*$/,
                                        message: "Invalid phone no",
                                      },
                                    })}
                                    onKeyUp={() => {
                                      trigger("phone");
                                      // errorSize = Object.keys(errors).length
                                      // seterrorSize ( Object.keys(errors).length)
                                    }}
                                    // onKeyDown={() => {
                                    //     // trigger("name");
                                    //     errorSize = Object.keys(errors).length
                                    //     // seterrorSize ( Object.keys(errors).length)
                                    // }}
                                    placeholder="Number"
                                  />
                                  {errors.phone && (
                                    <small className="text-danger">
                                      {errors.phone.message}
                                    </small>
                                  )}
                                </div>

                                <div className="input-group input-group-lg  mb-1 ms-sm-5">
                                  <span
                                    className="input-group-text fs-3  filed-icon"
                                    id="basic-addon1"
                                  >
                                    <FontAwesomeIcon icon={faUnlock} />
                                  </span>
                                  <input
                                    type="password"
                                    className={`form-control filed ${
                                      errors.password && "invalid"
                                    }`}
                                    {...register("password", {
                                      required: "password is Required",
                                      minLength: {
                                        value: 6,
                                        message: "Minimum Required length is 6",
                                      },
                                      maxLength: {
                                        value: 20,
                                        message:
                                          "Maximum allowed length is 20 ",
                                      },
                                    })}
                                    onKeyUp={() => {
                                      trigger("password");
                                      //    errorSize = Object.keys(errors).length

                                      //    seterrorSize ( Object.keys(errors).length)
                                    }}
                                    // onKeyDown={() => {
                                    //     // trigger("name");
                                    //     errorSize = Object.keys(errors).length
                                    //     // seterrorSize ( Object.keys(errors).length)
                                    // }}
                                    placeholder="Password"
                                  />
                                  {errors.password && (
                                    <small className="text-danger">
                                      {errors.password.message}
                                    </small>
                                  )}
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
                                    className={`form-control filed ${
                                      errors.c_password && "invalid"
                                    }`}
                                    {...register("c_password", {
                                      required: "confirm password is Required",
                                      //   minLength: {
                                      //     value: 8,
                                      //     message: "Minimum Required length is 8",
                                      //   },
                                      //   maxLength: {
                                      //     value: 20,
                                      //     message: "Maximum allowed length is 20 ",
                                      //   },
                                      validate: {
                                        value: (value) =>
                                          value === getValues("password") ||
                                          "Do Not matched",
                                      },
                                    })}
                                    onKeyUp={() => {
                                      trigger("c_password");
                                      // errorSize = Object.keys(errors).length
                                      // seterrorSize (Object.keys(errors).length)
                                    }}
                                    // onKeyDown={() => {
                                    //     // trigger("name");
                                    //     errorSize = Object.keys(errors).length
                                    //     // seterrorSize ( Object.keys(errors).length)
                                    // }}
                                    placeholder="Confirm Password"
                                  />
                                  {errors.c_password && (
                                    <small className="text-danger">
                                      {errors.c_password.message}
                                    </small>
                                  )}
                                </div>
                                {errMsg && (
                                  <div
                                    className="alert alert-danger d-flex align-items-center col-12 offset-2 server-errors "
                                    role="alert"
                                  >
                                    <FontAwesomeIcon
                                      icon={faExclamationTriangle}
                                      className="bi flex-shrink-1 me-4 "
                                      width="24"
                                      height="24"
                                      role="img"
                                      aria-label="Danger:"
                                    ></FontAwesomeIcon>
                                    <div className="text-center">{errMsg}</div>
                                  </div>
                                )}
                                <div className="ReCAPTCHA-div offset-sm-1 mt-1 ">
                                  <ReCAPTCHA
                                    notArobot={notArobot}
                                    setnotArobot={setnotArobot}
                                  />
                                </div>
                              </div>
                              <div className="div-icon">
                                <button
                                  className="one-icon"
                                  disabled={!notArobot}
                                  type="submit"
                                  // data-bs-toggle={`${auth.ais_verifay !==1 && errorSize === 0 && "modal"}`}
                                  // data-bs-target={`${auth.ais_verifay !==1 && errorSize === 0 && "#verifyEmail"}`}
                                >
                                  Sign Up
                                </button>
                              </div>
                              <div className="div-icon"></div>
                            </form>
                          </div>
                          <div className="or-box-bottom-container d-md-none">
                            <div className="col-12 offset-sm-1 or-box ">
                              <div className="line "></div>
                              <div className="or fs-3">Or</div>
                              <div className="line"></div>
                            </div>
                            <div className="col-12 offset-sm-1">
                              <h3 className="sub-title">
                                Also, You Can Continue With ..{" "}
                              </h3>
                              <div className="div-soc-icon ">
                                <Link className="socail-icon " to="./">
                                  <FontAwesomeIcon
                                    icon={faFacebook}
                                    onClick={() =>
                                      handleSocialLogin(facebookProvider)
                                    }
                                  ></FontAwesomeIcon>
                                </Link>
                                <Link className="socail-icon " to="./">
                                  <FontAwesomeIcon
                                    icon={faGooglePlus}
                                    onClick={() =>
                                      handleSocialLogin(googleProvider)
                                    }
                                  ></FontAwesomeIcon>
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="or-box-side-container col-3 d-none d-md-block">
                            <div className="row h-100 g-0">
                              <div className="col-2 align-content-center or-box">
                                <div className="line "></div>
                                <div className="or fs-3">Or</div>
                                <div className="line"></div>
                              </div>
                              <div className="col-10">
                                <h3 className="sub-title">
                                  Also, You Can Continue With ..{" "}
                                </h3>
                                <div className="div-soc-icon ">
                                <Link className="socail-icon " to="./">
                                  <FontAwesomeIcon
                                    icon={faFacebook}
                                    onClick={() =>
                                      handleSocialLogin(facebookProvider)
                                    }
                                  ></FontAwesomeIcon>
                                </Link>
                                <Link className="socail-icon " to="./">
                                  <FontAwesomeIcon
                                    icon={faGooglePlus}
                                    onClick={() =>
                                      handleSocialLogin(googleProvider)
                                    }
                                  ></FontAwesomeIcon>
                                </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
          <div className="col-12  order-first order-md-last col-md-4  sign-up-img-box ">
            <div className="img-box"></div>
            <div className="myoverlay row g-0 justify-content-center  text-center">
              <div className="text-boxx    ">
                <img
                  className="trip-logo col-12 "
                  src="/logo/66.png"
                  alt="Trip Tips"
                ></img>
                <h1 className="title">Hello Friend !</h1>
                <p className="description">
                  Enter Your Personal Detailes and <br /> Start Your Journey
                  With Us
                </p>
                <h3 className="dont  ">Already Have Acount?</h3>
                <Link className="create-acount" to="/logging/signin">
                  Log In{" "}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
