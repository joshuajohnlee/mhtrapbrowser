
import ReactModal from 'react-modal';
import { useTrapType } from "../contexts/TrapTypeContext.jsx";

export default function ImageViewer({ itemName, isModalOpen, onClose }) {
    const trapType = useTrapType();

    return (
        <>
            <ReactModal
                isOpen={isModalOpen}
                onRequestClose={onClose}
                className="image-viewer-modal"
                closeTimeoutMS={500}
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
                            width: "90vw",
                            height: "90vh",
                            maxWidth: "600px",
                            maxHeight: "600px",
                            border: "none",
                            background: "transparent",
                            padding: "0",
                            overflow: "hidden",
                        }
                    }
                }
                shouldCloseOnOverlayClick={true}
            >
                <button className="modal-close-button" onClick={onClose}>✕</button>
                {trapType === "weapons" && <img src={`../images/weapons/${itemName}.png`} alt={itemName} className="modal-trap-image" />}
                {trapType === "bases" && <img src={`../images/bases/${itemName}.png`} alt={itemName} className="modal-trap-image" />}

            </ReactModal>
        </>
    );
}