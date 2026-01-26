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
                <section className="cForm">
                    <form data-js="form" method="get">
                        <label>
                            Role
                            <input name="role" id="role" type="text" placeholder="some color" />
                        </label>
                        <label>
                            Hex
                            <input name="hex" id="hex" type="text" placeholder="#123456" />
                        </label>
                        <label>
                            Contrast Text
                            <input name="hex" id="hex" type="text" placeholder="#ffffff" />
                        </label>
                        <input type="submit" value="Add mColor" />
                    </form>
                </section>
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
