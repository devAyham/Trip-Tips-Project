import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { defaults } from "chart.js";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { baseURl } from "../../../api/baseURL";
import { useAxiosGet } from "../../../hooks/useAxiosFetch";

let PackagesList = ({ packagee }) => {
  let [accordionToggle, setaccordionToggle] = useState(false);
  // console.log(packagee);
  return (
    <>
      <div class=" card-config col-10 col-sm-5 col-md-4 col-lg-3 col-xl-2 ">
        <div className="imge-box">
          <img src={baseURl + packagee.img} alt={"..."} />
        </div>
        <div className="text-box">
          <div className="title">{packagee.name}</div>
          <div className="desc">{packagee.description}</div>
          <hr />
          <div className="category">
            <span className={"spene"}>Category :</span>{" "}
            {packagee.category?.name}{" "}
          </div>
          <hr />
          <div className="reser">
            <span className={"spene"}>Reservation :</span>{" "}
            {packagee.number_of_reservation}/{packagee.max_reservation}{" "}
          </div>
          <hr />
          <div className="start">
            <span className={"spene"}>Start At :</span>{" "}
            {packagee.start_date.split(" ")[0]}
          </div>
          <hr />
          <div className="end">
            <span className={"spene"}>End At :</span>{" "}
            {packagee.end_date.split(" ")[0]}{" "}
          </div>
          <hr />
          <div className="admin">
            <span className={"spene"}> By :</span> {packagee.added_by}
          </div>
          <div className="price position-relative my-2">
            <span class="position-absolute  translate-middle fs-7 badge rounded-pill bg-danger">
              {packagee.discount_percentage}%<sup>off</sup>
              <span class="visually-hidden">unread messages</span>
            </span>
            {packagee.price} ${" "}
          </div>
          {/* <hr /> */}
          <hr />
          <div className="more">
            <div class="accordion accordion-flush" id="accordionFlushExample">
              <div class="accordion-item">
                <h2 class="accordion-header " id="flush-headingOne">
                  <button
                    class={`accordion-button   ${
                      !accordionToggle && "collapsed"
                    }`}
                    type="button"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    onClick={() => {
                      setaccordionToggle(!accordionToggle);
                    }}
                  >
                    More Info
                  </button>
                </h2>
                <div
                  id="flush-collapseOne"
                  class={` accordion-collapse collapse ${
                    accordionToggle && "show"
                  }`}
                  aria-labelledby="flush-headingOne"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div class="accordion-body  ">
                    <code>Tourist Guide Name :</code>{" "}
                    <div>{packagee.touris_supervisor.name}</div>
                    <code>Tourist Guide Phone :</code>{" "}
                    <div>{packagee.touris_supervisor.phone}</div>
                    <code
                      className={
                        packagee?.package_restaurant?.length === 0 && "d-none"
                      }
                    >
                      Resturants :
                    </code>
                    {packagee.package_restaurant?.map((resturant) => {
                      return (
                        <>
                          <div>Name: {resturant?.restaurant_name}</div>
                          <div>
                            Booking Date: {resturant?.restaurant_booking_date}
                          </div>
                          <hr className={'w-50'}/>
                        </>
                      );
                    })}
                    <code
                      className={
                        packagee?.package_hotel.length === 0 && "d-none"
                      }
                    >
                      Hotels :
                    </code>
                    {packagee.package_hotel?.map((hotel) => {
                      return (
                        <>
                          <div>Name : {hotel?.hotel_name}</div>
                          <div>Class : {hotel?.hotel_class_name}</div>
                          <div>
                            Booking Start Date :{" "}
                            {hotel?.hotel_booking_start_date}
                          </div>
                          <div>
                            Booking End Date : {hotel?.hotel_booking_end_date}
                          </div>
                          <hr className={'w-50'}/>
                        </>
                      );
                    })}
                    <code
                      className={
                        packagee?.package_airplane.length === 0 && "d-none"
                      }
                    >
                      AirPlanes :
                    </code>
                    {packagee.package_airplane?.map((airplane) => {
                      return (
                        <>
                          <div>Name: {airplane?.airplane_name}</div>
                          <div>Class: {airplane?.airplane_class_id}</div>
                          <div>Booking Date: {airplane?.airplane_booking_date}</div>
                          <div>From: {airplane?.from}</div>
                          <div>To : {airplane?.to}</div>
                          <hr className={'w-50'}/>
                        </>

                      );
                    })}
                    <code
                      className={
                        packagee?.package_place.length === 0 && "d-none"
                      }
                    >
                      Natural Places :
                    </code>
                    {packagee.package_place?.map((place) => {
                      return (
                        <>
                          <div>Name: {place?.place_name}</div>
                          <div>
                            Booking Date: {place?.place_booking}
                          </div>
                          <hr className={'w-50'}/>
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
let Packages = () => {
  const {
    data: allpackages,
    fetchError: allpackagesErrors,
    isLoading: allpackagesIsLoading,
  } = useAxiosGet("/api/get_Packages");
  console.log(allpackages.package);
  return (
    <>
      <div className="container dashboard-packages">
        <div className="row addpackage">
          <div className="col-6">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to={"/dashboard"}>DashBoard</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Packages
                </li>
              </ol>
            </nav>
          </div>
          <div class="d-grid gap-2 col-6 mx-auto ">
            <NavLink
              className={"addpackageButton"}
              to={"/dashboard/packages/addpackage"}
            >
              <button class="btn btn-primary addpackageButton" type="button">
                <FontAwesomeIcon
                  className="icon"
                  icon={faCirclePlus}
                  size={"2x"}
                />
                <div className="text">Create New Package</div>
              </button>
            </NavLink>
          </div>
        </div>
        <div className="row pakagesList  ">
          {allpackages?.package?.map((packg) => {
            return <PackagesList packagee={packg} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Packages;
