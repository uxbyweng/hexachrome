// App.jsx
import { useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import "./App.css";
import Header from "./Components/Header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faCheck, faPlus, faClose } from "@fortawesome/free-solid-svg-icons";

function App() {
    const [isAddOpen, setIsAddOpen] = useState(false);

    // STATE MIT LOCAL STORAGE (key = colors, opions = defaultValue)
    const [colors, setColors] = useLocalStorageState("colors", {
        // initial colors aus lib laden (wenn noch keine colors im local storage vorhanden )
        defaultValue: initialColors,
    });

    // STATE FÜR EDITMODE MIT ID
    // wenn 'activeEditId' eine ID enthält => Edit Mode = aktive
    // wenn 'activeEditId' den Wert 'null' enthält => Edit Mode ausgeschaltet
    const [activeEditId, setActiveEditId] = useState(null);

    // FEEDBACK - Anzahl Colors bzw. No Cololors
    const feedback =
        colors.length > 0 ? (
            <>
                Theme <span>DEFAULT</span> with {colors.length} colors.
            </>
        ) : (
            "No colors. Start by adding one!"
        );

    // UPDATE COLORS (ID)
    function handleUpdateColor(idToUpdate, data) {
        //  liste mit colors erstelen
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

    function handleOpenAddColorForm() {
        setIsAddOpen((v) => !v);
        setActiveEditId(null);
    }

    // EDIT MODE
    function handleEdit(id) {
        // color id speichern und an state übergeben
        setActiveEditId(id);
        setIsAddOpen(null);
    }

    function handleCancelEdit() {
        // color id auf "null" setzen damit sich edit formular wieder schliesst
        setActiveEditId(null);
    }

    // COLOR HINZUFÜGEN
    const handleAddColor = (newColor) => {
        const updatedColors = [newColor, ...colors]; // alte Color Liste kopieren und neue Color hinzufügen
        setColors(updatedColors); // State setzen
        // console.log(updatedColors); // Aktuellen State in der Conole ausgeben
    };

    // COLOR LÖSCHEN
    function handleColorDelete(idToDelete) {
        const updatedColors = [];

        for (let i = 0; i < colors.length; i++) {
            // console.log(colors.length);
            const color = colors[i];

            if (color.id !== idToDelete) {
                updatedColors.push(color);
            }
        }
        setColors(updatedColors); // state neue setzen
    }
    // code review suggestion from @klaus
    //  setColors(colors.filter(color => color.id !== idToDelete));

    return (
        <div className="app">
            <Header />
            <main>
                <section>
                    <p className={isAddOpen ? `theme__feedback theme__feedback--open` : `theme__feedback`}>
                        {feedback}
                        <button
                            type="button"
                            className="btn btn--add"
                            aria-expanded={isAddOpen}
                            aria-controls="add-color-section"
                            onClick={handleOpenAddColorForm}>
                            <FontAwesomeIcon className="fa-icon" icon={isAddOpen ? faClose : faPlus} />
                        </button>
                    </p>
                </section>
                {activeEditId === null && (
                    <section>
                        <div id="add-color-section" hidden={!isAddOpen}>
                            <ColorForm onAddColor={handleAddColor} isEditMode={false} />
                        </div>
                    </section>
                )}
                <section className="theme">
                    <ul className="theme__list">
                        {colors.map((color) => (
                            <li key={color.id} className="theme__list-item">
                                <Color
                                    color={color} // Color Object { id, role, hex, contrastText, .. }
                                    onColorDelete={handleColorDelete} // Funktion
                                    id={color.id} // primitive
                                    onEdit={() => handleEdit(color.id)} // Funktion
                                    isEditMode={activeEditId === color.id} // boolean
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
