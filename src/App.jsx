// App.jsx
import { useState } from "react";
import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import "./App.css";
import Header from "./Components/Header/Header";

function App() {
    const [colors, setColors] = useState(initialColors);

    // FEEDBACK - Anzahl Colors bzw. No Cololors
    const feedback = colors.length > 0 ? `Total theme colors: ${colors.length}` : "No colors. Start by adding one!";

    // COLOR HINZUFÜGEN
    const handleAddColor = (newColor) => {
        const updatedColors = [newColor, ...colors]; // alte Color Liste kopieren und neue Color hinzufügen
        setColors(updatedColors); // State setzen
        console.log(updatedColors); // Aktuellen State in der Conole ausgeben
    };

    // COLOR LÖSCHEN
    function handleColorDelete(idToDelete) {
        const updatedColors = [];

        for (let i = 0; i < colors.length; i++) {
            console.log(colors.length);
            const color = colors[i];

            if (color.id !== idToDelete) {
                updatedColors.push(color);
            }
            setColors(updatedColors);
        }
    }
    // code review suggestion from @klaus
    //  setColors(colors.filter(color => color.id !== idToDelete));

    return (
        <div className="app">
            <Header />
            <main>
                <section className="cForm">
                    <ColorForm onAddColor={handleAddColor} />
                </section>
                <section className="theme">
                    <p className="theme__feedback">{feedback}</p>
                    <ul className="theme__list">
                        {colors.map((color) => (
                            <li key={color.id} className="theme__list-item">
                                <Color color={color} onColorDelete={handleColorDelete} id={color.id} />
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </div>
    );
}

export default App;
