// Modal form component that users will set their filters.
import { useState } from 'react';
import ReactModal from 'react-modal';
export default function FilterForm({ setFilters, filters , DEFAULTS}) {

    // modal visibility state and toggle
    const [isModalOpen, setisModalOpen] = useState(false);

    const [warningMessage, setWarningMessage] = useState("Default warning message")
    const [warningVisibility, setWarningVisibility] = useState("warning-message-inactive")

    function displayWarning(message) {
        setWarningMessage(message);
        setWarningVisibility("warning-message")
    }

    function hideWarning() {
        setWarningMessage("");
        setWarningVisibility("warning-message-inactive")
    }

    const handleChange = (e) => {

        setFilters({ ...filters, [e.target.name]: e.target.value });

        console.log("Limited is set to " + filters.limited);

        if (Number(filters.min_power) > Number(filters.max_power)) {
            displayWarning("Your minimum power is set higher than your maximum. Nothing will be shown.")
            return (null)
        }
        if (Number(filters.min_power_bonus) > Number(filters.max_power_bonus)) {
            displayWarning("Your minimum power bonus is set higher than your maximum. Nothing will be shown.")
            return (null)
        }
        if (Number(filters.min_attr_bonus) > Number(filters.max_attr_bonus)) {
            displayWarning("Your minimum attraction bonus is set higher than your maximum. Nothing will be shown.")
            return (null)
        }
        if (Number(filters.min_luck) > Number(filters.max_luck)) {
            displayWarning("Your minimum luck is set higher than your maximum. Nothing will be")
            return (null)
        }
        if (Number(filters.min_title_req) > Number(filters.max_title_req)) {
            displayWarning("Your lowest title is higher than your highest title. Nothing will be shown.")
            return (null)
        }
        if (Number(filters.min_cheese_effect) > Number(filters.max_cheese_effect)) {
            displayWarning("Your worst cheese effect is lower that your best cheese effect. Nothing will be shown.")
            return (null)
        }

        hideWarning();

    }

    const handleCheckboxChange = (e) => {
        if (e.target.checked) {
            setFilters({...filters,
                "power_type": {...filters.power_type, [e.target.value]: true}
            });
        } else {
            setFilters({...filters,
                "power_type": {...filters.power_type, [e.target.value]: false}
            });
        }
    }

    function selectAllPowerTypes() {
        setFilters({...filters, power_type: {
            "Arcane": true,
            "Draconic": true,
            "Forgotten": true,
            "Hydro": true,
            "Law": true,
            "Parental": true,
            "Physical": true,
            "Rift": true,
            "Shadow": true,
            "Tactical": true,
          }})
          console.log(filters.power_type);
    }

    function selectNoPowerTypes() {
        setFilters({...filters, power_type: {
            "Arcane": false,
            "Draconic": false,
            "Forgotten": false,
            "Hydro": false,
            "Law": false,
            "Parental": false,
            "Physical": false,
            "Rift": false,
            "Shadow": false,
            "Tactical": false,
          }})
          console.log(filters.power_type);
    }

    function openModal() {
        setisModalOpen(true);
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        setisModalOpen(false)
        document.body.style.overflow = 'unset';
    }

    function resetAllFilters() {
        setFilters(DEFAULTS);
    }

    return (
        <>
            <button className="filter-button" onClick={openModal}>
                Set Filters
            </button>

            <ReactModal
                isOpen={isModalOpen}
                className="modal-form"
                closeTimeoutMS={500}
                style={
                    {
                        overlay: {
                            background: "rgba(0, 0, 0, 0.5)",
                            overflowY: "scroll"
                        },
                        content: {
                        }
                    }
                }
                shouldCloseOnOverlayClick={true}
            >
                <form id="filterForm">

                    <fieldset >
                        <legend>Power Type</legend>

                        <div className="power-type-buttons">
                            <button type="button" name="select-all-power-types" onClick={selectAllPowerTypes}>Select All</button>
                            <button type= "button" name="select-no-power-types" onClick={selectNoPowerTypes}>Select None</button>
                        </div>

                        <div className="form-power-selection">
                            <input className="form-check-input" type="checkbox" id="formCheck-1" value="Arcane" checked={filters.power_type.Arcane} onChange={handleCheckboxChange}/>
                            <label className="form-check-label" htmlFor="formCheck-1">Arcane</label>

                            <input className="form-check-input" type="checkbox" id="formCheck-2" value="Draconic" checked={filters.power_type.Draconic} onChange={handleCheckboxChange} />
                            <label className="form-check-label" htmlFor="formCheck-2">Draconic</label>

                            <input className="form-check-input" type="checkbox" id="formCheck-9" value="Forgotten" checked={filters.power_type.Forgotten} onChange={handleCheckboxChange} />
                            <label className="form-check-label" htmlFor="formCheck-9">Forgotten</label>

                            <input className="form-check-input" type="checkbox" id="formCheck-8" value="Hydro" checked={filters.power_type.Hydro} onChange={handleCheckboxChange} />
                            <label className="form-check-label" htmlFor="formCheck-8">Hydro</label>

                            <input className="form-check-input" type="checkbox" id="formCheck-7" value="Law" checked={filters.power_type.Law} onChange={handleCheckboxChange} />
                            <label className="form-check-label" htmlFor="formCheck-7">Law</label>

                            <input className="form-check-input" type="checkbox" id="formCheck-6" value="Parental" checked={filters.power_type.Parental} onChange={handleCheckboxChange} />
                            <label className="form-check-label" htmlFor="formCheck-6">Parental</label>

                            <input className="form-check-input" type="checkbox" id="formCheck-5" value="Physical" checked={filters.power_type.Physical} onChange={handleCheckboxChange} />
                            <label className="form-check-label" htmlFor="formCheck-5" >Physical</label>

                            <input className="form-check-input" type="checkbox" id="formCheck-4" value="Rift" checked={filters.power_type.Rift} onChange={handleCheckboxChange} />
                            <label className="form-check-label" htmlFor="formCheck-4" >Rift</label>

                            <input className="form-check-input" type="checkbox" id="formCheck-3" value="Shadow" checked={filters.power_type.Shadow} onChange={handleCheckboxChange} />
                            <label className="form-check-label" htmlFor="formCheck-3" >Shadow</label>

                            <input className="form-check-input" type="checkbox" id="formCheck-10" value="Tactical" checked={filters.power_type.Tactical} onChange={handleCheckboxChange} />
                            <label className="form-check-label" htmlFor="formCheck-10" >Tactical</label>
                        </div>
                    </fieldset>

                    <fieldset className="slider-container">
                        <legend>Power</legend>
                        <label className="form-label" htmlFor="min_power">Minimum power</label>
                        <input className="form-range" type="range" name="min_power" id="min_power" min="0" max="16500" step="100" value={filters.min_power} onChange={handleChange} />
                        <output id="min_power_value">{filters.min_power}</output>

                        <label className="form-label" htmlFor="max_power">Maximum power</label>
                        <input className="form-range" type="range" name="max_power" id="max_power" min="0" max="16500" step="100" value={filters.max_power} onChange={handleChange} />
                        <output id="max_power_value">{filters.max_power}</output>
                    </fieldset>

                    <fieldset className="slider-container">
                        <legend>Power Bonus</legend>
                        <label className="form-label" htmlFor="min_power_bonus">Minimum power bonus</label>
                        <input className="form-range" type="range" name="min_power_bonus" id="min_power_bonus" min="0" max="35" step="1" value={filters.min_power_bonus} onChange={handleChange} />
                        <output id="min_power_bonus_value">{filters.min_power_bonus + "%"}</output>

                        <label className="form-label" htmlFor="max_power_bonus">Maximum power bonus</label>
                        <input className="form-range" type="range" name="max_power_bonus" id="max_power_bonus" min="0" max="35" step="1" value={filters.max_power_bonus} onChange={handleChange} />
                        <output id="max_power_bonus_value">{filters.max_power_bonus + "%"}</output>
                    </fieldset>

                    <fieldset className="slider-container">
                        <legend>Attraction Bonus</legend>
                        <label className="form-label" htmlFor="min_attr_bonus">Minimum attraction bonus</label>
                        <input className="form-range" type="range" name="min_attr_bonus" min="0" max="40" step="1" value={filters.min_attr_bonus} onChange={handleChange} />
                        <output id="min_attr_bonus_value">{filters.min_attr_bonus + "%"}</output>

                        <label className="form-label" htmlFor="max_attr_bonus">Maximum attraction bonus</label>
                        <input className="form-range" type="range" name="max_attr_bonus" min="0" max="40" value={filters.max_attr_bonus} onChange={handleChange} />
                        <output id="max_attr_bonus_value">{filters.max_attr_bonus + "%"}</output>
                    </fieldset>

                    <fieldset className="slider-container">
                        <legend>Luck</legend>

                        <label className="form-label" htmlFor="min_luck">Minimum luck</label>
                        <input className="form-range" type="range" name="min_luck" min="0" max="40" value={filters.min_luck} onChange={handleChange} />
                        <output id="min_luck_value">{filters.min_luck}</output>

                        <label className="form-label" htmlFor="max_luck">Maximum luck</label>
                        <input className="form-range" type="range" name="max_luck" min="0" max="40" value={filters.max_luck} onChange={handleChange} />
                        <output id="max_luck_value">{filters.max_luck}</output>
                    </fieldset>

                    <div className="form-other-controls">
                        <label className="form-label" htmlFor="min_title_req">Lowest title needed</label>
                        <select name="min_title_req" value={filters.min_title_req} onChange={handleChange}>
                            <option value="0">Novice</option>
                            <option value="1">Recruit</option>
                            <option value="2">Apprentice</option>
                            <option value="3">Initiate</option>
                            <option value="4">Journeyman/Journeywomen</option>
                            <option value="5">Master</option>
                            <option value="6">Grandmaster</option>
                            <option value="7">Legendary</option>
                            <option value="8">Hero</option>
                            <option value="9">Knight</option>
                            <option value="10">Lord/Lady</option>
                            <option value="11">Baron/Baroness</option>
                            <option value="12">Count/Countess</option>
                            <option value="13">Duke/Duchess</option>
                            <option value="14">Grand Duke/Duchess</option>
                            <option value="15">Archduke/Archduchess</option>
                            <option value="16">Viceroy</option>
                            <option value="17">Elder</option>
                            <option value="18">Sage</option>
                            <option value="19">Fabled</option>
                        </select>

                        <label className="form-label" htmlFor="max_title_req">Highest title needed</label>
                        <select name="max_title_req" value={filters.max_title_req} onChange={handleChange}>
                            <option value="0">Novice</option>
                            <option value="1">Recruit</option>
                            <option value="2">Apprentice</option>
                            <option value="3">Initiate</option>
                            <option value="4">Journeyman/Journeywomen</option>
                            <option value="5">Master</option>
                            <option value="6">Grandmaster</option>
                            <option value="7">Legendary</option>
                            <option value="8">Hero</option>
                            <option value="9">Knight</option>
                            <option value="10">Lord/Lady</option>
                            <option value="11">Baron/Baroness</option>
                            <option value="12">Count/Countess</option>
                            <option value="13">Duke/Duchess</option>
                            <option value="14">Grand Duke/Duchess</option>
                            <option value="15">Archduke/Archduchess</option>
                            <option value="16">Viceroy</option>
                            <option value="17">Elder</option>
                            <option value="18">Sage</option>
                            <option value="19">Fabled</option>
                        </select>

                        <label className="form-label" htmlFor="min_cheese_effect">Lowest cheese effect</label>
                        <select name="min_cheese_effect" value={filters.min_cheese_effect} onChange={handleChange}>
                            <option value="0">Über Stale</option>
                            <option value="1">Ultimately Stale</option>
                            <option value="2">Insanely Stale</option>
                            <option value="3">Extremely Stale</option>
                            <option value="4">Very Stale</option>
                            <option value="5">Stale</option>
                            <option value="6">No cheese effect</option>
                            <option value="7">Fresh</option>
                            <option value="8">Very Fresh</option>
                            <option value="9">Extremely Fresh</option>
                            <option value="10">Insanely Fresh</option>
                            <option value="11">Ultimately Fresh</option>
                            <option value="12">Über Fresh</option>
                        </select>

                        <label className="form-label" htmlFor="max_cheese_effect">Highest cheese effect</label>
                        <select name="max_cheese_effect" value={filters.max_cheese_effect} onChange={handleChange}>
                            <option value="0">Über Stale</option>
                            <option value="1">Ultimately Stale</option>
                            <option value="2">Insanely Stale</option>
                            <option value="3">Extremely Stale</option>
                            <option value="4">Very Stale</option>
                            <option value="5">Stale</option>
                            <option value="6">No cheese effect</option>
                            <option value="7">Fresh</option>
                            <option value="8">Very Fresh</option>
                            <option value="9">Extremely Fresh</option>
                            <option value="10">Insanely Fresh</option>
                            <option value="11">Ultimately Fresh</option>
                            <option value="12">Über Fresh</option>
                        </select>

                        <label className="form-label" htmlFor="limited">Limited Edition?</label>
                        <select name="limited" value={filters.limited} onChange={handleChange}>
                            <option value="any">Any</option>
                            <option value="yes">Limited edition only</option>
                            <option value="no">Not limited edition</option>
                        </select>

                    </div>

                    <div id="warning-message" className={warningVisibility}>{warningMessage}</div>

                    <div className="form-buttons">
                        <button type="button" onClick={closeModal}>Close</button>
                        <button type="button" onClick={resetAllFilters}>Reset Filters</button>
                    </div>
                </form>
            </ReactModal>
        </>
    )

}