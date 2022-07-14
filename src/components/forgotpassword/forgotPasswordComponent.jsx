import { faCheckCircle, faEnvelope, faExclamationTriangle, faKey, faL, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";
import SetANewPassWord from "../setanewpassword/SetANewPassWordComponent";

let CheckToken = ({email}) => {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const [tokenx, settokenx] = useState(null);
  const { auth, setAuth } = useContext(AuthContext);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    getValues,
  } = useForm();
  const OnsecounSubmit = async ({ token }) => {
    try {
      const response = await axios.post(
        "/api/checkToken",
        JSON.stringify({ email, token }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.atoken}`,
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      if (response.data.status === 0) {
          settokenx(null);
          setSuccess('false')
        }
        if (response.data.status === 1) {
            settokenx(token);
            setSuccess('true')
        }
        setErrMsg(response.data.message);
    } catch (err) {
      console.log(err);
      if (!err?.message) {
        setSuccess('false')
        setErrMsg("No Server Response");
        console.log("No Server Response");
      } else if (err) {
        setErrMsg(err.response.data.message);
        console.log(err.response.data.message);
      }
    }
  };
  return (
    <>
      <div
        className="modal fade"
        id="exampleModalToggle2"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-hidden="true"
        aria-labelledby="staticBackdropLabel"
        tabindex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content model-forgot">
            <form onSubmit={handleSubmit(OnsecounSubmit)}>
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalToggleLabel2">
                  Recive Token
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                We Sent For "email" a Token of 10 char's Plase Enter it
                <div className="input-group input-group-lg mb-1 ">
                  <span
                    className="input-group-text fs-3  filed-icon"
                    id="basic-addon1"
                  >
                    <FontAwesomeIcon icon={faKey} />
                  </span>
                  <input
                    type="text"
                    className={`form-control tel filed ${
                      errors.token && "invalid"
                    }`}
                    {...register("token", {
                      required: "token is Required",
                      minLength: {
                        value: 5,
                        message: "Minimum Required length is 6",
                      },
                      maxLength: {
                        value: 15,
                        message: "Maximum allowed length is 20 ",
                      },
                    })}
                    onKeyUp={() => {
                      trigger("token");
                    }}
                    placeholder="Token"
                  />
                  {/* {errors.token && (<small className="text-danger">{errors.token}</small> )} */}
                </div>
              </div>
              <div className="modal-footer">
              {/* {errMsg && (
                <div
                  className="alert alert-danger d-flex align-items-center col-6  mx-auto server-error"
                  role="alert"
                >
                  <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    className="bi  me-2 "
                    width="25"
                    height="25"
                    role="img"
                    aria-label="Danger:"
                  ></FontAwesomeIcon>
                  <div className="text-center">{errMsg}</div>
                </div>
              )} */}
            {errMsg && (
                  <div
                    className={`alert alert-${
                      success ? "success" : "danger"
                    } d-flex align-items-center col-6  mx-auto server-error`}
                    role="alert"
                  >
                    <FontAwesomeIcon
                      icon={
                        success
                          ? faCheckCircle
                          : faExclamationTriangle
                      }
                      className="bi  me-2 "
                      width="25"
                      height="25"
                      role="img"
                      aria-label="Danger:"
                    ></FontAwesomeIcon>
                    <div className="text-center">{errMsg}</div>
                  </div>
                )}
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={tokenx !== null && 'false'}
                >
                  Check
                </button>
                <button
                  className="btn btn-success"
                  data-bs-toggle={`modal`}
                  data-bs-target={`#setnewpassword`}
                  disabled={tokenx === null && 'false'}
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <SetANewPassWord redirect={'/logging/signin'} token={tokenx} email={email} url={'/api/reset'} />
    </> 
  );
};

let ForgotPassword = () => {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const [emailx, setEmailx] = useState(null);
  const [tokenx, settokenx] = useState(null);
  const { auth, setAuth } = useContext(AuthContext);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset1,
    trigger,
    getValues1,
  } = useForm();

  const OnfirstSubmit = async ({ email }) => {
    try {
      const response = await axios.post(
        "/api/forgot",
        JSON.stringify({ email }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.atoken}`,
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      if (response.data.status === 0) {
        setEmailx(null);
        setSuccess(false)
      }
      else if (response.data.status === 1) {
        setEmailx(email);
        setSuccess(true)
      }
      setErrMsg(response.data.message)
    } catch (err) {
      setSuccess(  false)
      console.log(err);
      if (!err?.message) {
        setErrMsg("No Server Response");
        console.log("No Server Response");
      } else if (err) {
        setErrMsg(err.response.data.message);
        console.log(err.response.data.message);
      }
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="forgotpassword"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabindex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content model-forgot">
            <form onSubmit={handleSubmit(OnfirstSubmit)}>
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalToggleLabel">
                  Reset Password
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                Plase Enter Your Email To Change Your Password
                <div className="input-group input-group-lg   mb-3 ">
                  <span className="input-group-text fs-3 filed filed-icon">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </span>
                  <input
                    type="email"
                    className={`form-control filed 
                        ${errors.email && "invalid"}`}
                    {...register("email", { required: "Email is Required" })}
                    onKeyUp={() => {
                      trigger("email");
                    }}
                    placeholder="Mail Address"
                  />
                  {/* {errors.email && (<small className="text-danger ">{errors.email.message}</small>)} */}
                </div>
              </div>
              <div className="modal-footer">
              {/* {errMsg && (
                <div
                  className="alert alert-danger d-flex align-items-center col-6  mx-auto server-error"
                  role="alert"
                >
                  <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    className="bi  me-2 "
                    width="25"
                    height="25"
                    role="img"
                    aria-label="Danger:"
                  ></FontAwesomeIcon>
                  <div className="text-center">{errMsg}</div>
                </div>
              )} */}
                {errMsg && (
                  <div
                    className={`alert alert-${
                      success ? "success" : "danger"
                    } d-flex align-items-center col-6  mx-auto server-error`}
                    role="alert"
                  >
                    <FontAwesomeIcon
                      icon={
                        success
                          ? faCheckCircle
                          : faExclamationTriangle
                      }
                      className="bi  me-2 "
                      width="25"
                      height="25"
                      role="img"
                      aria-label="Danger:"
                    ></FontAwesomeIcon>
                    <div className="text-center">{errMsg}</div>
                  </div>
                )}
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={emailx !== null && 'false'}
                  onClick={() => {
                    console.log("a");
                  }}
                >
                  submit
                </button>
                <button
                type='button'
                  className="btn btn-success"
                  data-bs-target="#exampleModalToggle2"
                  data-bs-toggle="modal"
                  disabled={emailx === null && 'false'}
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <CheckToken  email={emailx}/>
    </>
  );
};
export default ForgotPassword;
