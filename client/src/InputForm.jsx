import React, { useState, useEffect, useRef, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as quillToWord from "quill-to-word";
import { toast } from "react-toastify";
import "./InputForm.css";
import { StepContext } from "./context/StepContext";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

function InputForm() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [content, setContent] = useState([]);
  const [displayForm, setDisplayForm] = useState(true);
  const [displaySteps, setDisplaySteps] = useState(true);
  const quillRef = useRef(null);
  const navigate = useNavigate();
  const context = useContext(StepContext);
  const [displayHome, setDisplayHome] = useState(false);

  // state for getting the currently active category
  const [activeCategory, setActiveCategory] = useState(1);
  const [category, setCategory] = useState([]);

  const [form_data, setForm_data] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    window.scrollTo(0, 0);
    context.setStep2(true);
    // context.setStep3(true);
    // const formData = new FormData(event.target);

    // console.log(formData);
    // formData.push(data[0].form_id);
    // const formDataObj = Object.fromEntries(formData.entries());
    var formDataObj = form_data;
    formDataObj.form_id = data[0].form_id;
    // formData.push(data[0].form_id)
    const formDataJsonString = JSON.stringify(formDataObj);
    console.log(formDataJsonString);

    setDisplayForm(false);

    fetch(`http://127.0.0.1:5000/api/final-content`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: formDataJsonString,
    })
      // .then(response => response.blob())
      // .then(blob => {
      //     // Create a new Blob object and a link to download it
      //     const url = window.URL.createObjectURL(blob);
      //     const a = document.createElement('a');
      //     a.style.display = 'none';
      //     a.href = url;
      //     a.download = 'file.docx';
      //     document.body.appendChild(a);
      //     a.click();
      //     // Clean up
      //     window.URL.revokeObjectURL(url);
      //     document.body.removeChild(a);
      .then((response) => response.json())
      .then((data) => {
        setContent(data.content);
        console.log(content);
      });
  };

  const saveText = async () => {
    // if(context.setStep3 === false)
    window.scrollTo(0, 0);
    context.setStep3(true);
    context.setStep4(true);
    setDisplayHome(true);
    // const contents = quillRef.current.getEditor().getContents();
    // fetch('http://127.0.0.1:5000/api/final-form', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(contents)
    // })
    //   .then(response => response.blob())
    //   .then(blob => {
    //       // Create a new Blob object and a link to download it
    //       const url = window.URL.createObjectURL(blob);
    //       const a = document.createElement('a');
    //       a.style.display = 'none';
    //       a.href = url;
    //       a.download = 'file.docx';
    //       document.body.appendChild(a);
    //       a.click();
    //       // Clean up
    //       window.URL.revokeObjectURL(url);
    //       document.body.removeChild(a);
    //   });
    const contents = quillRef.current.getEditor().getContents();
    const quillToWordConfig = {
      exportAs: "blob",
    };
    const doc = await quillToWord.generateWord(contents, quillToWordConfig);
    console.log(doc);
    // const blob = new Blob([doc], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    const url = window.URL.createObjectURL(doc);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "file.docx";
    document.body.appendChild(a);
    a.click();
    // Clean up
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    toast.success("File Downloaded Successfully!", {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`http://127.0.0.1:5000/api/form-details?form_id=${id}`)
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch");
        }
        return res.json();
      })
      .then((res) => {
        var filteredObjects = res.filter((obj) =>
          obj.hasOwnProperty("category_name")
        );
        setCategory(filteredObjects);
        const arr = ["form_id", "category_id"];
        filteredObjects = res.filter((obj) =>
          arr.some((key) => obj.hasOwnProperty(key))
        );
        setData(filteredObjects);
        const obj = {};
        

        for(let i = 1; i < filteredObjects.length; i++)
        {
          obj[filteredObjects[i].ques_id] = "";
        }

        setForm_data(obj);
        console.log(obj);
        // console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    // console.log(data);
    console.log(form_data);
  }, [data, category, form_data]);

  const handleQuillChange = (html) => {
    context.setEdit((prev) => prev + 1);

    if (context.edit > 1) {
      context.setStep3(true);
    }

    setContent(html);
  };

  const navHome = () => {
    navigate("/");
  };

  const handleClick = (category) => {
    console.log(category.id);
    setActiveCategory(category.id);
  };

  const handleChange = (e, ques) =>{
    var obj = form_data;
    obj[ques.ques_id] = e.target.value;
    setForm_data(obj)
    console.log(obj)
  }

  return (
    <div className="form1 bg-gradient-to-r from-blue-500 to-purple-500 min-h-screen">
      <div className="flex justify-center items-center pt-32 -mb-32 pb-20">
        <ul className="steps">
          <li className="step step-success text-white font-semibold">
            Select Legal Document
          </li>
          <li
            className={`step ${
              context.step2 && "step-success"
            } text-white font-semibold`}
          >
            Fill information
          </li>
          <li
            className={`step ${
              context.step3 ? "step-success" : ""
            } text-white font-semibold`}
          >
            Edit document
          </li>
          <li
            className={`step ${
              context.step4 ? "step-success" : ""
            } text-white font-semibold`}
            style={{ color: "white" }}
          >
            Download document
          </li>
        </ul>
      </div>

      <div className="">
        {data.length > 0 && (
          <h1 className="text-white font-bold text-4xl pt-24 text-center -mb-24">
            {data[0].form_name}
          </h1>
        )}
        {displayForm ? (
          
          <form onSubmit={handleSubmit}>
            <Tabs value={1} className="sm:px-10 px-2 pt-36 ">
              
              <TabsHeader>
                {category.length > 0 &&
                  category.map((c, index) => (
                    <Tab className="sm:mx-3 mx-1 text-lg font-normal" onClick={() => handleClick(c)} key={c.id} value={c.id}>
                      {c.category_name}
                    </Tab>
                  ))}
              </TabsHeader>
              <TabsBody>
              
                <div className="grid md:grid-cols-2  ">
                  {data.map(
                    (ques, index) =>
                      index !== 0 &&
                      ques.category_id === activeCategory && (
                        <TabPanel key={ques.ques_id} value={ques.category_id}>
                          <div
                            className="md:max-w-lg w-full pt-7 "
                            key={ques.ques_id}
                          >
                            <label
                              for="name"
                              className="text-white text-lg font-bold"
                            >
                              {ques.ques_label}
                            </label>
                            <input
                              type={ques.ques_type}
                              name={ques.ques_id}
                              className="w-full rounded-md border text-black border-gray-300 px-3 py-2"
                              required
                              style={{
                                border: "1px solid rgba(255, 255, 255, .25)",
                                backgroundColor: "rgba(255, 255, 255, 0.45)",
                                boxShadow: "0 0 10px 1px rgba(0, 0, 0, 0.25)",
                                backdropFilter: "blur(15px)",
                              }}
                              onChange={(e) => handleChange(e, ques) }
                              defaultValue = {Object.keys(form_data).length > 0 && Object.keys(ques).length > 0 ? form_data[ques.ques_id] : ""} 
                            />
                          </div>
                        </TabPanel>
                      )
                  )}
                </div>
                
              </TabsBody>
              
            </Tabs>
            <div className="flex justify-center w-full p-7 ">
              <button
                type="submit"
                className="p-4 text-lg font-bold text-white rounded bg-green-500 transform transition ease-in-out hover:scale-90 duration-150"
              >
                Submit
              </button>
            </div>
          </form>
           
        ) : (
          <div className="px-28 mt-48">
            <h1 className="text-white font-bold text-2xl text-center mb-3">
              Edit Document
            </h1>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={handleQuillChange}
              className="preserve-linebreaks bg-white text-black"
              ref={quillRef}
              id="editor"
            />
            <div className="flex justify-center">
              <button
                onClick={saveText}
                className="p-4 text-lg font-bold text-white rounded bg-green-500 transform transition ease-in-out hover:scale-90 duration-150 my-11"
              >
                Save
              </button>
              {displayHome && (
                <button
                  onClick={navHome}
                  className="p-4 ml-7 text-lg font-bold text-white rounded bg-red-300 transform transition ease-in-out hover:scale-90 duration-150 my-11"
                >
                  Home
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default InputForm;
