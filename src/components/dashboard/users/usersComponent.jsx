import { defaults } from "chart.js";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Popover } from "bootstrap";
import { set } from "react-hook-form";
import { useAxiosGet } from "../../../hooks/useAxiosFetch";
import AuthContext from "../../../context/AuthProvider";
import axios from "../../../api/axios";
import { baseURl } from "../../../api/baseURL";

let NewUsers = ({ AllNewUsers }) => {
  console.log(AllNewUsers);
  return(<>
  { AllNewUsers  ? (
    AllNewUsers.map((user) => {
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
                    Facilities
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Sapiente, esse debitis! Necessitatibus inventore ad vitae
                    quaerat esse, voluptate itaque amet tempore perferendis
                    culpa magni eos corrupti optio odio assumenda pariatur.
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
              <img width={40} src={baseURl + user.img} alt={"..."} />
            </td>
            <td>{user.name}</td>
            <td>{user.role_person_id}</td>
            <td>{user.email}</td>
            <td>{user.level}</td>
            <td>{user.phone}</td>
            <td>
              {user.have_facilities === 1 ? "yes" : "No"}{" "}
              <button
                type="button"
                class="btn btn-secondary btn-sm "
                data-bs-toggle="modal"
                data-bs-target="#ownerCr"
              >
                Show
              </button>
            </td>
            <td>{user.time}</td>
            <td>{user.is_verifaied === 1 ? "yes" : "No"} </td>
            <td>{user.is_registered === 1 ? "yes" : "No"} </td>
            <td>{user.is_active === 1 ? "No" : "Yes"} </td>
            <td>
              <button type="button" class="btn btn-success btn-sm">
                Promotion
              </button>
            </td>
            <td>
              <button type="button" class="btn btn-primary btn-sm">
                Demotion
              </button>
            </td>
            <td>
              <button type="button" class="btn btn-warning btn-sm">
                Block
              </button>
            </td>
            <td>
              <button type="button" class="btn btn-danger btn-sm">
                remove
              </button>
            </td>
          </tr>{" "}
        </>
      );
      })
    ) : ( 
     <></>
  )}
  </>)
};
let Owners = () => {
  return (
    <>
      <tr className="table-info  text-center">
        <th scope="row">1</th>
        <td>Amgad</td>
        <td>Wattar</td>
        <td>Owner</td>
        <td>amgad@gmail.com</td>
        <td>50</td>
        <td>094444444444</td>
        <td>
          Yes{" "}
          <button
            type="button"
            class="btn btn-secondary btn-sm"
            data-bs-toggle="popover"
            title="Popover title"
            data-bs-content="And here's some amazing content. It's very engaging. Right?"
          >
            Show
          </button>
        </td>
        <td>20/6/2022</td>
        <td>no</td>
        <td>
          <button type="button" class="btn btn-success btn-sm">
            Promotion
          </button>
        </td>
        <td>
          <button type="button" class="btn btn-primary btn-sm">
            Demotion
          </button>
        </td>
        <td>
          <button type="button" class="btn btn-warning btn-sm">
            Block
          </button>
        </td>
        <td>
          <button type="button" class="btn btn-danger btn-sm">
            remove
          </button>
        </td>
      </tr>
      <tr className="table-success  text-center">
        <th scope="row">1</th>
        <td>Ayham</td>
        <td>Hammmai</td>
        <td>Owner</td>
        <td>amgad@gmail.com</td>
        <td>50</td>
        <td>094444444444</td>
        <td>
          Yes{" "}
          <button
            type="button"
            class="btn btn-secondary btn-sm"
            data-bs-toggle="popover"
            title="Popover title"
            data-bs-content="And here's some amazing content. It's very engaging. Right?"
          >
            Show
          </button>
        </td>
        <td>20/6/2022</td>
        <td>no</td>
        <td>
          <button type="button" class="btn btn-success btn-sm">
            Promotion
          </button>
        </td>
        <td>
          <button type="button" class="btn btn-primary btn-sm">
            Demotion
          </button>
        </td>
        <td>
          <button type="button" class="btn btn-warning btn-sm">
            Block
          </button>
        </td>
        <td>
          <button type="button" class="btn btn-danger btn-sm">
            remove
          </button>
        </td>
      </tr>{" "}
    </>
  );
};

let Admins = () => {
  return (
    <>
      <tr className="table-primary  text-center">
        <th scope="row">1</th>
        <td>Ayham</td>
        <td>Hammami</td>
        <td>Admin</td>
        <td>ayham@gmail.com</td>
        <td>30</td>
        <td>0944223334444</td>
        <td>
          Yes{" "}
          <button
            type="button"
            class="btn btn-secondary btn-sm"
            data-bs-toggle="popover"
            title="Popover title"
            data-bs-content="And here's some amazing content. It's very engaging. Right?"
          >
            Show
          </button>
        </td>
        <td>20/6/2022</td>
        <td>no</td>
        <td>
          <button type="button" class="btn btn-success btn-sm">
            Promotion
          </button>
        </td>
        <td>
          <button type="button" class="btn btn-primary btn-sm">
            Demotion
          </button>
        </td>
        <td>
          <button type="button" class="btn btn-warning btn-sm">
            Block
          </button>
        </td>
        <td>
          <button type="button" class="btn btn-danger btn-sm">
            remove
          </button>
        </td>
      </tr>{" "}
    </>
  );
};

let Banned = () => {
  return (
    <>
      <tr className="table-danger  text-center">
        <th scope="row">1</th>
        <td>Amgad</td>
        <td>Wattar</td>
        <td>User</td>
        <td>amgad@gmail.com</td>
        <td>50</td>
        <td>094444444444</td>
        <td>
          Yes{" "}
          <button
            type="button"
            class="btn btn-secondary btn-sm"
            data-bs-toggle="popover"
            title="Popover title"
            data-bs-content="And here's some amazing content. It's very engaging. Right?"
          >
            Show
          </button>
        </td>
        <td>20/6/2022</td>
        <td>Yes</td>
        <td>
          <button type="button" class="btn btn-success btn-sm">
            Promotion
          </button>
        </td>
        <td>
          <button type="button" class="btn btn-primary btn-sm">
            Demotion
          </button>
        </td>
        <td>
          <button type="button" class="btn btn-warning btn-sm">
            Block
          </button>
        </td>
        <td>
          <button type="button" class="btn btn-danger btn-sm">
            remove
          </button>
        </td>
      </tr>{" "}
      <tr className="table-danger  text-center">
        <th scope="row">1</th>
        <td>Amgad</td>
        <td>Wattar</td>
        <td>User</td>
        <td>amgad@gmail.com</td>
        <td>50</td>
        <td>094444444444</td>
        <td>
          Yes{" "}
          <button
            type="button"
            class="btn btn-secondary btn-sm"
            data-bs-toggle="popover"
            title="Popover title"
            data-bs-content="And here's some amazing content. It's very engaging. Right?"
          >
            Show
          </button>
        </td>
        <td>20/6/2022</td>
        <td>Yes</td>
        <td>
          <button type="button" class="btn btn-success btn-sm">
            Promotion
          </button>
        </td>
        <td>
          <button type="button" class="btn btn-primary btn-sm">
            Demotion
          </button>
        </td>
        <td>
          <button type="button" class="btn btn-warning btn-sm">
            Block
          </button>
        </td>
        <td>
          <button type="button" class="btn btn-danger btn-sm">
            remove
          </button>
        </td>
      </tr>{" "}
      <tr className="table-danger  text-center">
        <th scope="row">1</th>
        <td>Amgad</td>
        <td>Wattar</td>
        <td>User</td>
        <td>amgad@gmail.com</td>
        <td>50</td>
        <td>094444444444</td>
        <td>
          Yes{" "}
          <button
            type="button"
            class="btn btn-secondary btn-sm"
            data-bs-toggle="popover"
            title="Popover title"
            data-bs-content="And here's some amazing content. It's very engaging. Right?"
          >
            Show
          </button>
        </td>
        <td>20/6/2022</td>
        <td>Yes</td>
        <td>
          <button type="button" class="btn btn-success btn-sm">
            Promotion
          </button>
        </td>
        <td>
          <button type="button" class="btn btn-primary btn-sm">
            Demotion
          </button>
        </td>
        <td>
          <button type="button" class="btn btn-warning btn-sm">
            Block
          </button>
        </td>
        <td>
          <button type="button" class="btn btn-danger btn-sm">
            remove
          </button>
        </td>
      </tr>{" "}
    </>
  );
};
let NormalUsers = () => {
  return (
    <>
      <tr className="table-light  text-center">
        <th scope="row">1</th>
        <td>Aseel</td>
        <td>Dibi</td>
        <td>User</td>
        <td>Aseel@gmail.com</td>
        <td>60</td>
        <td>094444444444</td>
        <td>
          No{" "}
          <button
            type="button"
            class="btn btn-secondary btn-sm disabled"
            data-bs-toggle="popover"
            title="Popover title"
            data-bs-content="And here's some amazing content. It's very engaging. Right?"
          >
            Show
          </button>
        </td>
        <td>20/6/2022</td>
        <td>no</td>
        <td>
          <button type="button" class="btn btn-success btn-sm">
            Promotion
          </button>
        </td>
        <td>
          <button type="button" class="btn btn-primary btn-sm">
            Demotion
          </button>
        </td>
        <td>
          <button type="button" class="btn btn-warning btn-sm">
            Block
          </button>
        </td>
        <td>
          <button type="button" class="btn btn-danger btn-sm">
            remove
          </button>
        </td>
      </tr>{" "}
    </>
  );
};

let AllUser = () => {
  let [userState, setUserState] = useState(1);
  const [newusers, setnewusers] = useState([]);
  const [owners, setowners] = useState([]);
  const [admins, setadmins] = useState();
  const [users, setusers] = useState();
  const [banned, setbanned] = useState();
  const [newusersflag, setnewusersflag] = useState(false);
  const [ownersflag, setownerflag] = useState(false);
  const [adminsflag, setadminsflag] = useState(false);
  const [usersflag, setusersflag] = useState(false);
  const [flag, setflag] = useState(false);
  const [isloading, setIsLooading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const { auth, setAuth } = useContext(AuthContext);

  let activeIconToggle = (e) => {
    let nav_link = document.querySelectorAll(".nav-link");
    nav_link.forEach((element) => {
      element.classList.remove("active");
    });
    e.target.classList.add("active");
    console.log(e.target);
  };
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
  const handleunbanned = async (id) => {
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

  let {
    data: AllNewUsers,
    fetchError: AllNewUsersErrors,
    isLoading: AllNewUsersIsLoading,
  } = useAxiosGet("/api/user/getNew", flag);
  let {
    data: AllOwners,
    fetchError: AllOwnersErrors,
    isLoading: AllOwnersISLoading,
  } = useAxiosGet("/api/user/getOwner", flag);
  let {
    data: AllAdmins,
    fetchError: AllADminsErrors,
    isLoading: AllAdminsIsLoading,
  } = useAxiosGet("/api/user/getAdmins", flag);
  let {
    data: AllUsers,
    fetchError: AllUsersErrors,
    isLoading: AllUsersIsLoading,
  } = useAxiosGet("/api/user/getUsers", flag);
  let {
    data: AllBanned,
    fetchError: AllBannedErrors,
    isLoading: AllBannedIsLoading,
  } = useAxiosGet("/api/user/UnActive", flag);

  useEffect(() => {
    setnewusers(AllNewUsers.users);
    setowners(AllOwners.users);
    setadmins(AllAdmins.users);
    setusers(AllUsers.users);
    setbanned(AllBanned.users);
  }, [AllNewUsers, AllOwners, AllAdmins, AllUsers, AllBanned]);

  console.log("new", newusers);
  console.log("own", owners);
  console.log("admn", admins);
  console.log("users", users);
  console.log("ban", banned);
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
            </tr>
          </thead>
          <tbody>
            {userState === 1 ? (
              <>
                <NewUsers AllNewUsers={newusers} />
                <Owners AllOwners={owners} />
                <Admins AllAdmins={admins} />
                <NormalUsers AllNormalUsers={users} />
                <Banned AllBanned={banned} />
              </>
            ) : userState === 2 ? (
              <>
                {" "}
                <NewUsers
                  AllNewUsers={newusers}
                  handeledelete={handeledelete}
                  handlebanned={handlebanned}
                  handledeomotion={handledeomotion}
                  handlepromotion={handlepromotion}
                  handleunbanned={handleunbanned}
                />
              </>
            ) : userState === 3 ? (
              <>
                {" "}
                <Owners AllOwners={owners} />
              </>
            ) : userState === 4 ? (
              <>
                {" "}
                <Admins
                  AllAdmins={admins}
                  handeledelete={handeledelete}
                  handlebanned={handlebanned}
                  handledeomotion={handledeomotion}
                  handlepromotion={handlepromotion}
                  handleunbanned={handleunbanned}
                />
              </>
            ) : userState === 5 ? (
              <>
                {" "}
                <NormalUsers
                  AllNormalUsers={users}
                  handeledelete={handeledelete}
                  handlebanned={handlebanned}
                  handlepromotion={handlepromotion}
                  handleunbanned={handleunbanned}
                />
              </>
            ) : userState === 6 ? (
              <>
                {" "}
                <Banned
                  AllBanned={banned}
                  handeledelete={handeledelete}
                  handledeomotion={handledeomotion}
                  handlepromotion={handlepromotion}
                  handleunbanned={handleunbanned}
                />
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

export default AllUser;
