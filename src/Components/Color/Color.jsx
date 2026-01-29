// Components\Color\Color.jsx
import { useEffect, useState } from "react";
import ColorForm from "../ColorForm/ColorForm";
import CopyToClipboard from "../CopyToClipboard/CopyToClipboard";
import "./Color.css";

const contrastBgMap = {
    Yup: "contrast-bg-green",
    Kinda: "contrast-bg-orange",
    Nope: "contrast-bg-red",
};

export default function Color({ color, onColorDelete, id, onEdit, isEditMode, onUpdateColor, onCancelEdit }) {
    const [isOpen, setIsOpen] = useState(false);
    const [contrastResult, setContrastResult] = useState(null);
    const contrastResultBgColor = contrastBgMap[contrastResult] || "contrast-bg-orange";

    // HANDLE CONTRAST SCORING - FETCH API
    useEffect(() => {
        async function getResult() {
            try {
                const response = await fetch("https://www.aremycolorsaccessible.com/api/are-they", {
                    mode: "cors",
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ colors: [color.contrastText, color.hex] }),
                });
                const data = await response.json();
                setContrastResult(data.overall);
            } catch (error) {
                console.log(error);
            }
        }
        getResult();
    }, [color.contrastText, color.hex]);

    return (
        <>
            <article className="color" style={{ backgroundColor: color.hex }}>
                {/* DELETE CONFIRMATION DIALOG */}
                <dialog className={`overlay${isOpen ? "" : " overlay--hide"}`}>
                    <h2 className="overlay__headline">Really delete this color?</h2>
                    <menu className="overlay__button-group">
                        <button type="button" className="btn btn--cancel" onClick={() => setIsOpen(false)}>
                            Cancel
                        </button>
                        <button type="button" className="btn btn--delete" onClick={() => onColorDelete(id)}>
                            Delete
                        </button>
                    </menu>
                </dialog>

                <div className="copy">
                    <h2 className="color__hex">{color.hex}</h2>
                </div>

                <p className="color__role" style={{ color: color.contrastText }}>
                    <strong>{color.role}</strong>
                </p>
                <div className="contrast-group">
                    <p className="color__contrast-text" style={{ color: color.contrastText }}>
                        Contrast: {color.contrastText}
                    </p>
                    {contrastResult && (
                        <p className={`color__contrast-score ${contrastResultBgColor}`}>
                            Score: <strong>{contrastResult}!</strong>
                        </p>
                    )}
                </div>

                {/* SHOW ONLY IF EDIT MODE = NOT ACTIVE */}
                {!isEditMode && (
                    <>
                        <CopyToClipboard color={color} />
                        <button type="button" className="btn btn--edit" onClick={onEdit} aria-label={`Edit color ${color.hex}`}>
                            ✎
                        </button>
                        <button type="button" className="btn btn--cross" onClick={() => setIsOpen(true)} aria-label={`Delete color ${color.hex}`}>
                            ✕
                        </button>
                    </>
                )}

                {/* SHOW ONLY IF EDIT MODE = ACTIVE */}
                {isEditMode && (
                    <>
                        <ColorForm isEditMode={true} initialData={color} onUpdateColor={onUpdateColor} />
                        <button type="button" className="btn" onClick={onCancelEdit}>
                            Cancel Edit
                        </button>
                    </>
                )}
            </article>
        </>
    );
}
