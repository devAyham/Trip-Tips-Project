import {
  faChartLine,
  faFileCirclePlus,
  faFileInvoice,
  faGlobe,
  faHeadset,
  faInfoCircle,
  faPersonWalkingLuggage,
  faSackDollar,
  faUser,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import Calendar from "react-calendar";
import {Link, useNavigate} from 'react-router-dom'
import { Bar, Doughnut } from "react-chartjs-2";
import { NavLink } from "react-router-dom";
import { baseURl } from "../../api/baseURL";
import AuthContext from "../../context/AuthProvider";
import { useAxiosGet } from "../../hooks/useAxiosFetch";
import BarChart from "../charts/barchart/barChart";
import LineChart from "../charts/linerchart/linerChart";
import PieChart from "../charts/piechart/pieChart";

let Clock = () => {
  const [clockstate, setClockstate] = useState();

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      setClockstate(date.toLocaleTimeString());
    });
  });
  return <>{clockstate}</>;
};

let Dashboard = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [flag , setflag] = useState(false); 
  const [allAdmins , setallAdmins] =useState([])
  const navigate = useNavigate();
  let {
    data: admins,
    fetchError: allADminsErrors,
    isLoading: allAdminsIsLoading,
  } = useAxiosGet("/api/user/getAdmins", flag);
  useEffect(()=>{
    setallAdmins(admins.users)
  },[admins])
  const UserData = {
    Visitors: [
      {
        date: "1/1",
        Count: 50,
      },
      {
        date: "1/2",
        Count: 20,
      },
      {
        date: "1/3",
        Count: 60,
      },
      {
        date: "1/4",
        Count: 25,
      },
      {
        date: "1/5",
        Count: 80,
      },
      {
        date: "1/5",
        Count: 25,
      },
      {
        date: "1/6",
        Count: 45,
      },
      {
        date: "1/7",
        Count: 15,
      },
      {
        date: "1/8",
        Count: 35,
      },
      {
        date: "1/9",
        Count: 20,
      },
      {
        date: "1/10",
        Count: 65,
      },
      {
        date: "1/11",
        Count: 2,
      },
      {
        date: "1/12",
        Count: 7,
      },
    ],
    newUsers: [
      {
        date: "1/1",
        Count: 10,
      },
      {
        date: "1/2",
        Count: 5,
      },
      {
        date: "1/3",
        Count: 5,
      },
      {
        date: "1/4",
        Count: 25,
      },
      {
        date: "1/5",
        Count: 30,
      },
      {
        date: "1/5",
        Count: 25,
      },
      {
        date: "1/6",
        Count: 15,
      },
      {
        date: "1/7",
        Count: 15,
      },
      {
        date: "1/8",
        Count: 15,
      },
      {
        date: "1/9",
        Count: 10,
      },
      {
        date: "1/10",
        Count: 6,
      },
      {
        date: "1/11",
        Count: 12,
      },
      {
        date: "1/12",
        Count: 17,
      },
    ],
    Downloads: [
      {
        date: "1/1",
        Count: 13,
      },
      {
        date: "1/2",
        Count: 50,
      },
      {
        date: "1/3",
        Count: 40,
      },
      {
        date: "1/4",
        Count: 22,
      },
      {
        date: "1/5",
        Count: 12,
      },
      {
        date: "1/5",
        Count: 20,
      },
      {
        date: "1/6",
        Count: 5,
      },
      {
        date: "1/7",
        Count: 15,
      },
      {
        date: "1/8",
        Count: 5,
      },
      {
        date: "1/9",
        Count: 50,
      },
      {
        date: "1/10",
        Count: 15,
      },
      {
        date: "1/11",
        Count: 12,
      },
      {
        date: "1/12",
        Count: 17,
      },
    ],
  };
  const [userData, setuserData] = useState({
    labels: UserData.Visitors.map((data) => data.date),
    datasets: [
      {
        label: "Visitor Number",
        data: UserData.Visitors.map((data) => data.Count),
        backgroundColor: ["orange", "red", "green", "yellow", "#2a71d0"],
        borderColor: "orange",
        borderWidth: 2,
        tension: 0.3,
      },
      {
        label: "User Number",
        data: UserData.newUsers.map((data) => data.Count),
        backgroundColor: ["blue", "darkblue", "green", "yellow", "#2a71d0"],
        borderColor: "blue",
        borderWidth: 2,
        tension: 0,
      },
      {
        label: "App Downloads",
        data: UserData.Downloads.map((data) => data.Count),
        backgroundColor: ["red", "red", "gray", "yellow", "#2a71d0"],
        borderColor: "red",
        borderWidth: 2,
        tension: 0.7,
      },
    ],
  });
  const PlacesData = [
    {
      id: 1,
      type: "Resturants",
      Count: 50,
    },
    {
      id: 2,
      type: "hotels",
      Count: 80,
    },
    {
      id: 3,
      type: "Airlines",
      Count: 20,
    },
    {
      id: 4,
      type: "Natural places",
      Count: 60,
    },
    {
      id: 5,
      type: "Resorts",
      Count: 25,
    },
  ];
  const [placesData, setplacesData] = useState({
    labels: PlacesData.map((data) => data.type),
    datasets: [
      {
        label: "Trip Tips Places",
        data: PlacesData.map((data) => data.Count),
        backgroundColor: [
          "rgba(153, 102, 255, 0.4)",
          // "rgba(201, 203, 207, 0.5)",
          "rgba(255, 99, 132, 0.4)",
          // "rgba(255, 159, 64, 0.5)",
          "rgba(75, 192, 192, 0.4)",
          "rgba(255, 205, 86, 0.4)",
          "rgba(54, 162, 235, 0.4)",
        ],
        borderColor: [
          // 'white',
          "rgba(153, 102, 255, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 205, 86, 1)",
          "rgba(54, 162, 235, 1)",
        ],
        borderWidth: 1,
        // backgroundColor: [
        //   "lightblue",
        //   "#ecf0f1",
        //   "#50AF95",
        //   "#f3ba2f",
        //   "#2a71d0",
        // ],
        // borderColor: "black",
        // borderWidth: 2,
      },
    ],
  });
  const TrendsData = {
    top1: [
      {
        id: 1,
        year: "2019",
        top1: "sweet",
        reser: 500,
      },
      {
        id: 2,
        year: "2020",
        top1: "happyhotle",
        reser: 400,
      },
      {
        id: 3,
        year: "2021",
        top1: "bbbb",
        reser: 300,
      },
      {
        id: 4,
        year: " 2022",
        top1: "zzzz",
        reser: 200,
      },
    ],
    top2: [
      {
        id: 1,
        year: "2019",
        top2: "sweet",
        reser: 100,
      },
      {
        id: 2,
        year: "2020",
        top2: "happyhotle",
        reser: 200,
      },
      {
        id: 3,
        year: "2021",
        top2: "bbbb",
        reser: 300,
      },
      {
        id: 4,
        year: " 2022",
        top2: "zzzz",
        reser: 400,
      },
    ],
    top3: [
      {
        id: 1,
        year: "2019",
        top3: "sweet",
        reser: 250,
      },
      {
        id: 2,
        year: "2020",
        top3: "happyhotle",
        reser: 250,
      },
      {
        id: 3,
        year: "2021",
        top3: "bbbb",
        reser: 250,
      },
      {
        id: 4,
        year: " 2022",
        top3: "zzzz",
        reser: 250,
      },
    ],
  };
  const [trendsData, settrendsData] = useState({
    labels: TrendsData.top1.map((data) => data.year),
    datasets: [
      {
        label: "Eayd Package",
        data: TrendsData.top1.map((data) => data.reser),
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        borderColor: "rgba(255, 99, 132)",
        borderWidth: 2,
      },
      {
        label: "Holiday Package",
        // label: TrendsData.top2[0].top2,
        data: TrendsData.top2.map((data) => data.reser),
        backgroundColor: ["rgba(54, 162, 235, 0.2)"],
        borderColor: "rgba(54, 162, 235)",
        borderWidth: 2,
      },
      {
        label: "Maldive Package",
        data: TrendsData.top3.map((data) => data.reser),
        backgroundColor: ["rgba(153, 102, 255, 0.2)"],
        borderColor: "rgba(153, 102, 255)",
        borderWidth: 2,
      },
    ],
  });
  const [trends2Data, settrends2Data] = useState({
    labels: TrendsData.top1.map((data) => data.year),
    datasets: [
      {
        axis: "y",
        label: "My First Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  });

  let activeIconToggle = (e) => {
    let dash_option = document.querySelectorAll(".card-option");
    dash_option.forEach((element) => {
      element.classList.remove("active");
    });
    if (e.target.classList.contains("card-option")) {
      e.target.classList.add("active");
    } else if (e.target.parentElement.classList.contains("card-option")) {
      e.target.parentElement.classList.add("active");
    } else if (
      e.target.parentElement.parentElement.classList.contains("card-option")
    ) {
      e.target.parentElement.parentElement.classList.add("active");
    }
    console.log(e.target);
  };
  const [date, setDate] = useState(new Date());
  let onCalenderChange = (date) => {
    setDate(date);
  };
  return (
    <>
      <div className="container-fluid dashborad">
        {/* ========================================================================== */}
        <div className="row dash-options ms-sm-3 mt-3 ">
          <div className="col-12 mt-5 mb-3 d-sm-none"></div>
          <NavLink
            to={"/dashboard/users"}
            className=" col-10 col-sm-4 col-md-3 col-lg-2 col-xl-1  card-option  position-relative "
            onClick={activeIconToggle}
          >
            <span class="position-absolute top-0 start-100 translate-middle fs-5 badge rounded-pill bg-danger">
              99+
              <span class="visually-hidden">unread messages</span>
            </span>
            <div className="div info-box">
              <div className={"option-button"}>1500</div>
              <div className={"title-option"}>Users</div>
            </div>
            <FontAwesomeIcon className={"icon-option"} icon={faUser} />
          </NavLink>
          <NavLink
            to={"/dashboard/packages"}
            className="col-10 col-sm-4 col-md-3 col-lg-2 col-xl-1 card-option position-relative "
            onClick={activeIconToggle}
          >
            <span class="position-absolute top-0 start-100 translate-middle fs-5 badge rounded-pill bg-danger">
              99+
              <span class="visually-hidden">unread messages</span>
            </span>
            <div className="div info-box">
              <div className={"option-button"}>50</div>
              <div className={"title-option"}>Packages</div>
            </div>
            <FontAwesomeIcon
              className={"icon-option"}
              icon={faPersonWalkingLuggage}
            />
          </NavLink>
          <NavLink
            to={"/dashboard/visitors"}
            className="col-10 col-sm-4 col-md-3 col-lg-2 col-xl-1 card-option position-relative "
            onClick={activeIconToggle}
          >
            <span class="position-absolute top-0 start-100 translate-middle fs-5 badge rounded-pill bg-danger">
              99+
              <span class="visually-hidden">unread messages</span>
            </span>
            <div className="div info-box">
              <div className={"option-button"}>1500</div>
              <div className={"title-option"}>Visitors</div>
            </div>
            <FontAwesomeIcon className={"icon-option"} icon={faGlobe} />
          </NavLink>
          <NavLink
            to={"/dashboard/requests"}
            className="col-10 col-sm-4 col-md-3 col-lg-2 col-xl-1 card-option position-relative "
            onClick={activeIconToggle}
          >
            <span class="position-absolute top-0 start-100 translate-middle fs-5 badge rounded-pill bg-danger">
              99+
              <span class="visually-hidden">unread messages</span>
            </span>
            <div className="div info-box">
              <div className={"option-button"}>75</div>
              <div className={"title-option"}>Requests</div>
            </div>
            <div className="icon-box  h-100">
              <FontAwesomeIcon
                className={"icon-option"}
                icon={faFileCirclePlus}
              />
            </div>
          </NavLink>
          <NavLink
            to={"/dashboard/contracts"}
            className="col-10 col-sm-4 col-md-3 col-lg-2 col-xl-1 card-option position-relative "
            onClick={activeIconToggle}
          >
            <span class="position-absolute top-0 start-100 translate-middle fs-5 badge rounded-pill bg-danger">
              99+
              <span class="visually-hidden">unread messages</span>
            </span>
            <div className=" info-box">
              <div className={"option-button"}>500</div>
              <div className={"title-option"}>Contracts</div>
            </div>
            <FontAwesomeIcon className={"icon-option"} icon={faFileInvoice} />
          </NavLink>
          <NavLink
            to={"/dashboard/earnings"}
            className="col-10 col-sm-4 col-md-3 col-lg-2 col-xl-1 card-option position-relative "
            onClick={activeIconToggle}
          >
            <span class="position-absolute top-0 start-100 translate-middle fs-5 badge rounded-pill bg-success">
              <FontAwesomeIcon icon={faChartLine} />
              <span class="visually-hidden">unread messages</span>
            </span>
            <div className="div info-box">
              <div className={"option-button"}>$150000</div>
              <div className={"title-option"}>Earnings</div>
            </div>
            <FontAwesomeIcon className={"icon-option"} icon={faSackDollar} />
          </NavLink>
        </div>
        {/* ========================================================================== */}
        <div className="row menu-shortcuts g-0">
          {/* ========================================================================== */}
          <div className="col-10 offset-1 offset-lg-0 col-sm-8 col-md-5 col-lg-7 col-xl-8">
            <div className="row">
              <div className=" col-12 offset-0 md 0ffset-sm-2 offset-lg-2 offset-xl-1 col-lg-10 col-xl-5   chart-box">
                <div className={"title"}> Places & Contracts</div>
                <div className={"polar-area"}>
                  <PieChart chartData={placesData} />
                </div>
              </div>
              <div className=" col-12 offset-0 0ffset-sm-2 offset-lg-2 offset-xl-0 ms-xl-3 col-lg-10 col-xl-5  barChart chart-box">
                <div className={"title"}>Trends</div>
                <div className={"polar-area"}>
                  <BarChart
                    chartData={placesData}
                    options={{ indexAxis: "y", aspectRatio: 2.5 }}
                  />
                </div>
              </div>
              <div className="col-11 offset-1 d-none d-xl-block ">
                <div className="row">
                  <div className=" col-12 col-md-12  mt-3 linerChart1 chart-box">
                    <div className={"title"}>
                      Users, Visitors & Downloads Daily Stats{" "}
                    </div>
                    <div className={"polar-area"}>
                      <LineChart chartData={userData} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ========================================================================== */}
          {/* <div className="col-10 offset-1 offset-lg-0 col-sm-8 col-md-5 col-lg-7 col-xl-8">
            <div className="row"> */}
          {/* ========================================================================== */}
          <div className="col-10 offset-1 col-sm-7 offset-sm-0 col-md-4 offset-md-0 col-lg-5 col-xl-3 order-first order-md-2 admin-shortcuts">
            <div className="col-12  clock-box">
              <Clock />
            </div>
            {/* ========================================================================== */}
            <div className="calender-box ">
              <Calendar onChange={onCalenderChange} value={date} />
            </div>
            {/* ========================================================================== */}
            <div className="row admins-box">
              <FontAwesomeIcon className="shild-icon" icon={faUserShield} />
              <div className="title">Trip Tips Admins</div>
              <div className="col-12 you">
                <div className="ur-img">
                  <img
                    className={"img-fluid "}
                    src={`${baseURl}${auth.aimg}`}
                    alt="worng"
                  />
                </div>
                <div className="ur-name">{auth.aname}</div>
              </div>
              <div className="hhr col-10"></div>
              <div className="col-12 other-admins">
                <div className="img-list">
                  {allAdmins?.map((admin, i) => {
                    if (i >= 6) {
                      return <></>;
                    }
                    if (admin.email === auth.aemail){
                      return <></>;
                    }
                      return (
                        <>
                          <div
                            className="admins-img bg-primary"
                            data-bs-toggle="tooltip"
                            data-bs-placement="buttom"
                            data-bs-custom-class="custom-tooltip"
                            title={admin.name}
                          >
                            <img
                              className={"img-fluid "}
                              src={baseURl + admin.img}
                              alt="worng"
                              onClick={()=>{navigate('./users')}}
                            />
                          </div>
                        </>
                      );
                  })}
                  <div
                    className={`admins-img other-admins-plus ${
                      (!allAdmins  || allAdmins?.length - 6 <= 0) && "d-none"
                    }`}
                    onClick={()=>{navigate('./users')}}
                  >
                    +{allAdmins?.length - 6}
                  </div>
                </div>
              </div>
            </div>
            {/* ========================================================================== */}
            <div className="support-box">
              <FontAwesomeIcon className="headset-icon" icon={faHeadset} />
              <div className="title">Support</div>
              <NavLink to={`/dashboard/supportcenter/2`}>
              <div className="report-box">
                <FontAwesomeIcon
                  className={"report-icon"}
                  icon={faInfoCircle}
                />
                <div className="report-text">Report Center</div>
              </div>
              </NavLink>

              <div className="hhr col-8"></div>
              <NavLink to={`/dashboard/supportcenter/1`}>
              <div className="help-box">
                <img
                  className={"help-icon img-fluid"}
                  src={"/logo/helpcenter.png "}
                  alt="wrong"
                />
                <div className="help-text">Help Center</div>
              </div>
              </NavLink>
              <div className="helpcenter-box"></div>
            </div>
          </div>
          {/* <div className="col-9  offset-lg-0 col-sm-8 col-md-5 col-lg-7 col-xl-8"> */}
          <div className="col-10 offset-1 d-xl-none order-md-3">
            <div className="row">
              <div className=" col-12 col-md-12  mt-3 chart-box">
                <div className={"title"}>
                  Users, Visitors & Downloads Daily Stats{" "}
                </div>
                <div className={"polar-area"}>
                  <LineChart chartData={userData} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="chart-box row justify-content-center align-content-start">
          {/* <div className="col-10 offset-1 align-self-center">
            <BarChart chartData={trendsData} options={{ indexAxis: "x" }} />
          </div> */}
          {/* <div className="col-5 offset-1 align-self-center">
            <BarChart chartData={trends2Data} options={{ indexAxis: "y" }} />
          </div>
          <div className="col-3  ">
            <PieChart chartData={placesData} />
          </div> */}
        </div>
        {/* ========================================================================== */}
      </div>
    </>
  );
};
export default Dashboard;

{
  /* <div className="col-6 offset-1 align-self-center">
                <BarChart chartData={trends2Data} options={{ indexAxis: "y" }} />
              </div> */
}
