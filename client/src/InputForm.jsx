import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import * as quillToWord from 'quill-to-word';
import "./InputForm.css";


function InputForm() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [content, setContent] = useState([]);
  const quillRef = useRef(null);
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    
    // console.log(formData);
    // formData.push(data[0].form_id);
    const formDataObj = Object.fromEntries(formData.entries());
    formDataObj.form_id = data[0].form_id;
    // formData.push(data[0].form_id)
    const formDataJsonString = JSON.stringify(formDataObj);
    console.log(formDataJsonString);

    fetch(`http://127.0.0.1:5000/api/final-content`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: formDataJsonString
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
    .then(response => response.json())
    .then(data => {
      setContent(data.content)
      console.log(content)
    });
  };


  const saveText = async () => {
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
      exportAs: 'blob'
    };
    const doc = await quillToWord.generateWord(contents, quillToWordConfig);
    console.log(doc)
    // const blob = new Blob([doc], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    const url = window.URL.createObjectURL(doc);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'file.docx';
    document.body.appendChild(a);
    a.click();
    // Clean up
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
  };

  useEffect(() => {
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

  return (
    <div className="form1 bg-gradient-to-r from-blue-500 to-purple-500 ">
      {data.length>0 &&
      <h1>{data[0].form_name}</h1>}
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 pt-40 min-h-screen p-10  ">
          {data.map(
            (ques, index) =>
              index !== 0 && (
                <div className="md:max-w-lg w-full pt-7 " key={ques.ques_id}>
                  <label for="name" className="text-white text-lg font-bold">{ques.ques_label}</label>
                  <input
                    type={ques.ques_type}
                    name={ques.ques_id}
                    className="w-full rounded-md border  border-gray-300 px-3 py-2"
                    required
                    style={{
                    border: '1px solid rgba(255, 255, 255, .25)',
                    backgroundColor: 'rgba(255, 255, 255, 0.45)',
                    boxShadow: '0 0 10px 1px rgba(0, 0, 0, 0.25)',
                    backdropFilter: 'blur(15px)',
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
      <ReactQuill theme="snow" value={content} onChange={setContent} className="preserve-linebreaks" ref={quillRef} id="editor"/>
      <button onClick={saveText}>Save</button>
    </div>
  );
}

export default InputForm;
