// Components/ColorForm/ColorForm.jsx

import "./ColorForm.css";
import ColorInput from "../ColorInput/ColorInput";
import { uid } from "uid";

export default function ColorForm({ onAddColor, onUpdateColor, isEditMode, initialData = { role: "some color", hex: "#00ff00", contrastText: "#000000" } }) {
    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        if (isEditMode) {
            // ID behalten, vorhandenes Objekt updaten
            const updatedColorObject = {
                ...initialData,
                role: data.role,
                hex: data.hex,
                contrastText: data.contrastText,
            };
            // console.log(data.hex);
            onUpdateColor(updatedColorObject);
            return;
        }

        const newColorObject = {
            id: uid(16),
            role: data.role,
            hex: data.hex,
            contrastText: data.contrastText,
        };

        onAddColor(newColorObject);

        event.target.reset();
        event.target.elements.role.focus();
    }

    return !isEditMode ? (
        <form data-js="add-color-form" onSubmit={handleSubmit}>
            <h2>Add new color</h2>
            <label htmlFor="role">
                Role
                <input name="role" id="role" type="text" defaultValue={initialData.role} />
            </label>
            <label htmlFor="hex">
                Hex
                <ColorInput id="hex" defaultValue={initialData.hex} />
            </label>
            <label htmlFor="contrastText">
                Contrast Text
                <ColorInput id="contrastText" defaultValue={initialData.contrastText} />
            </label>
            <button type="submit" className="btn btn--submit">
                Add Color
            </button>
        </form>
    ) : (
        <form data-js="edit-color-form" onSubmit={handleSubmit}>
            <p className="edit-color-form__headline">Update color</p>
            <label htmlFor="role">
                Role
                <input name="role" id="role" type="text" defaultValue={initialData.role} />
            </label>
            <label htmlFor="hex">
                Hex
                <ColorInput id="hex" defaultValue={initialData.hex} />
            </label>
            <label htmlFor="contrastText">
                Contrast Text
                <ColorInput id="contrastText" defaultValue={initialData.contrastText} />
            </label>
            <button type="submit" className="btn btn--submit">
                Update Color
            </button>
        </form>
    );
}
