import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Quiz = () => {
  const [data, setData] = useState();
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState(1);

  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/");
  };

  const handleOptionClick = (page, value) => {
    setSelectedAnswer((prevData) => ({ ...prevData, [page]: value }));
    setPage(page);
  };

  useEffect(() => {
    const fetchItems = async () => {
      const getResponse = await axios.get(
        "http://localhost:5000/api/questions/question"
      );

      setData(getResponse.data);

      try {
        const response = await axios.get(
          `http://localhost:5000/api/questions/question?page=${page}&limit=${limit}`
        );
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchItems();
  }, [page, limit]);

  return (
    <>
      <div className="px-10 md:px-28 py-10">
        <div className="flex capitalize font-bold items-center py-2">
          <Link to="/">
            <h2 className="text-gray-600">Home &nbsp;</h2>
          </Link>
          <span className="text-2xl">
            <i className="bx bx-chevron-right"></i>
          </span>
          <h2 className="">Quiz Test</h2>
        </div>
        <div className="py-5 capitalize flex items-center space-x-9">
          <p>No Of Questions</p>
          <p>time 14 minutes</p>
        </div>

        <div className="py-5">
          <h2 className="text-3xl font-semibold">Grade One : Quiz One</h2>

          <div className="w-full my-5 py-4 px-4 bg-white h-96 md:h-80  shadow-black/10 shadow-lg rounded-md">
            {items &&
              items.length > 0 &&
              items.map((ele, index) => {
                return (
                  <>
                    <div className="flex py-2 justify-between">
                      <h2>
                        Questions ?{page} of {data.length}
                      </h2>
                      <p>14:00</p>
                    </div>
                    <div key={index}>
                      <div className="flex space-x-4">
                        <p>{page} &nbsp;</p>
                        <p>{ele.questions}</p>
                      </div>

                      <div className="grid grid-cols-2 px-10 py-4 items-center gap-4">
                        <div
                          className={
                            selectedAnswer[page] === "A"
                              ? "border-2 border-blue-500 py-2 px-2 rounded-md"
                              : "border-2 border-transparent py-2 px-2 rounded-md "
                          }
                          onClick={() => handleOptionClick(page, "A")}
                        >
                          <span>A&nbsp;</span>
                          {ele.option_1}
                        </div>
                        <div
                          className={
                            selectedAnswer[page] === "B"
                              ? "border-2 border-blue-500 py-2 px-2 rounded-md"
                              : " border-none py-2 px-2 rounded-md "
                          }
                          onClick={() => handleOptionClick(page, "B")}
                        >
                          <span>B&nbsp;</span>
                          {ele.option_2}
                        </div>
                        <div
                          className={
                            selectedAnswer[page] === "C"
                              ? "border-2 border-blue-500 py-2 px-2 rounded-md"
                              : " border-none py-2 px-2 rounded-md "
                          }
                          onClick={() => handleOptionClick(page, "C")}
                        >
                          <span>C&nbsp;</span>
                          {ele.option_3}
                        </div>
                        <div
                          className={
                            selectedAnswer[page] === "D"
                              ? "border-2 border-blue-500 py-2 px-2 rounded-md"
                              : "border-none py-2 px-2 rounded-md "
                          }
                          onClick={() => handleOptionClick(page, "D")}
                        >
                          <span>D&nbsp;</span>
                          {ele.option_4}
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}

            <div className="px-2 py-2 w-full items-baseline ">
              <button
                className={page === 1 ? "hidden" : "inline-flex pr-3"}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </button>

              <span>
                {data?.map((item, index) => {
                  const isCompleted = selectedAnswer[index + 1] || null;
                  return (
                    <>
                      <button
                        onClick={() => {
                          setPage(index + 1);
                        }}
                      >
                        <span
                          className={
                            isCompleted
                              ? "bg-gray-400 w-full py-2 px-3"
                              : page === index + 1
                              ? "w-full py-2 px-3 flex pr-3 bg-blue-500 text-center"
                              : "w-full py-2 px-3 border-2 pr-3 text-center"
                          }
                        >
                          {index + 1}
                        </span>
                      </button>
                    </>
                  );
                })}
              </span>
              <button
                className={page === 10 ? "hidden" : "pl-3 inline-flex"}
                onClick={() => setPage((prevPage) => prevPage + 1)}
              >
                Next
              </button>

              <button
                onClick={handleSubmit}
                className="float-right items-center mr-5 bg-blue-600 text-white font-semibold px-4 py-1 rounded-md"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Quiz;
