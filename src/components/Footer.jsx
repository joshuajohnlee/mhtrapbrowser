import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"

export default function PageFooter() {

    return (
        <>
            <footer>
                <div id="footer-credit">Made by Joshua Lee</div>
                <div id="copyright-notice">MouseHunt, its associated traps, and trap images are copyright of HitGrab Inc.</div>
                <div id="footer-links"><a href="https://github.com/joshuajohnlee/mhtrapbrowser" aria-label="GitHub Link"><FontAwesomeIcon aria-hidden={true} icon={faGithub} /> GitHub</a></div>
            </footer>
        </>
    )
}