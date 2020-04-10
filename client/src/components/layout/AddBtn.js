import React, { useEffect } from "react";
import M from "materialize-css/dist/js/materialize.min.js";

const AddBtn = () => {
  useEffect(() => {
    M.AutoInit(); // initialise materialise JS on load
  }, []);
  return (
    <div className='fixed-action-btn'>
      <a
        href='#add-log-modal'
        className='btn-floating btn-large orange darken-2 modal-trigger'
      >
        <i className='large material-icons'>add</i>
      </a>
      <ul>
        <li>
          <a
            href='#tech-list-modal'
            className='btn-floating blue modal-trigger'
          >
            <i className='material-icons'>person</i>
          </a>
        </li>
        <li>
          <a
            href='#add-tech-modal'
            className='btn-floating green modal-trigger'
          >
            <i className='material-icons'>person_add</i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default AddBtn;
