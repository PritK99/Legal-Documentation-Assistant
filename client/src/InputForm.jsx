import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./InputForm.css";
function InputForm() {
  const { id } = useParams();
  const [data, setData] = useState([]);

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

    fetch(`http://127.0.0.1:5000/api/final-form`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: formDataJsonString
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
    <div className="form1">
      {data.length>0 &&
      <h1>{data[0].form_name}</h1>}
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 pt-40 min-h-screen p-10 ">
          {data.map(
            (ques, index) =>
              index !== 0 && (
                <div className="md:max-w-lg w-full pt-7" key={ques.ques_id}>
                  <label for="name">{ques.ques_label}</label>
                  <input
                    type={ques.ques_type}
                    name={ques.ques_id}
                    class="w-full rounded-md border border-gray-300 px-3 py-2"
                    required
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
    </div>
  );
}

export default InputForm;
