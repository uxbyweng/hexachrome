import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";

function App() {
    return (
        <div className="app">
            <div className="logo">
                <div className="logo__polygon"></div>
                <div className="logo__text">HexaChrome</div>
            </div>
            <h1 className="mb-4">- Theme Creator - </h1>
            // display colors here
            <p className="mt-4 mb-4">Browse colors. Create themes.</p>
        </div>
    );
}

export default App;
