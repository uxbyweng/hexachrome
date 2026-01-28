// App.jsx
import { useState } from "react";
import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import "./App.css";
import Header from "./Components/Header/Header";

function App() {
    const [colors, setColors] = useState(initialColors);
    const [activeEditId, setActiveEditId] = useState(null); // bei nul wird der editmodus ausgeschaltet

    // FEEDBACK - Anzahl Colors bzw. No Cololors
    const feedback = colors.length > 0 ? `Total theme colors: ${colors.length}` : "No colors. Start by adding one!";

    // UPDATE COLORS (ID)
    function handleUpdateColor(idToUpdate, data) {
        //  liste erstelen damit  nichts kaputt geht
        const updatedColors = [];

        // durch alle colors loopen
        for (let i = 0; i < colors.length; i++) {
            const currentColor = colors[i]; // aktuelle color speichern

            // wenn id gleich der aktuellen farbe entspricht ...
            if (currentColor.id === idToUpdate) {
                const updatedColor = {
                    // neues Object bauen
                    ...currentColor, // alle Eigenschaften von currentColor ins neue Objekt kopieren
                    role: data.role, // 'role' neu setzen
                    hex: data.hex, // 'hex' neu setzen
                    contrastText: data.contrastText, // 'contrastText' neu setzen
                };
                updatedColors.push(updatedColor); // color ersetzen
            } else {
                updatedColors.push(currentColor); // color hinzufügen
            }
        }

        setColors(updatedColors); // state updaten
        setActiveEditId(null); // edit mode ausschalten
    }

    // EDIT MODE
    function handleEdit(id) {
        // color id speichern und an state übergeben
        setActiveEditId(id);
    }

    function handleCancelEdit() {
        // color id auf "null" setzen damit sich edit formular wieder schliesst
        setActiveEditId(null);
    }

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
        }
        setColors(updatedColors);
    }
    // code review suggestion from @klaus
    //  setColors(colors.filter(color => color.id !== idToDelete));

    return (
        <div className="app">
            <Header />
            <main>
                {activeEditId === null && (
                    <section>
                        <ColorForm onAddColor={handleAddColor} isEditMode={false} />
                    </section>
                )}
                <section className="theme">
                    <p className="theme__feedback">{feedback}</p>
                    <ul className="theme__list">
                        {colors.map((color) => (
                            <li key={color.id} className="theme__list-item">
                                <Color
                                    color={color}
                                    onColorDelete={handleColorDelete}
                                    id={color.id}
                                    onEdit={() => handleEdit(color.id)}
                                    isEditMode={activeEditId === color.id}
                                    onUpdateColor={handleUpdateColor}
                                    onCancelEdit={handleCancelEdit}
                                />
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </div>
    );
}

export default App;
