// Components/ColorForm/ColorForm.jsx
import "./ColorForm.css";
// import { uid } from "uid";

export default function ColorForm({ onAddColor, colorCount }) {
    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        const newColorObject = {
            id: `c${colorCount}`, //uid(2),
            role: data.role,
            hex: data.hex,
            contrast: data.contrast,
        };
        //console.log(event.target.value);

        onAddColor(newColorObject);

        event.target.reset();
        event.target.elements.role.focus();
    }

    return (
        <form data-js="color-form" onSubmit={handleSubmit}>
            <h2>Add color {colorCount} </h2>
            <label htmlFor="role">
                Role
                <input name="role" id="role" type="text" placeholder="some color" />
            </label>
            <label htmlFor="hex">
                Hex
                <div className="form-group">
                    <input type="text" id="hex" name="hex" placeholder="#EEDDFF" />
                    <input type="color" value="#EEDDFF" className="color-picker" />
                </div>
            </label>
            <label htmlFor="contrast">
                Contrast Text
                <div className="form-group">
                    <input type="text" id="contrast" name="contrast" placeholder="#FFFFFF" />
                    <input type="color" value="#FFFFFF" className="color-picker" />
                </div>
            </label>
            <button type="submit">Add Color</button>
        </form>
    );
}
