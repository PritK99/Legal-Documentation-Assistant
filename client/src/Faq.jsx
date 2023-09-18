import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
 
export function Faq() {
  const [open, setOpen] = React.useState(1);
 
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
 
  return (
    <>
    <div className="mt-20 ml-2 mr-2 h-screen  bg-[url(https://res.cloudinary.com/dvgieawnp/image/upload/v1695056722/cld-sample-2_sr6yge.png)] bg-x-repeat	">
    <h1 class="mb-4 text-4xl font-extrabold justify-center flex leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">FAQ's</h1>
      <div className=" rounded m-2 pt-12">
      <Accordion open={open === 1}>
        <AccordionHeader className="justify-center flex" onClick={() => handleOpen(1)}>thode qts batao</AccordionHeader>
        <AccordionBody  className="justify-center flex">
          We&apos;re not always in the position that we want to be at. We&apos;re constantly
          growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
          ourselves and actualize our dreams.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2}>
        <AccordionHeader className="justify-center flex" onClick={() => handleOpen(2)}>
         More qts 
        </AccordionHeader>
        <AccordionBody  className="justify-center flex" >
          We&apos;re not always in the position that we want to be at. We&apos;re constantly
          growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
          ourselves and actualize our dreams.
        </AccordionBody>
      </Accordion>
      <Accordion  open={open === 3}>
        <AccordionHeader className="justify-center flex" onClick={() => handleOpen(3)}>
          more qts..
        </AccordionHeader>
        <AccordionBody  className="justify-center flex">
          We&apos;re not always in the position that we want to be at. We&apos;re constantly
          growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
          ourselves and actualize our dreams.
        </AccordionBody>
      </Accordion>
      </div>
      </div>
    </>
  );
};
export default Faq;