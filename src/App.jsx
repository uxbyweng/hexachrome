// App.jsx

import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import Header from "./Components/Header/Header";

function App() {
    return (
        <div className="app">
            <Header />
            <main>
                <section className="theme">
                    <ul className="theme__list">
                        {initialColors.map((colors) => (
                            <li key={colors.id} className="theme__list-item">
                                <Color color={colors} />
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </div>
    );
}

export default App;
