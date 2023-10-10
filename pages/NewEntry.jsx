//Screen to view add new details
import "../App.css";
import { React, useState } from "react";

function NewEntry() {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    age: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://651e976244a3a8aa4768a26e.mockapi.io/Crud", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        alert("Added successfylly!");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        
      })
      .catch((error) => console.error("Error while submitting data: ", error));
  };

  return (
    <div className="container">
      <h1>Add New Entry</h1>
      <form className="entry-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <td className="newTd">
            <label htmlFor="id">Unique ID:</label>
          </td>
          <td className="newTd">
            <input
              type="text"
              id="id"
              name="Id"
              className="form-control"
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
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
              name="Name"
              className="form-control"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            />
          </td>
        </div>

        <div className="form-group">
          <td className="newTd">
            <label htmlFor="age">Email:</label>
          </td>
          <td className="newTd">
            <input
              type="text"
              id="email"
              name="Email"
              className="form-control"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </td>
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewEntry;
