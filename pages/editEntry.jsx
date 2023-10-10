//Screen to edit each entry
import axios from "axios";
import "../App.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

function EditEntry() {
  const { itemId } = useParams();

  const [item, setItem] = useState({});

  useEffect(() => {
    axios
      .get(`https://651e976244a3a8aa4768a26e.mockapi.io/Crud/${itemId}`)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }
        return response.data;
      })
      .then((data) => setItem(data))
      .catch((error) => console.error("Error in fetching data: ", error));
  }, [itemId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      name: item.name,
      age: item.age,
      email: item.email,
    };

    axios
      .put(
        `https://651e976244a3a8aa4768a26e.mockapi.io/Crud/${itemId}`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          alert("Edit successful!");
          return response.json();
        }
      })
      .catch((error) => console.error("Error in fetching data: ", error));
  };

  const text =
    "ChatGPT provides easy-to understand information about basic knowledge, lifestyle, and treatments for liver cancer, according to a study published in Clinical and Molecular Hepatology. Alexander Kuo, MD, and colleagues examined the accuracy and reproducibility of ChatGPT in answering questions regarding knowledge, management, and emotional support for hepatocellular carcinoma (HCC) and other liver conditions. The analysis included ChatGPT responses to 164 questions that were independently graded.";

  const hyphenateText = (text) => {
    const words = text.split(/\s+/); // Split the text into words
    const hyphenatedWords = [];

    for (let i = 0; i < words.length; i++) {
      const word = words[i];

      // Insert a soft hyphen between each character of the word
      const hyphenatedWord = Array.from(word).join("&shy;");

      // Add the hyphenated word to the array
      hyphenatedWords.push(hyphenatedWord);

      // Add a non-breaking space after each word (except the last one)
      if (i < words.length - 1) {
        hyphenatedWords.push(" ");
      }
    }

    return hyphenatedWords;
  };

  return (
    <div className="container">
      <h1>Edit Entry</h1>
      <form className="entry-form" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <td className="newTd">
            <label htmlFor="id">Unique ID: </label>
          </td>
          <td className="newTd">
            <input
              type="text"
              id="id"
              name="id"
              className="form-control"
              value={item.id}
              readOnly
            />
          </td>
        </div>

        <div className="form-group">
          <td className="newTd">
            <label htmlFor="name">Name:</label>
          </td>
          <td className="newTd">
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={item.name}
              onChange={(e) => setItem({ ...item, name: e.target.value })}
            />
          </td>
        </div>

        <div className="form-group">
          <td className="newTd">
            <label htmlFor="age">Age:</label>
          </td>
          <td className="newTd">
            <input
              type="text"
              id="age"
              name="Age"
              className="form-control"
              value={item.age}
              onChange={(e) => setItem({ ...item, age: e.target.value })}
            />
          </td>
        </div>

        <div className="form-group">
          <td className="newTd">
            <label htmlFor="email">Email:</label>
          </td>
          <td className="newTd">
            <input
              type="text"
              id="email"
              name="Email"
              className="form-control"
              value={item.email}
              onChange={(e) => setItem({ ...item, email: e.target.value })}
            />
          </td>
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>

      <div
        className="stylingDiv"
        style={{
          width: "180px",
          border: " 1px solid black",
        }}
      >
        <p
          className="stylingTemp lineWidth"
          dangerouslySetInnerHTML={{
            __html: hyphenateText(text).join(""),
          }}
        ></p>
      </div>
    </div>
  );
}

export default EditEntry;
