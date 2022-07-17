import {
  faCalendarCheck,
  faCalendarDay,
  faCalendarDays,
  faCalendarXmark,
  faFont,
  faHotel,
  faImages,
  faMapLocationDot,
  faMartiniGlassCitrus,
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
import { useAxiosGet, useAxiosPost } from "../../../hooks/useAxiosFetch";
import ReCAPTCHA from "../../reCAPTCHA/reCAPTCHAComponent";

let AddPlacesToPackage = ({ packageInfo }) => {
  let start_date = new Date(packageInfo.start_date).toISOString();
  let end_date = new Date(packageInfo.end_date).toISOString();
  console.log(start_date, end_date);
  console.log(start_date > end_date);
  console.log(start_date < end_date);
  console.log("2022-07-16T16:34:00.000Z" >= end_date);

  const [errMsg, setErrMsg] = useState("");
  const [notArobot, setnotArobot] = useState(false);
  const [naturalFiledsNumb, setnaturalFiledsNumb] = useState(0);
  const [reustrantsFiledsNumb, setreustrantsFiledsNumb] = useState(0);
  const [hotelsFiledsNumb, sethotelslFiledsNumb] = useState(0);
  const [airlinesFiledsNumb, setairlinesFiledsNumb] = useState(0);
  const [isloading, setIsLooading] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    data: allresturants,
    fetchError: allresturantsErrors,
    isLoading: allresturantsIsLoading,
  } = useAxiosPost("/api/ShowAllResturants");
  const {
    data: allhotel,
    fetchError: allhotelErrors,
    isLoading: allhotelIsLoading,
  } = useAxiosPost("/api/ShowAllHotels");
  const {
    data: allplaces,
    fetchError: allplacesErrors,
    isLoading: allplacesIsLoading,
  } = useAxiosPost("/api/ShowAllPlaces");
  const {
    data: allairplanes,
    fetchError: allairplanesErrors,
    isLoading: allairplanesIsLoading,
  } = useAxiosPost("/api/ShowAllAirplane");
  console.log(allairplanes);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
  } = useForm();
  let errorSize = Object.keys(errors).length;
  const OnSubmit = async (values) => {
    console.log(values);
    const formdata = new FormData();
    formdata.append("package_id", packageInfo.id);
    for (let i = 0; i < values.restaurant_id?.length; i++) {
      formdata.append(`restaurant_id[${i}]`, values.restaurant_id[i]);
      let d = new Date(values.restaurant_booking_date[i])
        .toISOString()
        .split("T")[0];
      console.log(d);
      formdata.append(`restaurant_booking_date[${i}]`, d);
    }
    for (let i = 0; i < values.hotel_class_id?.length; i++) {
      formdata.append(`hotel_class_id[${i}]`, values.hotel_class_id[i]);
      let s = new Date(values.hotel_booking_start_date[i])
        .toISOString()
        .split("T")[0];
      console.log(s);
      formdata.append(`hotel_booking_start_date[${i}]`, s);
      let e = new Date(values.hotel_booking_end_date[i])
        .toISOString()
        .split("T")[0];
      console.log(e);
      formdata.append(`hotel_booking_end_date[${i}]`, e);
    }
    for (let i = 0; i < values.airplane_class_id?.length; i++) {
      formdata.append(`airplane_class_id[${i}]`, values.airplane_class_id[i]);
      let d = new Date(values.airplane_booking_date[i])
        .toISOString()
        .split("T")[0];
      console.log(d);
      formdata.append(`airplane_booking_date[${i}]`, d);
      formdata.append(`from[${i}]`, values.from[i]);
      formdata.append(`to[${i}]`, values.to[i]);
    }
    for (let i = 0; i < values.place_id?.length; i++) {
      formdata.append(`place_id[${i}]`, values.place_id[i]);
      let d = new Date(values.place_booking[i]).toISOString().split("T")[0];
      console.log(d);
      formdata.append(`place_booking[${i}]`, d);
    }
    setIsLooading(true);
    try {
      const response = await axios.post(
        "/api/addFaciliticsToPackage",
        formdata,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.atoken}`,
          },
          withCredentials: true,
          mode: "no-cros",
        }
      );
      console.log(response);
      navigate(-1);
      setIsLooading(false);
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
  let RenderNaturalPlace = () => {
    const row = [];
    for (var i = 0; i < naturalFiledsNumb; i++) {
      row.push(<AddNaturalPlace key={i} id={i} />);
    }
    return row;
  };
  let AddNaturalPlace = ({ id }) => {
    return (
      <>
        <div className="row">
          <div className="col-7">
            <div className="input-group input-group-lg mb-1 ms-sm-5">
              <span
                className="input-group-text fs-3  filed-icon"
                id="basic-addon1"
              >
                <FontAwesomeIcon icon={faMountainSun} />
              </span>
              <select
                className={`form-select  filed ${
                  errors?.place_id?.[id] && "invalid"
                }`}
                {...register(`place_id[${id}]`, {
                  required: "One Natural Place At least Required",
                })}
                onKeyUp={() => {
                  trigger(`place_id[${id}]`);
                }}
                onChange={() => {
                  console.log(errors);
                }}
                aria-label="Default select example"
              >
                <option value="">Natural Palces </option>
                {allplaces?.Place?.map((place) => {
                  return (
                    <option value={+place.id}>
                      {" "}
                      {place.name}/ <strong>Category : </strong>{" "}
                      {place.category.name}/ <b>Location : </b> {place.location}{" "}
                    </option>
                  );
                })}
              </select>
              {errors?.place_id?.[id] && (
                <small className="text-danger">
                  {errors?.place_id?.[id].message}
                </small>
              )}
            </div>
          </div>
          <div className="col-5">
            <div className="input-group input-group-lg  mb-1 ms-sm-5 ">
              <span className={`input-group-text fs-3 filed filed-icon `}>
                <FontAwesomeIcon icon={faCalendarDay} />
              </span>
              <input
                type="datetime-local"
                className={`form-control filed 
                                      ${
                                        errors?.place_booking?.[id] && "invalid"
                                      }`}
                {...register(`place_booking[${id}]`, {
                  required: "Natural Trip Date is Required",
                  validate: {
                    start_data: (value) =>
                      value >= start_date ||
                      "Booking Time Should Be Greater Than start_date ",
                    end_date: (value) =>
                      value <= end_date ||
                      "Booking Time Should Be Less Than end_date",
                  },
                })}
                onKeyUp={() => {
                  trigger(`place_booking[${id}]`);
                }}
                placeholder="tripData"
              />
              {errors?.place_booking?.[id] && (
                <small className="text-danger">
                  {errors?.place_booking?.[id]?.message}
                </small>
              )}
            </div>
          </div>
        </div>
        <hr className={"col-6 mx-auto"} />
      </>
    );
  };
  let RenderResturants = () => {
    const row = [];
    for (var i = 0; i < reustrantsFiledsNumb; i++) {
      row.push(<AddResturant key={i} id={i} />);
    }
    return row;
  };
  let AddResturant = ({ id }) => {
    return (
      <>
        <div className="row">
          <div className="col-7 mx-auto">
            <div className="input-group input-group-lg mb-1 ms-sm-5">
              <span
                className="input-group-text fs-3  filed-icon"
                id="basic-addon1"
              >
                <FontAwesomeIcon icon={faUtensils} />
              </span>
              <select
                className={`form-select  filed ${
                  errors?.restaurant_id?.[id] && "invalid"
                }`}
                {...register(`restaurant_id[${id}]`, {
                  required: " Resturant  Required",
                })}
                onKeyUp={() => {
                  trigger(`restaurant_id[${id}]`);
                  errorSize = Object.keys(errors).length;
                }}
                aria-label="Default select example"
              >
                <option value="">Resturants </option>
                {allresturants?.restaurants?.map((resturant) => {
                  return (
                    <option value={+resturant.id}>
                      {" "}
                      {resturant.name}/ <strong>Category : </strong>{" "}
                      {resturant.category.name}/ <b>Location : </b>{" "}
                      {resturant.location}{" "}
                    </option>
                  );
                })}
              </select>
              {errors?.restaurant_id?.[id] && (
                <small className="text-danger">
                  {errors?.restaurant_id?.[id]?.message}
                </small>
              )}
            </div>
          </div>
          <div className="col-5">
            <div className="input-group input-group-lg  mb-1 ms-sm-5 ">
              <span className={`input-group-text fs-3 filed filed-icon `}>
                <FontAwesomeIcon icon={faCalendarDay} />
              </span>
              <input
                type="datetime-local"
                className={`form-control filed 
                                      ${
                                        errors?.restaurant_booking_date?.[id] &&
                                        "invalid"
                                      }`}
                {...register(`restaurant_booking_date[${id}]`, {
                  required: "Resturant Date is Required",
                  validate: {
                    start_data: (value) =>
                      value >= start_date ||
                      "Booking Time Should Be Greater Than start_date ",
                    end_date: (value) =>
                      value <= end_date ||
                      "Booking Time Should Be Less Than end_date",
                  },
                })}
                onKeyUp={() => {
                  trigger(`restaurant_booking_date[${id}]`);
                }}
                placeholder="tripData"
              />
              {errors?.restaurant_booking_date?.[id] && (
                <small className="text-danger">
                  {errors?.restaurant_booking_date?.[id].message}
                </small>
              )}
            </div>
          </div>
        </div>
        <hr className={"col-6 mx-auto"} />
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
          <div className="col-6">
            <div className="input-group input-group-lg mb-1 ms-sm-5">
              <span
                className="input-group-text fs-3  filed-icon"
                id="basic-addon1"
              >
                <FontAwesomeIcon icon={faHotel} />
              </span>
              <select
                className={`form-select  filed ${
                  errors?.hotel_class_id?.[id] && "invalid"
                }`}
                {...register(`hotel_class_id[${id}]`, {
                  required: " Hotel  Required",
                })}
                onKeyUp={() => {
                  trigger(`hotel_class_id[${id}]`);
                  errorSize = Object.keys(errors).length;
                }}
                aria-label="Default select example"
              >
                <option value="">Hotels </option>
                {allhotel?.hotels?.map((hotel) => {
                  return (
                    <optgroup
                      label={`${hotel.name} / Location: ${hotel.location} / Rate : ${hotel.rate} Stars `}
                    >
                      {hotel.classes.map((aclass) => {
                        return (
                          <option value={aclass.id}>
                            {aclass.class_name} / Price: {aclass.money}{" "}
                          </option>
                        );
                      })}
                    </optgroup>
                  );
                })}
              </select>
              {errors?.hotel_class_id?.[id] && (
                <small className="text-danger">
                  {errors?.hotel_class_id?.[id].message}
                </small>
              )}
            </div>
          </div>
          <div className="col-3">
            <div className="input-group input-group-lg  mb-1 ms-sm-5 ">
              <span className={`input-group-text fs-3 filed filed-icon `}>
                <FontAwesomeIcon icon={faCalendarCheck} />
              </span>
              <input
                type="datetime-local"
                className={`form-control filed 
                                      ${
                                        errors?.hotel_booking_start_date?.[
                                          id
                                        ] && "invalid"
                                      }`}
                {...register(`hotel_booking_start_date[${id}]`, {
                  required: "Hotel start Date is Required",
                    validate: {
                      start_data: (value) =>
                        value >= start_date ||
                        "Booking Time Should Be Greater Than start_date ",
                      end_date: (value) =>
                        value <= end_date ||
                        "Booking Time Should Be Less Than end_date",
                    },
                })}
                onKeyUp={() => {
                  trigger(`hotel_booking_start_date[${id}]`);
                }}
                placeholder="tripData"
              />
              {errors?.hotel_booking_start_date?.[id] && (
                <small className="text-danger">
                  {errors?.hotel_booking_start_date?.[id].message}
                </small>
              )}
            </div>
          </div>
          <div className="col-3">
            <div className="input-group input-group-lg  mb-1 ms-sm-5 ">
              <span className={`input-group-text fs-3 filed filed-icon `}>
                <FontAwesomeIcon icon={faCalendarXmark} />
              </span>
              <input
                type="datetime-local"
                className={`form-control filed 
                                      ${
                                        errors?.hotel_booking_end_date?.[id] &&
                                        "invalid"
                                      }`}
                {...register(`hotel_booking_end_date[${id}]`, {
                  required: "Hotel End Date is Required",
                  validate: {
                    start_data: (value) =>
                      value >= start_date ||
                      "Booking Time Should Be Greater Than start_date ",
                    end_date: (value) =>
                      value <= end_date ||
                      "Booking Time Should Be Less Than end_date",
                      GTEdata:  (value) => 
                          value > getValues(`hotel_booking_start_date[${id}]`) ||
                          "End Day Should Be Greater than Enter Day"
                  },
                })}
                onKeyUp={() => {
                  trigger(`hotel_booking_end_date[${id}]`);
                }}
                placeholder="tripData"
              />
              {errors?.hotel_booking_end_date?.[id] && (
                <small className="text-danger">
                  {errors?.hotel_booking_end_date?.[id].message}
                </small>
              )}
            </div>
          </div>
        </div>
        <hr className={"col-6 mx-auto"} />
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
                  errors?.airplane_class_id?.[id] && "invalid"
                }`}
                {...register(`airplane_class_id[${id}]`, {
                  required: " Plane  Required",
                })}
                onKeyUp={() => {
                  trigger(`airplane_class_id[${id}]`);
                }}
                aria-label="Default select example"
              >
                <option value="">AirLines</option>
                {allairplanes?.airplane?.map((plane) => {
                  return (
                    <optgroup
                      label={`${plane.name} / Location: ${plane.location} / Rate : ${plane.rate} Stars `}
                    >
                      {plane.classes.map((aclass) => {
                        return (
                          <option value={aclass.id}>
                            {aclass.class_name} / Price: {aclass.money}{" "}
                          </option>
                        );
                      })}
                    </optgroup>
                  );
                })}
              </select>
              {errors?.airplane_class_id?.[id] && (
                <small className="text-danger">
                  {errors?.airplane_class_id?.[id].message}
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
                                      ${
                                        errors?.airplane_booking_date?.[id] &&
                                        "invalid"
                                      }`}
                {...register(`airplane_booking_date[${id}]`, {
                  required: "AirLine Date is Required",
                  validate: {
                    start_data: (value) =>
                      value >= start_date ||
                      "Booking Time Should Be Greater Than start_date ",
                    end_date: (value) =>
                      value <= end_date ||
                      "Booking Time Should Be Less Than end_date",
                  },
                })}
                onKeyUp={() => {
                  trigger(`airplane_booking_date[${id}]`);
                }}
                placeholder="tripData"
              />
              {errors?.airplane_booking_date?.[id] && (
                <small className="text-danger">
                  {errors?.airplane_booking_date?.[id].message}
                </small>
              )}
            </div>
          </div>
          <div className="input-group input-group-lg  mb-1 ms-sm-5 ">
            <span className={`input-group-text fs-3 filed filed-icon `}>
              <FontAwesomeIcon icon={faPlaneDeparture} />
            </span>
            <input
              class={`form-control filed ${errors?.from?.[id] && "invalid"}`}
              type="text"
              {...register(`from[${id}]`, {
                required: "The AirPort is Required",
              })}
              placeholder={"Enter The Airport | City"}
            />
            {errors?.from?.[id] && (
              <small className="text-danger text-end">
                {errors?.from?.[id].message}
              </small>
            )}

            <span class="input-group-text  fs-3 filed-icon ">
              <FontAwesomeIcon icon={faPlaneArrival} />
            </span>
            <input
              type="text"
              className={`form-control filed ${errors?.to?.[id] && "invalid"}`}
              {...register(`to[${id}]`, {
                required: "The AirPort is Required",
              })}
              placeholder={"Enter The Airport | City"}
            />
            {errors?.to?.[id] && (
              <small className="text-danger text-end">
                {errors?.to?.[id].message}
              </small>
            )}
          </div>
        </div>
        <hr className={"col-6 mx-auto"} />
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
        <hr className={"hr col-12 ms-5"} />
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
        <hr className={"hr col-12 ms-5"} />
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
        <hr className={"hr col-12 ms-5"} />
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
        <hr className={"hr col-12 ms-5"} />
        <div className="col-10 offset-1 "></div>
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
  let s1 = new Date("2020-7-20");
  let s2 = new Date("2020/7/21").toISOString();
  console.log(s2, " ", s1);

  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);
  const [notArobot, setnotArobot] = useState(false);
  const [isloading, setIsLooading] = useState(false);
  const [addPackageStep, setaddPackageStep] = useState(1);
  const [packageInfo, setpackageInfo] = useState();
  const [flag, setflag] = useState(false);
  const {
    data: allCategories,
    fetchError: allCategoriesErrors,
    isLoading: allCategoriesIsLoading,
  } = useAxiosGet("/api/getPackageCategory");
  const {
    data: allsuper,
    fetchError: allsuperErrors,
    isLoading: allsuperIsLoading,
  } = useAxiosGet("/api/getTouristSupervisor");
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
  } = useForm();
  const OnSubmit = async ({
    name,
    description,
    img,
    start_date,
    number_of_day,
    discount_percentage,
    max_reservation,
    tourist_supervisor,
    category,
  }) => {
    var s = new Date(start_date)
      .toISOString()
      .slice(0, 19)
      .split("T")
      .join(" ");
    console.log(s);
    const formdata = new FormData();
    formdata.append("img", img[0]);
    formdata.append("name", name);
    formdata.append("start_date", s);
    formdata.append("category_id", category);
    formdata.append("discount_percentage", discount_percentage);
    formdata.append("description", description);
    formdata.append("number_of_day", number_of_day);
    formdata.append("max_reservation", max_reservation);
    formdata.append("tourist_supervisor_id", tourist_supervisor);
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
      setpackageInfo(response.data.package);
      setaddPackageStep(2);
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
                  <div className="col-5 pe-2">
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
                                      ${errors.img && "invalid"}`}
                        {...register("img")}
                        onKeyUp={() => {
                          trigger("img");
                        }}
                        placeholder="Package Poster"
                      />
                      {errors.img && (
                        <small className="text-danger">
                          {errors.img.message}
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="col-6">
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
                                      ${errors.start_date && "invalid"}`}
                        {...register("start_date", {
                          required: "Trip Date is Required",
                        })}
                        onKeyUp={() => {
                          trigger("start_date");
                        }}
                        placeholder="start_date"
                      />
                      {errors.start_date && (
                        <small className="text-danger">
                          {errors.start_date.message}
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
                                      ${errors.number_of_day && "invalid"}`}
                        {...register("number_of_day", {
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
                          trigger("number_of_day");
                        }}
                        placeholder="Days"
                      />
                      {errors.number_of_day && (
                        <small className="text-danger">
                          {errors.number_of_day.message}
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="col-5">
                    <div className="input-group input-group-lg mb-1 ms-sm-5">
                      <span
                        className="input-group-text fs-3  filed-icon"
                        id="basic-addon1"
                      >
                        <FontAwesomeIcon icon={faMapLocationDot} />
                      </span>
                      <select
                        className={`form-select  filed ${
                          errors?.tourist_supervisor && "invalid"
                        }`}
                        {...register("tourist_supervisor", {
                          required:
                            "Tourist guide and his/her Phone is Required",
                        })}
                        onKeyUp={() => {
                          trigger("tourist_supervisor");
                        }}
                        aria-label="Default select example"
                      >
                        <option value="">Tourist Guide </option>
                        {allsuper?.TouristSupervisor?.map((superr) => {
                          return (
                            <option value={+superr.id}>
                              {superr.name} , Phone : {superr.phone} , Location
                              : {superr.location}
                            </option>
                          );
                        })}
                      </select>
                      {errors.tourist_supervisor && (
                        <small className="text-danger">
                          {errors.tourist_supervisor?.message}
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="input-group input-group-lg mb-1 ms-sm-5">
                      <span
                        className="input-group-text fs-3  filed-icon"
                        id="basic-addon1"
                      >
                        <FontAwesomeIcon icon={faMartiniGlassCitrus} />
                      </span>
                      <select
                        className={`form-select  filed fs-6 ${
                          errors.category && "invalid"
                        }`}
                        {...register("category", {
                          required: "Ctegory Is Required",
                        })}
                        onKeyUp={() => {
                          trigger("category");
                        }}
                        aria-label="Default select example"
                      >
                        <option value="">Category</option>
                        {allCategories?.category?.map((cat) => {
                          return (
                            <option value={+`${cat.id}`}>{cat.name}</option>
                          );
                        })}
                      </select>
                      {errors.category && (
                        <small className="text-danger">
                          {errors.category.message}
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="input-group input-group-lg   mb-1 ms-sm-5 ">
                      <span
                        className={`input-group-text fs-3 filed filed-icon `}
                      >
                        <FontAwesomeIcon icon={faPeopleGroup} />
                      </span>
                      <input
                        type="number"
                        className={`form-control filed  fs-6 
                                      ${errors.max_reservation && "invalid"}`}
                        {...register("max_reservation", {
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
                          trigger("max_reservation");
                        }}
                        placeholder="Persons Number"
                      />
                      {errors.max_reservation && (
                        <small className="text-danger">
                          {errors.max_reservation.message}
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="col-5">
                    <div className="input-group input-group-lg  mb-1 ms-sm-5 ">
                      <span
                        className={`input-group-text fs-3 filed filed-icon `}
                      >
                        <FontAwesomeIcon icon={faMoneyBill} />
                      </span>
                      <input
                        type="number"
                        className={`form-control filed fs-6 ${
                          errors.discount_percentage && "invalid"
                        }`}
                        {...register(`discount_percentage`, {
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
                        placeholder="Discount Value ( From 5% to 25% )"
                        aria-label="discount"
                      ></input>
                      <span class="input-group-text filed-icon">
                        {" "}
                        <FontAwesomeIcon icon={faPercentage} />
                      </span>
                      {errors.discount_percentage && (
                        <small className="text-danger text-end">
                          {errors.discount_percentage.message}
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="col-11">
                    <div className="input-group input-group-lg  mb-1 ms-sm-5 ">
                      <textarea
                        type="text"
                        rows={1}
                        className={`form-control filed 
                                      ${errors.description && "invalid"}`}
                        {...register("description", {
                          required: "Description is Required",
                        })}
                        onKeyUp={() => {
                          trigger("description");
                        }}
                        placeholder="Package Description"
                      />
                      {errors.description && (
                        <small className="text-danger">
                          {errors.description.message}
                        </small>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="div-icon col-11   ">
                <button
                  className="one-icon"
                  type="submit"
                >
                  Next
                </button>
              </div>
            </form>
          </>
        ) : addPackageStep === 2 ? (
          <>
            <AddPlacesToPackage packageInfo={packageInfo} />
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default AddPackage;
