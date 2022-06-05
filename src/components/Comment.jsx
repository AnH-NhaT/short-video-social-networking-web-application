import React from "react";
import { useState, useEffect } from "react";
import usersApi from "../api/usersApi";
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

const Comment = ({ id, isOpen }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const getComments = async () => {
    let res = await usersApi.getComment({
      userid,
      access_token,
      auth_profile_id,
      videoid: id,
    });
    setComments(res.data);
  };
  const handleChangeInput = (e) => {
    setComment(e.target.value);
  };
  const handleCommentVideo = async () => {
    let res = await usersApi.commentVideo({
      userid,
      access_token,
      auth_profile_id,
      videoid: id,
      comment,
    });
    if (res) {
      setComments(res.data);
      setComment("");
    }
  };
  useEffect(() => {
    if (id) {
      getComments();
    }
  }, [id]);

  if (!isOpen) {
    return <></>
  }

  return (
    <div
      style={{
        width: "80%",
        height: 300,
        border: "1px gray solid",
        marginTop: 10,
        padding: 20,
      }}
      classname="comment"
    >
      <ul
        classname="comment-list"
        style={{
          width: "100%",
          height: 180,
          marginBottom: 40,
          overflowY: "scroll",
        }}
      >
        {comments &&
          comments.length > 0 &&
          comments.map((item, index) => {
            return (
              <li className="mb-4">
                <div className="d-flex mb-3">
                  <img
                    width="50"
                    height="50"
                    classname="rounded-circle suggestedAccountIcon d-block "
                    src={item.avatar_link}
                    style={{ marginRight: 20 }}
                  />
                  <div className="ml-3">
                    <h6 className="mb-0 fw-bold">{item.name_user}</h6>
                    <small>{item.comment}</small>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
      <div width={"100%"}>
        <img
          width={50}
          height={50}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR96vMaHi_afNjqA18Ty8OXGok1Yxko3jWU-IJhO_vS3o1a5OBXcAwOzuCZBpl1XOJ2UU8&usqp=CAU"
          className="rounded-circle mr-3 d-inline-block"
          style={{ marginRight: 20 }}
          alt="..."
        />
        <input
          style={{ width: "55%", marginLeft: 30, marginRight: 20 }}
          type="text"
          name="comment"
          placeholder="Entered your comment..."
          value={comment}
          onChange={handleChangeInput}
        />
        <button
          type="button"
          onClick={handleCommentVideo}
          class="btn btn-primary"
        >
          Comment
        </button>
      </div>
    </div>
  );
};

export default Comment;
