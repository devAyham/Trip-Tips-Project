import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useSearchParams, useParams } from "react-router-dom";
import { baseURl } from "../../../api/baseURL";
import { useNavigate } from "react-router";

let HelpCenter = ({ section }) => {
  console.log(section);
  let activeIconToggle = (e) => {
    let nav_link = document.querySelectorAll(".nav-link");
    nav_link.forEach((element) => {
      element.classList.remove("active");
    });
    e.target.classList.add("active");
  };
  return (
    <>
      <div className="row">
        <div className="help-cards col-12 ">
          <div className="the-main-card card ">
            <div className="card-header the-main-card-header">
              <ul className="nav nav-tabs card-header-tabs">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="true"
                    href="#1"
                    onClick={(e) => {
                      activeIconToggle(e);
                    }}
                  >
                    New
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#2"
                    onClick={(e) => {
                      activeIconToggle(e);
                    }}
                  >
                    Answerd
                  </a>
                </li>
              </ul>
            </div>
            <div className="card-body the-main-card-body ">
              <RenderHelpCards card={1} section={section} />
              <RenderHelpCards card={1} section={section} />
              <RenderHelpCards card={1} section={section} />
              <RenderHelpCards card={1} section={section} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
let RenderHelpCards = ({ card, section }) => {
  console.log(section);
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
  } = useForm();
  const OnSubmit = async ({ description }) => {
    console.log(description);
  };
  return (
    <>
      <div className="card help-card mb-3 ">
        <div className="row g-0">
          <div className="col-md-3">
            <div className="img-box">
              <img
                src="/logo/4.png"
                className="img-fluid rounded-start"
                alt="..."
              />
            </div>
          </div>
          <div className="col-md-9">
            <div className="card-body">
              <h5 className="card-title">Customar Name</h5>
              <p className="card-text my-1">
                Question Lorem ipsum dolor sit, amet consectetur adipisicing
                elit. Ratione quidem iste illo dolore iure consequatur ad
                molestiae, repellendus error atque qui magnam pariatur incidunt
                distinctio nihil assumenda quisquam magni maxime.
              </p>
              <p className="card-text my-0 mx-0 ">
                <small className="text-muted">Time/Time/Time</small>
              </p>
              <form
                className={`form ${section === 2 ? "d-none" : "d-block"} `}
                onSubmit={handleSubmit(OnSubmit)}
              >
                <div className="row d-flex justify-content-center align-items-center">
                  <div className="col-8">
                    <textarea
                      type="text"
                      rows={1}
                      className={`form-control filed col-8
                                      ${errors.description && "invalid"}`}
                      {...register("description", {
                        required: "This Feild is Required",
                      })}
                      onKeyUp={() => {
                        trigger("description");
                      }}
                      placeholder="Write Your Awnser"
                    />
                  </div>
                  <div className="div-icon col-4">
                    <button className="one-icon" type="submit">
                      Answer
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
let ReportCenter = ({ section }) => {
  const navigate = useNavigate();
  const [reportsType, setreportsType] = useState(1);
  console.log(section);
  let activeIconToggle = (e) => {
    let nav_link = document.querySelectorAll(".nav-link");
    nav_link.forEach((element) => {
      element.classList.remove("active");
    });
    e.target.classList.add("active");
  };
  return (
    <>
      <div className="row ">
        <div className="report-cards col-12">
          <div className="the-main-card card ">
            <div className="card-header the-main-card-header">
              <ul className="nav nav-tabs card-header-tabs">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="true"
                    href="#1"
                    onClick={(e) => {
                      activeIconToggle(e);
                      setreportsType(1);
                    }}
                  >
                    Comments Reports
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#2"
                    onClick={(e) => {
                      activeIconToggle(e);
                      setreportsType(2);
                    }}
                  >
                    Places Reports
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#2"
                    onClick={(e) => {
                      activeIconToggle(e);
                      setreportsType(3);
                    }}
                  >
                    Packages Reports
                  </a>
                </li>
              </ul>
            </div>
            <div className="card-body the-main-card-body ">
              <div class="row row-cols-1 row-cols-md-3 g-4">
                {reportsType === 1 ? (
                  <>
                    <RenderReportComments />
                    <RenderReportComments />
                    <RenderReportComments />
                    <RenderReportComments />
                  </>
                ) : reportsType === 2 ? (
                  <>
                    <RenderReportPlaces />
                    <RenderReportPlaces />
                    <RenderReportPlaces />
                    <RenderReportPlaces />
                    <RenderReportPlaces />
                    <RenderReportPlaces />
                    <RenderReportPlaces />
                    <RenderReportPlaces />
                  </>
                ) : reportsType === 3 ? (
                  <>
                    <RenderReportPackages />
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
let RenderReportComments = () => {
  const navigate = useNavigate();
  return (
    <>
      {" "}
      <div class="col">
        <div class="card report-card h-100">
          <div class="card-header header-card">
            <h4 className="">By : </h4>
            <div className="user-info">
              <div className="img-model ">
                <img
                  src={"/logo/3.png"}
                  alt={"..."}
                  onClick={() => {
                    navigate("/dashboard/users");
                  }}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <h6
                className="div"
                onClick={() => {
                  navigate("/dashboard/users");
                }}
                style={{ cursor: "pointer" }}
              >
                Ayham Hammami
              </h6>
            </div>
          </div>
          <div class="card-body">
            <h5 class="card-title">On :</h5>
            <h6
              onClick={() => {
                navigate("/dashboard/users");
              }}
              style={{ cursor: "pointer" }}
            >
              A Comment For Amgad Alwattar <br /> / Id : 40{" "}
            </h6>
            <h5> Report Note :</h5>
            <p class="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
          </div>
          <div class="card-footer footer-card">
            <small class="">time/time/time</small>
          </div>
        </div>
      </div>
    </>
  );
};
let RenderReportPlaces = () => {
  const navigate = useNavigate();
  return (
    <>
      {" "}
      <div class="col">
        <div class="card report-card h-100">
          <div class="card-header header-card">
            <h4 className="">By : </h4>
            <div className="user-info">
              <div className="img-model ">
                <img
                  src={"/logo/3.png"}
                  alt={"..."}
                  onClick={() => {
                    navigate("/dashboard/users");
                  }}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <h6
                className="div"
                onClick={() => {
                  navigate("/dashboard/users");
                }}
                style={{ cursor: "pointer" }}
              >
                Ayham Hammami
              </h6>
            </div>
          </div>
          <div class="card-body">
            <h5 class="card-title">On :</h5>
            <h6
              onClick={() => {
                navigate("/dashboard/contracts");
              }}
              style={{ cursor: "pointer" }}
            >
              A Sweet Park Resturant <br />/ Id : 40
            </h6>
            <h5> Report Note :</h5>
            <p class="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
          </div>
          <div class="card-footer footer-card">
            <small class="">time/time/time</small>
          </div>
        </div>
      </div>
    </>
  );
};
let RenderReportPackages = () => {
  const navigate = useNavigate();
  return (
    <>
      {" "}
      <div class="col">
        <div class="card report-card h-100">
          <div class="card-header header-card">
            <h4 className="">By : </h4>
            <div className="user-info">
              <div className="img-model ">
                <img
                  src={"/logo/3.png"}
                  alt={"..."}
                  onClick={() => {
                    navigate("/dashboard/users");
                  }}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <h6
                className="div"
                onClick={() => {
                  navigate("/dashboard/users");
                }}
                style={{ cursor: "pointer" }}
              >
                Ayham Hammami
              </h6>
            </div>
          </div>
          <div class="card-body">
            <h5 class="card-title">On :</h5>
            <h6
              onClick={() => {
                navigate("/dashboard/packages");
              }}
              style={{ cursor: "pointer" }}
            >
              A Holidy Package <br /> / Id : 40
            </h6>
            <h5> Report Note :</h5>
            <p class="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
          </div>
          <div class="card-footer footer-card">
            <small class="">time/time/time</small>
          </div>
        </div>
      </div>
    </>
  );
};
let SupportCenter = () => {
  let { sec } = useParams();
  let [section, setSeection] = useState(+sec);

  return (
    <>
      <div className="container-fluid g-0 support-center">
        <div className="row mt-3">
          <div className="offset-1 col-3 fs-5  mt-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to={"/dashboard"}>Dashboard</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Support
                </li>
              </ol>
            </nav>
          </div>
          <div className="col-6 support-title mx-auto">Support Center</div>
        </div>
        <div className="row">
          <div className="col-8 mx-auto center-toggle">
            <div
              className="btn-group toggler"
              role="group"
              aria-label="Basic outlined example"
            >
              <button
                type="button"
                className={`btn help toggle-button  ${
                  section === 1 && "active"
                } `}
                onClick={() => {
                  setSeection(1);
                }}
              >
                Help Center
              </button>
              <button
                type="button"
                className={`btn report toggle-button  ${
                  section === 2 && "active"
                } `}
                onClick={() => {
                  setSeection(2);
                }}
              >
                Report Center
              </button>
            </div>
          </div>
        </div>
        <div className="row centers-box g-0 p-0">
          <div className={` help-center ${section === 1 && "active"}`}>
            <div
              className={`over-lay ${section === 2 ? "d-block" : "d-none"} `}
            />
            <HelpCenter section={section} />
          </div>
          <div
            className={`center-wall ${
              section === 1
                ? "help-active"
                : section === 2
                ? "report-active"
                : ""
            }`}
          ></div>
          <div className={` report-center ${section === 2 && "active"}`}>
            <div
              className={`over-lay ${section === 1 ? "d-block" : "d-none"}`}
            />
            <ReportCenter section={section} />
          </div>
        </div>
      </div>
    </>
  );
};
export default SupportCenter;
