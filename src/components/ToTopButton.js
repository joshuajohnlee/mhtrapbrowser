import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

export default function ToTopButton() {

    function handleTopClick() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
    return(
        <>
         <button className="top-button" type="button" onClick={handleTopClick}>
         <FontAwesomeIcon icon={faArrowUp} />
         </button>
        </>
    )
}