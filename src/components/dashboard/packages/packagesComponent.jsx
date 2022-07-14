import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { defaults } from "chart.js";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

let PackagesList = () => {
  let [accordionToggle, setaccordionToggle] = useState(false);
  return (
    <>
      <div class=" card-config col-10 col-sm-5 col-md-4 col-lg-3 col-xl-2 ">
        <div className="imge-box">
          <img src={"/imges/lightnight.png"} alt={"..."} />
        </div>
        <div className="text-box">
          <div className="title">Bla Bla Bla</div>
          <div className="desc">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi
            totam omnis provident, ipsum similique modi facere est, deleniti
          </div>
          <hr />
          <div className="admin">By: Ayham Hammami</div>
          <hr />
          <div className="price">1000 $</div>
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
                    // data-bs-toggle='collapse'
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    // aria-controls="flush-collapseOne"
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
                  <div class="accordion-body">
                    Placeholder content for this accordion, which is intended to
                    demonstrate the <code>.accordion-flush</code> class. This is
                    the first item's accordion body.
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
            <NavLink className={'addpackageButton'} to={"/dashboard/packages/addpackage"}>
              <button class="btn btn-primary addpackageButton" type="button">
                <FontAwesomeIcon className="icon" icon={faCirclePlus} size={"2x"} />
                <div className="text">Create New Package</div>
              </button>
            </NavLink>
          </div>
        </div>
        <div className="row pakagesList  ">
          <PackagesList />
          <PackagesList />
          <PackagesList />
          <PackagesList />
          <PackagesList />
          <PackagesList />
          <PackagesList />
          <PackagesList />
          <PackagesList />
          <PackagesList />
          <PackagesList />
          <PackagesList />
          <PackagesList />
        </div>
      </div>
    </>
  );
};

export default Packages;
