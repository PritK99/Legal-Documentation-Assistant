// import React from 'react'

// function Home() {
//   return (
//     <div>

//     </div>
//   )
// }

// export default Home

import React, { useContext } from "react";
import { useState } from "react";
import Footer from "./footer";
import Chatbot from "./chatbot";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { StepContext } from "./context/StepContext";

import {
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
} from "@material-tailwind/react";

function Home() {
  const context = useContext(StepContext);
  const [openNav, setOpenNav] = React.useState(false);
  const [data, setData] = useState([]);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
    window.scrollTo(0, 0);

    context.setStep1(false);
    context.setStep2(false);
    context.setStep3(false);
    context.setStep4(false);

    fetch("http://127.0.0.1:5000/api/services")
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

    // console.log(data);
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 ">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          About
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Services
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Docs
        </a>
      </Typography>
      {/* <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          
        </a>
      </Typography> */}
    </ul>
  );

  return (
    <div className="min-h-screen ">
      
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

      <div className="py-12 relative z-10">
        {/* <Card className="mb-12 overflow-hidden">
          <img
            alt="nature"
            className="h-[32rem] w-full object-cover object-center"
            src="https://images.unsplash.com/photo-1485470733090-0aae1788d5af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2717&q=80"
          />
        </Card> */}
        <Typography
          variant="h2"
          color="white"
          className="font-bold text-4xl font-serif text-center text-white mb-2 "
          style={{
            fontFamily:
              ' "DM Serif Display", "Open Sans", "PT Sans", sans-serif',
            marginTop: "90px",
          }}
        >
          Tired of making legal documents?
        </Typography>
        <Typography
          color="white"
          className="font-normal text-center"
          style={{ fontFamily: '  "PT Sans", sans-serif' }}
        >
          This is your one stop destination to get all your queries resolved!
        </Typography>

        <div className="md:max-w-3xl mx-auto mt-14 -mb-7 px-3">
          <Typography
            color="white"
            className="font-light text-center md:text-xl text-base"
            style={{ fontFamily: '  "PT Sans", sans-serif' }}
          >
            Now seamlessly draft your legal documents without knowing any legal jargons. Just answer some easy questions and 
            get your documents drafted with custom editable feature. 
            <br />
            Not sure which document to choose? Ask our AI powered Chatbot!!
          </Typography>
        </div>

        {data.length > 0 && (
          <Typography
            variant="h2"
            color="white"
            className="font-bold text-4xl font-serif text-center text-white -mb-14 "
            style={{
              fontFamily:
                ' "DM Serif Display", "Open Sans", "PT Sans", sans-serif',
              marginTop: "90px",
            }}
          >
            Available Documents
          </Typography>
        )}
        {data.length > 0 ? (
          <section className="text-black w-full">
            <div className="container lg:px-16 md:px-9 px-5 py-24 mx-auto w-full">
              <div className="flex flex-wrap -m-4 w-full">
                {data.map((service, index) => (
                  <Link
                    to={`/service/${service.service_id}`}
                    className="p-4 md:w-1/3 cursor-pointer transform transition ease-in-out hover:scale-90 duration-500"
                    key={service.service_id}
                  >
                    <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                      <img
                        className="lg:h-48 md:h-36 w-full object-cover object-center"
                        src={service.img_link}
                        alt="blog"
                      />
                      <div className="bg-[#E6E6FA] h-full">
                        <div className="p-6">
                          <h2 className=" text-lg font-bold text-black mb-3 text-center">
                            {service.service_name}
                          </h2>
                          <div className="flex justify-center mb-3 ">
                            <p className="text-lg font-normal text-black text-justify">
                              {service.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <div className="flex justify-center items-center h-full w-full">
            <p className="text-4xl text-white font-semibold">Loading...</p>
          </div>
        )}
        {/* <div className="flex flex-wrap justify-between">
          <a
            href="#"
            className=" md:w-1/4 bg-white border border-gray-200 rounded-lg shadow mb-4 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <img
              className="object-cover w-full h-96 md:h-auto md:w-48 rounded-t-lg md:rounded-l-lg"
              src="https://res.cloudinary.com/dyxnmjtrg/image/upload/v1694691119/property_wb2bha.jpg"
              alt=""
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className=" mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                Property <br /> Documents
              </h5>
            </div>
          </a>
          <a
            href="#"
            className="flex flex-col items-center w-full md:w-1/4 bg-white border border-gray-200 rounded-lg shadow mb-4 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <img
              className="object-cover w-full h-96 md:h-auto md:w-48 rounded-t-lg md:rounded-l-lg"
              src="https://res.cloudinary.com/dyxnmjtrg/image/upload/v1694753446/business_frtlpg.jpg"
              alt=""
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                Business
                <br /> Documents
              </h5>
            </div>
          </a>
          <a
            href="#"
            className="flex flex-col items-center w-full md:md:w-1/4 bg-white border border-gray-200 rounded-lg shadow mb-4 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <img
              className="object-cover w-full h-96 md:h-auto md:md:w-48 rounded-t-lg md:rounded-l-lg"
              src="https://res.cloudinary.com/dyxnmjtrg/image/upload/v1694753486/law_f6g4co.jpg"
              alt=""
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                Divorce <br /> Documents
              </h5>
            </div>
          </a>
        </div> */}
        <div className="chat-bot">
          {/* div for chatbot */}

          {/* <Chatbot/> */}
        </div>
      </div>
    </div>
  );
}
export default Home;
