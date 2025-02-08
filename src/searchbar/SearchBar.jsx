import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

const SearchBar = () => {
    const [manufacturers, setManufacturers] = useState([]);
    const [activeTab, setActiveTab] = useState("car"); // Default - Car
    const [, setFilteredManufacturers] = useState([]);

    useEffect(() => {
        axios
            .get("https://static.my.ge/myauto/js/mans.json")
            .then((response) => {
                setManufacturers(response.data);
            })
            .catch((error) => {
                console.error("Error fetching manufacturers:", error);
            });
    }, []);

    // კატეგორიის შეცვლა (კლიკზე)
    const handleTabClick = (category) => {
        setActiveTab(category);
    };

    // მწარმოებლების ფილტრაცია აქტიური კატეგორიის მიხედვით
    useEffect(() => {
        const filtered = manufacturers.filter((manufacturer) => {
            if (activeTab === "car") return manufacturer.manufacturer === "car";
            if (activeTab === "tractor") return manufacturer.manufacturer === "tractor";
            if (activeTab === "motorcycle") return manufacturer.manufacturer === "motorcycle";
            return true;
        });
        setFilteredManufacturers(filtered);
    }, [activeTab, manufacturers]);

    return (
        <div className="search-container">
            {/* კატეგორიის ტაბები */}
            <div className="search-tabs">
                <button
                    className={`tab ${activeTab === "car" ? "active" : ""}`}
                    onClick={() => handleTabClick("car")}
                >
                    🚗
                </button>
                <button
                    className={`tab ${activeTab === "tractor" ? "active" : ""}`}
                    onClick={() => handleTabClick("tractor")}
                >
                    🚜
                </button>
                <button
                    className={`tab ${activeTab === "motorcycle" ? "active" : ""}`}
                    onClick={() => handleTabClick("motorcycle")}
                >
                    🏍️
                </button>
            </div>

            {/* ყველა ელემენტი ერთ div-ში (ლამაზად) */}
            <div className="search-content">
                {/* გარიგების ტიპი */}
                <div className="search-section">
                    <label>გარიგების ტიპი</label>
                    <select>
                        <option value="sale">იყიდება</option>
                        <option value="rent">ქირავდება</option>
                    </select>
                </div>

                {/* მწარმოებელი */}
                <div className="search-section">
                    <label>მწარმოებელი</label>
                    <select>
                        <option value="">ყველა მწარმოებელი</option>
                        {manufacturers.map((manufacturer) => (
                            <option key={manufacturer.man_id} value={manufacturer.man_id}>
                                {manufacturer.man_name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* კატეგორია */}
                <div className="search-section">
                    <label>კატეგორია</label>
                    <select>
                        <option value="all">ყველა კატეგორია</option>
                        <option value="sedan">სედანი</option>
                        <option value="suv">ჯიპი</option>
                        <option value="coupe">კუპე</option>
                    </select>
                </div>

                {/* ფასი */}
                <div className="search-section">
                    <label>ფასი</label>
                    <div className="price-container">
                        <input type="text" placeholder="დან" />
                        <span>-</span>
                        <input type="text" placeholder="მდე" />
                        <button className="currency-btn">₾</button>
                    </div>
                </div>

                {/* ძებნის ღილაკი */}
                <button className="search-button">ძებნა</button>
            </div>
        </div>
    );
};

export default SearchBar;