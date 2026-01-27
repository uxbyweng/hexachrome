// Components\Color\Color.jsx

import "./Color.css";
export default function Color({ color, onColorDelete, id }) {
    return (
        <div className="color" style={{ backgroundColor: color.hex }}>
            <h2 className="color__hex">{color.hex}</h2>
            <p className="color__role" style={{ color: color.contrastText }}>
                <strong>{color.role}</strong>
            </p>
            <p className="color__contrast" style={{ color: color.contrastText }}>
                contrast: {color.contrastText}
            </p>
            <button onClick={() => onColorDelete(id)} className="btn btn--delete" type="button" title="delete color">
                ✕
            </button>
        </div>
    );
}
