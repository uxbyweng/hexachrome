// Components\Color\Color.jsx

import "./Color.css";
export default function Color({ color }) {
    //const isDark = color.contrastText === "#000000";
    //console.log(isDark);

    return (
        <div className="color" style={{ backgroundColor: color.hex }}>
            <h2 className="color__hex">{color.hex}</h2>
            <p className="color__role" style={{ color: color.contrastText }}>
                <strong>{color.role}</strong>
            </p>
            <p className="color__contrast" style={{ color: color.contrastText }}>
                contrast: {color.contrastText}
            </p>
        </div>
    );
}
