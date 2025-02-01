import "react";
import SearchBar from "./SearchBar";
import "./App.css";

function App() {
    return (
        <div className="app-container">
            <div className="sidebar">
                <SearchBar />
            </div>
        </div>
    );
}

export default App;
