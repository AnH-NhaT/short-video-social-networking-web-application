import React from "react";
import ReactDOM from "react-dom";
import Layout from "./layout/Layout";
import "./sass/index.scss";
import { Provider } from "react-redux";
import store from "./store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <Provider store={store}>
    <Layout />
    <ToastContainer
      position="top-right"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    {/* Same as */}
    <ToastContainer />
  </Provider>,
  document.getElementById("root")
);
