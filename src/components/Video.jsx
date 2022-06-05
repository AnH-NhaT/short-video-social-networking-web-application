import React from "react";
import { useState, useEffect } from "react";
import usersApi from "../api/usersApi";
import Comment from "./Comment";
import { toast } from "react-toastify";
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

const Video = () => {
  const [isOpenComment, setIsOpenComment] = useState(false);
  const [commentSelected , setCommentSelected] = useState(null);
  const [videos, setVideos] = useState([]);
  const [profile, setProfile] = useState({});

  const handleOpenComment = (id)=>{
    if(id == commentSelected){
      setIsOpenComment(false)
      return
    }
    setIsOpenComment(true)
    setCommentSelected(id)
  }

  const handleGetInfo = async () => {
    try {
      let res = await usersApi.getProfileHome({
        userid,
        access_token,
      });
      setProfile(res.data.data);
    } catch (err) {
      console.log(err.response.data);
    }
  };
  const handleGetAllVideo = async () => {
    try {
      let res = await usersApi.getAllVideo({
        userid,
        access_token,
        auth_profile_id,
      });
      setVideos(res.data.data);
    } catch (err) {
      console.log(err.response?.data);
    }
  };
  const handleLikeVideo = async (id) => {
    console.log("id video: ", id);
    let res = usersApi.likeVideo({
      userid,
      access_token,
      auth_profile_id,
      videoid: id,
      islike: "true",
    });
    if (res) {
      // toast.success("This video has been liked");
      let profileClone = { ...profile };
      profileClone.favorite_videos.push(id);
      let videoClone = [...videos];
      let objIndex = videoClone.findIndex((obj) => obj.id == id);
      videoClone[objIndex].number_like++;
      setProfile(profileClone);
      // handleGetInfo()
      setVideos(videoClone);
    }
  };
  const handleUnLikeVideo = async (id) => {
    console.log("id video: ", id);
    let res = usersApi.likeVideo({
      userid,
      access_token,
      auth_profile_id,
      videoid: id,
      islike: "false",
    });
    if (res) {
      // toast.success("This video has been unliked");
      let profileClone = { ...profile };
      let index = profileClone.favorite_videos.findIndex((item) => item == id);
      profileClone.favorite_videos.splice(index, 1);
      let videoClone = [...videos];
      let objIndex = videoClone.findIndex((obj) => obj.id == id);
      videoClone[objIndex].number_like--;
      // handleGetInfo()
      setProfile(profileClone);

      setVideos(videoClone);
    }
  };
  useEffect(() => {
    if (userid && access_token && auth_profile_id) {
      handleGetAllVideo();
      handleGetInfo();
    }
  }, [userid, access_token, auth_profile_id]);

  const handleFollowUser = async (id) => {
    console.log(id);
    let res = await usersApi.followUser({
      userid,
      access_token,
      auth_profile_id,
      userfollow: id,
    });
    if (res) {
      let profileClone = { ...profile };
      profileClone.following.push(id);
      setProfile(profileClone);
      toast.success("Follow user succesfully");
    }
  };
  const handleUnFollowUser = async (id) => {
    console.log(id);
    let res = await usersApi.unfollowUser({
      userid,
      access_token,
      auth_profile_id,
      userfollow: id,
    });
    if (res) {
      let profileClone = { ...profile };
      let index = profileClone.following.findIndex((item) => item == id);
      profileClone.following.splice(index,1)
      setProfile(profileClone);
      toast.success("Unfollow user succesfully");
    }
  };
  console.log("profile ", profile.favorite_videos);
  return (
    <>
      {videos &&
        videos.length > 0 &&
        videos.map((item, index) => {
          return (
            <>
              <div>
                <div className="d-flex justify-content-between align-items-center">
                  <Link to={`/profile/${item.userid}/`}>
                    <div className="d-flex">
                      <img
                        className="suggestedAccountIcon"
                        src={item.avatar_link}
                      />
                      <div>
                        <h6 className="mb-0 fw-bold">{item.nickname}</h6>
                        <small>{item.description}</small>
                      </div>
                    </div>
                  </Link>
                  {profile?.following?.includes(item.auth_profile_id) ? (
                    <button
                      onClick={() => {
                        handleUnFollowUser(item.auth_profile_id);
                      }}
                      type="button"
                      className="btn btn-danger btn-block"
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-block"
                      onClick={() => {
                        handleFollowUser(item.auth_profile_id);
                      }}
                    >
                      Follow
                    </button>
                  )}
                </div>
                <div className="mt-3 d-flex align-items-end">
                  <video
                    width={"80%"}
                    height={400}
                    classname="tikTok_screen_img"
                    controls
                  >
                    <source src={item.video_link} type="video/mp4" />
                  </video>

                  <div className="ms-3">
                    <div className="d-flex flex-column align-items-center">
                      {profile &&
                      profile.favorite_videos &&
                      profile.favorite_videos.includes(item.id) ? (
                        <div
                          className="actions_tikTok "
                          onClick={() => {
                            handleUnLikeVideo(item.id);
                          }}
                        >
                          <i
                            className="fas fa-heart"
                            style={{
                              color: "red",
                            }}
                          />
                        </div>
                      ) : (
                        <div
                          className="actions_tikTok "
                          onClick={() => {
                            handleLikeVideo(item.id);
                          }}
                        >
                          <i className="fas fa-heart" />
                        </div>
                      )}

                      <span>{item.number_like}</span>
                    </div>
                    <div className="d-flex flex-column align-items-center my-4">
                      <div
                        className="actions_tikTok"
                        onClick={() => handleOpenComment(item.id)}
                      >
                        <i className="fas fa-comment-dots" />
                      </div>
                      <span>{item.number_comments}</span>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                      <div className="actions_tikTok">
                        <i className="fas fa-share" />
                      </div>
                      <span>{item.number_share}</span>
                    </div>
                  </div>
                </div>
                {isOpenComment && <Comment isOpen={commentSelected == item.id ? true : false} id={item.id} />}
              </div>
              <hr className="my-5" />
            </>
          );
        })}
    </>
  );
};

export default Video;
