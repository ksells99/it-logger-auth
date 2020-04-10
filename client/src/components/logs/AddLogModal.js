import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addLog } from "../../actions/logActions";
import M from "materialize-css/dist/js/materialize.min.js";
import TechSelectOptions from "../techs/TechSelectOptions";

const AddLogModal = ({ addLog }) => {
  useEffect(() => {
    M.AutoInit(); // initialise materialise JS on load
  }, []);
  const [message, setMessage] = useState("");
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState("");

  const onSubmit = () => {
    if (message === "" || tech === "") {
      M.toast({ html: "Please enter a message & select a tech" });
    } else {
      const newLog = {
        message,
        attention,
        tech,
        date: new Date(),
      };

      addLog(newLog);

      M.toast({ html: `Ticket added for ${tech}` });

      // Clear fields
      setMessage("");
      setTech("");
      setAttention(false);
    }
  };

  return (
    <div id='add-log-modal' className='modal'>
      {" "}
      {/* calls add-log-modal id from Add button in AddBtn.js */}
      <div className='modal-content'>
        <h4>Add System Ticket</h4>

        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='message'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <label htmlFor='message' className='active'>
              Ticket Content
            </label>
          </div>
        </div>

        <div className='row'>
          <div className='input-field'>
            <select
              name='tech'
              value={tech}
              className='browser-default'
              onChange={(e) => setTech(e.target.value)}
            >
              <option value='' disabled>
                Select Technician
              </option>
              <TechSelectOptions />
            </select>
          </div>
        </div>

        <div className='row'>
          <div className='input-field'>
            <p>
              <label>
                <input
                  type='checkbox'
                  className='filed-in'
                  checked={attention}
                  value={attention}
                  onChange={(e) => setAttention(!attention)}
                />{" "}
                {/* if attention value is true, box is checked */}
                <span>Needs Attention</span>
              </label>
            </p>
          </div>
        </div>
      </div>
      <div className='modal-footer'>
        <a
          href='#!'
          onClick={onSubmit}
          className='modal-close waves-effect orange white-text btn'
        >
          Add Ticket
        </a>
      </div>
    </div>
  );
};

AddLogModal.propTypes = {
  addLog: PropTypes.func.isRequired,
};

export default connect(null, { addLog })(AddLogModal);
