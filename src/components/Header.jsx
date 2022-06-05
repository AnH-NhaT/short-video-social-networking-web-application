import React from "react";
import { useState, useEffect } from "react";
import usersApi from "../api/usersApi";
import Modal from "./ModalAuth/Modal";
import { Link } from "react-router-dom";

const Header = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [user, setUser] = useState({});

  let userid = localStorage.getItem("userid")
    ? localStorage.getItem("userid")
    : null;
  let access_token = localStorage.getItem("access_token")
    ? localStorage.getItem("access_token")
    : null;

  const handleGetInfo = async () => {
    try {
      let res = await usersApi.getInfor({
        userid,
        access_token,
      });
      setUser(res.data.data);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    if (userid && access_token) {
      handleGetInfo();
    }
  }, [userid, access_token]);
  const handleLogout = () => {
    localStorage.removeItem("userid");
    localStorage.removeItem("access_token");
    localStorage.removeItem("auth_profile_id");
    window.location.href = "/";
  };

  return (
    <>
      <div className="pageHeader_tikTok py-2 border-bottom bg-white fixed-top">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <Link to="/dashboard">
                <img style={{ marginBottom: "8px" }} width={60} src="../logo.jpg" />
                <img width={150} src="../logo2.png" />
              </Link>
            </div>

            <div>
              <label>
                <input className="form-control bg-light"
                  style={{ width: "300px", height: "45px", paddingTop: "2px",marginRight:"3px" }}
                  placeholder="Search accounts and videos" />
              </label>
              <label><button
                style={{ width: "46px", height: "46px" }}
                className="btn btn-secondary"><i class="fas fa-search"></i></button></label>
            </div>

            {/* <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form> */}

            <div className="d-flex align-items-center" >
              {userid && access_token ? (
                <>
                  <div className="d-flex mb-2" style={{ marginRight: 15 }}>
                    <img
                      style={{ width: "50px", height: "50px" }}
                      className="suggestedAccountIcon mt-2"
                      src={user?.avatar_link}
                    />
                    <div>
                      <Link to={`/profile`}>
                        <h6 className="mb-0 fw-bold mt-4">{user?.nickname}</h6>
                      </Link>
                    </div>
                  </div>
                  <div onClick={handleLogout} className="btn btn-danger">
                    Log out
                  </div>
                </>
              ) : (
                <div onClick={handleShow} className="btn btn-danger">
                  Log In
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} handleClose={handleClose} handleShow={handleShow} />
    </>
  );
};

export default Header;
