import {
  faExclamationTriangle,
  faLock,
  faUnlock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";

let SetANewPassWord = ({token = null,email = null,url,redirect}) => {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
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
  const OnpassSubmit = async ({ password }) => {
    try {
      const response = await axios.post(
        url,
        JSON.stringify({ password ,token ,email}),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.atoken}`,
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      if(response?.data?.user?.is_registerd !== null){
          console.log('sisi');
          setSuccess('true')
        auth.ais_registerd = 1;
      }
      else if(response?.data?.status === 1 )
      {
        setSuccess('true')
      }
      setErrMsg(response.data.message);
      // }
    } catch (err) {
      console.log(err);
      if (!err?.message) {
        setErrMsg("No Server Response");
        console.log("No Server Response");
      } else if (err) {
        setErrMsg(err.message);
        console.log(errMsg);
      }
    }
  };
  return (
    <>
      <div
        class="modal fade"
        id="setnewpassword"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <form onSubmit={handleSubmit(OnpassSubmit)}>
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">
                  Set New PassWord
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div className="input-group input-group-lg  mb-1 ">
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
                        message: "Maximum allowed length is 20 ",
                      },
                    })}
                    onKeyUp={() => {
                      trigger("password");
                    }}
                    placeholder="Password"
                  />
                  {errors.password && (
                    <small className="text-danger">
                      {errors.password.message}
                    </small>
                  )}
                </div>
                <div className="input-group input-group-lg  mb-1 ">
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
                      validate: {
                        value: (value) =>
                          value === getValues("password") || "Do Not matched",
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
              </div>
              <div class="modal-footer">
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
                  class="btn btn-primary"
                  disabled={success && "true"}
                //   onClick={
                //     auth.ais_registerd === 1 ?
                //     (() => {
                //       navigate("./home");
                //     })
                //     :
                //     (undefined)
                //   }
                >
                  Submit
                </button>
                <button
                  type="button"
                  class="btn btn-success"
                  disabled={!success && "true"}
                //   onClick={
                //     auth.ais_registerd === 1 &&
                //     (() => {
                //       navigate("./home");
                //     })
                //   }
                onClick={
                    success ?
                    (() => {
                      navigate(redirect);
                    })
                    :
                    (undefined)
                  }
                  data-bs-dismiss={success && "modal"}
                >
                  Go Home
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default SetANewPassWord;
