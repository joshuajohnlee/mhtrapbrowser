import { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import { useTrapType } from "../contexts/TrapTypeContext.jsx";

export default function FilterForm({ setFilters, filters, DEFAULTS }) {
    const resource = useTrapType();
    console.log(resource);

    // Modal visibility state and toggle
    const [isModalOpen, setisModalOpen] = useState(false);

    // Set states for the warning message
    const [warningMessage, setWarningMessage] = useState("")
    const [warningVisibility, setWarningVisibility] = useState(false)

    function displayWarning(message) {
        setWarningMessage(message);
        setWarningVisibility(true)
    }

    function hideWarning() {
        setWarningMessage("");
        setWarningVisibility(false)
    }

    useEffect(() => {
        hideWarning();

        if (Number(filters.min_power) > Number(filters.max_power)) {
            displayWarning("Your minimum power is set higher than your maximum. Nothing will be shown.");
        }

        if (Number(filters.min_power_bonus) > Number(filters.max_power_bonus)) {
            displayWarning("Your minimum power bonus is set higher than your maximum. Nothing will be shown.");
        }

        if (Number(filters.min_attraction_bonus) > Number(filters.max_attraction_bonus)) {
            displayWarning("Your minimum attraction bonus is set higher than your maximum. Nothing will be shown.");
        }

        if (Number(filters.min_luck) > Number(filters.max_luck)) {
            displayWarning("Your minimum luck is set higher than your maximum. Nothing will be will be shown.");
        }

        if (Number(filters.min_cheese_effect) > Number(filters.max_cheese_effect)) {
            displayWarning("Your worst cheese effect is lower that your best cheese effect. Nothing will be shown.");
        }

    }, [filters]);

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    }

    const handleCheckboxChange = (e) => {
        const prev = filters.power_type || {};
        setFilters({
            ...filters,
            power_type: { ...prev, [e.target.value]: e.target.checked }
        });
    }

    function selectAllPowerTypes() {
        setFilters({
            ...filters, power_type: {
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
            }
        })
    }

    function selectNoPowerTypes() {
        setFilters({
            ...filters, power_type: {
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
            }
        })
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
        let checkResponse = window.confirm("Are you sure you want to reset your filters?");

        if (checkResponse) {
            setFilters(DEFAULTS);
        }
    }

    return (
        <>
            <button className="filter-button" onClick={openModal}>
                Change Filters
            </button>

            <ReactModal
                isOpen={isModalOpen}
                className="modal-form"
                closeTimeoutMS={500}
                style={
                    {
                        overlay: {
                            position: "fixed",
                            inset: 0,
                            background: "rgba(0, 0, 0, 0.5)",
                            zIndex: 10,
                            overflowY: "auto",
                        },
                        content: {
                            position: "relative",
                            zIndex: 11,
                        }
                    }
                }
                shouldCloseOnOverlayClick={true}
            >
                <form id="filterForm">
                    {warningVisibility && <div className="warning-message" id="warning-message">{warningMessage}</div>}
                    {resource === "weapons" && (
                        <fieldset>
                            <legend>Power Type</legend>

                            <div className="power-type-buttons">
                                <button type="button" name="select-all-power-types" onClick={selectAllPowerTypes}>Select All</button>
                                <button type="button" name="select-no-power-types" onClick={selectNoPowerTypes}>Select None</button>
                            </div>

                            <div className="form-power-selection">
                                <input className="form-check-input" type="checkbox" id="formCheck-1" value="Arcane" checked={!!filters.power_type?.Arcane} onChange={handleCheckboxChange} />
                                <label className="form-check-label" htmlFor="formCheck-1">Arcane</label>

                                <input className="form-check-input" type="checkbox" id="formCheck-2" value="Draconic" checked={!!filters.power_type?.Draconic} onChange={handleCheckboxChange} />
                                <label className="form-check-label" htmlFor="formCheck-2">Draconic</label>

                                <input className="form-check-input" type="checkbox" id="formCheck-9" value="Forgotten" checked={!!filters.power_type?.Forgotten} onChange={handleCheckboxChange} />
                                <label className="form-check-label" htmlFor="formCheck-9">Forgotten</label>

                                <input className="form-check-input" type="checkbox" id="formCheck-8" value="Hydro" checked={!!filters.power_type?.Hydro} onChange={handleCheckboxChange} />
                                <label className="form-check-label" htmlFor="formCheck-8">Hydro</label>

                                <input className="form-check-input" type="checkbox" id="formCheck-7" value="Law" checked={!!filters.power_type?.Law} onChange={handleCheckboxChange} />
                                <label className="form-check-label" htmlFor="formCheck-7">Law</label>

                                <input className="form-check-input" type="checkbox" id="formCheck-6" value="Parental" checked={!!filters.power_type?.Parental} onChange={handleCheckboxChange} />
                                <label className="form-check-label" htmlFor="formCheck-6">Parental</label>

                                <input className="form-check-input" type="checkbox" id="formCheck-5" value="Physical" checked={!!filters.power_type?.Physical} onChange={handleCheckboxChange} />
                                <label className="form-check-label" htmlFor="formCheck-5" >Physical</label>

                                <input className="form-check-input" type="checkbox" id="formCheck-4" value="Rift" checked={!!filters.power_type?.Rift} onChange={handleCheckboxChange} />
                                <label className="form-check-label" htmlFor="formCheck-4" >Rift</label>

                                <input className="form-check-input" type="checkbox" id="formCheck-3" value="Shadow" checked={!!filters.power_type?.Shadow} onChange={handleCheckboxChange} />
                                <label className="form-check-label" htmlFor="formCheck-3" >Shadow</label>

                                <input className="form-check-input" type="checkbox" id="formCheck-10" value="Tactical" checked={!!filters.power_type?.Tactical} onChange={handleCheckboxChange} />
                                <label className="form-check-label" htmlFor="formCheck-10" >Tactical</label>
                            </div>
                        </fieldset>
                    )}

                    <fieldset className="slider-container">
                        <legend>Power</legend>
                        <label className="form-label" htmlFor="min_power">Minimum</label>
                        <input className="form-range" type="range" name="min_power" id="min_power" min="0" max={resource === "weapons" ? 20000 : 3500} step={resource === "weapons" ? 100 : 10} value={filters.min_power} onChange={handleChange} />
                        <output id="min_power_value">{filters.min_power}</output>

                        <label className="form-label" htmlFor="max_power">Maximum</label>
                        <input className="form-range" type="range" name="max_power" id="max_power" min="0" max={resource === "weapons" ? 20000 : 3500} step={resource === "weapons" ? 100 : 10} value={filters.max_power} onChange={handleChange} />
                        <output id="max_power_value">{filters.max_power}</output>
                    </fieldset>

                    <fieldset className="slider-container">
                        <legend>Power Bonus</legend>
                        <label className="form-label" htmlFor="min_power_bonus">Minimum</label>
                        <input className="form-range" type="range" name="min_power_bonus" id="min_power_bonus" min="0" max={resource === "weapons" ? 40 : 25} step="1" value={filters.min_power_bonus} onChange={handleChange} />
                        <output id="min_power_bonus_value">{filters.min_power_bonus + "%"}</output>

                        <label className="form-label" htmlFor="max_power_bonus">Maximum</label>
                        <input className="form-range" type="range" name="max_power_bonus" id="max_power_bonus" min="0" max={resource === "weapons" ? 40 : 25} step="1" value={filters.max_power_bonus} onChange={handleChange} />
                        <output id="max_power_bonus_value">{filters.max_power_bonus + "%"}</output>
                    </fieldset>

                    <fieldset className="slider-container">
                        <legend>Attraction Bonus</legend>
                        <label className="form-label" htmlFor="min_attraction_bonus">Minimum</label>
                        <input className="form-range" type="range" name="min_attraction_bonus" min="0" max={resource === "weapons" ? 40 : 50} step="1" value={filters.min_attraction_bonus} onChange={handleChange} />
                        <output id="min_attraction_bonus_value">{filters.min_attraction_bonus + "%"}</output>

                        <label className="form-label" htmlFor="max_attraction_bonus">Maximum attraction bonus</label>
                        <input className="form-range" type="range" name="max_attraction_bonus" min="0" max={resource === "weapons" ? 40 : 50} value={filters.max_attraction_bonus} onChange={handleChange} />
                        <output id="max_attraction_bonus_value">{filters.max_attraction_bonus + "%"}</output>
                    </fieldset>

                    <fieldset className="slider-container">
                        <legend>Luck</legend>

                        <label className="form-label" htmlFor="min_luck">Minimum luck</label>
                        <input className="form-range" type="range" name="min_luck" min="0" max={resource === "weapons" ? 42 : 40} value={filters.min_luck} onChange={handleChange} />
                        <output id="min_luck_value">{filters.min_luck}</output>

                        <label className="form-label" htmlFor="max_luck">Maximum luck</label>
                        <input className="form-range" type="range" name="max_luck" min="0" max={resource === "weapons" ? 42 : 40} value={filters.max_luck} onChange={handleChange} />
                        <output id="max_luck_value">{filters.max_luck}</output>
                    </fieldset>

                    <div className="form-other-controls">
                        <label className="form-label" htmlFor="min_title_required">Lowest title needed</label>
                        <select name="min_title_required" value={filters.min_title_required} onChange={handleChange}>
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

                        <label className="form-label" htmlFor="max_title_required">Highest title needed</label>
                        <select name="max_title_required" value={filters.max_title_required} onChange={handleChange}>
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

                        <label className="form-label" htmlFor="limited_edition">Limited Edition?</label>
                        <select name="limited_edition" value={filters.limited_edition} onChange={handleChange}>
                            <option value="any">Any</option>
                            <option value="1">Limited edition only</option>
                            <option value="0">Not limited edition</option>
                        </select>

                    </div>

                    <div className="form-buttons">
                        <button type="button" onClick={closeModal}>Close</button>
                        <button type="button" onClick={resetAllFilters}>Reset Filters</button>
                    </div>
                </form>
            </ReactModal>
        </>
    )
}