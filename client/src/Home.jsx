// import React from 'react'

// function Home() {
//   return (
//     <div>

//     </div>
//   )
// }

// export default Home

import React from "react";
import Footer from "./footer";

import { Link } from "react-router-dom";
import Navbar from "./Navbar"; 
import {
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
} from "@material-tailwind/react";

function Home() {
 
  return (
    <div className="min-h-screen w-[calc(100%+50px)] overflow-scroll">
<Navbar/>
       <div className="absolute inset-0 overflow-hidden">
  <video
    autoPlay
    loop
    muted
    className="h-screen w-screen object-cover object-center"
  >
    <source
      src="https://res.cloudinary.com/dyxnmjtrg/video/upload/v1694668584/Purple_Blue_Modern_Tech_Business_Conference_Video_d5vf0l.mp4"
      type="video/mp4"
    />
    {/* You can add additional source elements for different video formats (e.g., WebM, Ogg) if needed */}
    Your browser does not support the video tag.
  </video>
</div>

      <div className="mx-auto max-w-screen-md py-12 relative z-10">
        {/* <Card className="mb-12 overflow-hidden">
          <img
            alt="nature"
            className="h-[32rem] w-full object-cover object-center"
            src="https://images.unsplash.com/photo-1485470733090-0aae1788d5af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2717&q=80"
          />
        </Card> */}
        <Typography variant="h2" color="white" className="font-bold text-4xl font-serif text-center text-white mb-2 " style={{ fontFamily: ' "DM Serif Display", "Open Sans", "PT Sans", sans-serif',marginTop:'90px' }}>
          Tired of making legal documents?
        </Typography>
        <Typography
          color="white"
          className="font-normal text-center"
          style={{ fontFamily: '  "PT Sans", sans-serif' }}
        >
          This is your one stop destination to get all your queries resolved!
        </Typography>
        <br />
        <br />
        <div className="flex flex-wrap justify-between">
          {/* Card 1 */}
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
              {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Here are the biggest enterprise technology acquisitions of 2021 so far, in
        reverse chronological order.
      </p> */}
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
              {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Here are the biggest enterprise technology acquisitions of 2021 so far, in
        reverse chronological order.
      </p> */}
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
              {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Here are the biggest enterprise technology acquisitions of 2021 so far, in
        reverse chronological order.
      </p> */}
            </div>
          </a>

          {/* Repeat the above card 3 more times */}
        </div>
        <div className="chat-bot">
          {/* div for chatbot */}

          {/* <Chatbot/> */}
        </div>
      </div>

      <Footer />
    </div>
  );
}
export default Home;
