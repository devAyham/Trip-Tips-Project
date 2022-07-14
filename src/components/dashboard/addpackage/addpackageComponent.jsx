import {
  faCalendarCheck,
  faCalendarDay,
  faCalendarDays,
  faCalendarXmark,
  faFont,
  faHotel,
  faImages,
  faMapLocationDot,
  faMinusCircle,
  faMoneyBill,
  faMountainSun,
  faPeopleGroup,
  faPercentage,
  faPlane,
  faPlaneArrival,
  faPlaneDeparture,
  faPlusCircle,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import axios from "../../../api/axios";
import AuthContext from "../../../context/AuthProvider";
import ReCAPTCHA from "../../reCAPTCHA/reCAPTCHAComponent";

let AddPlacesToPackage = () => {
  const [errMsg, setErrMsg] = useState("");
  const [notArobot, setnotArobot] = useState(false);
  const [naturalFiledsNumb, setnaturalFiledsNumb] = useState(0);
  const [reustrantsFiledsNumb, setreustrantsFiledsNumb] = useState(0);
  const [hotelsFiledsNumb, sethotelslFiledsNumb] = useState(0);
  const [airlinesFiledsNumb, setairlinesFiledsNumb] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
  } = useForm();
  let errorSize = Object.keys(errors).length;
  let OnSubmit = async () => {};

  let RenderNaturalPlace = () => {
    const row = [];
    for (var i = 0; i < naturalFiledsNumb; i++) {
      row.push(<AddNaturalPlace key={i} />);
    }
    return row;
  };
  let AddNaturalPlace = () => {
    return (
      <>
      <div className="row">
        <div className="col-6">
          <div className="input-group input-group-lg mb-1 ms-sm-5">
            <span
              className="input-group-text fs-3  filed-icon"
              id="basic-addon1"
            >
              <FontAwesomeIcon icon={faMountainSun} />
            </span>
            <select
              className={`form-select  filed ${errors.natural && "invalid"}`}
              {...register("natural", {
                required: "One Natural Place At least Required",
              })}
              onKeyUp={() => {
                trigger("natural");
                errorSize = Object.keys(errors).length;
              }}
              aria-label="Default select example"
            >
              <option value="">Natural Palces </option>
              <option value="+963">Ahmad </option>
              <option value="+777">Egypt </option>
              <option value="+45 ">Jordun</option>
              <option value="+343">KSA </option>
              <option value="+111">Qatar </option>
              <option value="+86 ">Turke </option>
            </select>
            {errors.natural && (
              <small className="text-danger">{errors.natural.message}</small>
            )}
          </div>
        </div>
        <div className="col-6">
          <div className="input-group input-group-lg  mb-1 ms-sm-5 ">
            <span className={`input-group-text fs-3 filed filed-icon `}>
              <FontAwesomeIcon icon={faCalendarDay} />
            </span>
            <input
              type="datetime-local"
              className={`form-control filed 
                                      ${errors.NData && "invalid"}`}
              {...register("NData", {
                required: "Natural Trip Date is Required",
              })}
              onKeyUp={() => {
                trigger("tripData");
              }}
              placeholder="tripData"
            />
            {errors.NData && (
              <small className="text-danger">{errors.NData.message}</small>
            )}
          </div>
        </div>
        </div>
        <hr className={'col-6 mx-auto'}/>

      </>
    );
  };
  let RenderResturants = () => {
    const row = [];
    for (var i = 0; i < reustrantsFiledsNumb; i++) {
      row.push(<AddResturant key={i} />);
    }
    return row;
  };
  let AddResturant = () => {
    return (
      <>
      <div className="row">
        <div className="col-6 mx-auto">
          <div className="input-group input-group-lg mb-1 ms-sm-5">
            <span
              className="input-group-text fs-3  filed-icon"
              id="basic-addon1"
            >
              <FontAwesomeIcon icon={faUtensils} />
            </span>
            <select
              className={`form-select  filed ${errors.resturant && "invalid"}`}
              {...register("resturant", {
                required: " Resturant  Required",
              })}
              onKeyUp={() => {
                trigger("resturant");
                errorSize = Object.keys(errors).length;
              }}
              aria-label="Default select example"
            >
              <option value="">Resturants </option>
              <option value="+963">Ahmad </option>
              <option value="+777">Egypt </option>
              <option value="+45 ">Jordun</option>
              <option value="+343">KSA </option>
              <option value="+111">Qatar </option>
              <option value="+86 ">Turke </option>
            </select>
            {errors.resturant && (
              <small className="text-danger">{errors.resturant.message}</small>
            )}
          </div>
        </div>
        <div className="col-6">
          <div className="input-group input-group-lg  mb-1 ms-sm-5 ">
            <span className={`input-group-text fs-3 filed filed-icon `}>
              <FontAwesomeIcon icon={faCalendarDay} />
            </span>
            <input
              type="datetime-local"
              className={`form-control filed 
                                      ${errors.RData && "invalid"}`}
              {...register("RData", {
                required: "Resturant Date is Required",
              })}
              onKeyUp={() => {
                trigger("tripData");
              }}
              placeholder="tripData"
            />
            {errors.RData && (
              <small className="text-danger">{errors.RData.message}</small>
            )}
          </div>
        </div>
      </div>
      <hr className={'col-6 mx-auto'}/>

      </>
    );
  };
  let RenderHotels = () => {
    const row = [];
    for (let i = 0; i < hotelsFiledsNumb; i++) {
      row.push(<AddHotel key={i} id={i} />);
    }
    return row;
  };
  let AddHotel = ({ id }) => {
    return (
      <>
      <div className="row">
        <div className="col-4">
          <div className="input-group input-group-lg mb-1 ms-sm-5">
            <span
              className="input-group-text fs-3  filed-icon"
              id="basic-addon1"
            >
              <FontAwesomeIcon icon={faHotel} />
            </span>
            <select
              className={`form-select  filed ${
                errors[`hotel-${id}`] && "invalid"
              }`}
              {...register(`hotel-${id}`, {
                required: " Hotel  Required",
              })}
              onKeyUp={() => {
                trigger(`hotel-${id}`);
                errorSize = Object.keys(errors).length;
              }}
              aria-label="Default select example"
            >
              <option value="">Hotels </option>
              <option value="+963">Ahmad </option>
              <option value="+777">Egypt </option>
              <option value="+45 ">Jordun</option>
              <option value="+343">KSA </option>
              <option value="+111">Qatar </option>
              <option value="+86 ">Turke </option>
            </select>
            {errors[`hotel-${id}`] && (
              <small className="text-danger">
                {errors[`hotel-${id}`].message}
              </small>
            )}
          </div>
        </div>
        <div className="col-4">
          <div className="input-group input-group-lg  mb-1 ms-sm-5 ">
            <span className={`input-group-text fs-3 filed filed-icon `}>
              <FontAwesomeIcon icon={faCalendarCheck} />
            </span>
            <input
              type="datetime-local"
              className={`form-control filed 
                                      ${errors[`HDate-${id}`] && "invalid"}`}
              {...register(`HDate-${id}`, {
                required: "Resturant Date is Required",
              })}
              onKeyUp={() => {
                trigger(`HDate-${id}`);
              }}
              placeholder="tripData"
            />
            {errors[`HDate-${id}`] && (
              <small className="text-danger">
                {errors[`HDate-${id}`].message}
              </small>
            )}
          </div>
        </div>
        <div className="col-4">
          <div className="input-group input-group-lg  mb-1 ms-sm-5 ">
            <span className={`input-group-text fs-3 filed filed-icon `}>
              <FontAwesomeIcon icon={faCalendarXmark} />
            </span>
            <input
              type="datetime-local"
              className={`form-control filed 
                                      ${errors[`HDate-${id}`] && "invalid"}`}
              {...register(`HDate-${id}`, {
                required: "Resturant Date is Required",
              })}
              onKeyUp={() => {
                trigger(`HDate-${id}`);
              }}
              placeholder="tripData"
            />
            {errors[`HDate-${id}`] && (
              <small className="text-danger">
                {errors[`HDate-${id}`].message}
              </small>
            )}
          </div>
        </div>
      </div>
      <hr className={'col-6 mx-auto'}/>

      </>
    );
  };
  let RenderAirLines = () => {
    const row = [];
    for (let i = 0; i < airlinesFiledsNumb; i++) {
      row.push(<AddAirLine key={i} id={i} />);
    }
    return row;
  };
  let AddAirLine = ({ id }) => {
    return (
      <>
      <div className="row">
        <div className="col-12">
          <div className="input-group input-group-lg mb-1 ms-sm-5">
            <span
              className="input-group-text fs-3  filed-icon"
              id="basic-addon1"
            >
              <FontAwesomeIcon icon={faPlane} />
            </span>
            <select
              className={`form-select  filed ${
                errors[`plane-${id}`] && "invalid"
              }`}
              {...register(`plane-${id}`, {
                required: " Plane  Required",
              })}
              onKeyUp={() => {
                trigger(`plane-${id}`);
                errorSize = Object.keys(errors).length;
              }}
              aria-label="Default select example"
            >
              <option value="">AirLines</option>
              <option value="+963">Ahmad </option>
              <option value="+777">Egypt </option>
              <option value="+45 ">Jordun</option>
              <option value="+343">KSA </option>
              <option value="+111">Qatar </option>
              <option value="+86 ">Turke </option>
            </select>
            {errors[`plane-${id}`] && (
              <small className="text-danger">
                {errors[`plane-${id}`].message}
              </small>
            )}
          </div>
        </div>
        <div className="col-12">
          <div className="input-group input-group-lg  mb-1 ms-sm-5 ">
            <span className={`input-group-text fs-3 filed filed-icon `}>
              <FontAwesomeIcon icon={faCalendarCheck} />
            </span>
            <input
              type="datetime-local"
              className={`form-control filed 
                                      ${errors[`PDate-${id}`] && "invalid"}`}
              {...register(`PDate-${id}`, {
                required: "AirLine Date is Required",
              })}
              onKeyUp={() => {
                trigger(`PDate-${id}`);
              }}
              placeholder="tripData"
            />
            {errors[`PDate-${id}`] && (
              <small className="text-danger">
                {errors[`PDate-${id}`].message}
              </small>
            )}
          </div>
        </div>
        <div className="input-group input-group-lg  mb-1 ms-sm-5 ">
          <span className={`input-group-text fs-3 filed filed-icon `}>
            <FontAwesomeIcon icon={faPlaneDeparture} />
          </span>
          <input
            class="form-control filed"
            type="text"
            placeholder={"Enter The Airport | City"}
          />
          <span class="input-group-text  fs-3 filed-icon ">
            <FontAwesomeIcon icon={faPlaneArrival} />
          </span>
          <input
            type="number"
            className={`form-control filed ${errors.discount && "invalid"}`}
            {...register("discount", {
              required: "Discount is Required",
              min: {
                value: 5,
                message: "Minimum  Discount value is 5 %",
              },
              max: {
                value: 25,
                message: "Maximum  Discount value is 20 %",
              },
            })}
            placeholder={"Enter The Airport | City"}
            aria-label="discount"
          ></input>
          {errors.discount && (
            <small className="text-danger text-end">
              {errors.discount.message}
            </small>
          )}
        </div>
        <div className="col-12">
          <div className="input-group input-group-lg  mb-1 ms-sm-5 ">
            <span className={`input-group-text fs-3 filed filed-icon `}>
              <FontAwesomeIcon icon={faCalendarXmark} />
            </span>
            <input
              type="datetime-local"
              className={`form-control filed 
                                      ${errors[`PDate-${id}`] && "invalid"}`}
              {...register(`PDate-${id}`, {
                required: "AirLine Date is Required",
              })}
              onKeyUp={() => {
                trigger(`PDate-${id}`);
              }}
              placeholder="tripData"
            />
            {errors[`PDate-${id}`] && (
              <small className="text-danger">
                {errors[`PDate-${id}`].message}
              </small>
            )}
          </div>
        </div>
        <div className="input-group input-group-lg  mb-1 ms-sm-5 ">
          <span className={`input-group-text fs-3 filed filed-icon `}>
            <FontAwesomeIcon icon={faPlaneDeparture} />
          </span>
          <input
            class="form-control filed"
            type="text"
            placeholder={"Enter The Airport | City"}
          />
          <span class="input-group-text  fs-3 filed-icon ">
            <FontAwesomeIcon icon={faPlaneArrival} />
          </span>
          <input
            type="number"
            className={`form-control filed ${errors.discount && "invalid"}`}
            {...register("discount", {
              required: "Discount is Required",
              min: {
                value: 5,
                message: "Minimum  Discount value is 5 %",
              },
              max: {
                value: 25,
                message: "Maximum  Discount value is 20 %",
              },
            })}
            placeholder={"Enter The Airport | City"}
            aria-label="discount"
          ></input>
          {errors.discount && (
            <small className="text-danger text-end">
              {errors.discount.message}
            </small>
          )}
        </div>
      </div>
      <hr className={'col-6 mx-auto'}/>
      </>
    );
  };
  return (
    <>
      <form onSubmit={handleSubmit(OnSubmit)}>
        <div className="natural-box">
          <h2 className={"me-3 sub-title"}>Natural Places</h2>
          <span className={`fs-3  n-icon plus`}>
            <FontAwesomeIcon
              icon={faPlusCircle}
              onClick={() => {
                setnaturalFiledsNumb(naturalFiledsNumb + 1);
              }}
            />
          </span>
          <span
            className={`fs-3  n-icon minus ${
              naturalFiledsNumb === 0 && "d-none"
            } `}
          >
            <FontAwesomeIcon
              icon={faMinusCircle}
              onClick={() => {
                setnaturalFiledsNumb(naturalFiledsNumb - 1);
              }}
            />
          </span>
        </div>
        <RenderNaturalPlace />
        <hr className={'hr col-12 ms-5'}/>
        <div className="natural-box">
          <h2 className={"me-3 sub-title"}>Resturants</h2>
          <span className={`fs-3  n-icon plus`}>
            <FontAwesomeIcon
              icon={faPlusCircle}
              onClick={() => {
                setreustrantsFiledsNumb(reustrantsFiledsNumb + 1);
              }}
            />
          </span>
          <span
            className={`fs-3  n-icon minus ${
              reustrantsFiledsNumb === 0 && "d-none"
            } `}
          >
            <FontAwesomeIcon
              icon={faMinusCircle}
              onClick={() => {
                setreustrantsFiledsNumb(reustrantsFiledsNumb - 1);
              }}
            />
          </span>
        </div>
        <RenderResturants />
        <hr className={'hr col-12 ms-5'}/>
        <div className="natural-box">
          <h2 className={"me-3 sub-title"}>Hotels</h2>
          <span className={`fs-3  n-icon plus`}>
            <FontAwesomeIcon
              icon={faPlusCircle}
              onClick={() => {
                sethotelslFiledsNumb(hotelsFiledsNumb + 1);
              }}
            />
          </span>
          <span
            className={`fs-3  n-icon minus ${
              hotelsFiledsNumb === 0 && "d-none"
            } `}
          >
            <FontAwesomeIcon
              icon={faMinusCircle}
              onClick={() => {
                sethotelslFiledsNumb(hotelsFiledsNumb - 1);
              }}
            />
          </span>
        </div>
        <RenderHotels />
        <hr className={ 'hr col-12 ms-5'}/>
        <div className="natural-box">
          <h2 className={"me-3 sub-title"}>AirLines</h2>
          <span className={`fs-3  n-icon plus`}>
            <FontAwesomeIcon
              icon={faPlusCircle}
              onClick={() => {
                setairlinesFiledsNumb(airlinesFiledsNumb + 1);
              }}
            />
          </span>
          <span
            className={`fs-3  n-icon minus ${
              airlinesFiledsNumb === 0 && "d-none"
            } `}
          >
            <FontAwesomeIcon
              icon={faMinusCircle}
              onClick={() => {
                setairlinesFiledsNumb(airlinesFiledsNumb - 1);
              }}
            />
          </span>
        </div>
        <RenderAirLines />
        <hr className={'hr col-12 ms-5'}/>
        <div className="col-10 offset-1 ">
          <div className=" price-title text-center">
            Total Price Of The trip per person
          </div>
          <div className="input-group input-group-lg  mb-1 ms-sm-5 ">
            <span className={`input-group-text fs-3 filed filed-icon `}>
              <FontAwesomeIcon icon={faMoneyBill} />
            </span>
            <input
              class="form-control filed"
              type="text"
              value="100$"
              aria-label="readonly input example"
              readonly
            />
            <span class="input-group-text filed-icon discount">
              Discount <br /> value{" "}
            </span>
            <input
              type="number"
              className={`form-control filed ${errors.discount && "invalid"}`}
              {...register("discount", {
                required: "Discount is Required",
                min: {
                  value: 5,
                  message: "Minimum  Discount value is 5 %",
                },
                max: {
                  value: 25,
                  message: "Maximum  Discount value is 20 %",
                },
              })}
              placeholder="From 5% to 20%"
              aria-label="discount"
            ></input>
            <span class="input-group-text filed-icon">
              {" "}
              <FontAwesomeIcon icon={faPercentage} />
            </span>
            {errors.discount && (
              <small className="text-danger text-end">
                {errors.discount.message}
              </small>
            )}
          </div>
        </div>
        <div className="ReCAPTCHA-div offset-sm-1 mt-1 col-8   ">
          <ReCAPTCHA notArobot={notArobot} setnotArobot={setnotArobot} />
        </div>
        <div className="div-icon col-11   ">
          <button className="one-icon" disabled={!notArobot} type="submit">
            Create Package
          </button>
        </div>
      </form>
    </>
  );
 };

let AddPackage = () => {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);
  const [notArobot, setnotArobot] = useState(false);
  const [isloading, setIsLooading] = useState(false);
  const [addPackageStep, setaddPackageStep] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
  } = useForm();
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

      setIsLooading(false);
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
        setErrMsg("Add Package Failed");
        console.log(err);
      }
    }
  };

  let errorSize = Object.keys(errors).length;
  console.log(errorSize);
  return (
    <>
      <div className="container addPackage">
        <div className="row">
          <div className="col-3 fs-4 mt-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to={"/dashboard/packages"}>Packages</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  AddPackage
                </li>
              </ol>
            </nav>
          </div>
          <h1 className="title text-center mb-5 col-6">Add New Package</h1>
        </div>
        {addPackageStep === 1 ? (
          <>
            <form onSubmit={handleSubmit(OnSubmit)}>
              <div className="col-10 offset-sm-1 ">
                <div className="row">
                  <label for="poster" class="form-label poster-label offset-2">
                    Package Poster
                  </label>
                  <div className="col-4 pe-2">
                    <div className="input-group input-group-lg  mb-1 ms-sm-5 ">
                      <span
                        className={`input-group-text fs-3 filed filed-icon `}
                      >
                        <FontAwesomeIcon icon={faImages} />
                      </span>
                      <input
                        type="file"
                        id="poster"
                        accept={"image/*"}
                        alt={"Poster"}
                        className={`form-control filed 
                                      ${errors.image && "invalid"}`}
                        {...register("image")}
                        onKeyUp={() => {
                          trigger("image");
                        }}
                        placeholder="Package Poster"
                      />
                      {errors.image && (
                        <small className="text-danger">
                          {errors.image.message}
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="col-5">
                    <div className="input-group input-group-lg  mb-1 ms-sm-5 ">
                      <span
                        className={`input-group-text fs-3 filed filed-icon `}
                      >
                        <FontAwesomeIcon icon={faFont} />
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
                            value: 30,
                            message: "Maximum allowed length is 30 ",
                          },
                        })}
                        onKeyUp={() => {
                          trigger("name");
                        }}
                        placeholder="Package Name"
                      />
                      {errors.name && (
                        <small className="text-danger">
                          {errors.name.message}
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="input-group input-group-lg  mb-1 ms-sm-5 ">
                      <span
                        className={`input-group-text fs-3 filed filed-icon `}
                      >
                        <FontAwesomeIcon icon={faPeopleGroup} />
                      </span>
                      <input
                        type="number"
                        className={`form-control filed 
                                      ${errors.number && "invalid"}`}
                        {...register("number", {
                          required: "Person Number is Required",
                          min: {
                            value: 10,
                            message: "Minimum Required Person is 10",
                          },
                          max: {
                            value: 200,
                            message: "Maximum  Required Person is 200 ",
                          },
                        })}
                        onKeyUp={() => {
                          trigger("number");
                        }}
                        placeholder="Num of Persons "
                      />
                      {errors.number && (
                        <small className="text-danger">
                          {errors.number.message}
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="input-group input-group-lg  mb-1 ms-sm-5 ">
                      <textarea
                        type="text"
                        className={`form-control filed 
                                      ${errors.desc && "invalid"}`}
                        {...register("desc", {
                          required: "Description is Required",
                        })}
                        onKeyUp={() => {
                          trigger("desc");
                        }}
                        placeholder="Package Description"
                      />
                      {errors.desc && (
                        <small className="text-danger">
                          {errors.desc.message}
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="input-group input-group-lg  mb-1 ms-sm-5 ">
                      <span
                        className={`input-group-text fs-3 filed filed-icon `}
                      >
                        <FontAwesomeIcon icon={faCalendarDay} />
                      </span>
                      <input
                        type="datetime-local"
                        className={`form-control filed 
                                      ${errors.tripData && "invalid"}`}
                        {...register("tripData", {
                          required: "Trip Date is Required",
                        })}
                        onKeyUp={() => {
                          trigger("tripData");
                        }}
                        placeholder="tripData"
                      />
                      {errors.days && (
                        <small className="text-danger">
                          {errors.tripData.message}
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="input-group input-group-lg  mb-1 ms-sm-5 ">
                      <span
                        className={`input-group-text fs-3 filed filed-icon `}
                      >
                        <FontAwesomeIcon icon={faCalendarDays} />
                      </span>
                      <input
                        type="number"
                        className={`form-control filed 
                                      ${errors.days && "invalid"}`}
                        {...register("days", {
                          required: "Days Number is Required",
                          min: {
                            value: 1,
                            message: "Minimum Required Days is 1",
                          },
                          max: {
                            value: 30,
                            message: "Maximum  Required Days is 30 ",
                          },
                        })}
                        onKeyUp={() => {
                          trigger("days");
                        }}
                        placeholder="Days"
                      />
                      {errors.days && (
                        <small className="text-danger">
                          {errors.days.message}
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="input-group input-group-lg mb-1 ms-sm-5">
                      <span
                        className="input-group-text fs-3  filed-icon"
                        id="basic-addon1"
                      >
                        <FontAwesomeIcon icon={faMapLocationDot} />
                      </span>
                      <select
                        className={`form-select  filed ${
                          errors.tour && "invalid"
                        }`}
                        {...register("tour", {
                          required:
                            "Tourist guide and his/her Phone is Required",
                        })}
                        onKeyUp={() => {
                          trigger("tour");
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
                        <option value="">Tourist Guide </option>
                        <option value="+963">Ahmad </option>
                        <option value="+777">Egypt </option>
                        <option value="+45 ">Jordun</option>
                        <option value="+343">KSA </option>
                        <option value="+111">Qatar </option>
                        <option value="+86 ">Turke </option>
                      </select>
                      <input
                        type="tel"
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
                        }}
                        // }}
                        placeholder="Phone"
                      />
                      {(errors.phone || errors.tour) && (
                        <small className="text-danger">
                          {errors.tour.message}
                        </small>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="div-icon col-11   ">
                <button className="one-icon" type="submit" onClick={() => {setaddPackageStep(2)}}>
                  Next
                </button>
              </div>
            </form>
          </>
        ) : addPackageStep === 2 ? (
          <>
          <AddPlacesToPackage/>
          </>
        ):(<>
        </>)}
      </div>
    </>
  );
};

export default AddPackage;
