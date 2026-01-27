// Components\Color\Color.jsx
import { useState } from "react";

import "./Color.css";
export default function Color({ color, onColorDelete, id }) {
    const [isOpen, setIsOpen] = useState(false);

    <button type="button" onClick={() => setIsOpen(true)}></button>;
    return (
        <>
            <div className="color" style={{ backgroundColor: color.hex }}>
                <div className={`overlay${isOpen ? "" : " overlay--hide"}`}>
                    <h2 className="overlay__headline">Really delete this color?</h2>
                    <div className="overlay__button-group">
                        <button type="button" className="btn btn--cancel" onClick={() => setIsOpen(false)}>
                            Cancel
                        </button>
                        <button type="button" className="btn btn--delete" onClick={() => onColorDelete(id)}>
                            Delete
                        </button>
                    </div>
                </div>
                <h2 className="color__hex">{color.hex}</h2>
                <p className="color__role" style={{ color: color.contrastText }}>
                    <strong>{color.role}</strong>
                </p>
                <p className="color__contrast" style={{ color: color.contrastText }}>
                    contrast: {color.contrastText}
                </p>
                <button type="button" className="btn btn--edit">
                    ✎
                </button>
                <button type="button" className="btn btn--cross" onClick={() => setIsOpen(true)} aria-label={`Delete color ${color.hex}`}>
                    ✕
                </button>
            </div>
        </>
    );
}
