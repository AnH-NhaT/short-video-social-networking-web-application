import React from "react";
import { useState } from "react";
import usersApi from "../../api/usersApi";
import { toast } from "react-toastify";

const initialState = {
  username: "",
  password: "",
  scope: "abc",
};
const Login = ({ handleClose }) => {
  const [user, setUser] = useState(() => {
    return initialState;
  });
  const handleChangeInput = (e) => {
    let { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await usersApi.login(user);
      localStorage.setItem("userid",res.data.id)
      localStorage.setItem("access_token",res.data.access_token)
      localStorage.setItem("auth_profile_id",res.data.auth_profile_id)
      toast.success("Login success!");
      window.location.href = "/dashboard"
      handleClose();
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  return (
    <form className="form-signin" onSubmit={handleSubmit}>
      <img
        className="mb-4 mx-auto d-block"
        src="../logo.jpg"
        alt
        width={72}
        height={72}
      />
      <h1 className="h3 mb-3 font-weight-normal text-center">Please sign in</h1>
      <label htmlFor="inputEmail" className="sr-only">
        Email address
      </label>
      <input
        type="text"
        id="inputEmail"
        className="form-control mb-3"
        placeholder="Username"
        required
        autofocus
        name="username"
        onChange={handleChangeInput}
      />
      <label htmlFor="inputPassword" className="sr-only">
        Password
      </label>
      <input
        type="password"
        id="inputPassword"
        className="form-control"
        placeholder="Password"
        required
        name="password"
        onChange={handleChangeInput}
      />
      <button
        className="btn btn-lg btn-primary btn-block mx-auto d-block mt-3"
        type="submit"
      >
        Sign in
      </button>
    </form>
  );
};

export default Login;
