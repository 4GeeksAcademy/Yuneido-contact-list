import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhone,
  faEnvelope,
  faPencil,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import "../../styles/ContactCard.css";
import PropTypes from "prop-types";

const ContactCard = (props) => {
  const img = props.contactImg
    ? props.contactImg
    : "https://avatar.iran.liara.run/public/job/operator/male";
  const name = props.contactName
    ? props.contactName
    : "This is a Default Value";
  const address = props.contactAddress
    ? props.contactAddress
    : "Address is mising";
  const phone = props.contactPhone
    ? props.contactPhone
    : "Phone number is missing";
  const mail = props.contactMail ? props.contactMail : "E-Mail is missing";

  const toDelete = props.onDelete
    ? props.onDelete
    : (e) => console.log("No se ha asociado una funcion para eliminar");

  const toEdit = props.onEdit
    ? props.onEdit
    : (e) => console.log("No se ha asociado una funcion para editar");

  return (
    <div className="container-fluid border p-3">
      <div className="row">
        <div className="col-md-2 col-sm-12 d-flex justify-content-center align-items-center ">
          <div id="avatar-container">
            <img src={img} alt="contact-avatar" />
          </div>
        </div>
        <div className="col-md-8 col-sm-12">
          <div className="row text-start">
            <h5>{name}</h5>
          </div>
          <ul
            style={{ listStyle: "none" }}
            className="d-flex flex-column gap-1 align-items-start ps-0"
          >
            <li>
              <FontAwesomeIcon icon={faLocationDot} className="me-2" />
              <span className="contact-info">{address}</span>
            </li>
            <li>
              <FontAwesomeIcon icon={faPhone} className="me-2" />
              <span className="contact-info">{phone}</span>
            </li>
            <li>
              <FontAwesomeIcon icon={faEnvelope} className="me-2" />
              <span className="contact-info">{mail}</span>
            </li>
          </ul>
        </div>
        <div className="col-md-2 col-sm-12 d-flex justify-content-center align-items-center pe-5">
          <div className="d-flex gap-3">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                toEdit(props.contactId);
              }}
            >
              <FontAwesomeIcon
                icon={faPencil}
                className="text-warning btn btn-dark"
              />
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                toDelete(props.contactId);
              }}
            >
              <FontAwesomeIcon icon={faTrashCan} className="btn btn-danger" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

ContactCard.propTypes = {
  contactImg: PropTypes.string,
  contactName: PropTypes.string,
  contactAddress: PropTypes.string,
  contactPhone: PropTypes.string,
  contactMail: PropTypes.string,
  contactId: PropTypes.number,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};

export default ContactCard;
