import { defaults } from "chart.js";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Popover } from "bootstrap";
import { set } from "react-hook-form";
import { usePostFetch } from "../../../hooks/usefetch";
import AuthContext from "../../../context/AuthProvider";
import axios from "../../../api/axios";
import { useAxiosPost } from "../../../hooks/useAxiosFetch";
import { baseURl } from "../../../api/baseURL";
import { faMountain, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

let Resturants = ({ allresturants, flag, setflag, isinloading }) => {
  const { auth, setAuth } = useContext(AuthContext);
  const [errMsg, setErrMsg] = useState("");
  const [isloading, setIsLooading] = useState(false);

  const handleAccept = async (id) => {
    const formData = new FormData();
    formData.append("id", id);
    setIsLooading(true);
    setErrMsg("");
    try {
      const response = await axios.post("/api/AcceptResturant", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.atoken}`,
        },
        withCredentials: true,
      });
      console.log(response);
      setIsLooading(false);
      setflag(!flag);
    } catch (err) {
      setIsLooading(false);
      if (err?.message) {
        setErrMsg(err.response.data.message);
        console.log(err.response.data.message);
      }
    }
  };
  const handleReject = async (id) => {
    const formData = new FormData();
    formData.append("id", id);
    setIsLooading(true);
    setErrMsg("");
    // if(done !==0){
    try {
      const response = await axios.post("/api/RefusResturant", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.atoken}`,
        },
        withCredentials: true,
      });
      console.log(response);
      setIsLooading(false);
      setflag(!flag);
    } catch (err) {
      setIsLooading(false);
      if (err?.message) {
        setErrMsg(err.response.data.message);
        console.log(err.response.data.message);
      }
    }
  };

  let renderResturants;
  let renderOwnerShipImage;
  let renderResturantImage;
  if (allresturants) {
    renderResturants = allresturants.map((resturant) => {
      return (
        <>
          {isloading || isinloading ? (
            <h1>Loading</h1>
          ) : (
            <>
              <tr className="table-warning  ">
                <th scope="row ">{resturant.id}</th>
                <td>{resturant.name}</td>
                <td>{resturant.location}</td>
                <td>
                  <div className="img-list">
                    {resturant.images.map((img, i) => {
                      if (i >= 3) {
                        return <></>;
                      }
                      return (
                        <div className="place-img" data-bs-placement="buttom">
                          <img
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target={`#restImages-${resturant.id}`}
                            className={""}
                            src={baseURl + img.img}
                            alt={".."}
                          />
                        </div>
                      );
                    })}
                    <div
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target={`#restImages-${resturant.id}`}
                      className={`place-img other-imgs-plus ${
                        resturant.images.length - 3 <= 0 && "d-none"
                      }`}
                    >
                      +{resturant.images.length - 3}
                    </div>
                  </div>
                </td>
                <td>See Food</td>
                <td>{resturant.rate} Stars </td>
                <td>{resturant.price_booking}</td>
                <td>
                  <div className="img-model">
                    <img
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target={`#ownerCr-${resturant.id}`}
                      src={baseURl + resturant.img_title_deed}
                      alt={".."}
                    />
                  </div>
                </td>
                <td>{resturant.support_email}</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-success "
                    onClick={() => {
                      handleAccept(resturant.id);
                    }}
                  >
                    Accept
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger "
                    onClick={() => {
                      handleReject(resturant.id);
                    }}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            </>
          )}
        </>
      );
    });
    renderOwnerShipImage = allresturants.map((resturant) => {
      return (
        <div
          class="modal fade "
          id={`ownerCr-${resturant.id}`}
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  OwnerShip Certificate
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body ownerShipImageInModal">
                <img
                  className={""}
                  src={baseURl + resturant.img_title_deed}
                  alt={"..."}
                />
              </div>
            </div>
          </div>
        </div>
      );
    });
    renderResturantImage = allresturants.map((resturant) => {
      return (
        <div
          class="modal fade"
          id={`restImages-${resturant.id}`}
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Images
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div
                  id={`carouselExampleIndicators-${resturant.id}`}
                  class="carousel carousel-dark slide"
                  data-bs-ride="true"
                >
                  <div class="carousel-indicators">
                    {resturant.images.map((img, i) => {
                      return (
                        <>
                          <button
                            type="button"
                            data-bs-target={`#carouselExampleIndicators-${resturant.id}`}
                            data-bs-slide-to={i}
                            class="active"
                            aria-current="true"
                            aria-label={`Slide ${i + 1}`}
                          ></button>
                        </>
                      );
                    })}
                  </div>
                  <div class="carousel-inner ">
                    {resturant.images.map((img, i) => {
                      return (
                        <div
                          key={img.id}
                          class={`carousel-item ${i === 0 && "active"} `}
                        >
                          <img
                            src={baseURl + img.img}
                            class="d-block w-100"
                            alt="..."
                          />
                        </div>
                      );
                    })}
                  </div>
                  <button
                    class="carousel-control-prev"
                    type="button"
                    data-bs-target={`#carouselExampleIndicators-${resturant.id}`}
                    data-bs-slide="prev"
                  >
                    <span
                      class="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Previous</span>
                  </button>
                  <button
                    class="carousel-control-next"
                    type="button"
                    data-bs-target={`#carouselExampleIndicators-${resturant.id}`}
                    data-bs-slide="next"
                  >
                    <span
                      class="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }
  return (
    <>
      {renderOwnerShipImage}
      {renderResturantImage}
      {/* -========================================== */}
      <table className="table  text-center ">
        <thead>
          <tr className="table-dark ">
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Location</th>
            <th scope="col">Images</th>
            <th scope="col">Category</th>
            <th scope="col">Rate</th>
            <th scope="col">Booking Price</th>
            <th scope="col">Ownership Certificate</th>
            <th scope="col">Support Email</th>
            <th scope="col"> </th>
            <th scope="col"> </th>
          </tr>
        </thead>
        <tbody>{allresturants ? renderResturants : <p>No Requests</p>}</tbody>
      </table>
    </>
  );
};
let Hotels = ({ allhotels, flag, setflag, isinloading }) => {
  const { auth, setAuth } = useContext(AuthContext);
  const [errMsg, setErrMsg] = useState("");
  const [isloading, setIsLooading] = useState(false);

  const handleAccept = async (id) => {
    const formData = new FormData();
    formData.append("id", id);
    setIsLooading(true);
    setErrMsg("");
    // if(done !==0){
    try {
      const response = await axios.post("/api/AcceptHotel", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.atoken}`,
        },
        withCredentials: true,
      });
      console.log(response);
      setflag(!flag);
    } catch (err) {
      setIsLooading(false);
      if (err?.message) {
        setErrMsg(err.response.data.message);
        console.log(err.response.data.message);
      }
    }
  };
  const handleReject = async (id) => {
    const formData = new FormData();
    formData.append("id", id);
    setIsLooading(true);
    setErrMsg("");
    // if(done !==0){
    try {
      const response = await axios.post("/api/RefusHotel", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.atoken}`,
        },
        withCredentials: true,
      });
      console.log(response);
      setflag(!flag);
    } catch (err) {
      setIsLooading(false);
      if (err?.message) {
        setErrMsg(err.response.data.message);
        console.log(err.response.data.message);
      }
    }
  };

  let renderHotels;
  let renderOwnerShipImage;
  let renderHoteltImage;
  if (allhotels) {
    renderHotels = allhotels.map((hotel) => {
      return (
        <>
          <tr className="table-info  ">
            <th scope="row ">{hotel.id}</th>
            <td>{hotel.name}</td>
            <td>{hotel.location}</td>
            <td>
              <div className="img-list">
                {hotel.images.map((img, i) => {
                  if (i >= 3) {
                    return <></>;
                  }
                  return (
                    <div className="place-img" data-bs-placement="buttom">
                      <img
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target={`#restImages-${hotel.id}`}
                        className={""}
                        src={baseURl + img.img}
                        alt={".."}
                      />
                    </div>
                  );
                })}
                <div
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target={`#restImages-${hotel.id}`}
                  className={`place-img other-imgs-plus ${
                    hotel.images.length - 3 <= 0 && "d-none"
                  }`}
                >
                  +{hotel.images.length - 3}
                </div>
              </div>
            </td>
            <td>See Food</td>
            <td>{hotel.rate} Stars </td>
            <td>
              {hotel.classes.map((classs, i) => {
                return (
                  <>
                    <u>
                      {classs.class_name} : {classs.money} $
                    </u>{" "}
                    ({classs.number_of_people} people)
                    <br />
                  </>
                );
              })}
            </td>
            <td>
              <div className="img-model">
                <img
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target={`#ownerCr-${hotel.id}`}
                  src={baseURl + hotel.img_title_deed}
                  alt={".."}
                />
              </div>
            </td>
            <td>{hotel.support_email}</td>
            <td>
              <button
                type="button"
                class="btn btn-success "
                onClick={() => {
                  handleAccept(hotel.id);
                }}
              >
                Accept
              </button>
            </td>
            <td>
              <button
                type="button"
                class="btn btn-danger "
                onClick={() => {
                  handleReject(hotel.id);
                }}
              >
                Reject
              </button>
            </td>
          </tr>
        </>
      );
    });
    renderOwnerShipImage = allhotels.map((hotel) => {
      return (
        <div
          class="modal fade "
          id={`ownerCr-${hotel.id}`}
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  OwnerShip Certificate
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body ownerShipImageInModal">
                <img
                  className={""}
                  src={baseURl + hotel.img_title_deed}
                  alt={"..."}
                />
              </div>
            </div>
          </div>
        </div>
      );
    });
    renderHoteltImage = allhotels.map((hotel) => {
      return (
        <div
          class="modal fade"
          id={`restImages-${hotel.id}`}
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Images
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div
                  id={`carouselExampleIndicators-${hotel.id}`}
                  class="carousel carousel-dark slide"
                  data-bs-ride="true"
                >
                  <div class="carousel-indicators">
                    {hotel.images.map((img, i) => {
                      return (
                        <>
                          <button
                            type="button"
                            data-bs-target={`#carouselExampleIndicators-${hotel.id}`}
                            data-bs-slide-to={i}
                            class="active"
                            aria-current="true"
                            aria-label={`Slide ${i + 1}`}
                          ></button>
                        </>
                      );
                    })}
                  </div>
                  <div class="carousel-inner ">
                    {hotel.images.map((img, i) => {
                      return (
                        <div
                          key={img.id}
                          class={`carousel-item ${i === 0 && "active"} `}
                        >
                          <img
                            src={baseURl + img.img}
                            class="d-block w-100"
                            alt="..."
                          />
                        </div>
                      );
                    })}
                  </div>
                  <button
                    class="carousel-control-prev"
                    type="button"
                    data-bs-target={`#carouselExampleIndicators-${hotel.id}`}
                    data-bs-slide="prev"
                  >
                    <span
                      class="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Previous</span>
                  </button>
                  <button
                    class="carousel-control-next"
                    type="button"
                    data-bs-target={`#carouselExampleIndicators-${hotel.id}`}
                    data-bs-slide="next"
                  >
                    <span
                      class="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }
  return (
    <>
      {renderOwnerShipImage}
      {renderHoteltImage}
      {/* -========================================== */}
      {isloading || isinloading ? (
        <h1>Loading</h1>
      ) : (
        <table className="table  text-center ">
          <thead>
            <tr className="table-dark ">
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Location</th>
              <th scope="col">Images</th>
              <th scope="col">Category</th>
              <th scope="col">Rate</th>
              <th scope="col">Classes</th>
              <th scope="col">Ownership Certificate</th>
              <th scope="col">Support Email</th>
              <th scope="col"> </th>
              <th scope="col"> </th>
            </tr>
          </thead>
          <tbody>{allhotels ? renderHotels : <p>No Requests</p>}</tbody>
        </table>
      )}
    </>
  );
};
let AirLines = ({ allAirLines, flag, setflag, isinloading }) => {
  const { auth, setAuth } = useContext(AuthContext);
  const [errMsg, setErrMsg] = useState("");
  const [isloading, setIsLooading] = useState(false);

  const handleAccept = async (id) => {
    const formData = new FormData();
    formData.append("id", id);
    setIsLooading(true);
    setErrMsg("");
    // if(done !==0){
    try {
      const response = await axios.post("/api/AcceptAirplane", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.atoken}`,
        },
        withCredentials: true,
      });
      console.log(response);
      setflag(!flag);
    } catch (err) {
      setIsLooading(false);
      if (err?.message) {
        setErrMsg(err.response.data.message);
        console.log(err.response.data.message);
      }
    }
  };
  const handleReject = async (id) => {
    const formData = new FormData();
    formData.append("id", id);
    setIsLooading(true);
    setErrMsg("");
    // if(done !==0){
    try {
      const response = await axios.post("/api/RefusAirplane", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.atoken}`,
        },
        withCredentials: true,
      });
      console.log(response);
      setflag(!flag);
    } catch (err) {
      setIsLooading(false);
      if (err?.message) {
        setErrMsg(err.response.data.message);
        console.log(err.response.data.message);
      }
    }
  };

  let renderAirlines;
  let renderOwnerShipImage;
  if (allAirLines) {
    renderAirlines = allAirLines.map((airline) => {
      return (
        <>
          <tr className="table-primary  ">
            <th scope="row ">{airline.id}</th>
            <td>{airline.name}</td>
            <td>{airline.location}</td>
            <td>
              {airline.classes.map((classs, i) => {
                return (
                  <>
                    <u>
                      {classs.class_name} : {classs.money} $
                    </u>
                    <br />
                  </>
                );
              })}
            </td>
            <td>
              <div className="img-model">
                <img
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target={`#ownerCr-${airline.id}`}
                  src={baseURl + airline.img_title_deed}
                  alt={".."}
                />
              </div>
            </td>
            <td>{airline.support_email}</td>
            <td>
              <button
                type="button"
                class="btn btn-success "
                onClick={() => {
                  handleAccept(airline.id);
                }}
              >
                Accept
              </button>
            </td>
            <td>
              <button
                type="button"
                class="btn btn-danger "
                onClick={() => {
                  handleReject(airline.id);
                }}
              >
                Reject
              </button>
            </td>
          </tr>
        </>
      );
    });
    renderOwnerShipImage = allAirLines.map((airline) => {
      return (
        <div
          class="modal fade "
          id={`ownerCr-${airline.id}`}
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  OwnerShip Certificate
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body ownerShipImageInModal">
                <img
                  className={""}
                  src={baseURl + airline.img_title_deed}
                  alt={"..."}
                />
              </div>
            </div>
          </div>
        </div>
      );
    });
  }
  return (
    <>
      {renderOwnerShipImage}
      {/* -========================================== */}
      {isloading || isinloading ? (
        <h1>Loading</h1>
      ) : (
        <table className="table  text-center ">
          <thead>
            <tr className="table-dark ">
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Location</th>
              <th scope="col">Classes</th>
              <th scope="col">Ownership Certificate</th>
              <th scope="col">Support Email</th>
              <th scope="col"> </th>
              <th scope="col"> </th>
            </tr>
          </thead>
          <tbody>{allAirLines ? renderAirlines : <p>No Requests</p>}</tbody>
        </table>
      )}
    </>
  );
};
let NatuarlPlaces = ({ allNaturalPlaces, flag, setflag, isinloading }) => {
  const { auth, setAuth } = useContext(AuthContext);
  const [errMsg, setErrMsg] = useState("");
  const [isloading, setIsLooading] = useState(false);

  const handleAccept = async (id) => {
    const formData = new FormData();
    formData.append("id", id);
    setIsLooading(true);
    setErrMsg("");
    // if(done !==0){
    try {
      const response = await axios.post("/api/AcceptPlace", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.atoken}`,
        },
        withCredentials: true,
      });
      console.log(response);
      setIsLooading(false);
      setflag(!flag);
    } catch (err) {
      setIsLooading(false);
      if (err?.message) {
        setErrMsg(err.response.data.message);
        console.log(err.response.data.message);
      }
    }
  };
  const handleReject = async (id) => {
    const formData = new FormData();
    formData.append("id", id);
    setIsLooading(true);
    setErrMsg("");
    // if(done !==0){
    try {
      const response = await axios.post("/api/RefusPlace", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.atoken}`,
        },
        withCredentials: true,
      });
      console.log(response);
      setIsLooading(false);
      setflag(!flag);
    } catch (err) {
      setIsLooading(false);
      if (err?.message) {
        setErrMsg(err.response.data.message);
        console.log(err.response.data.message);
      }
    }
  };

  let renderNatural;
  let renderNaturalPlacetImage;
  if (allNaturalPlaces) {
    renderNatural = allNaturalPlaces.map((naturalplace) => {
      return (
        <>
          <tr className="table-info  ">
            <th scope="row ">{naturalplace.id}</th>
            <td>{naturalplace.name}</td>
            <td>{naturalplace.location}</td>
            <td>
              <div className="img-list">
                {naturalplace.image.map((img, i) => {
                  if (i >= 3) {
                    return <></>;
                  }
                  return (
                    <div className="place-img" data-bs-placement="buttom">
                      <img
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target={`#restImages-${naturalplace.id}`}
                        className={""}
                        src={baseURl+'/default_photo/place/AL40mountain/40.jpg'}
                        alt={".."}
                      />
                    </div>
                  );
                })}
                <div
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target={`#restImages-${naturalplace.id}`}
                  className={`place-img other-imgs-plus ${
                    naturalplace.image.length - 3 <= 0 && "d-none"
                  }`}
                >
                  +{naturalplace.image.length - 3}
                </div>
              </div>
            </td>
            <td>See Food</td>
            <td>{naturalplace.support_email}</td>
            <td>
              <button
                type="button"
                class="btn btn-success "
                onClick={() => {
                  handleAccept(naturalplace.id);
                }}
              >
                Accept
              </button>
            </td>
            <td>
              <button
                type="button"
                class="btn btn-danger "
                onClick={() => {
                  handleReject(naturalplace.id);
                }}
              >
                Reject
              </button>
            </td>
          </tr>
        </>
      );
    });
    renderNaturalPlacetImage = allNaturalPlaces.map((naturalplace) => {
      return (
        <div
          class="modal fade"
          id={`restImages-${naturalplace.id}`}
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Images
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div
                  id={`carouselExampleIndicators-${naturalplace.id}`}
                  class="carousel carousel-dark slide"
                  data-bs-ride="true"
                >
                  <div class="carousel-indicators">
                    {naturalplace.image.map((img, i) => {
                      return (
                        <>
                          <button
                            type="button"
                            data-bs-target={`#carouselExampleIndicators-${naturalplace.id}`}
                            data-bs-slide-to={i}
                            class="active"
                            aria-current="true"
                            aria-label={`Slide ${i + 1}`}
                          ></button>
                        </>
                      );
                    })}
                  </div>
                  <div class="carousel-inner ">
                    {naturalplace.image.map((img, i) => {
                      return (
                        <div
                          key={img.id}
                          class={`carousel-item ${i === 0 && "active"} `}
                        >
                          <img
                            src={baseURl + img.img}
                            class="d-block w-100"
                            alt="..."
                          />
                        </div>
                      );
                    })}
                  </div>
                  <button
                    class="carousel-control-prev"
                    type="button"
                    data-bs-target={`#carouselExampleIndicators-${naturalplace.id}`}
                    data-bs-slide="prev"
                  >
                    <span
                      class="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Previous</span>
                  </button>
                  <button
                    class="carousel-control-next"
                    type="button"
                    data-bs-target={`#carouselExampleIndicators-${naturalplace.id}`}
                    data-bs-slide="next"
                  >
                    <span
                      class="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }
  return (
    <>
      {renderNaturalPlacetImage}
      {/* -========================================== */}
      {isloading || isinloading ? (
        <h1>Loading</h1>
      ) : (
      <table className="table  text-center ">
        <thead>
          <tr className="table-dark ">
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Location</th>
            <th scope="col">Images</th>
            <th scope="col">Category</th>
            <th scope="col">Support Email</th>
            <th scope="col"> </th>
            <th scope="col"> </th>
          </tr>
        </thead>
        <tbody>{allNaturalPlaces ? renderNatural : <p>No Requests</p>}</tbody>
      </table>
      )}
    </>
  );
};

let Requests = () => {
  const [userState, setUserState] = useState(2);
  const [resturants, setresturants] = useState([]);
  const [hotels, sethotels] = useState([]);
  const [airlines, setairlines] = useState();
  const [naturalplaces, setnaturalplaces] = useState();
  const [restflag, setrestflag] = useState(false);
  const [hotflag, sethotflag] = useState(false);
  const [airflag, setairflag] = useState(false);
  const [placeflag, setplaceflag] = useState(false);

  let activeIconToggle = (e) => {
    let nav_link = document.querySelectorAll(".nav-link");
    nav_link.forEach((element) => {
      element.classList.remove("active");
    });
    e.target.classList.add("active");
  };
  // get all un active resturants
  let {
    data: rest,
    fetchError: resterrors,
    isLoading: restisloading,
  } = useAxiosPost("/api/Show_Not_Active_Resturants", restflag);
  // get all un active hotel
  let {
    data: hotel,
    fetchError: hotelerrors,
    isLoading: hotelisloading,
  } = useAxiosPost("/api/Show_Not_Active_Hotels", hotflag);
  // get all un active allairlline
  let {
    data: airlline,
    fetchError: airlineerrors,
    isLoading: airlineisloading,
  } = useAxiosPost("/api/Show_Not_Active_Airplanes", airflag);
  // get all un active allnaturalplaces
  let {
    data: natural,
    fetchError: naturalerrors,
    isLoading: naturalisloading,
  } = useAxiosPost("/api/Show_Not_Active_Places", placeflag);
  useEffect(() => {
    setresturants(rest.restaurants);
    sethotels(hotel.hotels);
    setairlines(airlline.airplane);
    setnaturalplaces(natural.Place);
  }, [rest, hotel, airlline, natural]);
  console.log("resturants", resturants);
  console.log("hotels", hotels);
  console.log("airlines", airlines);
  console.log("naturalplaces", naturalplaces);

  return (
    <>
      <div className="container-fluid  col-11 dashborad-requests ">
        {/* <div classNameName="col-10 offset-1"> */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to={"/dashboard"}>DashBoard</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Requests
            </li>
          <FontAwesomeIcon className={'btn ms-auto fs-1'} icon={faRefresh} onClick={()=>{
            setrestflag(!restflag);
            sethotflag(!hotflag);
            setairflag(!airflag);
            setplaceflag(!placeflag);
          }}/>
          </ol>
        </nav>
        <ul className="nav nav-tabs ">
          <li className="nav-item">
            <a
              className="nav-link active"
              aria-current="page"
              href="#2"
              onClick={(e) => {
                activeIconToggle(e);
                setUserState(2);
              }}
            >
              Resturants
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
              Hotels
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
              AirLines
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
              Natural Places
            </a>
          </li>
        </ul>
        {userState === 2 ? (
          <>
            {restisloading ? (
              <h1>Loading</h1>
            ) : (
              <>
                <Resturants
                  allresturants={resturants}
                  flag={restflag}
                  setflag={setrestflag}
                  isinloading={restisloading}
                />{" "}
              </>
            )}
          </>
        ) : userState === 3 ? (
          <>
            {hotelisloading ? (
              <h1>Loading</h1>
            ) : (
              <>
                <Hotels
                  allhotels={hotels}
                  flag={hotflag}
                  setflag={sethotflag}
                  isinloading={hotelisloading}
                />
              </>
            )}
          </>
        ) : userState === 4 ? (
          <>
            {airlineisloading ? (
              <h1>Loading</h1>
            ) : (
              <AirLines
                allAirLines={airlines}
                flag={airflag}
                setflag={setairflag}
                isinloading={airlineisloading}
              />
            )}
          </>
        ) : userState === 5 ? (
          <>
            {airlineisloading ? (
              <h1>Loading</h1>
            ) : (
              <NatuarlPlaces
                allNaturalPlaces={naturalplaces}
                flag={placeflag}
                setflag={setplaceflag}
                isinloading={naturalisloading}
              />
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Requests;
