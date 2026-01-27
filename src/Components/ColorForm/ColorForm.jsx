// Components/ColorForm/ColorForm.jsx

import "./ColorForm.css";
import ColorInput from "../ColorInput/ColorInput";
import { uid } from "uid";

export default function ColorForm({ onAddColor, initialData = { role: "some color", hex: "#00ff00", contrastText: "#000000" }, onDelete, id }) {
    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        const newColorObject = {
            id: uid(2), // `c${colorCount}`,
            role: data.role,
            hex: data.hex,
            contrastText: data.contrastText,
        };
        //console.log(event.target.value);

        onAddColor(newColorObject);

        event.target.reset();
        event.target.elements.role.focus();
    }

    return (
        <form data-js="color-form" onSubmit={handleSubmit}>
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
            <button type="submit" class="btn btn--submit">
                Add Color
            </button>
        </form>
    );
}
