// Components/CopyToClipboard/CopyToClipboard.jsx

import "./CopyToClipboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

export default function CopyToClipboard({ color }) {
    async function writeClipboardText(text) {
        try {
            await navigator.clipboard.writeText(text);
            console.log("Color copied: ", text);
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <>
            <button type="button" className="btn btn--copy" onClick={() => writeClipboardText(color.hex)} aria-label="Copy color to clipboard">
                <FontAwesomeIcon icon={faCopy} />
            </button>
        </>
    );
}
