import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import pic_1 from "../../Assets/pic_1.jpeg";
import pic_2 from "../../Assets/pic_2.jpeg";
import pic_3 from "../../Assets/pic_3.jpeg";
import pic_4 from "../../Assets/pic_4.jpeg";
import "slick-carousel/slick/slick-theme.css";
import { Base_Url } from "../../FetchAPI/indexApi";

const Course = () => {
  const [data, setData] = useState();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const fetchItems = async () => {
    try {
      // const response = await axios.get(`${Base_Url}/course/course_get`, {
      // headers: {
      //   "Access-Control-Allow-Origin": "http://localhost:3000",
      //   apikey: "e9679feb18fca7ed923fb715e914926b2181c801",
      //   token: "547c5a9a15f1c5bbf0e33f1cad44a5700574f6bb",
      // },
      //   credentials: "include",
      // });

      const response = await fetch(`${Base_Url}/course/course_get`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          apikey: "e9679feb18fca7ed923fb715e914926b2181c801",
          token: "547c5a9a15f1c5bbf0e33f1cad44a5700574f6bb",
        },
      });
      console.log(response, 31);
      setData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <>
      <Slider {...settings} className="overflow-hidden">
        <div>
          <img className="w-[100%] h-[650px]" src={pic_1} alt="" />
        </div>
        <div>
          <img
            className="w-[100%] h-[650px] overflow-x-hidden"
            src={pic_2}
            alt=""
          />
        </div>
        <div>
          <img
            className="w-[100vw] h-[650px] overflow-x-hidden"
            src={pic_3}
            alt=""
          />
        </div>
        <div>
          <img
            className="w-[100%] h-[650px] overflow-x-hidden"
            src={pic_4}
            alt=""
          />
        </div>
      </Slider>
      <div className="py-5 text-center">
        <h2 className="text-4xl font-semibold">Our Vision</h2>
        <p className="tex-2xl capitalize py-2">
          we are making learning quiz and enjoyable
        </p>
      </div>
      <div className="px-28 py-10 grid sm:grid-cols-2 md:grid-cols-4 gap-5">
        {data &&
          data.length > 0 &&
          data?.map((item, index) => {
            return (
              <>
                <div
                  className="px-8 border-4 py-2 border-blue-500 text-center rounded-md"
                  key={index}
                >
                  <h2 className="text-8xl">
                    {data[index].coursename.slice(0, 1)}
                  </h2>
                  <p className="uppercase font-bold py-2">
                    {data[index].coursename}
                  </p>
                  <Link to={`/enroll-course/${data[index]._id}`}>
                    <button className="px-5 py-1 bg-blue-500 rounded-sm text-white font-semibold">
                      Enroll Now
                    </button>
                  </Link>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
};

export default Course;
