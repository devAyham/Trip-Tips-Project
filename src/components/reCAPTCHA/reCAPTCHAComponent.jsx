import React, { useState } from "react";

let ReCAPTCHA = ({ notArobot, setnotArobot }) => {
  const [checknotArobot, setchecknotArobot] = useState(false);
  let reCAPTCHAhandler = () => {
    setchecknotArobot(true);
    setnotArobot(true);
  };
  return (
    <>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={reCAPTCHAhandler}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="reCAPTCHA-box offset-2 offset-md-none">
        <div className="form-check ">
          <input
            className="form-check-input re-check"
            id="flexCheckChecked"
            type="checkbox"
            checked={notArobot}
            disabled={notArobot}
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          />
          <label className="form-check-label" htmlFor="flexCheckChecked">
            I'm not a robot
          </label>
        </div>
        <div className="reCAPTCHA-logo-box text-center">
          <img
            className="reCAPTCHA-logo"
            src="/logo/reCAPTCHA.png"
            alt="/reCAPTCHA"
          ></img>
          <p>Privacy - Terms</p>
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="256" height="244"><path d="M211.3 84.966l-.087-3.652V12.25L192.12 31.344C176.495 12.217 152.723 0 126.097 0 98.387 0 73.77 13.226 58.2 33.7l31.295 31.624C92.572 59.66 96.928 54.8 102.182 51.1c5.464-4.264 13.205-7.75 23.914-7.75 1.294 0 2.292.15 3.026.436 13.268 1.047 24.77 8.37 31.54 18.998L138.5 84.946l72.788.014" fill="#1c3aa9"/><path d="M125.6.003L121.947.1H52.885l19.093 19.093C52.85 34.8 40.633 58.58 40.633 85.207c0 27.7 13.226 52.326 33.7 67.888l31.624-31.295a41.46 41.46 0 0 1-14.223-12.677c-4.263-5.464-7.75-13.205-7.75-23.914 0-1.294.15-2.292.436-3.026 1.047-13.268 8.37-24.77 18.998-31.54l22.152 22.152.014-72.788" fill="#4285f4"/><path d="M40.636 85.205l.087 3.652v69.062l19.093-19.093c15.626 19.127 39.398 31.344 66.024 31.344 27.7 0 52.326-13.226 67.888-33.7l-31.295-31.624a41.46 41.46 0 0 1-12.677 14.223c-5.464 4.264-13.205 7.75-23.914 7.75-1.294 0-2.292-.15-3.026-.436-13.268-1.047-24.77-8.37-31.54-18.998l22.152-22.152c-28.06.1-59.756.175-72.788-.014" fill="#ababab"/><path d="M55.013 203.168c-2.075 0-3.936.394-5.582 1.18a11.57 11.57 0 0 0-4.187 3.301c-1.127 1.43-1.995 3.167-2.603 5.206-.6 2.022-.886 4.285-.886 6.8v7.22c0 2.523.295 4.795.886 6.817.608 2.022 1.467 3.748 2.576 5.18s2.45 2.532 4.026 3.3 3.346 1.154 5.314 1.154c2.022 0 3.793-.295 5.314-.886 1.54-.6 2.827-1.44 3.865-2.55 1.038-1.127 1.834-2.487 2.4-4.08.573-1.592.912-3.4 1.02-5.42H62.18c-.125 1.557-.34 2.9-.644 4-.304 1.1-.75 1.995-1.342 2.7-.573.698-1.324 1.217-2.254 1.557-.912.322-2.04.483-3.38.483-1.43 0-2.648-.313-3.65-.94-1.002-.644-1.816-1.52-2.442-2.63-.608-1.1-1.056-2.406-1.342-3.9-.268-1.485-.403-3.086-.403-4.804v-7.273c0-1.843.16-3.516.483-5.02.34-1.503.85-2.782 1.53-3.838s1.54-1.87 2.576-2.442c1.038-.6 2.272-.886 3.704-.886 1.2 0 2.227.18 3.086.537.86.34 1.574.877 2.147 1.6.573.716 1 1.628 1.315 2.737s.5 2.433.617 3.972h4.965c-.1-2.1-.42-3.98-.993-5.6s-1.37-2.997-2.4-4.106-2.263-1.95-3.73-2.523c-1.45-.573-3.122-.86-5.02-.86zm121.2 0c-2.075 0-3.936.394-5.582 1.18a11.57 11.57 0 0 0-4.187 3.301c-1.127 1.43-1.995 3.167-2.603 5.206-.6 2.022-.886 4.285-.886 6.8v7.22c0 2.523.295 4.795.886 6.817.608 2.022 1.467 3.748 2.576 5.18s2.45 2.532 4.026 3.3 3.346 1.154 5.314 1.154c2.022 0 3.793-.295 5.314-.886 1.54-.6 2.827-1.44 3.865-2.55 1.038-1.127 1.834-2.487 2.4-4.08.573-1.592.912-3.4 1.02-5.42h-4.965c-.125 1.557-.34 2.9-.644 4-.304 1.1-.75 1.995-1.342 2.7-.573.698-1.324 1.217-2.254 1.557-.912.322-2.04.483-3.38.483-1.43 0-2.648-.313-3.65-.94-1.002-.644-1.816-1.52-2.442-2.63-.608-1.1-1.056-2.406-1.342-3.9-.268-1.485-.403-3.086-.403-4.804v-7.273c0-1.843.16-3.516.483-5.02.34-1.503.85-2.782 1.53-3.838s1.54-1.87 2.576-2.442c1.038-.6 2.272-.886 3.704-.886 1.2 0 2.227.18 3.086.537.86.34 1.574.877 2.147 1.6.573.716 1 1.628 1.315 2.737s.5 2.433.617 3.972h4.965c-.1-2.1-.42-3.98-.993-5.6s-1.37-2.997-2.4-4.106-2.263-1.95-3.73-2.523c-1.45-.573-3.122-.86-5.02-.86zm-92.9.537L70.715 242.78h5.045l3.033-10.198h13.204l3.086 10.198h5.045l-12.614-39.075zm22.14 0v39.075h4.9v-15.297h7.54c1.88 0 3.543-.26 4.992-.778 1.45-.537 2.666-1.306 3.65-2.308 1.002-1.002 1.753-2.236 2.254-3.704.52-1.485.778-3.167.778-5.045 0-1.736-.26-3.328-.778-4.777-.5-1.467-1.243-2.728-2.227-3.784-.984-1.073-2.2-1.905-3.677-2.496-1.45-.6-3.113-.886-4.992-.886zm27.884 0v4.24h10.252v34.835h4.9v-34.835h10.28v-4.24zm61.646 0v39.075h4.9v-18.062H215.6v18.062h4.938v-39.075H215.6v16.8h-15.727v-16.8zm44.2 0l-12.587 39.075h5.045l3.033-10.198h13.204l3.086 10.198H256l-12.614-39.075zm-128.82 4.24h7.54c1.2 0 2.218.215 3.06.644a5.82 5.82 0 0 1 2.093 1.718c.555.716.957 1.548 1.208 2.496.268.93.403 1.897.403 2.9 0 1.1-.134 2.13-.403 3.06-.25.912-.653 1.7-1.208 2.4-.537.662-1.235 1.18-2.093 1.557-.84.376-1.86.564-3.06.564h-7.54zm-24.958 2.63l5.34 17.766H80.08zm155.87 0l5.34 17.766H235.95zM10.1 213.205c-1.235 0-2.3.313-3.194.94-.877.626-1.6 1.476-2.2 2.55l-.08-2.952H0v29.038h4.75v-20.773c.447-1.235 1.082-2.2 1.905-2.925.84-.716 1.905-1.073 3.194-1.073l1.1.054a8.14 8.14 0 0 1 1.047.134l-.027-4.616c-.072-.036-.188-.072-.35-.107a3.09 3.09 0 0 0-.483-.134c-.18-.036-.367-.063-.564-.08-.18-.036-.34-.054-.483-.054zm15.968 0a11.31 11.31 0 0 0-4 .725c-1.3.483-2.433 1.28-3.435 2.4-.984 1.1-1.78 2.523-2.4 4.294-.608 1.753-.912 3.9-.912 6.468v3.274c0 2.218.26 4.142.778 5.77s1.26 2.98 2.227 4.053c.984 1.056 2.174 1.843 3.57 2.362s2.96.778 4.697.778c1.252 0 2.37-.125 3.355-.376 1.002-.25 1.888-.573 2.657-.966.77-.412 1.43-.877 1.986-1.396s1.03-1.056 1.422-1.6l-2.47-3.006c-.394.483-.814.93-1.26 1.342-.447.394-.94.743-1.476 1.047a8.2 8.2 0 0 1-1.77.67c-.643.17-1.37.242-2.174.242-2.2 0-3.9-.707-5.072-2.12-1.163-1.413-1.744-3.677-1.744-6.8v-.67h16.2v-2.764c0-2.218-.188-4.178-.564-5.878s-.975-3.13-1.798-4.294a7.79 7.79 0 0 0-3.167-2.63c-1.288-.608-2.845-.912-4.67-.912zm0 4.08c1.038 0 1.897.188 2.576.564a4.15 4.15 0 0 1 1.61 1.583c.412.68.707 1.494.886 2.442.197.93.322 1.96.376 3.086v.644H20.074c.072-1.628.268-2.98.6-4.053s.743-1.923 1.26-2.55c.537-.644 1.154-1.1 1.852-1.342s1.458-.376 2.28-.376z" fill="#a6a6a6"/></svg> */}
        </div>
      </div>
    </>
  );
};

export default ReCAPTCHA;