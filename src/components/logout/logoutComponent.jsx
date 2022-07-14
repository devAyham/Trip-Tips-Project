import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleQuestion,
  faRightToBracket,
  faAngleDown,
  faDisplay,
  faHouse,
  faPlus,
  faCog,
  faCircleInfo,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../../context/AuthProvider";
import { useNavigate } from "react-router";
import axios from "../../api/axios";

let LogOut = () => {
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);
    const {auth, setAuth } = useContext(AuthContext);
    const [isloading, setIsLooading] = useState(false);
    const [errMsg, setErrMsg] = useState('');


    const OnLogOutSubmit = async () => { 
        setIsLooading(true)
        console.log(auth.atoken);
        try {
          const response = await axios.post('/api/logout',
            JSON.stringify(),
            {
                headers: { 'Content-Type': 'application/json',
                            Authorization: `Bearer ${auth.atoken}`
             },
                withCredentials: true,
            }
          );
            console.log(response.data);
            setAuth({});
            navigate('/home');
        }
        catch (err) {
            setIsLooading(false);
            if (!err?.message) {
                setErrMsg('No Server Response');
                console.log('No Server Response');
            } 
            else if (err?.message) {
                setErrMsg(err.message);
                console.log(errMsg);
            }
        }
    }
return( 
<>
      <div
        className="modal fade"
        id="logout"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
              Are You Sure ,You Want To Log Out ?
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
              </button>
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={OnLogOutSubmit}>
                Log  Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogOut;