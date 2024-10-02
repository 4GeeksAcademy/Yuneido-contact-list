import React from "react";

const DeleteModal = ({showModal, handleCloseModal, handleDelete}) => {
  return (
    <>
      {showModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Are you sure?</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  If you delete this thing, the entire universe will go down!
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleCloseModal}
                >
                  Oh no!
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() =>{
                    handleDelete()
                    handleCloseModal()
                  }}
                >
                  Yes baby!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteModal;
