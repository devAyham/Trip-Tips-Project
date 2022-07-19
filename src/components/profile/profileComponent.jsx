import { faHackerrank } from "@fortawesome/free-brands-svg-icons";
import {
  faBolt,
  faDeleteLeft,
  faEnvelope,
  faEraser,
  faLongArrowAltUp,
  faPencil,
  faPerson,
  faPhone,
  faRankingStar,
  faRightFromBracket,
  faUnlockKeyhole,
  faUpload,
  faUserAstronaut,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { baseURl } from "../../api/baseURL";
import AuthContext from "../../context/AuthProvider";

let Profile = () => {
  const { auth, setAuth } = useContext(AuthContext);
  let Pencilicon = () => {
    return (
      <div className=" col-1  ms-auto my-auto mb-sm-auto mt-sm-5 edit-icon">
        <svg
          aria-hidden="true"
          fill="white"
          focusable="false"
          height="50"
          viewBox="0 0 20 20"
          width="50"
          class="css-wkr7b6"
          id="cds-4"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.47 2.888L4.544 13.732l-1.51 3.233 3.214-1.501L17.175 4.608a1.34 1.34 0 00.012-1.732 1.34 1.34 0 00-1.718.012zm2.397-.746a2.34 2.34 0 00-3.065 0l-.012.011L3.715 13.148l-2.75 5.887 5.866-2.739L17.904 5.293l.011-.013a2.34 2.34 0 000-3.09l-.048-.048z"
            fill="white"
          ></path>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16.257 6.194l-2.44-2.43.706-.708 2.44 2.43-.706.708zM6.216 16.233l-2.44-2.44.708-.707 2.44 2.44-.708.707z"
            fill="white"
          ></path>
        </svg>
      </div>
    );
  };

  return (
    <>
      <div className="container-fluid profile m-0 p-0">
        <div className="cover-box ">
          <img className={"cover"} src={"/logo/profile4.jpg"} alt={".."} />
          <div className="cover-over-lay"></div>
        </div>
        <div className="container ">
          <div className="row  header-info g-0">
            <div className="img-box mt-5 mt-sm-0">
              <img src={baseURl + auth.aimg} alt={".."}></img>
            </div>
            <Pencilicon />
            <h1 className={"profile-name"}>{auth.aname}</h1>
          </div>
          <div className="row scroll-box ms-sm-auto mx-auto mx-sm-0">
            <div className="personal-info-profile mx-auto">
              <div className="personal-header">Personal Information</div>
              <hr />
              <div className="personal-content row">
                <div className="col-12 col-lg-6 mb-2 ">
                  <FontAwesomeIcon className={"icon"} icon={faEnvelope} />
                  <p>
                    <span>Email :</span> {auth.aemail}
                  </p>
                </div>
                <div className="col-12 col-lg-6 mb-2">
                  <FontAwesomeIcon className={"icon"} icon={faRankingStar} />
                  <p>
                    <span>Level :</span> {auth.alevel}
                  </p>
                </div>
                <div className="col-12 col-lg-6 mb-2">
                  <FontAwesomeIcon className={"icon"} icon={faPhone} />
                  <p>
                    <span>Phone :</span> {auth.aphone}
                  </p>
                </div>
                <div className="col-12 col-lg-6 mb-2">
                  <FontAwesomeIcon className={"icon"} icon={faUserAstronaut} />
                  <p>
                    {" "}
                    <span>App Role : </span>
                    {auth.arolename}
                  </p>
                </div>
              </div>
            </div>
            <div className="financial-info-profile mx-auto">
              <div className="personal-header">Financial information</div>
              <hr />
              <div className="personal-content ms-auto text-center row">
                <div className="col-12 mb-2">
                  <FontAwesomeIcon className={"icon fs-1"} icon={faWallet} />
                  <p className={"fs-2"}>
                    {" "}
                    <span>E-wallet Balance : </span>
                    {1000} $
                  </p>
                  <select className={"filed carrncy-select ms-4"}>
                    <option>Currency</option>
                  </select>
                </div>
                <div className="col-12 mb-2">
                  <div className="kind-feild">
                    <div
                      class="btn-group btn-group-lg"
                      role="group"
                      aria-label="Basic example"
                    >
                      <button
                        type="button"
                        class="btn btn-outline-primary "
                        onClick={() => {}}
                      >
                        <FontAwesomeIcon icon={faBolt} className={"me-2"} />
                        Charge
                      </button>
                      <button
                        type="button"
                        class="btn  btn-outline-primary "
                        onClick={() => {}}
                      >
                        <FontAwesomeIcon icon={faUpload} className={"me-2"} />
                        Pull
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="property-info-profile mx-auto"></div>
            <div className="settings-info-profile mx-auto">
            <div className="personal-header">Acount Settings</div>
              <hr />
              <div className=" settings row "  >
                <div className="col-12 col-md-7 mb-1 setting-option">
                  <FontAwesomeIcon className={"icon"} icon={faUnlockKeyhole} />
                  <p>Reset Your Password</p>
                </div>
                <div className="col-12 col-md-7 mb-1 setting-option">
                  <FontAwesomeIcon className={"icon"} icon={faEraser} />
                  <p>Delete Your Acount</p>
                </div>
                <div className="col-12  col-md-7 mb-1 setting-option">
                  <FontAwesomeIcon className={"icon"} icon={faRightFromBracket} />
                  <p>Log Out</p>
                </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
