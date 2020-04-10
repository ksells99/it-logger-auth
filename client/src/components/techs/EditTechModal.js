import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';
import {updateTech} from '../../actions/techActions';

const EditTechModal = ({updateTech, current}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    useEffect(() => {
        if(current) {
            setFirstName(current.firstName);
            setLastName(current.lastName);
            

        }
    }, [current]);

    const onSubmit = () => {
        if(firstName === '' || lastName === '') {
            M.toast({ html: 'Please enter first & last name of technician'});
        } else {
        const updTech = {
            firstName: firstName,
            lastName: lastName,
            id: current._id
        }

        updateTech(updTech);
        console.log(updTech);
        M.toast({html: `Technician ${firstName} ${lastName} has been updated`});

        };
        
        
    };

    return (
        <div id="edit-tech-modal" className="modal">  
            <div className="modal-content">
                <h4>Edit Technician <span className="grey-text">{firstName} {lastName}</span></h4>

                <div className="row">
                    <div className="input-field">
                        <input type="text" name="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} />
                    </div>
                </div>

                <div className="row">
                    <div className="input-field">
                        <input type="text" name="lastName" value={lastName} onChange={e => setLastName(e.target.value)} />
                    </div>
                </div>

                
            </div>

            <div className="modal-footer">
                <a href="#!" onClick={onSubmit} className="modal-close waves-effect blue btn">Save</a>
            </div>
        </div>
    );
};


EditTechModal.propTypes = {
    updateTech: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    current: state.tech.current
});

export default connect(mapStateToProps, {updateTech}) (EditTechModal);