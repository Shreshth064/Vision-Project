import React from 'react'
import {useState} from 'react';
import '../styles/contactform.css';
import axios from 'axios';

const defaultContactFormData = {
  name: "",
  email: "",
  contact: "",
  company: "",
  message: "",
};

function ContactForm  ()  {
  const [contact, setContact] = useState(defaultContactFormData);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.elements.name.value,
      email: e.target.elements.email.value,
      contact: e.target.elements.contact.value,
      company: e.target.elements.company.value,
      message: e.target.elements.message.value,
    };

    try {
      const response = await axios.post("http://localhost:3001/contact", formData);
      console.log(response.data);
      alert("Message sent successfully");
      setContact(defaultContactFormData);
    } catch (error) {
      console.log(error);
      alert("Failed to send message");
    }
  };

  return (
    <div className="container mt-5 p-4 form-container">
      <h2 className="contactform-heading">Contact Us</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="name">
            Name
          </label>
          <input className="form-control" type="text" id="name" required />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input className="form-control" type="email" id="email" required />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="contact">
            Contact Number
          </label>
          <input className="form-control" type="text" id="contact" required />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="company">
            Company Name
          </label>
          <input className="form-control" type="text" id="company" required />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="message">
            Tell us More
          </label>
          <textarea className="form-control" id="message" rows="5" />
        </div>

        <div className="contactform-button">
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;