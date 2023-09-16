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
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
} from "@material-tailwind/react";

function Home() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
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
    <div className="min-h-screen w-full ">
      <Navbar className="sticky top-0 z-20 h-16 max-w-full rounded-none py-1 px-4 lg:px-8 lg:py-2 mt-10">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            className="mr-4 cursor-pointer py-1.5 font-bold text-2xl  font-serif "
          >
            DocBuddy
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <Button
              variant="gradient"
              size="sm"
              className="hidden lg:inline-block"
            >
              <span>Login</span>
            </Button>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>
          {navList}
          <Button variant="gradient" size="sm" fullWidth className="mb-2">
            <span>Buy Now</span>
          </Button>
        </MobileNav>
      </Navbar>
      <div className="absolute bg-center	 inset-0 overflow-hidden">
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
        <Typography
          variant="h2"
          color="white"
          className="font-bold text-4xl font-serif text-center text-white mb-2 "
          style={{
            fontFamily:
              ' "DM Serif Display", "Open Sans", "PT Sans", sans-serif',
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
