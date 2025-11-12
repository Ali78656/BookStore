import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cards from "../components/Cards";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
function Courses() {
  const [book, setBook] = useState([]);
  const [authUser, setAuthUser] = useAuth();
  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("http://localhost:4001/book");
        console.log(res.data);
        if (authUser) {
          setBook(res.data);
        } else {
          const data = res.data.filter((data) => data.category === "Free");
          setBook(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, [authUser]);

  var settings = {
    dots: true,
    infinite: book.length > 1 ? true : false,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: book.length < 3 ? book.length : 3,
    slidesToScroll: book.length < 3 ? book.length : 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: book.length < 3 ? book.length : 3,
          slidesToScroll: book.length < 3 ? book.length : 3,
          infinite: book.length > 1 ? true : false,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: book.length < 2 ? book.length : 2,
          slidesToScroll: book.length < 2 ? book.length : 2,
          infinite: book.length > 1 ? true : false,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: book.length < 1 ? book.length : 1,
          slidesToScroll: book.length < 1 ? book.length : 1,
          infinite: book.length > 1 ? true : false,
        },
      },
    ],
  };
  return (
    <>
      <Navbar />
      <div className=" min-h-screen">
        <div className=" max-w-screen-2xl container mx-auto md:px-20 px-4">
          <div className="mt-28 items-center justify-center text-center">
            <h1 className="text-2xl  md:text-4xl">
              We're delighted to have you{" "}
              <span className="text-pink-500"> Here! :)</span>
            </h1>
            <p className="mt-12">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro,
              assumenda? Repellendus, iste corrupti? Tempore laudantium
              repellendus accusamus accusantium sed architecto odio, nisi
              expedita quas quidem nesciunt debitis dolore non aspernatur
              praesentium assumenda sint quibusdam, perspiciatis, explicabo
              sequi fugiat amet animi eos aut. Nobis quisquam reiciendis sunt
              quis sed magnam consequatur!
            </p>
            <Link to="/">
              <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
                Back
              </button>
            </Link>
          </div>
          <div className="mt-12">
            <Slider {...settings}>
              {book.map((item) => (
                <Cards item={item} key={item._id} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Courses;
