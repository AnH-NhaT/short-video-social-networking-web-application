import React from "react";
import FriendRecomend from "../../components/FriendRecomend";
import Video from "../../components/Video";




const Home = () => {
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <FriendRecomend />
          <div className="col-sm-8 scrollne mt-5">
            <div className="mb-5">
              <Video />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
