import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import usersApi from "../../api/usersApi";
import { toast } from "react-toastify";



const Profile = () => {
  const [user, setUser] = useState({});
  // const [videos, setVideos] = useState([]);
  const [profile, setProfile] = useState({});
  const params = useParams();

  let userid = localStorage.getItem("userid")
    ? localStorage.getItem("userid")
    : null;
  let access_token = localStorage.getItem("access_token")
    ? localStorage.getItem("access_token")
    : null;
  let auth_profile_id = localStorage.getItem("auth_profile_id")
    ? localStorage.getItem("auth_profile_id")
    : null;
  useEffect(() => {
    if (userid && access_token) {
      handleGetInfo();
      handleGetInfoMe()
    }
  }, [userid, access_token, params]);

  const handleGetInfoMe = async () => {
    try {
      let res = await usersApi.getProfileHome({
        userid: userid,
        access_token,
      });
      setProfile(res.data.data);
    } catch (err) {
      console.log(err.response?.data);
    }
  };
  const handleGetInfo = async () => {
    try {
      let res = await usersApi.getInfor({
        userid: params.id ? params.id : userid,
        access_token
      });
      setUser(res.data.data);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const handleFollowUser = async () => {

    let res = await usersApi.followUser({
      userid,
      access_token,
      auth_profile_id,
      userfollow: user.id,
    });
    if (res) {
      let profileClone = { ...profile };
      profileClone.following.push(user.id);
      let newValue = { ...user };
      newValue.number_followers++;
      setUser(newValue)
      setProfile(profileClone);
      toast.success("Follow user succesfully");
    }
  };
  const handleUnFollowUser = async () => {

    let res = await usersApi.unfollowUser({
      userid,
      access_token,
      auth_profile_id,
      userfollow: user.id,
    });
    if (res) {
      let profileClone = { ...profile };
      let index = profileClone.following.findIndex((item) => item == user.id);
      profileClone.following.splice(index, 1)
      let newValue = { ...user };
      newValue.number_followers--;
      setUser(newValue)
      setProfile(profileClone);
      toast.success("Unfollow user succesfully");
    }
  };
  console.log("dWRWR  ", profile)
  // console.log(user.my_videos)
  return (
    <div className="row py-5 px-4 mt-5">
      {" "}
      <div className="col-md-5 mx-auto scrollne">
        {" "}
        {/* Profile widget */}{" "}
        <div className="bg-white shadow rounded overflow-hidden">
          {" "}
          <div className="px-4 pt-0 pb-4 cover">
            {" "}
            <div className="media align-items-end profile-head">
              {" "}
              <div className="profile mr-3">
                <img
                  src={user?.avatar_link}
                  alt=""
                  width={130}
                  className="rounded mb-2 img-thumbnail"
                  style={{ marginRight: 30 }}
                />
                {params && params.id && profile?.following?.includes(user.id) && (
                  <button type="button" onClick={handleUnFollowUser} className="btn btn-danger btn-block">
                    Unfollow
                  </button>
                )}
                {params && params.id && !profile?.following?.includes(user.id) && (
                  <button type="button" onClick={handleFollowUser} className="btn btn-light btn-block">
                    Follow
                  </button>
                )}
              </div>{" "}
              <div className="media-body mb-5 text-white">
                {" "}
                <h2 className="mt-0 mb-2">{user?.nickname}</h2>{" "}
                <p className="mb-5 pb-3">{user?.description}</p>
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <div className="bg-light p-4 d-flex justify-content-end text-center">
            {" "}
            <ul className="list-inline mb-0">
              {" "}
              <li className="list-inline-item">
                {" "}
                <h5 className="font-weight-bold mb-0 d-block">
                  {user?.number_followers}
                </h5>
                <small className="text-muted">
                  {" "}
                  Followers
                </small>{" "}
              </li>{" "}
              <li className="list-inline-item">
                {" "}
                <h5 className="font-weight-bold mb-0 d-block">
                  {user?.number_following}
                </h5>
                <small className="text-muted">
                  {" "}
                  Following
                </small>{" "}
              </li>{" "}
            </ul>{" "}
          </div>{" "}
          <div className="py-4 px-4">
            {" "}
            <div className="d-flex align-items-center justify-content-between mb-3">
              {" "}
              <h5 className="mb-0">Recent Videos</h5>
            </div>{" "}
            <div className="row">
              {" "}
              {user.my_videos &&
                user.my_videos.map((item, index) => {
                  return (
                    <div className="col-lg-6 mb-2 pr-lg-1">
                      <video
                        key={index}
                        width={"100%"}
                        height={200}
                        classname="tikTok_screen_img"
                        controls
                      >
                        <source src={item.video_link} type="video/mp4" />
                      </video>
                    </div>
                  );
                })}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>
    </div>
  );
};

export default Profile;
