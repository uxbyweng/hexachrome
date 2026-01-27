// Components\ColorInput\ColorInput.jsx
import { useState } from "react";
import "./ColorInput.css";
export default function ColorInput({ id, defaultValue }) {
    const [inputValue, setInputValue] = useState(defaultValue);

    function handleInputValue(event) {
        setInputValue(event.target.value);
    }

    return (
        <div className="form-group">
            <input type="text" id={id} name={id} value={inputValue} onChange={handleInputValue} />
            <input className="color-picker" type="color" value={inputValue} onChange={handleInputValue} />
        </div>
    );
}
