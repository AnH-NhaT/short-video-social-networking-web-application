import React from "react";
import usersApi from "../api/usersApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

let userid = localStorage.getItem("userid")
  ? localStorage.getItem("userid")
  : null;
let access_token = localStorage.getItem("access_token")
  ? localStorage.getItem("access_token")
  : null;
let auth_profile_id = localStorage.getItem("auth_profile_id")
  ? localStorage.getItem("auth_profile_id")
  : null;

const FriendRecomend = () => {
  const [friends, setFriends] = useState([]);
  const [isShowAll, setIsShowAll] = useState(false);
  const [select, setSelect] = useState(1)

  const handleGetFriendRecomend = async () => {
    try {
      let res = await usersApi.getFriendRecomend({
        userid,
        access_token,
        auth_profile_id,
      });
      setFriends(res.data);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    if (userid && access_token && auth_profile_id) {
      handleGetFriendRecomend();
    }
  }, [userid, access_token, auth_profile_id]);

  return (
    <div className="col-sm-4 border-right friend scrollne mt-5">
      <ul className="nav-left">
        <li onClick={() => setSelect(1)} className={select == 1 && "selected"}>
          <h4>
            <i class="fa fa-home" aria-hidden="true"></i>&nbsp; For You
          </h4>
        </li>
        <li onClick={() => setSelect(2)} className={select == 2 && "selected"}>
          <h4>
            <i class="fa fa-users" aria-hidden="true"></i>&nbsp; Following
          </h4>
        </li>
        <li onClick={() => setSelect(3)} className={select == 3 && "selected"}>
          <h4>
            <i class="fa fa-camera" aria-hidden="true"></i>&nbsp; Live
          </h4>
        </li>
      </ul>
      <div>
        <div className="d-flex align-items-center justify-content-between">
          <span>Suggested accounts</span>
          <a href="#" className="text-pink">
            See all
          </a>
        </div>
        <div className="mt-2">
          <ul>
            {friends &&
              friends.length > 0 &&
              friends.map((item, index) => {
                if (index <= 5) {
                  return (
                    <li className="mb-4">
                      <div
                        className="d-flex mb-3"
                        style={{ alignItems: "center" }}
                      >
                        <img
                          style={{ width: "50px", height: "50px" }}
                          className="suggestedAccountIcon"
                          src={item.avatar}
                        />
                        <div>
                          <h6 className="mb-0 fw-bold">{item.username}</h6>
                        </div>
                      </div>
                    </li>
                  );
                }
              })}
          </ul>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default FriendRecomend;
