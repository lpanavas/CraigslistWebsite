import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import MainPageNav from "../NavBars/MainPageNav";
import Filters from "./Filters";
import Posts from "./Posts";
import ApartmentTinder from "./ApartmentTinder.js";
import "../../style/home.css";
const Home = (props) => {
  const [aptTinder, setAptTinder] = useState(false);
  const [filterArray, setFilterArray] = useState({
    searching: "",
    priceLow: 0,
    priceHigh: 100000,
  });
  const [findLikes, setFindLikes] = useState(false);
  const [posts, setPosts] = useState("");
  const [dataStatus, setDataStatus] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  // console.log("seach", filterArray);
  console.log("apt Tinder", aptTinder);

  const getPosts = async () => {
    try {
      const allPosts = await fetch("/posts", {
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          // "Content-Type": "application/x-www-form-urlencoded",
          // "Access-Control-Allow-Headers", "Content-Type"
        },
      }).then((res) => res.json());
      // console.log(res);
      // const allPosts = await res.json();
      setPosts(allPosts);
      console.log("here");

      setDataStatus(true);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);
  console.log(currentUser);
  return (
    <div className="homeBackground">
      <MainPageNav
        setAptTinder={setAptTinder}
        setCurrentUser={setCurrentUser}
      ></MainPageNav>

      <Container fluid>
        <Row>
          <Col sm={2}>
            <Filters
              setFilterArray={setFilterArray}
              filterArray={filterArray}
              setFindLikes={setFindLikes}
              findLikes={findLikes}
            ></Filters>
          </Col>
          {dataStatus ? (
            <Col>
              {aptTinder ? (
                <ApartmentTinder
                  filterArray={filterArray}
                  posts={posts}
                  currentUser={currentUser}
                ></ApartmentTinder>
              ) : (
                <Posts
                  // search={search}
                  // lowPrice={lowPrice}
                  // highPrice={highPrice}
                  filterArray={filterArray}
                  posts={posts}
                  currentUser={currentUser}
                  findLikes={findLikes}
                ></Posts>
              )}
            </Col>
          ) : (
            <div>Loading</div>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Home;
