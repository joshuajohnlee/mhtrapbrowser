import ReactModal from 'react-modal'

import { useComparison } from '../contexts/ComparisonContext.jsx';
import { useTrapType } from '../contexts/TrapTypeContext.jsx';

export default function ComparisonAdder({ itemName, isModalOpen, onClose }) {
    const comparisonContext = useComparison();
    const trapType = useTrapType();
    const weaponComparisonSlotOne = comparisonContext.weaponComparisonSlotOne;
    const weaponComparisonSlotTwo = comparisonContext.weaponComparisonSlotTwo;
    const baseComparisonSlotOne = comparisonContext.baseComparisonSlotOne;
    const baseComparisonSlotTwo = comparisonContext.baseComparisonSlotTwo;

    const appEl = document.getElementById("root")

    return (
        <ReactModal
            isOpen={isModalOpen}
            onRequestClose={onClose}
            className="comparison-modal"
            closeTimeoutMS={500}
            appElement={appEl}
            style={{
                overlay: {
                    position: "fixed",
                    inset: 0,
                    background: "rgba(0, 0, 0, 0.5)",
                    zIndex: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                },
                content: {
                    position: "relative",
                    zIndex: 11,
                    maxHeight: "600px",
                    border: "none",
                    padding: "50px",
                    overflow: "hidden",
                }
            }
            }
            shouldCloseOnOverlayClick={true}
        >
            <button className="modal-close-button" onClick={onClose}>✕</button>

            <section id="comparison-buttons">
                <button className="comparison-slot-button" onClick={() => comparisonContext.updateComparison(trapType, "one", itemName)}>
                    <span className="comparison-button-add-text">Add to Slot One</span><br />
                    Current: <strong>{trapType === "weapons" ? (weaponComparisonSlotOne ? weaponComparisonSlotOne : "Empty") : (baseComparisonSlotOne ? baseComparisonSlotOne : "Empty")}</strong>
                </button>
                <button className="comparison-slot-button" onClick={() => comparisonContext.updateComparison(trapType, "two", itemName)}>
                    <span className="comparison-button-add-text">Add to Slot Two</span><br />
                    Current: <strong>{trapType === "weapons" ? (weaponComparisonSlotTwo ? weaponComparisonSlotTwo : "Empty") : (baseComparisonSlotTwo ? baseComparisonSlotTwo : "Empty")}</strong>
                </button>
            </section>

        </ReactModal>
    )
}