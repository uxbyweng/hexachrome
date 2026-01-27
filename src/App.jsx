// App.jsx
import { useState } from "react";
import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import "./App.css";
import Header from "./Components/Header/Header";

function App() {
    const [colors, setColors] = useState(initialColors);

    const handleAddColor = (newColor) => {
        const updatedColors = [newColor, ...colors]; // alte Liste kopieren + neue Farbe anhängen
        setColors(updatedColors); // State setzen
        console.log(updatedColors); // das ist der neue Stand
    };

    return (
        <div className="app">
            <Header />
            <main>
                <section className="cForm">
                    <ColorForm onAddColor={handleAddColor} />
                </section>
                <section className="theme">
                    <p>Current theme colors: </p>
                    <ul className="theme__list">
                        {colors.map((color) => (
                            <li key={color.id} className="theme__list-item">
                                <Color color={color} />
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </div>
    );
}

export default App;
