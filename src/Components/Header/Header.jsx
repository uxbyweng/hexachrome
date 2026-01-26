// Components\Header/Header.jsx

import "./Header.css";

export default function Header() {
    return (
        <header className="header">
            <div className="header__logo">
                <div className="header__logo-polygon"></div>
                <div className="header__logo-chars">HexaChrome</div>
            </div>
            <h1 className="header__title">Theme Creator</h1>
        </header>
    );
}
