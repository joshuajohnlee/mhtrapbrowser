
import ReactModal from 'react-modal';
import { useTrapType } from "../contexts/TrapTypeContext.jsx";

export default function ImageViewer({ itemName, isModalOpen, onClose }) {
    const trapType = useTrapType();

    return (
        <>
            <ReactModal
                isOpen={isModalOpen}
                onRequestClose={onClose}
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
                {trapType === "weapons" && <img src={`../images/weapons/${itemName}.png`} alt={itemName} className="modal-trap-image" />}

                {trapType === "bases" && <img src={`../images/bases/${itemName}.png`} alt={itemName} className="modal-trap-image" />}

            </ReactModal>
        </>
    );
}