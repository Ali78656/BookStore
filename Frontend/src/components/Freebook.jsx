import React, { useEffect, useState } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import axios from "axios";
import { useAuth } from "../context/AuthProvider";

import Cards from "./Cards";
function Freebook() {
  const [authUser, setAuthUser] = useAuth();
  const [book, setBook] = useState([]);
  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("http://localhost:4001/book");
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
  }, []);

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
      <div className=" max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div>
          <h1 className="font-semibold text-xl pb-2">Free Offered Courses</h1>
          <p>
            Unlock your potential with our free online courses! Learn
            programming, design, and personal development at your own pace. Gain
            practical skills and certificates to boost your career — all without
            cost.
          </p>
        </div>

        {/* {console.log("Books array for slider:", book)} */}
        <div>
          <Slider {...settings}>
            {book.map((item) => (
              <Cards item={item} key={item._id} />
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}
export default Freebook;
