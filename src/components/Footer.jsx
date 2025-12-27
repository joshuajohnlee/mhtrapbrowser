import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"

export default function PageFooter() {

    return (
        <>
        <div className="app-footer">
            <p id="footer-credit">Made by Joshua Lee</p>
            <p id="footer-links"><a href="https://github.com/joshuajohnlee/mhtrapbrowser" aria-label="GitHub Link"><FontAwesomeIcon aria-hidden={true} icon={faGithub} /> GitHub</a></p>
        </div>
        </>
    )
}