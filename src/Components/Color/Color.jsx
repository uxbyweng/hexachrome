// Components\Color\Color.jsx
import { useState } from "react";
import ColorForm from "../ColorForm/ColorForm";
import CopyToClipboard from "../CopyToClipboard/CopyToClipboard";
import "./Color.css";
export default function Color({ color, onColorDelete, id, onEdit, isEditMode, onUpdateColor, onCancelEdit }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <article className="color" style={{ backgroundColor: color.hex }}>
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
                    <CopyToClipboard color={color} />
                    <p className="color__message color__message--hide" style={{ color: color.contrastText }}>
                        Copied!
                    </p>
                </div>

                <p className="color__role" style={{ color: color.contrastText }}>
                    <strong>{color.role}</strong>
                </p>
                <p className="color__contrast" style={{ color: color.contrastText }}>
                    contrast: {color.contrastText}
                </p>

                {/* edit btn und delete button nur anzeigen wenn editmode nich aktiv ist */}
                {!isEditMode && (
                    <>
                        <button type="button" className="btn btn--edit" onClick={onEdit} aria-label={`Edit color ${color.hex}`}>
                            ✎
                        </button>
                        <button type="button" className="btn btn--cross" onClick={() => setIsOpen(true)} aria-label={`Delete color ${color.hex}`}>
                            ✕
                        </button>
                    </>
                )}

                {/* color card nur anzeigen wenn editmode aktiv ist */}
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
