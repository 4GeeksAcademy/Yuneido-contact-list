import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigation } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";

const AddContact = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [isEditing, setIsEditing] = useState(false)
  const { contactId } = useParams();

  const loadContact = (contactId) => {
    let contacto = store.contacts.find((c) => c.id == contactId);
    setFormData({
      name: contacto.name,
      phone: contacto.phone,
      email: contacto.email,
      address: contacto.address,
    });
  };

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.trim() });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name == "" || formData.name == " " || !formData.name) {
      alert("No Puedes enviar un nombre vacío");
      return;
    }
    if (isEditing) {
      actions.editContact(contactId, formData);
    }else{
      actions.addNewContact(formData, store.user);
      
    }
    setTimeout(() => actions.getOrCreateUser(store.user), 1000);
    navigate("/");
  };

  useEffect(() => {
    if (store.user == null) {
      navigate("/");
      return
    }
    if (contactId) {
      setIsEditing(true)
      loadContact(contactId);
    }
  }, [contactId]);

  return (
    <div className="container-fluid">
      <h1 className="text-center">
        {contactId
          ? `Editando el contacto: ${contactId}`
          : "Add new Contact"}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Full Name"
            onChange={handleChange}
            value={formData.name}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter email"
            onChange={handleChange}
            value={formData.email}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            name="phone"
            className="form-control"
            placeholder="Enter phone"
            onChange={handleChange}
            value={formData.phone}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            className="form-control"
            placeholder="Enter address"
            onChange={handleChange}
            value={formData.address}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </form>
      <Link to="/">Or get back to contacts</Link>
    </div>
  );
};

export default AddContact;
