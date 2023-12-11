import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Enroll = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [box, setBox] = useState();
  const [subBox, setSubBox] = useState();
  const [option, setOption] = useState(false);

  const hanleBox = (index) => {
    setBox(index);
  };

  const hanleSubBox = (index) => {
    setSubBox(index);
  };
  const [data, setData] = useState();

  const [course, setCourse] = useState();

  const auth = JSON.parse(localStorage.getItem("auth"));

  const handleAuth = async () => {
    if (auth === null) {
      alert("Please Required To Login");
    } else {
      navigate("/quiz");
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/course/course_get`
        );
        console.log(response.data.data);
        setData(response.data.data);

        const filtringData = data.filter((item) => item._id === id);
        setData(filtringData);
        const subjectResponse = await axios.get(
          `http://localhost:5000/api/subject/subject_get?id=${id}`
        );
        console.log(subjectResponse.data.data);
        setCourse(subjectResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      <div className="px-10 md:px-28 py-10 bg-gray-300 ">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            {data && data.length > 0 && data ? (
              <>
                <h2 className="text-4xl py-2">{data[0].coursename}</h2>
                <p className="py-2">{data[0].description}</p>
                <button className="px-4 py-1 bprder-2 bg-blue-500 text-white font-bold rounded-md">
                  Enroll now
                </button>
              </>
            ) : (
              ""
            )}
          </div>
          <div className="place-content-center">
            <h1 className="text-8xl">{data?.coursename?.slice(0, 1)}</h1>
          </div>
        </div>

        <div className="py-10">
          {course && course.length > 0 && course ? (
            <>
              <div className="space-y-2 ">
                {course[0].subject_name.map((ele, index) => {
                  return (
                    <>
                      <h2
                        key={index}
                        onClick={() => hanleBox(index + 1)}
                        className="w-full capitalize py-2 px-4 cursor-pointer font-semibold bg-white  shadow-black/10 shadow-md rounded-md  "
                      >
                        <span>{ele}</span>

                        <div className="space-y-3">
                          {box === index + 1 ? (
                            <>
                              {course[0].subtype_sub.map((ele, index) => {
                                return (
                                  <>
                                    <p
                                      className="px-5 py-1 border-2 rounded-md"
                                      onClick={() => hanleSubBox(index + 1)}
                                      key={index}
                                    >
                                      {ele}

                                      {subBox === index + 1 ? (
                                        <>
                                          <div className="px-10 flex justify-between items-center space-y-1 ">
                                            <p>Quiz_1</p>

                                            <button
                                              onClick={() => handleAuth()}
                                              className="bg-green-700 px-3 py-1 rounded-md text-white"
                                            >
                                              start
                                            </button>
                                          </div>
                                        </>
                                      ) : (
                                        ""
                                      )}
                                    </p>
                                  </>
                                );
                              })}
                            </>
                          ) : (
                            ""
                          )}
                        </div>
                      </h2>
                    </>
                  );
                })}
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Enroll;
