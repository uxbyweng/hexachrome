// Components/CopyToClipboard/CopyToClipboard.jsx

import { useState } from "react";
import "./CopyToClipboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faCheck } from "@fortawesome/free-solid-svg-icons";

export default function CopyToClipboard({ color }) {
    const [isCopied, setIsCopied] = useState(false);

    async function writeClipboardText(text) {
        await navigator.clipboard.writeText(text);
    }

    function handleCopyToClipboard(hex) {
        // nimmt hex Wert entgegen und reicht in weiter an:
        writeClipboardText(hex);

        // setze state auf true ...
        setIsCopied(true);

        // ... warte 3 sek. und setzte dann den state wieder auf false
        setTimeout(() => {
            setIsCopied(false);
        }, 3000);
    }

    return (
        <>
            <button type="button" className="btn btn--copy" onClick={() => handleCopyToClipboard(color.hex)} aria-label="Copy color to clipboard">
                <FontAwesomeIcon className="fa-icon" icon={isCopied ? faCheck : faCopy} />
            </button>
        </>
    );
}
