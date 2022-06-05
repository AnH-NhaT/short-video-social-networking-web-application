import axiosClient from "./axiosClient";

const usersApi = {
  //post user:object gồm taiKhoan, matKhau, email,...
  register: (user) => {
    const path = "/user/register";
    return axiosClient.post(path, user);
  },

  //post user:object taiKhoan, matKhau => nhận về data có accessToken
  login: (user) => {
    const path = "/user/login";
    return axiosClient.post(path, user);
  },

  getInfor: (data) => {
    const path = `profile/getProfileByUseridVideo`;
    return axiosClient.post(path,data);
  },

  getAllVideo: (data) => {
    const path = `/video/seeds`;
    return axiosClient.post(path,data);
  },

  getFriendRecomend: (data) => {
    const path = `/profile/getfriendcommend`;
    return axiosClient.post(path,data);
  },

  likeVideo: (data) => {
    const path = `video/likevideo`;
    return axiosClient.post(path,data);
  },

  getComment: (data) => {
    const path = "/video/getcommentsvideo";

    return axiosClient.post(path, data);
  },

  commentVideo: (data) => {
    const path = `/video/commentvideo`;

    return axiosClient.post(path,data);
  },

  getVideoById: (data) => {
    const path = `/video/getvideobyid`;
    return axiosClient.post(path, data);
  },

  followUser: (data) => {
    const path = `video/followuser`;
    return axiosClient.post(path, data);
  },
  unfollowUser: (data) => {
    const path = `video/unfollowuser`;
    return axiosClient.post(path, data);
  },
  getProfileHome: (data) => {
    const path = `profile/getByUserId`;
    return axiosClient.post(path, data);
  },
};

export default usersApi;
