import { useState, useEffect } from "react";
import "./searchbar/App.css";
import SideBar from "./searchbar/SideBar.jsx";
import SearchBar from "./searchbar/SearchBar.jsx"; // ✅ SearchBar-ის იმპორტი
import axios from "axios";

function App() {
    const [manufacturers, setManufacturers] = useState([]);

    useEffect(() => {
        axios
            .get("https://static.my.ge/myauto/js/mans.json")
            .then((response) => {
                setManufacturers(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <div className="app-container">
            <div className="sidebar">
                <SideBar manufacturers={manufacturers} />
            </div>
            <div className="search-section">
                <SearchBar /> {/* ✅ SearchBar-ის გამოყენება */}
            </div>
        </div>
    );
}

export default App;