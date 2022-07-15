import { defaults } from "chart.js";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Popover } from "bootstrap";
import { set } from "react-hook-form";
import { useAxiosGet } from "../../../hooks/useAxiosFetch";
import AuthContext from "../../../context/AuthProvider";
import axios from "../../../api/axios";
import { baseURl } from "../../../api/baseURL";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";

let AllUsers = ({ AllUserss, flag, setflag }) => {
  const { auth, setAuth } = useContext(AuthContext);
  const [isloading, setIsLooading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handlepromotion = async (id) => {
    const formData = new FormData();
    formData.append("user_id", id);
    setIsLooading(true);
    try {
      const response = await axios.post(
        "/api/user/PromotionToAdmin",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.atoken}`,
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      setIsLooading(false);
      setflag(!flag);
    } catch (err) {
      setIsLooading(false);
      if (err?.message) {
        setErrMsg(err.response.data.message);
        console.log(err.response);
      }
    }
  };

  const handledeomotion = async (id) => {
    const formData = new FormData();
    formData.append("user_id", id);
    setIsLooading(true);
    try {
      const response = await axios.post("/api/user/DemotionToUser", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.atoken}`,
        },
        withCredentials: true,
      });
      console.log(response.data);
      setIsLooading(false);
      setflag(!flag);
    } catch (err) {
      setIsLooading(false);
      if (err?.message) {
        setErrMsg(err.response.data.message);
        console.log(err.response);
      }
    }
  };
  const handlebanned = async (id) => {
    const formData = new FormData();
    formData.append("user_id", id);
    setIsLooading(true);
    try {
      const response = await axios.post("/api/user/Block", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.atoken}`,
        },
        withCredentials: true,
      });
      console.log(response.data);
      setIsLooading(false);
      setflag(!flag);
    } catch (err) {
      setIsLooading(false);
      if (err?.message) {
        setErrMsg(err.response.data.message);
        console.log(err.response);
      }
    }
  };
  const handleunbanned = async (id) => {
    const formData = new FormData();
    formData.append("user_id", id);
    setIsLooading(true);
    try {
      const response = await axios.post("/api/user/unBlock", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.atoken}`,
        },
        withCredentials: true,
      });
      console.log(response.data);
      setIsLooading(false);
      setflag(!flag);
    } catch (err) {
      setIsLooading(false);
      if (err?.message) {
        setErrMsg(err.response.data.message);
        console.log(err.response);
      }
    }
  };
  const handeledelete = async (id) => {
    const formData = new FormData();
    formData.append("user_id", id);
    setIsLooading(true);
    try {
      const response = await axios.post("/api/user/Delete", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.atoken}`,
        },
        withCredentials: true,
      });
      console.log(response.data);
      setIsLooading(false);
      setflag(!flag);
    } catch (err) {
      setIsLooading(false);
      if (err?.message) {
        setErrMsg(err.response.data.message);
        console.log(err.response);
      }
    }
  };
  return (
    <>
      {AllUserss ? (
        AllUserss.map((user) => {
          return (
            <>
              <div
                class="modal fade "
                id={`userImag-${user.id}`}
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-lg">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        User Image
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body userimageinsidemodel">
                      <img
                        className={""}
                        src={baseURl + user.img}
                        alt={"..."}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* facitiles Modal */}
              <div
                class="modal fade"
                id={`alluser-${user.id}`}
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-scrollable">
                  <div class="modal-content">
                    <div class="modal-header text-center">
                      <h1 class="modal-title" id="exampleModalLabel">
                        Facilities
                      </h1>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <h3>Resturants :</h3>
                      <p>
                        {user.restaurant_role.map((resturant) => {
                          return (
                            <>
                              <p>Returant Id :{resturant.restaurant_id}</p>
                              <p>Returant Name :{resturant.restaurant_name}</p>
                              <p>User Role :{resturant.role_facilities_name}</p>
                              <hr width={"50%"} className={"mx-auto my-2"} />
                            </>
                          );
                        })}
                      </p>
                      <hr />
                      <h3>Hotels :</h3>
                      <p>
                        {user.hotel_role.map((hotel) => {
                          return (
                            <>
                              <p>Hotel Id :{hotel.hotel_id}</p>
                              <p>User Role {hotel.role_facilities_id}</p>
                              <p>User Role {hotel.role_facilities_name}</p>
                              <hr width={"50%"} className={"mx-auto my-2"} />
                            </>
                          );
                        })}
                      </p>
                      <hr />
                      <h3>AirLines :</h3>
                      <p>
                        {user.airplane_role.map((airline) => {
                          return (
                            <>
                              <p>Returant Id :{airline.airplane_id}</p>
                              <p>User Role :{airline.role_facilities_id}</p>
                              <p>User Role :{airline.role_facilities_name}</p>
                              <hr width={"50%"} className={"mx-auto my-2"} />
                            </>
                          );
                        })}
                      </p>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* ======================== */}
              <tr
                className={`table-${
                  user.email === auth.aemail && user.is_active === 1
                    ? "success"
                    : user.role_person_id === 1 && user.is_active === 1
                    ? "light"
                    : user.role_person_id === 2 && user.is_active === 1
                    ? "primary"
                    : user.role_person_id === 3 && user.is_active === 1
                    ? "info"
                    : "danger"
                }  text-center`}
              >
                <th scope="row">{user.id}</th>
                <td>
                  <div className="img-model">
                    <img
                      src={baseURl + user.img}
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target={`#userImag-${user.id}`}
                      alt={"..."}
                    />
                  </div>
                </td>
                <td>{user.name}</td>
                <td>{user.role_peson_name}</td>
                <td>{user.email}</td>
                <td>{user.level}</td>
                <td>{user.phone}</td>
                <td>
                  {user.have_facilities === 1 ? "Yes" : "No"}{" "}
                  <button
                    type="button"
                    class="btn btn-secondary btn-sm "
                    data-bs-toggle="modal"
                    data-bs-target={`#alluser-${user.id}`}
                    disabled={user.have_facilities === 0 ? true : false}
                  >
                    Show
                  </button>
                </td>
                <td>{user.time}</td>
                <td>{user.is_verifaied === 1 ? "Yes" : "No"} </td>
                <td>{user.is_registered === 1 ? "Yes" : "No"} </td>
                <td>{user.is_active === 1 ? "No" : "Yes"} </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-success btn-sm"
                    onClick={() => {
                      handlepromotion(user.id);
                    }}
                    disabled={
                      auth.arole <= user.role_person_id ||
                      user.role_person_id === 2
                        ? true
                        : false
                    }
                  >
                    Promotion
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    onClick={() => {
                      handledeomotion(user.id);
                    }}
                    disabled={
                      auth.arole <= user.role_person_id ||
                      user.role_person_id === 1
                        ? true
                        : false
                    }
                  >
                    Demotion
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-warning btn-sm"
                    onClick={() => {
                      handlebanned(user.id);
                    }}
                    disabled={
                      auth.arole <= user.role_person_id ||
                      user.is_active === 0 ||
                      auth.id === user.id
                        ? true
                        : false
                    }
                  >
                    Block
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-dark btn-sm"
                    onClick={() => {
                      handleunbanned(user.id);
                    }}
                    disabled={
                      auth.arole <= user.role_person_id ||
                      user.is_active === 1 ||
                      auth.id === user.id
                        ? true
                        : false
                    }
                  >
                    UnBlock
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger btn-sm"
                    onClick={() => {
                      handeledelete(user.id);
                    }}
                    disabled={
                      auth.arole <= user.role_person_id ||
                      user.role_person_id === 3
                        ? true
                        : false
                    }
                  >
                    remove
                  </button>
                </td>
              </tr>
            </>
          );
        })
      ) : (
        <></>
      )}
    </>
  );
};
let NewUsers = ({ AllNewUsers, flag, setflag }) => {
  const { auth, setAuth } = useContext(AuthContext);
  const [isloading, setIsLooading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handlepromotion = async (id) => {
    const formData = new FormData();
    formData.append("user_id", id);
    setIsLooading(true);
    try {
      const response = await axios.post(
        "/api/user/PromotionToAdmin",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.atoken}`,
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      setIsLooading(false);
      setflag(!flag);
    } catch (err) {
      setIsLooading(false);
      if (err?.message) {
        setErrMsg(err.response.data.message);
        console.log(err.response);
      }
    }
  };

  const handledeomotion = async (id) => {
    const formData = new FormData();
    formData.append("user_id", id);
    setIsLooading(true);
    try {
      const response = await axios.post("/api/user/DemotionToUser", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.atoken}`,
        },
        withCredentials: true,
      });
      console.log(response.data);
      setIsLooading(false);
      setflag(!flag);
    } catch (err) {
      setIsLooading(false);
      if (err?.message) {
        setErrMsg(err.response.data.message);
        console.log(err.response);
      }
    }
  };
  const handlebanned = async (id) => {
    const formData = new FormData();
    formData.append("user_id", id);
    setIsLooading(true);
    try {
      const response = await axios.post("/api/user/Block", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.atoken}`,
        },
        withCredentials: true,
      });
      console.log(response.data);
      setIsLooading(false);
      setflag(!flag);
    } catch (err) {
      setIsLooading(false);
      if (err?.message) {
        setErrMsg(err.response.data.message);
        console.log(err.response);
      }
    }
  };
  const handleunbanned = async (id) => {
    const formData = new FormData();
    formData.append("user_id", id);
    setIsLooading(true);
    try {
      const response = await axios.post("/api/user/unBlock", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.atoken}`,
        },
        withCredentials: true,
      });
      console.log(response.data);
      setIsLooading(false);
      setflag(!flag);
    } catch (err) {
      setIsLooading(false);
      if (err?.message) {
        setErrMsg(err.response.data.message);
        console.log(err.response);
      }
    }
  };
  const handeledelete = async (id) => {
    const formData = new FormData();
    formData.append("user_id", id);
    setIsLooading(true);
    try {
      const response = await axios.post("/api/user/Delete", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.atoken}`,
        },
        withCredentials: true,
      });
      console.log(response.data);
      setIsLooading(false);
      setflag(!flag);
    } catch (err) {
      setIsLooading(false);
      if (err?.message) {
        setErrMsg(err.response.data.message);
        console.log(err.response);
      }
    }
  };
  return (
    <>
      {AllNewUsers ? (
        AllNewUsers.map((user) => {
          return (
            <>
              <div
                class="modal fade "
                id={`userImag-${user.id}`}
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-lg">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        User Image
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body userimageinsidemodel">
                      <img
                        className={""}
                        src={baseURl + user.img}
                        alt={"..."}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* facitiles Modal */}
              <div
                class="modal fade"
                id={`newuser-${user.id}`}
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-scrollable">
                  <div class="modal-content">
                    <div class="modal-header text-center">
                      <h1 class="modal-title" id="exampleModalLabel">
                        Facilities
                      </h1>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <h3>Resturants :</h3>
                      <p>
                        {user.restaurant_role.map((resturant) => {
                          return (
                            <>
                              <p>Returant Id :{resturant.restaurant_id}</p>
                              <p>Returant Name :{resturant.restaurant_name}</p>
                              <p>User Role :{resturant.role_facilities_name}</p>
                              <hr width={"50%"} className={"mx-auto my-2"} />
                            </>
                          );
                        })}
                      </p>
                      <hr />
                      <h3>Hotels :</h3>
                      <p>
                        {user.hotel_role.map((hotel) => {
                          return (
                            <>
                              <p>Hotel Id :{hotel.hotel_id}</p>
                              <p>User Role {hotel.role_facilities_id}</p>
                              <p>User Role {hotel.role_facilities_name}</p>
                              <hr width={"50%"} className={"mx-auto my-2"} />
                            </>
                          );
                        })}
                      </p>
                      <hr />
                      <h3>AirLines :</h3>
                      <p>
                        {user.airplane_role.map((airline) => {
                          return (
                            <>
                              <p>Returant Id :{airline.airplane_id}</p>
                              <p>User Role :{airline.role_facilities_id}</p>
                              <p>User Role :{airline.role_facilities_name}</p>
                              <hr width={"50%"} className={"mx-auto my-2"} />
                            </>
                          );
                        })}
                      </p>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* ======================== */}
              <tr className="table-warning  text-center">
                <th scope="row">{user.id}</th>
                <td>
                  <div className="img-model">
                    <img
                      src={baseURl + user.img}
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target={`#userImag-${user.id}`}
                      alt={"..."}
                    />
                  </div>
                </td>
                <td>{user.name}</td>
                <td>{user.role_peson_name}</td>
                <td>{user.email}</td>
                <td>{user.level}</td>
                <td>{user.phone}</td>
                <td>
                  {user.have_facilities === 1 ? "Yes" : "No"}{" "}
                  <button
                    type="button"
                    class="btn btn-secondary btn-sm "
                    data-bs-toggle="modal"
                    data-bs-target={`#newuser-${user.id}`}
                    disabled={user.have_facilities === 0 ? true : false}
                  >
                    Show
                  </button>
                </td>
                <td>{user.time}</td>
                <td>{user.is_verifaied === 1 ? "Yes" : "No"} </td>
                <td>{user.is_registered === 1 ? "Yes" : "No"} </td>
                <td>{user.is_active === 1 ? "No" : "Yes"} </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-success btn-sm"
                    onClick={() => {
                      handlepromotion(user.id);
                    }}
                    disabled={
                      auth.arole <= user.role_person_id ||
                      user.role_person_id === 2
                        ? true
                        : false
                    }
                  >
                    Promotion
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    onClick={() => {
                      handledeomotion(user.id);
                    }}
                    disabled={
                      auth.arole <= user.role_person_id ||
                      user.role_person_id === 1
                        ? true
                        : false
                    }
                  >
                    Demotion
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-warning btn-sm"
                    onClick={() => {
                      handlebanned(user.id);
                    }}
                    disabled={
                      auth.arole <= user.role_person_id ||
                      user.is_active === 0 ||
                      auth.id === user.id
                        ? true
                        : false
                    }
                  >
                    Block
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-dark btn-sm"
                    onClick={() => {
                      handleunbanned(user.id);
                    }}
                    disabled={
                      auth.arole <= user.role_person_id ||
                      user.is_active === 1 ||
                      auth.id === user.id
                        ? true
                        : false
                    }
                  >
                    UnBlock
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger btn-sm"
                    onClick={() => {
                      handeledelete(user.id);
                    }}
                    disabled={
                      auth.arole <= user.role_person_id ||
                      user.role_person_id === 3
                        ? true
                        : false
                    }
                  >
                    remove
                  </button>
                </td>
              </tr>
            </>
          );
        })
      ) : (
        <></>
      )}
    </>
  );
};
let Owners = ({ AllOwners, flag, setflag }) => {
  const { auth, setAuth } = useContext(AuthContext);
  const [isloading, setIsLooading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  return (
    <>
      {AllOwners ? (
        AllOwners.map((user) => {
          return (
            <>
              <div
                class="modal fade "
                id={`userImag-${user.id}`}
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-lg">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        User Image
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body userimageinsidemodel">
                      <img
                        className={""}
                        src={baseURl + user.img}
                        alt={"..."}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* facitiles Modal */}
              <div
                class="modal fade"
                id={`owner-${user.id}`}
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-scrollable">
                  <div class="modal-content">
                    <div class="modal-header text-center">
                      <h1 class="modal-title" id="exampleModalLabel">
                        Facilities
                      </h1>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <h3>Resturants :</h3>
                      <p>
                        {user.restaurant_role.map((resturant) => {
                          return (
                            <>
                              <p>Returant Id :{resturant.restaurant_id}</p>
                              <p>Returant Name :{resturant.restaurant_name}</p>
                              <p>User Role :{resturant.role_facilities_name}</p>
                              <hr width={"50%"} className={"mx-auto my-2"} />
                            </>
                          );
                        })}
                      </p>
                      <hr />
                      <h3>Hotels :</h3>
                      <p>
                        {user.hotel_role.map((hotel) => {
                          return (
                            <>
                              <p>Hotel Id :{hotel.hotel_id}</p>
                              <p>User Role {hotel.role_facilities_id}</p>
                              <p>User Role {hotel.role_facilities_name}</p>
                              <hr width={"50%"} className={"mx-auto my-2"} />
                            </>
                          );
                        })}
                      </p>
                      <hr />
                      <h3>AirLines :</h3>
                      <p>
                        {user.airplane_role.map((airline) => {
                          return (
                            <>
                              <p>Returant Id :{airline.airplane_id}</p>
                              <p>User Role :{airline.role_facilities_id}</p>
                              <p>User Role :{airline.role_facilities_name}</p>
                              <hr width={"50%"} className={"mx-auto my-2"} />
                            </>
                          );
                        })}
                      </p>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* ======================== */}
              <tr className="table-info  text-center">
                <th scope="row">{user.id}</th>
                <td>
                  <div className="img-model">
                    <img
                      src={baseURl + user.img}
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target={`#userImag-${user.id}`}
                      alt={"..."}
                    />
                  </div>
                </td>
                <td>{user.name}</td>
                <td>{user.role_peson_name}</td>
                <td>{user.email}</td>
                <td>{user.level}</td>
                <td>{user.phone}</td>
                <td>
                  {user.have_facilities === 1 ? "Yes" : "No"}
                  <button
                    type="button"
                    class="btn btn-secondary btn-sm "
                    data-bs-toggle="modal"
                    data-bs-target={`#owner-${user.id}`}
                    disabled={user.have_facilities === 0 ? true : false}
                  >
                    Show
                  </button>
                </td>
                <td>
                  <p>{user.time}</p>
                </td>
                <td>{user.is_verifaied === 1 ? "Yes" : "No"} </td>
                <td>{user.is_registered === 1 ? "Yes" : "No"} </td>
                <td>{user.is_active === 1 ? "No" : "Yes"} </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-success btn-sm"
                    // onClick={() => {
                    //   handlepromotion(user.id);
                    // }}
                    disabled={
                      auth.arole <= user.role_person_id ||
                      user.role_person_id === 2
                        ? true
                        : false
                    }
                  >
                    Promotion
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    // onClick={() => {
                    //   handledeomotion(user.id);
                    // }}
                    disabled={
                      auth.arole <= user.role_person_id ||
                      user.role_person_id === 1
                        ? true
                        : false
                    }
                  >
                    Demotion
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-warning btn-sm"
                    // onClick={() => {
                    //   handlebanned(user.id);
                    // }}
                    disabled={
                      auth.arole <= user.role_person_id ||
                      user.is_active === 0 ||
                      auth.id === user.id
                        ? true
                        : false
                    }
                  >
                    Block
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-dark btn-sm"
                    // onClick={() => {
                    //   handleunbanned(user.id);
                    // }}
                    disabled={
                      auth.arole <= user.role_person_id ||
                      user.is_active === 1 ||
                      auth.id === user.id
                        ? true
                        : false
                    }
                  >
                    UnBlock
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger btn-sm"
                    // onClick={() => {
                    //   handeledelete(user.id);
                    // }}
                    disabled={
                      auth.arole <= user.role_person_id ||
                      user.role_person_id === 3
                        ? true
                        : false
                    }
                  >
                    remove
                  </button>
                </td>
              </tr>
            </>
          );
        })
      ) : (
        <></>
      )}
    </>
  );
};
let Admins = ({ AllAdmins, flag, setflag }) => {
  const { auth, setAuth } = useContext(AuthContext);
  const [isloading, setIsLooading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handlepromotion = async (id) => {
    const formData = new FormData();
    formData.append("user_id", id);
    setIsLooading(true);
    try {
      const response = await axios.post(
        "/api/user/PromotionToAdmin",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.atoken}`,
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      setIsLooading(false);
      setflag(!flag);
    } catch (err) {
      setIsLooading(false);
      if (err?.message) {
        setErrMsg(err.response.data.message);
        console.log(err.response);
      }
    }
  };

  const handledeomotion = async (id) => {
    const formData = new FormData();
    formData.append("user_id", id);
    setIsLooading(true);
    try {
      const response = await axios.post("/api/user/DemotionToUser", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.atoken}`,
        },
        withCredentials: true,
      });
      console.log(response.data);
      setIsLooading(false);
      setflag(!flag);
    } catch (err) {
      setIsLooading(false);
      if (err?.message) {
        setErrMsg(err.response.data.message);
        console.log(err.response);
      }
    }
  };
  const handlebanned = async (id) => {
    const formData = new FormData();
    formData.append("user_id", id);
    setIsLooading(true);
    try {
      const response = await axios.post("/api/user/Block", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.atoken}`,
        },
        withCredentials: true,
      });
      console.log(response.data);
      setIsLooading(false);
      setflag(!flag);
    } catch (err) {
      setIsLooading(false);
      if (err?.message) {
        setErrMsg(err.response.data.message);
        console.log(err.response);
      }
    }
  };
  const handleunbanned = async (id) => {
    const formData = new FormData();
    formData.append("user_id", id);
    setIsLooading(true);
    try {
      const response = await axios.post("/api/user/unBlock", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.atoken}`,
        },
        withCredentials: true,
      });
      console.log(response.data);
      setIsLooading(false);
      setflag(!flag);
    } catch (err) {
      setIsLooading(false);
      if (err?.message) {
        setErrMsg(err.response.data.message);
        console.log(err.response);
      }
    }
  };
  const handeledelete = async (id) => {
    const formData = new FormData();
    formData.append("user_id", id);
    setIsLooading(true);
    try {
      const response = await axios.post("/api/user/Delete", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.atoken}`,
        },
        withCredentials: true,
      });
      console.log(response.data);
      setIsLooading(false);
      setflag(!flag);
    } catch (err) {
      setIsLooading(false);
      if (err?.message) {
        setErrMsg(err.response.data.message);
        console.log(err.response);
      }
    }
  };
  return (
    <>
      {AllAdmins ? (
        AllAdmins.map((user) => {
          return (
            <>
              <div
                class="modal fade "
                id={`userImag-${user.id}`}
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-lg">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        User Image
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body userimageinsidemodel">
                      <img
                        className={""}
                        src={baseURl + user.img}
                        alt={"..."}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* facitiles Modal */}
              <div
                class="modal fade"
                id={`admins-${user.id}`}
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-scrollable">
                  <div class="modal-content">
                    <div class="modal-header text-center">
                      <h1 class="modal-title" id="exampleModalLabel">
                        Facilities
                      </h1>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <h3>Resturants :</h3>
                      <p>
                        {user.restaurant_role.map((resturant) => {
                          return (
                            <>
                              <p>Returant Id :{resturant.restaurant_id}</p>
                              <p>Returant Name :{resturant.restaurant_name}</p>
                              <p>User Role :{resturant.role_facilities_name}</p>
                              <hr width={"50%"} className={"mx-auto my-2"} />
                            </>
                          );
                        })}
                      </p>
                      <hr />
                      <h3>Hotels :</h3>
                      <p>
                        {user.hotel_role.map((hotel) => {
                          return (
                            <>
                              <p>Hotel Id :{hotel.hotel_id}</p>
                              <p>User Role {hotel.role_facilities_id}</p>
                              <p>User Role {hotel.role_facilities_name}</p>
                              <hr width={"50%"} className={"mx-auto my-2"} />
                            </>
                          );
                        })}
                      </p>
                      <hr />
                      <h3>AirLines :</h3>
                      <p>
                        {user.airplane_role.map((airline) => {
                          return (
                            <>
                              <p>Returant Id :{airline.airplane_id}</p>
                              <p>User Role :{airline.role_facilities_id}</p>
                              <p>User Role :{airline.role_facilities_name}</p>
                              <hr width={"50%"} className={"mx-auto my-2"} />
                            </>
                          );
                        })}
                      </p>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* ======================== */}
              <tr className="table-primary  text-center">
                <th scope="row">{user.id}</th>
                <td>
                  <div className="img-model">
                    <img
                      src={baseURl + user.img}
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target={`#userImag-${user.id}`}
                      alt={"..."}
                    />
                  </div>
                </td>
                <td>{user.name}</td>
                <td>{user.role_peson_name}</td>
                <td>{user.email}</td>
                <td>{user.level}</td>
                <td>{user.phone}</td>
                <td>
                  {user.have_facilities === 1 ? "Yes" : "No"}{" "}
                  <button
                    type="button"
                    class="btn btn-secondary btn-sm "
                    data-bs-toggle="modal"
                    data-bs-target={`#admins-${user.id}`}
                    disabled={user.have_facilities === 0 ? true : false}
                  >
                    Show
                  </button>
                </td>
                <td>{user.time}</td>
                <td>{user.is_verifaied === 1 ? "Yes" : "No"} </td>
                <td>{user.is_registered === 1 ? "Yes" : "No"} </td>
                <td>{user.is_active === 1 ? "No" : "Yes"} </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-success btn-sm"
                    onClick={() => {
                      handlepromotion(user.id);
                    }}
                    disabled={
                      auth.arole <= user.role_person_id ||
                      user.role_person_id === 2
                        ? true
                        : false
                    }
                  >
                    Promotion
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    onClick={() => {
                      handledeomotion(user.id);
                    }}
                    disabled={
                      auth.arole <= user.role_person_id ||
                      user.role_person_id === 1
                        ? true
                        : false
                    }
                  >
                    Demotion
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-warning btn-sm"
                    onClick={() => {
                      handlebanned(user.id);
                    }}
                    disabled={
                      auth.arole <= user.role_person_id ||
                      user.is_active === 0 ||
                      auth.id === user.id
                        ? true
                        : false
                    }
                  >
                    Block
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-dark btn-sm"
                    onClick={() => {
                      handleunbanned(user.id);
                    }}
                    disabled={
                      auth.arole <= user.role_person_id ||
                      user.is_active === 1 ||
                      auth.id === user.id
                        ? true
                        : false
                    }
                  >
                    UnBlock
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger btn-sm"
                    onClick={() => {
                      handeledelete(user.id);
                    }}
                    disabled={
                      auth.arole <= user.role_person_id ||
                      user.role_person_id === 3
                        ? true
                        : false
                    }
                  >
                    remove
                  </button>
                </td>
              </tr>
            </>
          );
        })
      ) : (
        <></>
      )}
    </>
  );
};
let Banned = ({ AllBanned, flag, setflag }) => {
  const { auth, setAuth } = useContext(AuthContext);
  const [isloading, setIsLooading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handlepromotion = async (id) => {
    const formData = new FormData();
    formData.append("user_id", id);
    setIsLooading(true);
    try {
      const response = await axios.post(
        "/api/user/PromotionToAdmin",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.atoken}`,
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      setIsLooading(false);
      setflag(!flag);
    } catch (err) {
      setIsLooading(false);
      if (err?.message) {
        setErrMsg(err.response.data.message);
        console.log(err.response);
      }
    }
  };
  const handledeomotion = async (id) => {
    const formData = new FormData();
    formData.append("user_id", id);
    setIsLooading(true);
    try {
      const response = await axios.post("/api/user/DemotionToUser", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.atoken}`,
        },
        withCredentials: true,
      });
      console.log(response.data);
      setIsLooading(false);
      setflag(!flag);
    } catch (err) {
      setIsLooading(false);
      if (err?.message) {
        setErrMsg(err.response.data.message);
        console.log(err.response);
      }
    }
  };
  const handleunbanned = async (id) => {
    const formData = new FormData();
    formData.append("user_id", id);
    setIsLooading(true);
    try {
      const response = await axios.post("/api/user/unBlock", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.atoken}`,
        },
        withCredentials: true,
      });
      console.log(response.data);
      setIsLooading(false);
      setflag(!flag);
    } catch (err) {
      setIsLooading(false);
      if (err?.message) {
        setErrMsg(err.response.data.message);
        console.log(err.response);
      }
    }
  };
  const handeledelete = async (id) => {
    const formData = new FormData();
    formData.append("user_id", id);
    setIsLooading(true);
    try {
      const response = await axios.post("/api/user/Delete", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.atoken}`,
        },
        withCredentials: true,
      });
      console.log(response.data);
      setIsLooading(false);
      setflag(!flag);
    } catch (err) {
      setIsLooading(false);
      if (err?.message) {
        setErrMsg(err.response.data.message);
        console.log(err.response);
      }
    }
  };
  return (
    <>
      {AllBanned ? (
        AllBanned.map((user) => {
          return (
            <>
              <div
                class="modal fade "
                id={`userImag-${user.id}`}
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-lg">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        User Image
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body userimageinsidemodel">
                      <img
                        className={""}
                        src={baseURl + user.img}
                        alt={"..."}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* facitiles Modal */}
              <div
                class="modal fade"
                id={`blocked-${user.id}`}
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-scrollable">
                  <div class="modal-content">
                    <div class="modal-header text-center">
                      <h1 class="modal-title" id="exampleModalLabel">
                        Facilities
                      </h1>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <h3>Resturants :</h3>
                      <p>
                        {user.restaurant_role.map((resturant) => {
                          return (
                            <>
                              <p>Returant Id :{resturant.restaurant_id}</p>
                              <p>Returant Name :{resturant.restaurant_name}</p>
                              <p>User Role :{resturant.role_facilities_name}</p>
                              <hr width={"50%"} className={"mx-auto my-2"} />
                            </>
                          );
                        })}
                      </p>
                      <hr />
                      <h3>Hotels :</h3>
                      <p>
                        {user.hotel_role.map((hotel) => {
                          return (
                            <>
                              <p>Hotel Id :{hotel.hotel_id}</p>
                              <p>User Role {hotel.role_facilities_id}</p>
                              <p>User Role {hotel.role_facilities_name}</p>
                              <hr width={"50%"} className={"mx-auto my-2"} />
                            </>
                          );
                        })}
                      </p>
                      <hr />
                      <h3>AirLines :</h3>
                      <p>
                        {user.airplane_role.map((airline) => {
                          return (
                            <>
                              <p>Returant Id :{airline.airplane_id}</p>
                              <p>User Role :{airline.role_facilities_id}</p>
                              <p>User Role :{airline.role_facilities_name}</p>
                              <hr width={"50%"} className={"mx-auto my-2"} />
                            </>
                          );
                        })}
                      </p>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* ======================== */}
              <tr className="table-danger  text-center">
                <th scope="row">{user.id}</th>
                <td>
                  <div className="img-model">
                    <img
                      src={baseURl + user.img}
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target={`#userImag-${user.id}`}
                      alt={"..."}
                    />
                  </div>
                </td>
                <td>{user.name}</td>
                <td>{user.role_peson_name}</td>
                <td>{user.email}</td>
                <td>{user.level}</td>
                <td>{user.phone}</td>
                <td>
                  {user.have_facilities === 1 ? "Yes" : "No"}{" "}
                  <button
                    type="button"
                    class="btn btn-secondary btn-sm "
                    data-bs-toggle="modal"
                    data-bs-target={`#blocked-${user.id}`}
                    disabled={user.have_facilities === 0 ? true : false}
                  >
                    Show
                  </button>
                </td>
                <td>{user.time}</td>
                <td>{user.is_verifaied === 1 ? "Yes" : "No"} </td>
                <td>{user.is_registered === 1 ? "Yes" : "No"} </td>
                <td>{user.is_active === 1 ? "No" : "Yes"} </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-success btn-sm"
                    onClick={() => {
                      handlepromotion(user.id);
                    }}
                    disabled={
                      auth.arole <= user.role_person_id ||
                      user.role_person_id === 2
                        ? true
                        : false
                    }
                  >
                    Promotion
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    onClick={() => {
                      handledeomotion(user.id);
                    }}
                    disabled={
                      auth.arole <= user.role_person_id ||
                      user.role_person_id === 1
                        ? true
                        : false
                    }
                  >
                    Demotion
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-warning btn-sm"
                    disabled={
                      auth.arole <= user.role_person_id ||
                      user.is_active === 0 ||
                      auth.id === user.id
                        ? true
                        : false
                    }
                  >
                    Block
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-dark btn-sm"
                    onClick={() => {
                      handleunbanned(user.id);
                    }}
                    disabled={
                      auth.arole <= user.role_person_id ||
                      user.is_active === 1 ||
                      auth.id === user.id
                        ? true
                        : false
                    }
                  >
                    UnBlock
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger btn-sm"
                    onClick={() => {
                      handeledelete(user.id);
                    }}
                    disabled={
                      auth.arole <= user.role_person_id ||
                      user.role_person_id === 3
                        ? true
                        : false
                    }
                  >
                    remove
                  </button>
                </td>
              </tr>
            </>
          );
        })
      ) : (
        <></>
      )}
    </>
  );
};
let NormalUsers = ({ AllNormalUsers, flag, setflag }) => {
  const { auth, setAuth } = useContext(AuthContext);
  const [isloading, setIsLooading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handlepromotion = async (id) => {
    const formData = new FormData();
    formData.append("user_id", id);
    setIsLooading(true);
    try {
      const response = await axios.post(
        "/api/user/PromotionToAdmin",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.atoken}`,
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      setIsLooading(false);
      setflag(!flag);
    } catch (err) {
      setIsLooading(false);
      if (err?.message) {
        setErrMsg(err.response.data.message);
        console.log(err.response);
      }
    }
  };
  const handledeomotion = async (id) => {
    const formData = new FormData();
    formData.append("user_id", id);
    setIsLooading(true);
    try {
      const response = await axios.post("/api/user/DemotionToUser", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.atoken}`,
        },
        withCredentials: true,
      });
      console.log(response.data);
      setIsLooading(false);
      setflag(!flag);
    } catch (err) {
      setIsLooading(false);
      if (err?.message) {
        setErrMsg(err.response.data.message);
        console.log(err.response);
      }
    }
  };
  const handlebanned = async (id) => {
    const formData = new FormData();
    formData.append("user_id", id);
    setIsLooading(true);
    try {
      const response = await axios.post("/api/user/Block", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.atoken}`,
        },
        withCredentials: true,
      });
      console.log(response.data);
      setIsLooading(false);
      setflag(!flag);
    } catch (err) {
      setIsLooading(false);
      if (err?.message) {
        setErrMsg(err.response.data.message);
        console.log(err.response);
      }
    }
  };
  const handleunbanned = async (id) => {
    const formData = new FormData();
    formData.append("user_id", id);
    setIsLooading(true);
    try {
      const response = await axios.post("/api/user/unBlock", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.atoken}`,
        },
        withCredentials: true,
      });
      console.log(response.data);
      setIsLooading(false);
      setflag(!flag);
    } catch (err) {
      setIsLooading(false);
      if (err?.message) {
        setErrMsg(err.response.data.message);
        console.log(err.response);
      }
    }
  };
  const handeledelete = async (id) => {
    const formData = new FormData();
    formData.append("user_id", id);
    setIsLooading(true);
    try {
      const response = await axios.post("/api/user/Delete", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.atoken}`,
        },
        withCredentials: true,
      });
      console.log(response.data);
      setIsLooading(false);
      setflag(!flag);
    } catch (err) {
      setIsLooading(false);
      if (err?.message) {
        setErrMsg(err.response.data.message);
        console.log(err.response);
      }
    }
  };
  return (
    <>
      {AllNormalUsers ? (
        AllNormalUsers.map((user) => {
          return (
            <>
              <div
                class="modal fade "
                id={`userImag-${user.id}`}
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-lg">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        User Image
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body userimageinsidemodel">
                      <img
                        className={""}
                        src={baseURl + user.img}
                        alt={"..."}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* facitiles Modal */}
              <div
                class="modal fade"
                id={`normal-${user.id}`}
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-scrollable">
                  <div class="modal-content">
                    <div class="modal-header text-center">
                      <h1 class="modal-title" id="exampleModalLabel">
                        Facilities
                      </h1>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <h3>Resturants :</h3>
                      <p>
                        {user.restaurant_role.map((resturant) => {
                          return (
                            <>
                              <p>Returant Id :{resturant.restaurant_id}</p>
                              <p>Returant Name :{resturant.restaurant_name}</p>
                              <p>User Role :{resturant.role_facilities_name}</p>
                              <hr width={"50%"} className={"mx-auto my-2"} />
                            </>
                          );
                        })}
                      </p>
                      <hr />
                      <h3>Hotels :</h3>
                      <p>
                        {user.hotel_role.map((hotel) => {
                          return (
                            <>
                              <p>Hotel Id :{hotel.hotel_id}</p>
                              <p>User Role {hotel.role_facilities_id}</p>
                              <p>User Role {hotel.role_facilities_name}</p>
                              <hr width={"50%"} className={"mx-auto my-2"} />
                            </>
                          );
                        })}
                      </p>
                      <hr />
                      <h3>AirLines :</h3>
                      <p>
                        {user.airplane_role.map((airline) => {
                          return (
                            <>
                              <p>Returant Id :{airline.airplane_id}</p>
                              <p>User Role :{airline.role_facilities_id}</p>
                              <p>User Role :{airline.role_facilities_name}</p>
                              <hr width={"50%"} className={"mx-auto my-2"} />
                            </>
                          );
                        })}
                      </p>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* ======================== */}
              <tr className="table-light  text-center">
                <th scope="row">{user.id}</th>
                <td>
                  <div className="img-model">
                    <img
                      src={baseURl + user.img}
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target={`#userImag-${user.id}`}
                      alt={"..."}
                    />
                  </div>
                </td>
                <td>{user.name}</td>
                <td>{user.role_peson_name}</td>
                <td>{user.email}</td>
                <td>{user.level}</td>
                <td>{user.phone}</td>
                <td>
                  {user.have_facilities === 1 ? "Yes" : "No"}{" "}
                  <button
                    type="button"
                    class="btn btn-secondary btn-sm "
                    data-bs-toggle="modal"
                    data-bs-target={`#normal-${user.id}`}
                    disabled={user.have_facilities === 0 ? true : false}
                  >
                    Show
                  </button>
                </td>
                <td>{user.time}</td>
                <td>{user.is_verifaied === 1 ? "Yes" : "No"} </td>
                <td>{user.is_registered === 1 ? "Yes" : "No"} </td>
                <td>{user.is_active === 1 ? "No" : "Yes"} </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-success btn-sm"
                    onClick={() => {
                      handlepromotion(user.id);
                    }}
                    disabled={
                      auth.arole <= user.role_person_id ||
                      user.role_person_id === 2
                        ? true
                        : false
                    }
                  >
                    Promotion
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    onClick={() => {
                      handledeomotion(user.id);
                    }}
                    disabled={
                      auth.arole <= user.role_person_id ||
                      user.role_person_id === 1
                        ? true
                        : false
                    }
                  >
                    Demotion
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-warning btn-sm"
                    onClick={() => {
                      handlebanned(user.id);
                    }}
                    disabled={
                      auth.arole <= user.role_person_id ||
                      user.is_active === 0 ||
                      auth.id === user.id
                        ? true
                        : false
                    }
                  >
                    Block
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-dark btn-sm"
                    onClick={() => {
                      handleunbanned(user.id);
                    }}
                    disabled={
                      auth.arole <= user.role_person_id ||
                      user.is_active === 1 ||
                      auth.id === user.id
                        ? true
                        : false
                    }
                  >
                    UnBlock
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger btn-sm"
                    onClick={() => {
                      handeledelete(user.id);
                    }}
                    disabled={
                      auth.arole <= user.role_person_id ||
                      user.role_person_id === 3
                        ? true
                        : false
                    }
                  >
                    remove
                  </button>
                </td>
              </tr>
            </>
          );
        })
      ) : (
        <></>
      )}
    </>
  );
};
let MainUser = () => {
  const [userState, setUserState] = useState(1);
  const [newusers, setnewusers] = useState([]);
  const [owners, setowners] = useState([]);
  const [admins, setadmins] = useState();
  const [users, setusers] = useState();
  const [banned, setbanned] = useState();
  const [allusers, setallusers] = useState();
  const [flag, setflag] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const { auth, setAuth } = useContext(AuthContext);
  // const [newusersflag, setnewusersflag] = useState(false);
  // const [ownersflag, setownerflag] = useState(false);
  // const [adminsflag, setadminsflag] = useState(false);
  // const [usersflag, setusersflag] = useState(false);
  // const [bannedflag, setbannedflag] = useState(false);

  let activeIconToggle = (e) => {
    let nav_link = document.querySelectorAll(".nav-link");
    nav_link.forEach((element) => {
      element.classList.remove("active");
    });
    e.target.classList.add("active");
    console.log(e.target);
  };
  let {
    data: allUsers,
    fetchError: allUsersErrors,
    isLoading: allUsersIsLoading,
  } = useAxiosGet("/api/user/getAll", flag);
  let {
    data: allNewUsers,
    fetchError: allNewUsersErrors,
    isLoading: allNewUsersIsLoading,
  } = useAxiosGet("/api/user/getNew", flag);
  let {
    data: allOwners,
    fetchError: allOwnersErrors,
    isLoading: allOwnersISLoading,
  } = useAxiosGet("/api/user/getOwner", flag);
  let {
    data: allAdmins,
    fetchError: allADminsErrors,
    isLoading: allAdminsIsLoading,
  } = useAxiosGet("/api/user/getAdmins", flag);
  let {
    data: allNormalUsers,
    fetchError: allNormalUsersErrors,
    isLoading: allNormalUsersIsLoading,
  } = useAxiosGet("/api/user/getUsers", flag);
  let {
    data: allBanned,
    fetchError: allBannedErrors,
    isLoading: allBannedIsLoading,
  } = useAxiosGet("/api/user/UnActive", flag);

  useEffect(() => {
    setnewusers(allNewUsers.users);
    setowners(allOwners.users);
    setadmins(allAdmins.users);
    setusers(allNormalUsers.users);
    setbanned(allBanned.users);
    setallusers(allUsers.users);
    console.log("all", allusers);
    console.log("new", newusers);
    console.log("own", owners);
    console.log("admn", admins);
    console.log("users", users);
    console.log("ban", banned);
  }, [allNewUsers, allOwners, allAdmins, allNormalUsers, allUsers, allBanned]);

  return (
    <>
      <div className="container-fluid  col-11 dashborad-users ">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to={"/dashboard"}>DashBoard</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Users
            </li>
            <FontAwesomeIcon
              className={"btn ms-auto fs-1"}
              icon={faRefresh}
              onClick={() => {
                setflag(!flag);
              }}
            />
          </ol>
        </nav>
        <ul className="nav nav-tabs ">
          <li className="nav-item">
            <a
              className="nav-link active "
              aria-current="page"
              href="#1"
              onClick={(e) => {
                activeIconToggle(e);
                setUserState(1);
              }}
            >
              All
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link "
              aria-current="page"
              href="#2"
              onClick={(e) => {
                activeIconToggle(e);
                setUserState(2);
              }}
            >
              New
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link "
              href="#3"
              onClick={(e) => {
                activeIconToggle(e);
                setUserState(3);
              }}
            >
              Owners
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#4"
              onClick={(e) => {
                activeIconToggle(e);
                setUserState(4);
              }}
            >
              Admins
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link "
              href="#5"
              onClick={(e) => {
                activeIconToggle(e);
                setUserState(5);
              }}
            >
              Users
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link "
              href={"#22"}
              onClick={(e) => {
                activeIconToggle(e);
                setUserState(6);
              }}
            >
              Banned
            </a>
          </li>
        </ul>
        <table className="table  text-center">
          <thead>
            <tr className="table-dark">
              <th scope="col">ID</th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">App Role</th>
              <th scope="col">Email</th>
              <th scope="col">Level</th>
              <th scope="col">Numbre</th>
              <th scope="col">Have Facilities</th>
              <th scope="col">creation date</th>
              <th scope="col">Verifaied Email</th>
              <th scope="col">Full Registered Email</th>
              <th scope="col">Blocked</th>
              <th scope="col"> </th>
              <th scope="col"> </th>
              <th scope="col"> </th>
              <th scope="col"> </th>
              <th scope="col"> </th>
            </tr>
          </thead>
          <tbody>
            {userState === 1 ? (
              <>
                {allUsersIsLoading ? (
                  <h1>Loading</h1>
                ) : (
                  <AllUsers
                    AllUserss={allusers}
                    flag={flag}
                    setflag={setflag}
                  />
                )}
              </>
            ) : userState === 2 ? (
              <>
                {allNewUsersIsLoading ? (
                  <h1>Loading</h1>
                ) : (
                  <NewUsers
                    AllNewUsers={newusers}
                    flag={flag}
                    setflag={setflag}
                    // flag={newusersflag}
                    // setflag={setnewusersflag}
                  />
                )}
              </>
            ) : userState === 3 ? (
              <>
                {allOwnersISLoading ? (
                  <h1>Loading</h1>
                ) : (
                  <Owners
                    AllOwners={owners}
                    flag={flag}
                    setflag={setflag}
                    // flag={ownersflag}
                    // setflag={setownerflag}
                  />
                )}
              </>
            ) : userState === 4 ? (
              <>
                {allAdminsIsLoading ? (
                  <h1>Loading</h1>
                ) : (
                  <Admins
                    AllAdmins={admins}
                    flag={flag}
                    setflag={setflag}
                    // flag={adminsflag}
                    // setflag={setadminsflag}
                  />
                )}
              </>
            ) : userState === 5 ? (
              <>
                {allNormalUsersIsLoading ? (
                  <h1>Loading</h1>
                ) : (
                  <NormalUsers
                    AllNormalUsers={users}
                    flag={flag}
                    setflag={setflag}
                    // flag={usersflag}
                    // setflag={setusersflag}
                  />
                )}
              </>
            ) : userState === 6 ? (
              <>
                {allBannedIsLoading ? (
                  <h1>Loading</h1>
                ) : (
                  <Banned
                    AllBanned={banned}
                    flag={flag}
                    setflag={setflag}
                    // flag={bannedflag}
                    // setflag={setbannedflag}
                  />
                )}
                {/* // handeledelete={handeledelete}
                  // handledeomotion={handledeomotion}
                  // handlepromotion={handlepromotion}
                  // handleunbanned={handleunbanned} */}
              </>
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MainUser;
