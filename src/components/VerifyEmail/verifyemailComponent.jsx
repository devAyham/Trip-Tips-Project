import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import axios from "../../api/axios";
import { useNavigate } from "react-router";

let VerifyEmail = ({ success, setSuccess }) => {
  const navigate = useNavigate();
  const [done, setDone] = useState(0);
  const { auth, setAuth } = useContext(AuthContext);
  const [errMsg, setErrMsg] = useState("");
  const [isloading, setIsLooading] = useState(false);

  let verifyCheck = async () => {
    setDone(done + 1);
    setIsLooading(true);
    setErrMsg("");
    // if(done !==0){
    try {
      const response = await axios.post(
        "/api/Verify_checking",
        JSON.stringify("hello broo"),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.atoken}`,
          },
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.data.is_verifaied === 1) {
        const ais_verifay = response.data.is_verifaied;
        setAuth({ ...auth, ais_verifay: ais_verifay });
        // navigate('/home')
      }
      if (response.data.is_verifaied === 0) {
        setErrMsg("The Email has not verified yet");
        setIsLooading(false);
      }
    } catch (err) {
      setIsLooading(false);
      if (err?.message) {
        setErrMsg(err.response.data.message);
        console.log(err.response.data.message);
      }
    }
    //    }
  };
  let resetAuth = () => {
    setAuth({});
    if (success) {
      setSuccess(false);
    }
  };
  // let flag = false;
  return (
    <>
      {/* {!flag ? ( */}
      <div
        className="modal fade "
        id="verifyEmail"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="false"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content model-verify">
            <div className="modal-header justify-content-center">
              <h5 className="modal-title fs-2 " id="staticBackdropLabel">
                Verifing Your Email
              </h5>
            </div>
            <div className="modal-body ">
              <div className="container-fluid">
                <div className="row  ">
                  <div className="col-md-12 ">
                    <div className="hmaro d-flex align-items-center justify-content-center">
                      <img
                        className="trip-logo"
                        src="/logo/2.png"
                        alt="trip tips"
                      />
                      <p className="and">&</p>
                      <FontAwesomeIcon
                        className="shild-logo"
                        icon={faUserShield}
                      />
                    </div>
                  </div>
                  <div className="col-12 text-center">
                    <p className="desc">
                      In order not to sign up with fake accounts and to increase
                      the security of our application and to ensure the
                      convenience of customers, Verify all emails by sending a
                      link to confirm account ownership for this :
                    </p>
                    We've sent an email to <u>'{auth.aemail}'</u> to verify your
                    email addess and activate your acount. The Link in The Email
                    Will Expire in 24 hours and Your Email Will Removed Form
                    Trip Tips
                    <br />
                    <br />
                    <h5>
                      So plase if you clicked the Link that we've sent to you
                      Click On Done
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              {errMsg && (
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
              )}
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={resetAuth}
              >
                Change Email
              </button>
              <button
                type="button"
                className="btn btn-primary"
                disabled={auth.ais_verifay === 1 && "true"}
                onClick={verifyCheck}
                // data-bs-dismiss={`${auth.ais_verifay === 1 && "modal"}`}
              >
                Done
              </button>
              <button
                type="button"
                class="btn btn-success"
                disabled={auth.ais_verifay !== 1 && "true"}
                onClick={
                  auth.ais_verifay === 1 &&
                  (() => {
                    navigate("./home");
                  })
                }
                data-bs-dismiss={`${auth.ais_verifay === 1 && "modal"}`}
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* ) : (
        <></>
      )} */}
    </>
  );
};

export default VerifyEmail;
