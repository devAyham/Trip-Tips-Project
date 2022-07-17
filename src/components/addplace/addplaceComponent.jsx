import { faAdversal } from "@fortawesome/free-brands-svg-icons";
import {
  faAddressCard,
  faBuildingWheat,
  faClipboardList,
  faDollar,
  faEnvelope,
  faExclamationTriangle,
  faFont,
  faImage,
  faImages,
  faLayerGroup,
  faMapLocationDot,
  faMartiniGlassCitrus,
  faMinusCircle,
  faMoneyBill,
  faMonument,
  faMountain,
  faPeopleRoof,
  faPlusCircle,
  faRankingStar,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";
import { useAxiosGet } from "../../hooks/useAxiosFetch";

let TermsModal = ({ seeTerms, setseeTerms }) => {
  return (
    <>
      <div
        class="modal fade"
        id="termsmodal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-scrollable modal-lg">
          <div class="modal-content model-terms">
            <div class="modal-header ">
              <h5 class="modal-title mx-auto fs-2 " id="staticBackdropLabel">
                Privecy & Terms
              </h5>
            </div>
            <div class="modal-body">
              <div className="container-fluid">
                <div className="row  ">
                  <div className="col-md-12 ">
                    <div className="hmaro d-flex align-items-center justify-content-center">
                      <img
                        className="trip-logo"
                        src="/logo/2.png"
                        alt="trip tips"
                      />
                      <FontAwesomeIcon
                        className="shild-logo"
                        icon={faClipboardList}
                      />
                    </div>
                  </div>
                  <h3 className={"before-title text-center "}>
                    Before You Submit And Add Your Plase In Trip Tips Plase Read
                    And Cofrim On Our Terms
                  </h3>
                  <div className="col-12  text-start">
                    <p className="desc">
                      <ul className={"terms-list"}>
                        <li className={"term"}>
                          Lorem ipsum dolor, sit amet consectetur adipisicing
                          elit. Harum exercitationem ratione cupiditate unde
                          aliquid, asperiores cum veniam optio quasi atque autem
                          architecto at alias aut! Laudantium non optio
                          aspernatur accusamus.
                        </li>
                        <li className={"term"}>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Odit rerum aut, illo earum deleniti eum
                          doloribus, atque fuga consectetur molestias{" "}
                        </li>
                        <li className={"term"}>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Odit rerum aut, illo earum deleniti eum
                          doloribus, atque fuga consectetur molestias{" "}
                        </li>
                        <li className={"term"}>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Odit rerum aut, illo earum deleniti eum
                          doloribus, atque fuga consectetur molestias{" "}
                        </li>
                        <li className={"term"}>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Odit rerum aut, illo earum deleniti eum
                          doloribus, atque fuga consectetur molestias{" "}
                        </li>
                        <li className={"term"}>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Odit rerum aut, illo earum deleniti eum
                          doloribus, atque fuga consectetur molestias{" "}
                        </li>
                      </ul>
                    </p>
                  </div>
                  <div class="alert alert-warning" role="alert">
                    <h4 class="alert-heading">Importent Note !</h4>
                    <p>
                      If You Read This Note , That means you have complete
                      reading Our Terms So After You Click On Submit,
                      <br /> Your Place will be Undergo to Our Admin's Vision ,
                      So After Accept it In Our Application Or Reject It, We
                      Will Send For You An Email On Your Email Address And
                      Telling You The News !!
                    </p>
                    <hr />
                    <p class="mb-0">
                      The response process may take from one to four days
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => {
                  setseeTerms(0);
                }}
              >
                Reject
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => {
                  setseeTerms(1);
                }}
                data-bs-dismiss="modal"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
};
let AddResturant = () => {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);
  const [notArobot, setnotArobot] = useState(false);
  const [isloading, setIsLooading] = useState(false);
  const [imageFiledsNumb, setimageFiledsNumb] = useState(1);
  const [seeTerms, setseeTerms] = useState(0);
  const {
    data: categories,
    fetchError: categoriesErrors,
    isLoading: categoriesIsLoading,
  } = useAxiosGet("/api/getRestaurantCategory");
  console.log(categories);
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
  } = useForm();
  const OnSubmit = async ({
    name,
    rate,
    location,
    support_email,
    img_title_deed: i,
    price_booking,
    category,
    descriprion,
    images,
  }) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("rate", rate);
    formData.append("location", location);
    formData.append("img_title_deed", i[0]);
    formData.append("price_booking", price_booking);
    formData.append("category", category);
    formData.append("support_email", support_email);
    formData.append("description", descriprion);
    let img = [...Object.values(images)];
    img.forEach((element) => {
      formData.append("img[]", element);
    });

    setIsLooading(true);
    try {
      const response = await axios.post("/api/addRestaurant", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${auth.atoken}`,
          //  'Access-Control-Allow-Origin' : 'http://localhost:8000'
        },
        withCredentials: true,
      });
      console.log(response.data);
      setIsLooading(false);
      setSuccess(true);
      if (response.data.status === 1) {
        navigate("/home");
      } else {
        setErrMsg(response.data.message);
      }
    } catch (err) {
      setIsLooading(false);
      if (!err?.message) {
        setErrMsg("No Server Response");
        console.log("No Server Response");
      } else if (err?.response?.status === 0) {
        setErrMsg(err.response.data.message);
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
      <div className="container addresturant">
        <div className="row ">
          <div className="col-12 title">Add Your Resturant Info</div>
          <form onSubmit={handleSubmit(OnSubmit)}>
            <div className=" sub-title text-center ms-5">
              Firstly We Will Need Your Personal Email And The Ownership
              Certificate For Your Place
            </div>
            <div className="row offset-1">
              <div className="col-5">
                <div className=" input-group input-group-lg   mb-1 ms-sm-5 ">
                  <span
                    className="input-group-text fs-3 filed filed-icon"
                    id="basic-addon1"
                  >
                    <FontAwesomeIcon icon={faEnvelope} />
                  </span>
                  <input
                    type="text"
                    className={`form-control filed ${
                      errors.support_email && "invalid"
                    }`}
                    {...register("support_email", {
                      required: "Email is Required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid Email address",
                      },
                    })}
                    onKeyUp={() => {
                      trigger("support_email");
                    }}
                    placeholder="Your Mail Address "
                  />
                  {errors.support_email && (
                    <small className="text-danger ">
                      {errors.support_email.message}
                    </small>
                  )}
                </div>
              </div>
              <div className="col-5 ">
                <div className="row">
                  <div className="col-12">
                    <div className="input-group input-group-lg  mb-1 ms-sm-5 ">
                      <span
                        className={`input-group-text fs-3 filed filed-icon `}
                      >
                        <FontAwesomeIcon icon={faAddressCard} />
                      </span>
                      <input
                        type="file"
                        id="poster"
                        accept={"image/*"}
                        alt={"..."}
                        className={`form-control filed 
                        ${errors.img_title_deed && "invalid"}`}
                        {...register(`img_title_deed`, {
                          required: "Ownership Certificate is Required",
                        })}
                        onKeyUp={() => {
                          trigger("img_title_deed");
                        }}
                      />
                      {errors.img_title_deed && (
                        <small className="text-danger">
                          {errors.img_title_deed.message}
                        </small>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <hr className={"col-11 my-2 hrr"} />
              <div className="col-5">
                <div className="input-group input-group-lg  mb-1 ms-sm-5 ">
                  <span className={`input-group-text fs-3 filed filed-icon `}>
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
                    placeholder="Resturant Name"
                  />
                  {errors.name && (
                    <small className="text-danger">{errors.name.message}</small>
                  )}
                </div>
              </div>
              <div className="col-5">
                <div className="input-group input-group-lg mb-1 ms-sm-5">
                  <span
                    className="input-group-text fs-3  filed-icon"
                    id="basic-addon1"
                  >
                    <FontAwesomeIcon icon={faRankingStar} />
                  </span>
                  <select
                    className={`form-select  filed ${errors.rate && "invalid"}`}
                    {...register("rate", {
                      required: "Place Rate Is Required",
                    })}
                    onKeyUp={() => {
                      trigger("rate");
                    }}
                    aria-label="Default select example"
                  >
                    <option value="">Rate</option>
                    <option value="1">1 Star</option>
                    <option value="2">2 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="5">5 Stars </option>
                  </select>
                  {errors.rate && (
                    <small className="text-danger">{errors.rate.message}</small>
                  )}
                </div>
              </div>
              <div className="col-10">
                <div className="input-group input-group-lg  mb-1 ms-sm-5 ">
                  <span
                    className="input-group-text fs-3  filed-icon"
                    id="basic-addon1"
                  >
                    <FontAwesomeIcon icon={faMapLocationDot} />
                  </span>
                  <input
                    type="text"
                    className={`form-control filed 
                                      ${errors.location && "invalid"}`}
                    {...register("location", {
                      required: "Place location is Required",
                    })}
                    onKeyUp={() => {
                      trigger("location");
                    }}
                    placeholder="ٌResturant Location"
                  />
                  {errors.location && (
                    <small className="text-danger">
                      {errors.location.message}
                    </small>
                  )}
                </div>
              </div>
              <div className="col-5">
                <div className="input-group input-group-lg  mb-1 ms-sm-5 ">
                  <span className={`input-group-text fs-3 filed filed-icon `}>
                    <FontAwesomeIcon icon={faMoneyBill} />
                  </span>
                  <input
                    type="number"
                    className={`form-control filed 
                                      ${errors.price_booking && "invalid"}`}
                    {...register("price_booking", {
                      required: "Booking Price is Required",
                      min: {
                        value: 1,
                        message: "Minimum Booking Price is 1",
                      },
                      max: {
                        value: 100000,
                        message: "Maximum Booking Price is 100000 ",
                      },
                    })}
                    onKeyUp={() => {
                      trigger("price_booking");
                    }}
                    placeholder="Booking Price"
                  />
                  <span className={`input-group-text  fs-4 filed `}>$</span>
                  {errors.price_booking && (
                    <small className="text-danger">
                      {errors.price_booking.message}
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
                    <FontAwesomeIcon icon={faMartiniGlassCitrus} />
                  </span>

                  <select
                    className={`form-select  filed ${
                      errors.category && "invalid"
                    }`}
                    {...register("category", {
                      required: "Category Is Required",
                    })}
                    onKeyUp={() => {
                      trigger("category");
                    }}
                    aria-label="Default select example"
                  >
                    <option value="">category</option>
                    {categories?.category?.map((cat) =>{
                      return(
                        <option value={+cat.id}>{cat.name}</option>
                      )
                    })}
                  </select>
                  {errors.category && (
                    <small className="text-danger">
                      {errors.category.message}
                    </small>
                  )}
                </div>
              </div>
              <div className="col-10">
                <div className="input-group input-group-lg  mb-1 ms-sm-5 ">
                  <span
                    className="input-group-text fs-3  filed-icon"
                    id="basic-addon1"
                  >
                    <FontAwesomeIcon icon={faAdversal} />
                  </span>
                  <textarea
                    rows="1"
                    type="text"
                    className={`form-control filed 
                                      ${errors.descriprion && "invalid"}`}
                    {...register("descriprion", {
                      required: "Description is Required",
                    })}
                    onKeyUp={() => {
                      trigger("descriprion");
                    }}
                    placeholder="Resturant Description"
                  />
                  {errors.descriprion && (
                    <small className="text-danger">
                      {errors.descriprion.message}
                    </small>
                  )}
                </div>
              </div>
              <div className="images-box col-10">
                <div className="col-6 offset-2">
                  <div className="input-group input-group-lg  mb-1 ">
                    <span className={`input-group-text fs-3 filed filed-icon `}>
                      <FontAwesomeIcon icon={faImages} />
                    </span>
                    <input
                      type="file"
                      id="poster"
                      accept={"image/*"}
                      alt={"..."}
                      multiple="multiple"
                      className={`form-control filed 
                        ${errors.images && "invalid"}`}
                      {...register(`images`, {
                        required: "One Image At Least is Required",
                      })}
                      onKeyUp={() => {
                        trigger("images");
                      }}
                      placehol
                      der="Package Poster"
                    />
                    {errors.images && (
                      <small className="text-danger">
                        {errors.images.message}
                      </small>
                    )}
                  </div>
                </div>
                <div
                  class="alert alert-warning d-flex align-items-center h-50"
                  role="alert"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
                    viewBox="0 0 16 16"
                    role="img"
                    aria-label="Warning:"
                  >
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                  </svg>
                  <div>You can upload multiple photos</div>
                </div>
                {/* </div> */}
                {/* <RenderImages /> */}
                {/* <span
                  className={`fs-3 n-icon plus ${
                    imageFiledsNumb === 9 && "d-none"
                  } `}
                >
                  <FontAwesomeIcon
                    icon={faPlusCircle}
                    onClick={() => {
                      setimageFiledsNumb(imageFiledsNumb + 1);
                    }}
                  />
                </span>
                <span
                  className={`fs-3  n-icon minus ${
                    imageFiledsNumb === 1 && "d-none"
                  } `}
                >
                  <FontAwesomeIcon
                    icon={faMinusCircle}
                    onClick={() => {
                      setimageFiledsNumb(imageFiledsNumb - 1);
                    }}
                  />
                </span> */}
              </div>
            </div>
            {errMsg && (
              <div
                className="alert alert-danger d-flex align-items-center col-8 offset-2  server-errors "
                role="alert"
              >
                <FontAwesomeIcon
                  icon={faExclamationTriangle}
                  className="bi flex-shrink-1 me-4 "
                  width="24"
                  height="24"
                  role="img"
                  aria-label="Danger:"
                ></FontAwesomeIcon>
                <div className="text-center">{errMsg}</div>
              </div>
            )}
            <div className="div-icon col-10  ">
              <TermsModal seeTerms={seeTerms} setseeTerms={setseeTerms} />
              <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#termsmodal"
                className={`terms-icon btn btn-secondary `}
              >
                See Privecy & Terms
              </button>
            </div>
            <div className="div-icon col-10  ">
              <button
                className={`one-icon `}
                type="submit"
                disabled={seeTerms === 0 ? true : false}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
let AddHotel = () => {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);
  const [notArobot, setnotArobot] = useState(false);
  const [isloading, setIsLooading] = useState(false);
  const [classFiledsNumb, setclassFiledsNumb] = useState(1);
  const [seeTerms, setseeTerms] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
  } = useForm();
  const {
    data: categories,
    fetchError: categoriesErrors,
    isLoading: categoriesIsLoading,
  } = useAxiosGet("/api/getHotelCategory");
  const OnSubmit = async ({
    name,
    rate,
    location,
    support_email,
    img_title_deed: i,
    category,
    descriprion,
    images,
    ...classes
  }) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("rate", rate);
    formData.append("location", location);
    formData.append("img_title_deed", i[0]);
    formData.append("category", category);
    formData.append("support_email", support_email);
    formData.append("description", descriprion);
    let img = [...Object.values(images)];
    img.forEach((element) => {
      formData.append("img[]", element);
    });
    let names = [];
    let prices = [];
    let people = [];
    let all = [...Object.values(classes)];
    for (let i = 0; i < all.length / 3; i++) {
      names.push(all[i * 3]);
      prices.push(all[i * 3 + 1]);
      people.push(all[i * 3 + 2]);
    }
    for (let i = 0; i < all.length / 3; i++) {
      formData.append(`names[${i}]`, names[i]);
      formData.append(`classes[${i}]`, prices[i]);
      formData.append(`number_of_people[${i}]`, people[i]);
    }

    setIsLooading(true);
    try {
      const response = await axios.post("/api/addHotel", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${auth.atoken}`,
        },
        withCredentials: true,
      });
      console.log(response.data);
      setIsLooading(false);
      setSuccess(true);
      if (response.data.status === 1) {
        navigate("/home");
      } else {
        setErrMsg(response.data.message);
      }
    } catch (err) {
      setIsLooading(false);
      if (!err?.message) {
        setErrMsg("No Server Response");
        console.log("No Server Response");
      } else if (err?.response?.status === 0) {
        setErrMsg(err.response.data.message);
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

  let AddClassesToPlace = ({ id }) => {
    return (
      <>
        <div className="col-4">
          <div className="input-group input-group-lg  mb-1 ms-sm-5 ">
            <span className={`input-group-text fs-3 filed filed-icon `}>
              <FontAwesomeIcon icon={faBuildingWheat} />
            </span>
            <input
              type="text"
              className={`form-control filed 
                                        ${errors[`names-${id}`] && "invalid"}`}
              {...register(`names-${id}`, {
                required: "Class Name is Required",
              })}
              placeholder="Class Name"
            />
            {errors[`names-${id}`] && (
              <small className="text-danger">
                {errors[`names-${id}`].message}
              </small>
            )}
          </div>
        </div>
        <div className="col-4">
          <div className="input-group input-group-lg  mb-1 ms-sm-5 ">
            <span className={`input-group-text fs-3 filed filed-icon `}>
              <FontAwesomeIcon icon={faMoneyBill} />
            </span>
            <input
              type="number"
              className={`form-control filed 
                                        ${
                                          errors[`classes-${id}`] && "invalid"
                                        }`}
              {...register(`classes-${id}`, {
                required: "Price is Required",
                min: {
                  value: 1,
                  message: "Minimum Booking Price is 1",
                },
                max: {
                  value: 1000000,
                  message: "Maximum Booking Price is 1000000 ",
                },
              })}
              placeholder="Class Price"
            />
            {errors[`classes-${id}`] && (
              <small className="text-danger">
                {errors[`classes-${id}`].message}
              </small>
            )}
          </div>
        </div>
        <div className="col-4">
          <div className="input-group input-group-lg  mb-1 ms-sm-5 ">
            <span className={`input-group-text fs-3 filed filed-icon `}>
              <FontAwesomeIcon icon={faPeopleRoof} />
            </span>
            <input
              type="number"
              className={`form-control filed 
                                              ${
                                                errors[
                                                  `number_of_people-${id}`
                                                ] && "invalid"
                                              }`}
              {...register(`number_of_people-${id}`, {
                required: "People Number is Required",
                min: {
                  value: 1,
                  message: "Minimum People Number is 1",
                },
                max: {
                  value: 100,
                  message: "Maximum People Number is 100",
                },
              })}
              placeholder="People Number"
            />
            {errors[`number_of_people-${id}`] && (
              <small className="text-danger">
                {errors[`number_of_people-${id}`].message}
              </small>
            )}
          </div>
        </div>
      </>
    );
  };
  let RenderClasses = () => {
    const row = [];
    for (let i = 0; i < classFiledsNumb; i++) {
      row.push(<AddClassesToPlace key={i} id={i} />);
    }
    return row;
  };

  return (
    <>
      <div className="container addresturant">
        <div className="row ">
          <div className="col-12 title">Add Your Hotel Info</div>
          <form onSubmit={handleSubmit(OnSubmit)}>
            <div className=" sub-title text-center ms-5">
              Firstly We Will Need Your Personal Email And The Ownership
              Certificate For Your Place
            </div>
            <div className="row offset-1">
              <div className="col-5">
                <div className=" input-group input-group-lg   mb-1 ms-sm-5 ">
                  <span
                    className="input-group-text fs-3 filed filed-icon"
                    id="basic-addon1"
                  >
                    <FontAwesomeIcon icon={faEnvelope} />
                  </span>
                  <input
                    type="text"
                    className={`form-control filed ${
                      errors.support_email && "invalid"
                    }`}
                    {...register("support_email", {
                      required: "Email is Required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid Email address",
                      },
                    })}
                    onKeyUp={() => {
                      trigger("support_email");
                    }}
                    placeholder="Your Mail Address "
                  />
                  {errors.support_email && (
                    <small className="text-danger ">
                      {errors.support_email.message}
                    </small>
                  )}
                </div>
              </div>
              <div className="col-5 ">
                <div className="row">
                  <div className="col-12">
                    <div className="input-group input-group-lg  mb-1 ms-sm-5 ">
                      <span
                        className={`input-group-text fs-3 filed filed-icon `}
                      >
                        <FontAwesomeIcon icon={faAddressCard} />
                      </span>
                      <input
                        type="file"
                        id="poster"
                        accept={"image/*"}
                        alt={"..."}
                        className={`form-control filed 
                        ${errors.img_title_deed && "invalid"}`}
                        {...register(`img_title_deed`, {
                          required: "Ownership Certificate is Required",
                        })}
                        onKeyUp={() => {
                          trigger("img_title_deed");
                        }}
                        placehol
                        der="Package Poster"
                      />
                      {errors.img_title_deed && (
                        <small className="text-danger">
                          {errors.img_title_deed.message}
                        </small>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <hr className={"col-11 my-2 hrr"} />
              <div className="col-5">
                <div className="input-group input-group-lg  mb-1 ms-sm-5 ">
                  <span className={`input-group-text fs-3 filed filed-icon `}>
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
                    placeholder="Place Name"
                  />
                  {errors.name && (
                    <small className="text-danger">{errors.name.message}</small>
                  )}
                </div>
              </div>
              <div className="col-5">
                <div className="input-group input-group-lg mb-1 ms-sm-5">
                  <span
                    className="input-group-text fs-3  filed-icon"
                    id="basic-addon1"
                  >
                    <FontAwesomeIcon icon={faRankingStar} />
                  </span>
                  <select
                    className={`form-select  filed ${errors.rate && "invalid"}`}
                    {...register("rate", {
                      required: "Place Rate Is Required",
                    })}
                    onKeyUp={() => {
                      trigger("rate");
                    }}
                    aria-label="Default select example"
                  >
                    <option value="">Rate</option>
                    <option value="1">1 Star</option>
                    <option value="2">2 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="5">5 Stars </option>
                  </select>
                  {errors.rate && (
                    <small className="text-danger">{errors.rate.message}</small>
                  )}
                </div>
              </div>
              <div className="col-5">
                <div className="input-group input-group-lg  mb-1 ms-sm-5 ">
                  <span
                    className="input-group-text fs-3  filed-icon"
                    id="basic-addon1"
                  >
                    <FontAwesomeIcon icon={faMapLocationDot} />
                  </span>
                  <input
                    type="text"
                    className={`form-control filed 
                                      ${errors.location && "invalid"}`}
                    {...register("location", {
                      required: "Place location is Required",
                    })}
                    onKeyUp={() => {
                      trigger("location");
                    }}
                    placeholder="Place Location"
                  />
                  {errors.location && (
                    <small className="text-danger">
                      {errors.location.message}
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
                    <FontAwesomeIcon icon={faMartiniGlassCitrus} />
                  </span>

                  <select
                    className={`form-select  filed ${
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
                    <option value="">category</option>
                    {categories?.category?.map((cat) =>{
                      return(
                        <option value={+cat.id}>{cat.name}</option>
                      )
                    })}
                  </select>
                  {errors.category && (
                    <small className="text-danger">
                      {errors.category.message}
                    </small>
                  )}
                </div>
              </div>
              <div className="col-10 classes-box">
                <RenderClasses />
                <div className="col-2">
                  <span
                    className={`fs-3 n-icon plus ${
                      classFiledsNumb === 5 && "d-none"
                    } `}
                  >
                    <FontAwesomeIcon
                      icon={faPlusCircle}
                      onClick={() => {
                        setclassFiledsNumb(classFiledsNumb + 1);
                      }}
                    />
                  </span>
                  <span
                    className={`fs-3  n-icon minus ${
                      classFiledsNumb === 1 && "d-none"
                    } `}
                  >
                    <FontAwesomeIcon
                      icon={faMinusCircle}
                      onClick={() => {
                        setclassFiledsNumb(classFiledsNumb - 1);
                      }}
                    />
                  </span>
                </div>
              </div>
              <div className="col-10">
                <div className="input-group input-group-lg  mb-1 ms-sm-5 ">
                  <span
                    className="input-group-text fs-3  filed-icon"
                    id="basic-addon1"
                  >
                    <FontAwesomeIcon icon={faAdversal} />
                  </span>
                  <textarea
                    rows="1"
                    type="text"
                    className={`form-control filed 
                                      ${errors.descriprion && "invalid"}`}
                    {...register("descriprion", {
                      required: "Description is Required",
                    })}
                    onKeyUp={() => {
                      trigger("descriprion");
                    }}
                    placeholder="Place Description"
                  />
                  {errors.descriprion && (
                    <small className="text-danger">
                      {errors.descriprion.message}
                    </small>
                  )}
                </div>
              </div>
              <div className="images-box col-10">
                <div className="col-6 offset-2">
                  <div className="input-group input-group-lg  mb-1 ">
                    <span className={`input-group-text fs-3 filed filed-icon `}>
                      <FontAwesomeIcon icon={faImages} />
                    </span>
                    <input
                      type="file"
                      id="poster"
                      accept={"image/*"}
                      alt={"..."}
                      multiple="multiple"
                      className={`form-control filed 
                        ${errors.images && "invalid"}`}
                      {...register(`images`, {
                        required: "One Image At Least is Required",
                      })}
                      onKeyUp={() => {
                        trigger("images");
                      }}
                      placehol
                      der="Package Poster"
                    />
                    {errors.images && (
                      <small className="text-danger">
                        {errors.images.message}
                      </small>
                    )}
                  </div>
                </div>
                <div
                  class="alert alert-warning d-flex align-items-center h-50"
                  role="alert"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
                    viewBox="0 0 16 16"
                    role="img"
                    aria-label="Warning:"
                  >
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                  </svg>
                  <div>You can upload multiple photos</div>
                </div>
              </div>
            </div>
            {errMsg && (
              <div
                className="alert alert-danger d-flex align-items-center col-8 offset-2  server-errors "
                role="alert"
              >
                <FontAwesomeIcon
                  icon={faExclamationTriangle}
                  className="bi flex-shrink-1 me-4 "
                  width="24"
                  height="24"
                  role="img"
                  aria-label="Danger:"
                ></FontAwesomeIcon>
                <div className="text-center">{errMsg}</div>
              </div>
            )}
            <div className="div-icon col-10  ">
              <TermsModal seeTerms={seeTerms} setseeTerms={setseeTerms} />
              <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#termsmodal"
                className={`terms-icon btn btn-secondary `}
              >
                See Privecy & Terms
              </button>
            </div>
            <div className="div-icon col-10  ">
              <button
                className={`one-icon `}
                type="submit"
                disabled={seeTerms === 0 ? true : false}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
let AddNaturalPlace = () => {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);
  const [notArobot, setnotArobot] = useState(false);
  const [isloading, setIsLooading] = useState(false);
  const [classFiledsNumb, setclassFiledsNumb] = useState(1);
  const [seeTerms, setseeTerms] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
  } = useForm();
  const {
    data: categories,
    fetchError: categoriesErrors,
    isLoading: categoriesIsLoading,
  } = useAxiosGet("/api/getHotelCategory");
  const OnSubmit = async ({
    name,
    location,
    support_email,
    category,
    descriprion,
    images,
  }) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("location", location);
    formData.append("category", category);
    formData.append("support_email", support_email);
    formData.append("description", descriprion);
    let img = [...Object.values(images)];
    formData.append("img_title_deed", img[0]);
    img.forEach((element) => {
      formData.append("img[]", element);
    });

    setIsLooading(true);
    try {
      const response = await axios.post("/api/addPlace", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${auth.atoken}`,
          //  'Access-Control-Allow-Origin' : 'http://localhost:8000'
        },
        withCredentials: true,
      });
      console.log(response.data);
      setIsLooading(false);
      setSuccess(true);
      if (response.data.status === "1") {
        navigate("/home");
      } else {
        setErrMsg(response.data.message);
      }
    } catch (err) {
      setIsLooading(false);
      if (!err?.message) {
        setErrMsg("No Server Response");
        console.log("No Server Response");
      } else if (err?.response?.status === 0) {
        setErrMsg(err.response.data.message);
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
      <div className="container addresturant">
        <div className="row ">
          <div className="col-12 title">Add Natural Place Info</div>
          <form onSubmit={handleSubmit(OnSubmit)}>
            <div className=" sub-title text-center ms-5">
              Firstly We Will Need Your Personal Email
            </div>
            <div className="row offset-1">
              <div className="col-10">
                <div className=" input-group input-group-lg   mb-1 ms-sm-5 ">
                  <span
                    className="input-group-text fs-3 filed filed-icon"
                    id="basic-addon1"
                  >
                    <FontAwesomeIcon icon={faEnvelope} />
                  </span>
                  <input
                    type="text"
                    className={`form-control filed ${
                      errors.support_email && "invalid"
                    }`}
                    {...register("support_email", {
                      required: "Email is Required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid Email address",
                      },
                    })}
                    onKeyUp={() => {
                      trigger("support_email");
                    }}
                    placeholder="Your Mail Address "
                  />
                  {errors.support_email && (
                    <small className="text-danger ">
                      {errors.support_email.message}
                    </small>
                  )}
                </div>
              </div>
              <hr className={"col-11 my-2 hrr"} />
              <div className="col-5">
                <div className="input-group input-group-lg  mb-1 ms-sm-5 ">
                  <span className={`input-group-text fs-3 filed filed-icon `}>
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
                    placeholder="Place Name"
                  />
                  {errors.name && (
                    <small className="text-danger">{errors.name.message}</small>
                  )}
                </div>
              </div>
              <div className="col-5">
                <div className="input-group input-group-lg mb-1 ms-sm-5">
                  <span
                    className="input-group-text fs-3  filed-icon"
                    id="basic-addon1"
                  >
                    <FontAwesomeIcon icon={faMountain} />
                  </span>

                  <select
                    className={`form-select  filed ${
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
                    <option value="">category</option>
                    <option value="">category</option>
                    {categories?.category?.map((cat) =>{
                      return(
                        <option value={+cat.id}>{cat.name}</option>
                      )
                    })}
                  </select>
                  {errors.category && (
                    <small className="text-danger">
                      {errors.category.message}
                    </small>
                  )}
                </div>
              </div>
              <div className="col-10">
                <div className="input-group input-group-lg  mb-1 ms-sm-5 ">
                  <span
                    className="input-group-text fs-3  filed-icon"
                    id="basic-addon1"
                  >
                    <FontAwesomeIcon icon={faMapLocationDot} />
                  </span>
                  <input
                    type="text"
                    className={`form-control filed 
                                      ${errors.location && "invalid"}`}
                    {...register("location", {
                      required: "Place location is Required",
                    })}
                    onKeyUp={() => {
                      trigger("location");
                    }}
                    placeholder="Place Location"
                  />
                  {errors.location && (
                    <small className="text-danger">
                      {errors.location.message}
                    </small>
                  )}
                </div>
              </div>
              <div className="col-10">
                <div className="input-group input-group-lg  mb-1 ms-sm-5 ">
                  <span
                    className="input-group-text fs-3  filed-icon"
                    id="basic-addon1"
                  >
                    <FontAwesomeIcon icon={faAdversal} />
                  </span>
                  <textarea
                    rows="1"
                    type="text"
                    className={`form-control filed 
                                      ${errors.descriprion && "invalid"}`}
                    {...register("descriprion", {
                      required: "Description is Required",
                    })}
                    onKeyUp={() => {
                      trigger("descriprion");
                    }}
                    placeholder="Place Description"
                  />
                  {errors.descriprion && (
                    <small className="text-danger">
                      {errors.descriprion.message}
                    </small>
                  )}
                </div>
              </div>
              <div className="images-box col-10">
                <div className="col-5 offset-1">
                  <div className="input-group input-group-lg  mb-1 ">
                    <span className={`input-group-text fs-3 filed filed-icon `}>
                      <FontAwesomeIcon icon={faImages} />
                    </span>
                    <input
                      type="file"
                      id="poster"
                      accept={"image/*"}
                      alt={"..."}
                      multiple="multiple"
                      className={`form-control filed 
                        ${errors.images && "invalid"}`}
                      {...register(`images`, {
                        required: "One Image At Least is Required",
                      })}
                      onKeyUp={() => {
                        trigger("images");
                      }}
                      placehol
                      der="Package Poster"
                    />
                    {errors.images && (
                      <small className="text-danger">
                        {errors.images.message}
                      </small>
                    )}
                  </div>
                </div>
                <div
                  class="alert alert-warning d-flex align-items-center h-50"
                  role="alert"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
                    viewBox="0 0 16 16"
                    role="img"
                    aria-label="Warning:"
                  >
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                  </svg>
                  <div>You can upload multiple photos</div>
                </div>
              </div>
              <div className="col-7 offset-2">
                <div class="alert alert-info" role="alert">
                  <h4 class="alert-heading">Note !</h4>
                  <p>
                    Your Place will be Undergo to Our Admin's Vision , So After
                    Accept it In Our Application Or Reject It, We Will Send For
                    You An Email On Your Email Address And Telling You The News
                  </p>
                  <hr />
                  <p class="mb-0">
                    The response process may take from one to four days
                  </p>
                </div>
              </div>
            </div>
            {errMsg && (
              <div
                className="alert alert-danger d-flex align-items-center col-8 offset-2  server-errors "
                role="alert"
              >
                <FontAwesomeIcon
                  icon={faExclamationTriangle}
                  className="bi flex-shrink-1 me-4 "
                  width="24"
                  height="24"
                  role="img"
                  aria-label="Danger:"
                ></FontAwesomeIcon>
                <div className="text-center">{errMsg}</div>
              </div>
            )}
            <div className="div-icon col-10  ">
              <button className={`one-icon `} type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
let AddAirLine = () => {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);
  const [notArobot, setnotArobot] = useState(false);
  const [isloading, setIsLooading] = useState(false);
  const [classFiledsNumb, setclassFiledsNumb] = useState(1);
  const [seeTerms, setseeTerms] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
  } = useForm();
  const OnSubmit2 = async ({
    name,
    location,
    support_email,
    img_title_deed,
    category,
    descriprion,
    images,
    ...classes
  }) => {
    let names = [];
    let prices = [];
    let people = [];
    let all = [...Object.values(classes)];
    for (let i = 0; i < [...Object.values(classes)].length / 3; i++) {
      names.push(all[i * 3]);
      prices.push(all[i * 3 + 1]);
      people.push(all[i * 3 + 2]);
    }
    console.log(all);
    console.log(names, prices, people);
  };
  const OnSubmit = async ({
    name,
    location,
    support_email,
    img_title_deed,
    descriprion,
    ...classes
  }) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("location", location);
    formData.append("img_title_deed", img_title_deed[0]);
    formData.append("support_email", support_email);
    formData.append("description", descriprion);
    let names = [];
    let prices = [];
    let all = [...Object.values(classes)];
    for (let i = 0; i < all.length / 3; i++) {
      names.push(all[i * 3]);
      prices.push(all[i * 3 + 1]);
    }
    for (let i = 0; i < all.length / 3; i++) {
      formData.append(`names[${i}]`, names[i]);
      formData.append(`classes[${i}]`, prices[i]);
    }
    setIsLooading(true);
    try {
      const response = await axios.post("/api/addAirplane", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${auth.atoken}`,
        },
        withCredentials: true,
      });
      console.log(response.data);
      setIsLooading(false);
      setSuccess(true);
      if (response.data.status === "1") {
        navigate("/home");
      } else {
        setErrMsg(response.data.message);
      }
    } catch (err) {
      setIsLooading(false);
      if (!err?.message) {
        setErrMsg("No Server Response");
        console.log("No Server Response");
      } else if (err?.response?.status === 0) {
        setErrMsg(err.response.data.message);
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

  let AddClassesToPlace = ({ id }) => {
    return (
      <>
        <div className="col-6">
          <div className="input-group input-group-lg  mb-1 ms-sm-5 ">
            <span className={`input-group-text fs-3 filed filed-icon `}>
              <FontAwesomeIcon icon={faLayerGroup} />
            </span>
            <input
              type="text"
              className={`form-control filed 
                                        ${errors[`names-${id}`] && "invalid"}`}
              {...register(`names-${id}`, {
                required: "Class Name is Required",
              })}
              placeholder="Class Name"
            />
            {errors[`names-${id}`] && (
              <small className="text-danger">
                {errors[`names-${id}`].message}
              </small>
            )}
          </div>
        </div>
        <div className="col-6">
          <div className="input-group input-group-lg  mb-1 ms-sm-5 ">
            <span className={`input-group-text fs-3 filed filed-icon `}>
              <FontAwesomeIcon icon={faMoneyBill} />
            </span>
            <input
              type="number"
              className={`form-control filed 
                                        ${
                                          errors[`classes-${id}`] && "invalid"
                                        }`}
              {...register(`classes-${id}`, {
                required: "Price is Required",
                min: {
                  value: 1,
                  message: "Minimum Booking Price is 1",
                },
                max: {
                  value: 100000,
                  message: "Maximum Booking Price is 100000 ",
                },
              })}
              placeholder="Class Price"
            />
            {errors[`classes-${id}`] && (
              <small className="text-danger">
                {errors[`classes-${id}`].message}
              </small>
            )}
          </div>
        </div>
      </>
    );
  };
  let RenderClasses = () => {
    const row = [];
    for (let i = 0; i < classFiledsNumb; i++) {
      row.push(<AddClassesToPlace key={i} id={i} />);
    }
    return row;
  };

  return (
    <>
      <div className="container addresturant">
        <div className="row ">
          <div className="col-12 title">Add Your AirLine Office Info</div>
          <form onSubmit={handleSubmit(OnSubmit)}>
            <div className=" sub-title text-center ms-5">
              Firstly We Will Need Your Personal Email And The Ownership
              Certificate For Your Place
            </div>
            <div className="row offset-1">
              <div className="col-5">
                <div className=" input-group input-group-lg   mb-1 ms-sm-5 ">
                  <span
                    className="input-group-text fs-3 filed filed-icon"
                    id="basic-addon1"
                  >
                    <FontAwesomeIcon icon={faEnvelope} />
                  </span>
                  <input
                    type="text"
                    className={`form-control filed ${
                      errors.support_email && "invalid"
                    }`}
                    {...register("support_email", {
                      required: "Email is Required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid Email address",
                      },
                    })}
                    onKeyUp={() => {
                      trigger("support_email");
                    }}
                    placeholder="Your Mail Address "
                  />
                  {errors.support_email && (
                    <small className="text-danger ">
                      {errors.support_email.message}
                    </small>
                  )}
                </div>
              </div>
              <div className="col-5 ">
                <div className="row">
                  <div className="col-12">
                    <div className="input-group input-group-lg  mb-1 ms-sm-5 ">
                      <span
                        className={`input-group-text fs-3 filed filed-icon `}
                      >
                        <FontAwesomeIcon icon={faAddressCard} />
                      </span>
                      <input
                        type="file"
                        id="poster"
                        accept={"image/*"}
                        alt={"..."}
                        className={`form-control filed 
                        ${errors.img_title_deed && "invalid"}`}
                        {...register(`img_title_deed`, {
                          required: "Ownership Certificate is Required",
                        })}
                        onKeyUp={() => {
                          trigger("img_title_deed");
                        }}
                        placehol
                        der="Package Poster"
                      />
                      {errors.img_title_deed && (
                        <small className="text-danger">
                          {errors.img_title_deed.message}
                        </small>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <hr className={"col-11 my-2 hrr"} />
              <div className="col-5">
                <div className="input-group input-group-lg  mb-1 ms-sm-5 ">
                  <span className={`input-group-text fs-3 filed filed-icon `}>
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
                    placeholder="Place Name"
                  />
                  {errors.name && (
                    <small className="text-danger">{errors.name.message}</small>
                  )}
                </div>
              </div>
              <div className="col-5">
                <div className="input-group input-group-lg  mb-1 ms-sm-5 ">
                  <span
                    className="input-group-text fs-3  filed-icon"
                    id="basic-addon1"
                  >
                    <FontAwesomeIcon icon={faMapLocationDot} />
                  </span>
                  <input
                    type="text"
                    className={`form-control filed 
                                      ${errors.location && "invalid"}`}
                    {...register("location", {
                      required: "Place location is Required",
                    })}
                    onKeyUp={() => {
                      trigger("location");
                    }}
                    placeholder="Place Location"
                  />
                  {errors.location && (
                    <small className="text-danger">
                      {errors.location.message}
                    </small>
                  )}
                </div>
              </div>
              <div className="col-10 classes-box">
                <RenderClasses />
                <div className="col-2">
                  <span
                    className={`fs-3 n-icon plus ${
                      classFiledsNumb === 5 && "d-none"
                    } `}
                  >
                    <FontAwesomeIcon
                      icon={faPlusCircle}
                      onClick={() => {
                        setclassFiledsNumb(classFiledsNumb + 1);
                      }}
                    />
                  </span>
                  <span
                    className={`fs-3  n-icon minus ${
                      classFiledsNumb === 1 && "d-none"
                    } `}
                  >
                    <FontAwesomeIcon
                      icon={faMinusCircle}
                      onClick={() => {
                        setclassFiledsNumb(classFiledsNumb - 1);
                      }}
                    />
                  </span>
                </div>
              </div>
              <div className="col-10">
                <div className="input-group input-group-lg  mb-1 ms-sm-5 ">
                  <span
                    className="input-group-text fs-3  filed-icon"
                    id="basic-addon1"
                  >
                    <FontAwesomeIcon icon={faAdversal} />
                  </span>
                  <textarea
                    rows="1"
                    type="text"
                    className={`form-control filed 
                                      ${errors.descriprion && "invalid"}`}
                    {...register("descriprion", {
                      required: "Description is Required",
                    })}
                    onKeyUp={() => {
                      trigger("descriprion");
                    }}
                    placeholder="Place Description"
                  />
                  {errors.descriprion && (
                    <small className="text-danger">
                      {errors.descriprion.message}
                    </small>
                  )}
                </div>
              </div>
            </div>
            {errMsg && (
              <div
                className="alert alert-danger d-flex align-items-center col-8 offset-2  server-errors "
                role="alert"
              >
                <FontAwesomeIcon
                  icon={faExclamationTriangle}
                  className="bi flex-shrink-1 me-4 "
                  width="24"
                  height="24"
                  role="img"
                  aria-label="Danger:"
                ></FontAwesomeIcon>
                <div className="text-center">{errMsg}</div>
              </div>
            )}
            <div className="div-icon col-10  ">
              <TermsModal seeTerms={seeTerms} setseeTerms={setseeTerms} />
              <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#termsmodal"
                className={`terms-icon btn btn-secondary `}
              >
                See Privecy & Terms
              </button>
            </div>
            <div className="div-icon col-10  ">
              <button
                className={`one-icon `}
                type="submit"
                disabled={seeTerms === 0 ? true : false}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
let AddPalce = () => {
  let [addplaceestep, setaddplaceestep] = useState(0);
  return (
    <>
      {addplaceestep === 0 ? (
        <>
          <div className="container-fluid ms-3 add-place">
            <div className="row">
              <div className="col-12 img-box ">
                <img src="/imges/weee.jpg" class="img" alt="..." />
                <div class="carousel-caption d-none d-md-block">
                <img src="/logo/22.png"  className={'trip-logo'}  alt="..." />
                  <h5 className={'logo-title'}>
                  Offers You Everything You Need And More
                  </h5>
                </div>
              </div>
              <div className="col-12 title">Add A Place To Trip Tips</div>
              <div className="col-7 sub-title m-auto">
                Trip Tips Provides A Service for Customers That Allows Them To
                Add Their places With its Information To The Application. It
                Also Allows Them, In The Event Of Proof Of Ownership, From The
                Management Of Their Places And Reservations Through The Section
                Of Mange Places
              </div>
            </div>
            <div className="row kind-form">
              <div className="kind-title">
                What Kind Of Places Do You Want To Add?
              </div>
              <div className="kind-feild">
                <div
                  class="btn-group btn-group-lg"
                  role="group"
                  aria-label="Basic example"
                >
                  <button
                    type="button"
                    class="btn btn-outline-primary"
                    onClick={() => {
                      setaddplaceestep(1);
                    }}
                  >
                    Resturant
                  </button>
                  <button
                    type="button"
                    class="btn  btn-outline-primary"
                    onClick={() => {
                      setaddplaceestep(2);
                    }}
                  >
                    Hotel
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-primary"
                    onClick={() => {
                      setaddplaceestep(3);
                    }}
                  >
                    Airline office
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-primary"
                    onClick={() => {
                      setaddplaceestep(4);
                    }}
                  >
                    Natural Place
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : addplaceestep === 1 ? (
        <>
          <AddResturant />
        </>
      ) : addplaceestep === 2 ? (
        <>
          <AddHotel />
        </>
      ) : addplaceestep === 3 ? (
        <>
          <AddAirLine />
        </>
      ) : addplaceestep === 4 ? (
        <>
          <AddNaturalPlace />
        </>
      ) : (
        <></>
      )}
    </>
  );
};
export default AddPalce;
