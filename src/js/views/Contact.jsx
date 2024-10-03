import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import rigoImage from "../../img/rigo-baby.jpg";
import { Context } from "../store/appContext";
import ContactCard from "../component/ContactCard.jsx";
import "../../styles/Contact.css";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../component/DeleteModal.jsx";
const Contact = () => {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState("");
  const { store, actions } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const [contactId, setContactId] = useState(null);

  const handleEdit = (contactId) => {
    navigate(`/edit/${contactId}`);
  };

  const openModal = (id) => {
    setContactId(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container-fluid">
      <DeleteModal
        showModal={showModal}
        handleCloseModal={closeModal}
        handleDelete={() => actions.deleteContact(contactId)}
      />
      <h1>
        Hello {store.user != null ? store.user.toUpperCase() : "stranger"}!
      </h1>
      <div className="container w-50 mb-4">
        <input
          type="text"
          name="userInput"
          id="userInput"
          placeholder="Ingresa tu usuario"
          className="form-control"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        <button
          type="button"
          className="btn btn-primary mt-3"
          onClick={(e) => {
            e.preventDefault();
            actions.setUser(inputValue);
            setInputValue("");
          }}
        >
          Search Agenda
        </button>
      </div>
      <div className="container text-end w-75">
        {store.user != null ? (
          <Link to="/add" className="btn btn-success me-1 mb-2" id="addContact">
            {" "}
            Add new contact
          </Link>
        ) : (
          " "
        )}
      </div>
      <div className="container contact-list w-75 text-end">
        {store.contacts.length > 0 ? (
          store.contacts.map((contacto, index) => {
            return (
              <ContactCard
                onEdit={handleEdit}
                onDelete={openModal}
                key={index}
                contactId={contacto.id}
                contactName={contacto.name}
                contactPhone={contacto.phone}
                contactAddress={contacto.address}
                contactMail={contacto.email}
              />
            );
          })
        ) : (
          <div className="alert alert-warning text-center" role="alert">
            {store.user != null
              ? "Ops! no tienes ningun contacto agendado."
              : "Debes ingresar un usuario para ver la agenda o crear una nueva"}
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
