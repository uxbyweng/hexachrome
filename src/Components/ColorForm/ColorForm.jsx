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
            contrastText: data.contrastText,
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
                <input name="role" id="role" type="text" defaultValue="some color" />
            </label>
            <label htmlFor="hex">
                Hex
                <div className="form-group">
                    <input name="hex" id="hex" type="text" defaultValue="#00ff00" />
                    <input type="color" value="#00ff00" className="color-picker" />
                </div>
            </label>
            <label htmlFor="contrast">
                Contrast Text
                <div className="form-group">
                    <input name="contrastText" id="contrastText" type="text" defaultValue="#000000" />
                    <input type="color" value="#000000" className="color-picker" />
                </div>
            </label>
            <button type="submit">Add Color</button>
        </form>
    );
}
