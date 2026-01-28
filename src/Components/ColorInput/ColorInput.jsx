// Components\ColorInput\ColorInput.jsx
import { useState } from "react";
import "./ColorInput.css";
export default function ColorInput({ id, placeholder }) {
    const [inputValue, setInputValue] = useState(placeholder);

    function handleInputValue(event) {
        setInputValue(event.target.value);
    }

    return (
        <div className="form__group--picker">
            <input type="text" id={id} name={id} value={inputValue} onChange={handleInputValue} minLength="7" maxLength="7" required />
            <input className="color-picker" type="color" value={inputValue} onChange={handleInputValue} />
        </div>
    );
}
