import { defaults } from "chart.js";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Popover } from "bootstrap";
import { set } from "react-hook-form";

let Resturants = () => {
  return (
    <>
      <div
        class="modal fade"
        id="ownerCr"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <img src={"/logo/1.png"} alt={"..."} />
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
      {/* -========================================== */}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Modal title
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
                id="carouselExampleIndicators"
                class="carousel carousel-dark slide"
                data-bs-ride="true"
              >
                <div class="carousel-indicators">
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="0"
                    class="active"
                    aria-current="true"
                    aria-label="Slide 1"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                  ></button>
                </div>
                <div class="carousel-inner ">
                  <div class="carousel-item active ">
                    <img
                      src="/imges/mountain.jfif"
                      class="d-block w-100"
                      alt="..."
                    />
                  </div>
                  <div class="carousel-item">
                    <img src="/logo/1.png" class="d-block w-100" alt="..." />
                  </div>
                  <div class="carousel-item">
                    <img src="/logo/6.png" class="d-block w-100" alt="..." />
                  </div>
                </div>
                <button
                  class="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
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
                  data-bs-target="#carouselExampleIndicators"
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
        <tbody>
          <tr className="table-warning  ">
            <th scope="row ">1</th>
            <td>Sweet</td>
            <td>Al-tal h</td>
            <td>
              <img
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                className={"img-model"}
                width={"40px"}
                height={"40px"}
                src={"/logo/55.png"}
                alt={".."}
              />
              <img
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                className={"img-model"}
                width={"40px"}
                height={"40px"}
                src={"/logo/55.png"}
                alt={".."}
              />
              <img
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                className={"img-model"}
                width={"40px"}
                height={"40px"}
                src={"/logo/55.png"}
                alt={".."}
              />
              <img
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                className={"img-model"}
                width={"40px"}
                height={"40px"}
                src={"/logo/55.png"}
                alt={".."}
              />
              <img
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                className={"img-model"}
                width={"40px"}
                height={"40px"}
                src={"/logo/55.png"}
                alt={".."}
              />
              <img
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                className={"img-model"}
                width={"40px"}
                height={"40px"}
                src={"/logo/55.png"}
                alt={".."}
              />
              <img
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                className={"img-model"}
                width={"40px"}
                height={"40px"}
                src={"/logo/55.png"}
                alt={".."}
              />
            </td>
            <td>See Food</td>
            <td>3 Stars</td>
            <td>10$</td>
            <td>
              <img
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#ownerCr"
                className={"img-model"}
                width={"40px"}
                src={"/logo/55.png"}
                alt={".."}
              />
            </td>
            <td>ayham@gmail.com</td>
            <td>
              <button type="button" class="btn btn-success ">
                Accept
              </button>
            </td>
            <td>
              <button type="button" class="btn btn-danger ">
                Reject
              </button>
            </td>
          </tr>{" "}
        </tbody>
      </table>
    </>
  );
};
let Hotels = () => {
  return (
    <>
      <table className="table  text-center ">
        <thead>
          <tr className="table-dark ">
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Location</th>
            <th scope="col">Images</th>
            <th scope="col">Category</th>
            <th scope="col">Rate</th>
            <th scope="col">Booking price</th>
            <th scope="col">Ownership Certificate</th>
            <th scope="col">Support Email</th>
            <th scope="col"> </th>
            <th scope="col"> </th>
          </tr>
        </thead>
        <tbody>
          <tr className="table-info  text-center ">
            <th scope="row d-flex align-items-center">1</th>
            <td>merdian</td>
            <td>damascus</td>
            <td>
              <img
                className={"img-model"}
                width={"40px"}
                height={"40px"}
                src={"/imges/mountain.jfif"}
                alt={".."}
              />
              <img
                className={"img-model"}
                width={"40px"}
                height={"40px"}
                src={"/logo/55.png"}
                alt={".."}
              />
              <img
                className={"img-model"}
                width={"40px"}
                height={"40px"}
                src={"/logo/55.png"}
                alt={".."}
              />
              <img
                className={"img-model"}
                width={"40px"}
                height={"40px"}
                src={"/logo/55.png"}
                alt={".."}
              />
            </td>
            <td>Families</td>
            <td>5 Stars</td>
            <td>
              Gold : 8999
              <br /> Pronz : 8999
              <br /> Silver : 8999
            </td>
            <td>
              <img
                className={"img-model"}
                width={"40px"}
                height={"40px"}
                src={"/logo/55.png"}
                alt={".."}
              />
            </td>
            <td>joj@gmail.com</td>
            <td>
              <button type="button" class="btn btn-success ">
                Accept
              </button>
            </td>
            <td>
              <button type="button" class="btn btn-danger">
                Reject
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

let AirLines = () => {
  return (
    <>
      <table className="table  text-center ">
        <thead>
          <tr className="table-dark ">
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Location</th>
            <th scope="col">Rate</th>
            <th scope="col">Booking Price</th>
            <th scope="col">Ownership Certificate</th>
            <th scope="col">Support Email</th>
            <th scope="col"> </th>
            <th scope="col"> </th>
          </tr>
        </thead>
        <tbody>
          <tr className="table-primary  text-center">
            <th scope="row">1</th>
            <td>StaySaveLines</td>
            <td>Damascus</td>
            <td>4 Stars</td>
            <td>
              Gold : 8999
              <br /> Pronz : 8999
              <br /> Silver : 8999
            </td>
            <td>
              <img
                className={"img-model"}
                width={"40px"}
                height={"40px"}
                src={"/logo/55.png"}
                alt={".."}
              />
            </td>
            <td>Sty@g.cm</td>
            <td>
              <button type="button" class="btn btn-success ">
                Accept
              </button>
            </td>
            <td>
              <button type="button" class="btn btn-danger ">
                Reject
              </button>
            </td>
          </tr>{" "}
        </tbody>
      </table>
    </>
  );
};

let NatuarlPlaces = () => {
  return (
    <>
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
        <tbody>
          <tr className="table-light  text-center">
            <th scope="row">1</th>
            <td>Forest</td>
            <td>Al-gab</td>
            <td>
              <img
                className={"img-model"}
                width={"40px"}
                height={"40px"}
                src={"/logo/55.png"}
                alt={".."}
              />
              <img
                className={"img-model"}
                width={"40px"}
                height={"40px"}
                src={"/logo/55.png"}
                alt={".."}
              />
              <img
                className={"img-model"}
                width={"40px"}
                height={"40px"}
                src={"/logo/55.png"}
                alt={".."}
              />
            </td>
            <td>Natural</td>
            <td>bb@g.com</td>
            <td>
              <button type="button" class="btn btn-success ">
                Accept
              </button>
            </td>
            <td>
              <button type="button" class="btn btn-danger ">
                Reject
              </button>
            </td>
          </tr>{" "}
        </tbody>
      </table>
    </>
  );
};

let Users = () => {
  let [userState, setUserState] = useState(2);
  let activeIconToggle = (e) => {
    let nav_link = document.querySelectorAll(".nav-link");
    nav_link.forEach((element) => {
      element.classList.remove("active");
    });
    e.target.classList.add("active");
    console.log(e.target);
  };
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
            {" "}
            <Resturants />{" "}
          </>
        ) : userState === 3 ? (
          <>
            {" "}
            <Hotels />{" "}
          </>
        ) : userState === 4 ? (
          <>
            {" "}
            <AirLines />{" "}
          </>
        ) : userState === 5 ? (
          <>
            {" "}
            <NatuarlPlaces />{" "}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Users;
