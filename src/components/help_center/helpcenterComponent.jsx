import { faCircleCheck, faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";
import ReCAPTCHA from "../reCAPTCHA/reCAPTCHAComponent";

let HelpCenter = () => {
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
  const OnSubmit = async ({
    description,
  }) => {
    let formdata = new FormData()
    formdata.append("description", description);
    setIsLooading(true);
    try {
      const response = await axios.post("/api/addPackage", formdata, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.atoken}`,
        },
        withCredentials: true,
        mode: "no-cros",
      });
      console.log(response.data);
      setIsLooading(false);
      setSuccess(true);
      setnotArobot(!notArobot)
    } catch (err) {
      setSuccess(false);
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
        setErrMsg("Add Package Failed");
        console.log(err);
      }
    }
  };
  return (
    <>
      <div className="container-fluid help-center p-0">
        <div className="help-overlay row g-0 ">
          <div className="col-3 d-none d-lg-block offset-md-1 ">
            <div className="lll">
              <img
                className={" road-logo"}
                src="/logo/triproad.svg"
                alt="none"
              />
            </div>
          </div>
          <div className="col-12 col-lg-3 offset-1">
            <div class="caption ">
              <img src="/logo/11.png" className={"trip-logo"} alt="..." />
              <h1 className={"logo-title"}>
                Help for wherever you are on your Trip.
              </h1>
            </div>
          </div>
          <div className="col-3 d-none d-lg-block  ">
            <div className="lll mt-3">
              <img
                className={"navigator-logo"}
                src="/logo/navigator.svg"
                alt="none"
              />
            </div>
          </div>
          <div class="jagged-wrap-inner">
            <div class="offset"></div>
            <div class="darkgray-bg jagged-border"></div>
            <div class="white-bg jagged-border"></div>
            <div class="lightgray-bg jagged-border"></div>
          </div>
        </div>
        <div className="row help-body g-0 ">
          <div className="col-12 col-md-6 offset-md-3 fields">
            <div className={"how "}>How We Can Help ?</div>
            <form className={"form"} onSubmit={handleSubmit(OnSubmit)}>
              <textarea
                type="text"
                rows={2}
                className={`form-control filed 
                                      ${errors.description && "invalid"}`}
                {...register("description", {
                  required: "This Feild is Required",
                })}
                onKeyUp={() => {
                  trigger("description");
                }}
                placeholder="Write Your Question Or Problem & send It To Our Support Center"
              />
              {errors.description && (
                <small className="text-danger ">
                  {errors.description.message}
                </small>
              )}
              <div className="ReCAPTCHA-div me-5 ">
                <ReCAPTCHA notArobot={notArobot} setnotArobot={setnotArobot} />
              </div>
              <div
                className={`alert alert-${success ? 'success' : 'danger'} ${!errMsg && 'd-none'} ms-5 my-1 d-flex align-items-center`}
                role="alert"
              >
                <FontAwesomeIcon className={'fs-3 me-4'} icon={success ? faCircleCheck : faWarning} />
                <div>{errMsg}</div>
              </div>
              <div className="div-icon">
                <button
                  className="one-icon"
                  disabled={!notArobot}
                  type="submit"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
          <div className="col-2 note ">
            <div
              class="alert alert-warning d-flex align-items-center"
              role="alert"
            >
              <FontAwesomeIcon className={"fs-4 me-3"} icon={faWarning} />
              <div className={"text-center"}>
                Our Admins In Support Center Will Reply On Your Question After a
                period not exceeding three days, <hr />
                <span>The Reply Will Sent To your Mail Address</span>{" "}
              </div>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default HelpCenter;
