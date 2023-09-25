import React, { useState, useEffect, useRef, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as quillToWord from "quill-to-word";
import { toast } from "react-toastify";
import "./InputForm.css";
import { StepContext } from "./context/StepContext";

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

  const handleSubmit = (event) => {
    event.preventDefault();
    window.scrollTo(0, 0);
    context.setStep2(true);
    // context.setStep3(true);
    const formData = new FormData(event.target);

    // console.log(formData);
    // formData.push(data[0].form_id);
    const formDataObj = Object.fromEntries(formData.entries());
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
        console.log(res);
        setData(res);
        // console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleQuillChange = (html) => {
    context.setEdit((prev) => prev + 1);

    if(context.edit > 1)
    {
      context.setStep3(true);
    }
    
    setContent(html);
  }

  const navHome = () => {
    navigate("/");
  }

  return (
    <div className="form1 bg-gradient-to-r from-blue-500 to-purple-500 min-h-screen">
      <div
        className="flex justify-center items-center pt-32 -mb-32"
      >
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
          <h1 className="text-white font-bold text-4xl pt-48 text-center -mb-32">
            {data[0].form_name}
          </h1>
        )}

        {displayForm ? (
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 pt-40  p-10  ">
              {data.map(
                (ques, index) =>
                  index !== 0 && (
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
                      />
                    </div>
                  )
              )}
            </div>

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
            <h1 className="text-white font-bold text-2xl text-center mb-3">Edit Document</h1>
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
              {displayHome && <button
                onClick={navHome}
                className="p-4 ml-7 text-lg font-bold text-white rounded bg-red-300 transform transition ease-in-out hover:scale-90 duration-150 my-11"
              >
                Home
              </button>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default InputForm;
