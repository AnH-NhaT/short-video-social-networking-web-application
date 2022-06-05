import React from "react";
import { useState } from "react";
import usersApi from "../../api/usersApi";
import { toast } from "react-toastify";
const initialState = {
  username: "",
  password: "",
  scope: "abc",
};

const Register = () => {
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
      let res = await usersApi.register(user);
        toast.success("Account has been created");
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
      <h1 className="h3 mb-3 font-weight-normal text-center">
        Please register
      </h1>
      <label htmlFor="inputEmail" className="sr-only">
        Email address
      </label>
      <input
        type="text"
        id="inputEmail"
        className="form-control mb-3"
        name="username"
        onChange={handleChangeInput}
        placeholder="Entered your email..."
      />
      <label htmlFor="inputPassword" className="sr-only">
        Password
      </label>
      <input
        type="password"
        id="inputPassword"
        className="form-control"
        name="password"
        onChange={handleChangeInput}
        placeholder="Entered your password..."
      />
      <button
        className="btn btn-lg btn-primary btn-block mx-auto d-block mt-3"
        type="submit"
      >
        Register
      </button>
    </form>
  );
};

export default Register;
