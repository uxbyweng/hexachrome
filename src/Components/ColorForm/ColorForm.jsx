// Components/ColorForm/ColorForm.jsx

import "./ColorForm.css";
import ColorInput from "../ColorInput/ColorInput";
import { uid } from "uid";
import { useState } from "react";

export default function ColorForm({ onAddColor, onUpdateColor, isEditMode, initialData = { role: "Color Name", hex: "#00ff00", contrastText: "#000000" } }) {
    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        if (isEditMode) {
            // ID behalten, vorhandenes Objekt updaten
            onUpdateColor(initialData.id, data);
            return;
        }

        const newColorObject = {
            id: uid(16),
            role: data.role,
            hex: data.hex,
            contrastText: data.contrastText,
        };

        onAddColor(newColorObject);

        event.target.reset(); // formular wieder in den Ausgangszustand zurück setzen
        event.target.elements.role.focus(); // Cursor wieder in das oberste Input (role) setzen
    }

    const formId = isEditMode ? "edit-color-form" : "add-color-form";
    const headline = isEditMode ? "Update color" : "Add new color";
    const buttonText = isEditMode ? "Update Color" : "Add Color";

    return (
        <form data-js={formId} onSubmit={handleSubmit}>
            {isEditMode ? <p className="edit-color-form__headline">{headline}</p> : <h2>{headline}</h2>}

            <div className="form__group">
                <label className="form__label" htmlFor="role">
                    Role
                </label>
                <input name="role" id="role" type="text" placeholder={initialData.role} maxLength="25" required />

                <label className="form__label" htmlFor="hex">
                    Hex
                </label>
                <ColorInput id="hex" placeholder={initialData.hex} />

                <label className="form__label" htmlFor="contrastText">
                    Contrast Text
                </label>
                <ColorInput id="contrastText" placeholder={initialData.contrastText} />
            </div>

            <button type="submit" className="btn btn--submit">
                {buttonText}
            </button>
        </form>
    );
}
