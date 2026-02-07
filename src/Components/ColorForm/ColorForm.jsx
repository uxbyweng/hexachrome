// Components/ColorForm/ColorForm.jsx

import "./ColorForm.css";
import ColorInput from "../ColorInput/ColorInput";
import { uid } from "uid";

export default function ColorForm({ onAddColor, onUpdateColor, isEditMode, initialData = { role: "Color Name", hex: "#00ff00", contrastText: "#000a1e" } }) {
    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        if (isEditMode) {
            // id und data Obkect übergeben an:
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
    }

    const formId = isEditMode ? "edit-color-form" : "add-color-form";
    const headline = isEditMode ? "Edit color" : "Add new color";
    const buttonText = isEditMode ? "Update Color" : "Add Color";

    return (
        <form className={isEditMode ? `form form--edit` : `form form--add`} data-js={formId} onSubmit={handleSubmit}>
            {isEditMode ? <p className="edit-color-form__headline">{headline}</p> : <h2>{headline}</h2>}
            <div className="form__group">
                <label className="form__label" htmlFor="role">
                    Role
                </label>
                <input name="role" id="role" type="text" defaultValue={initialData.role} maxLength="25" required />

                <label className="form__label" htmlFor="hex">
                    Hex
                </label>
                <ColorInput id="hex" defaultValue={initialData.hex} />

                <label className="form__label" htmlFor="contrastText">
                    Contrast
                </label>
                <ColorInput id="contrastText" defaultValue={initialData.contrastText} />
            </div>

            <button type="submit" className="btn btn--submit">
                {buttonText}
            </button>
        </form>
    );
}
