import React, { useState } from "react";

import "./Modal.css";
import Axios from "axios";

export default function Modal({
  closeModal,
  onSubmit,
  defaultValue,
  postToEdit,
  setPostToEdit,
}) {
  const [formState, setFormState] = useState(
    defaultValue || {
      customerId: null,
      shipName: "",
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.page && formState.description && formState.status) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.put(
      `https://northwind.vercel.app/api/orders/${postToEdit.id}`,
      formState
    )
      .then((response) => {
        return Axios.get("https://northwind.vercel.app/api/orders");
      })
      .then((response) => {
        onSubmit(response.data);

        closeModal();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        <form>
          <div className="form-group">
            <label htmlFor="customerId">CustomerId</label>
            <input
              placeholder={postToEdit.customerId}
              id="customerId"
              name="customerId"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="shipName">ShipName</label>
            <input
              id="shipName"
              name="shipName"
              onChange={handleChange}
              placeholder={postToEdit.shipName}
            />
          </div>
          <button type="submit" className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
