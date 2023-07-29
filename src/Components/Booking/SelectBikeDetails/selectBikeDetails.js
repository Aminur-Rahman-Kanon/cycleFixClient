import React from 'react';
import './selectBikeDetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesDown, faBicycle, faPalette, faQuestion } from '@fortawesome/free-solid-svg-icons';

function SelectBikeDetails ({ selectedDate, disappearDetailsForm, changeMake, changeModel,
                              changeColor, changeAdditionalInfo, changeAdditionalCost,
                              finalValidation, formSubmitHandler }) {

    return (
        <div className={selectedDate && !disappearDetailsForm ? "details-form-main" : 'details-form-main-off'}>
            <h1 className="details-form-h1">Please tell us about your bike</h1>
            <form className="details-form-container">
                <div className="input-container">
                    <FontAwesomeIcon icon={faBicycle} className="input-container-icon"/>
                    <input type="text"
                            data-testid="make"
                            className="form-input"
                            placeholder="Bike Make"
                            onChange={(e) => changeMake(e.target.value)} />
                </div>

                <div className="input-container">
                    <FontAwesomeIcon icon={faBicycle} className="input-container-icon"/>
                    <input type="text"
                            data-testid="model"
                            className="form-input"
                            placeholder="Bike Model"
                            onChange={(e) => changeModel(e.target.value)} />
                </div>

                <div className="input-container">
                    <FontAwesomeIcon icon={faPalette} className="input-container-icon"/>
                    <input type="text"
                            data-testid="color"
                            className="form-input"
                            placeholder="Bike Colour"
                            onChange={(e) => changeColor(e.target.value)} />
                </div>

                <div className="textarea-container">
                    <FontAwesomeIcon icon={faQuestion} className="input-container-icon"/>
                    <textarea type="text"
                                data-testid="info"
                                rows="10"
                                className="form-textarea"
                                placeholder="Additional Info"
                                maxLength='300'
                                onChange={(e) => changeAdditionalInfo(e.target.value)} />
                </div>

                <div className="input-container-select-main">
                    <p className="input-container-select-p">If your bike needs parts, how much extra are you willing to spend without us calling you This is for parts only.</p>
                    <div className="select-div">
                        <select defaultValue="Please select an option"
                                data-testid="parts-deposit"
                                className="input-container-select"
                                onChange={(e) => changeAdditionalCost(e.target.value)}>
                            <option disabled>Please select an option</option>
                            <option value={25}>£25</option>
                            <option value={50}>£50</option>
                            <option value={75}>£75</option>
                            <option value={100}>£100</option>
                            <option value={125}>£125</option>
                            <option value={150}>£150</option>
                        </select>
                        <FontAwesomeIcon icon={ faAnglesDown } className='select-icon'/>
                    </div>
                </div>

                <div className="input-form-btn-container">
                    <button disabled={finalValidation} className="input-form-btn"
                            onClick={ formSubmitHandler }
                        >Next</button>
                </div>
            </form>
        </div>
    )
}

export default SelectBikeDetails;
