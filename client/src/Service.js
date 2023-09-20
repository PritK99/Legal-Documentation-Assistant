import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import "./Service.css";
import Navbar from "./Navbar";
import Progress from "react-progressbar";
import ProgressBar from "@ramonak/react-progress-bar";
import { StepContext } from "./context/StepContext";

function Service() {
  const initialCards = [
    { title: "Lease Deed", category: "Contracts" },
    { title: "Rent Agreement", category: "Important" },
    { title: "Allowance", category: "Important" },
    { title: "Allowance", category: "Important" },
    { title: "Maintainance", category: "Contracts" },
    { title: "Acceptance", category: "New" },
    // Add more card data here
  ];

  const { id } = useParams();
  const [data, setData] = useState([]);
  const [serviceName, setServiceName] = useState("");

  const context = useContext(StepContext);
  
  const [selectedCategory, setSelectedCategory] = useState("");
  const categories = Array.from(
    new Set(initialCards.map((card) => card.category))
  );

  const filteredCards = selectedCategory
    ? initialCards.filter((card) => card.category === selectedCategory)
    : initialCards;

  const handleFilter = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    context.setStep1(false);
    context.setStep2(false);
    context.setStep3(false);
    context.setStep4(false);
    
    fetch(`http://127.0.0.1:5000/api/forms?service_id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch");
        }
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setData(res);
        // console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      setServiceName(data[0].service_name);
    }
  }, [data]);

  const handleClick= () => {
    context.setStep1(true);
  }

  return (
    <div className="outer">
      <div className="absolute inset-0 overflow-hidden h-full">
        <video
          autoPlay
          loop
          muted
          className="h-screen w-screen object-cover object-center fixed top-0 left-0 z-0"
          style={{ zIndex: -1 }}
        >
          <source
            src="https://res.cloudinary.com/dyxnmjtrg/video/upload/v1694668584/Purple_Blue_Modern_Tech_Business_Conference_Video_d5vf0l.mp4"
            type="video/mp4"
          />
          {/* You can add additional source elements for different video formats (e.g., WebM, Ogg) if needed */}
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="serve w-full">
        {/* <div className="right">
          
          <h2>Steps: </h2>
          <br />
         <ol >

          <li className="bg-blue-500 rounded">Select legal document. </li>
          <br />
          <li className="bg-white rounded">Enter the details in form pertaining to your problem. </li>
          <li>Edit the document as per your requirement.</li>
          <li>Download legal document. </li>
         </ol>


        </div> */}

        <div className="cards mx-auto">
          <div className="cards mx-auto">
            {/* <div style={{ display: 'flex', alignItems: 'center', marginTop: '50px' }}>
  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'blue', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '1px' }}>
    1
  </div>
  <div style={{ width: '900px' }}>
    <Progress completed={50} />
  </div>
</div> */}

            <div
              className="my-7 flex justify-center"
            >
              <ul className="steps">
                <li
                  className={`step ${context.step1 ? "step-success" : ""} text-white font-semibold`}
                >
                  Select Legal Document
                </li>
                <li
                  className={`step  ${context.step2 ? "step-success" : ""} text-white font-semibold`}
                  style={{ color: "white" }}
                >
                  Fill information
                </li>
                <li
                  className={`step  ${context.step3 ? "step-success" : ""} text-white font-semibold`}
                  style={{ color: "white" }}
                >
                  Edit document
                </li>
                <li
                  className={`step ${context.step4 ? "step-success" : ""} text-white font-semibold`}
                  style={{ color: "white" }}
                >
                  Download document
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center ">
            <h1 className="text-4xl font-bold text-center  text-white mb-7 mt-3 ">
              {serviceName.length > 0 && serviceName}
            </h1>
            {data.length > 0 ? (
              data.map((form, index) => (
                <Link
                  to={"/form/" + form.form_id}
                  className="card"
                  key={form.form_id}
                  onClick={handleClick}
                >
                  <div className="flex w-full mx-auto text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-9 h-9"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>
                    <p className="text-xl font-semibold mt-1 px-3">
                      {form.form_name}
                    </p>
                  </div>

                  <button>View Document</button>
                </Link>
              ))
            ) : (
              <div className="flex justify-center w-full items-center">
                <p className="text-4xl text-white font-bold">
                  Contact the Lawyer...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Service;
