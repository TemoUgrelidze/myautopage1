import { useState, useEffect } from "react";
import axios from "axios";

const SearchBar = () => {
    const [manufacturers, setManufacturers] = useState([]);
    const [filteredManufacturers, setFilteredManufacturers] = useState([]);
    const [activeTab, setActiveTab] = useState("car"); // Default: car
    const [selectedManufacturer, setSelectedManufacturer] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [priceFrom, setPriceFrom] = useState("");
    const [priceTo, setPriceTo] = useState("");

    // API-დან მონაცემების წამოღება
    useEffect(() => {
        axios.get("https://static.my.ge/myauto/js/mans.json")
            .then((response) => {
                setManufacturers(response.data);
            })
            .catch((error) => {
                console.error("❌ Error fetching manufacturers:", error);
            });
    }, []);

    // კატეგორიის შეცვლა (კლიკზე)
    const handleTabClick = (category) => {
        setActiveTab(category);
    };

    // მწარმოებლების ფილტრაცია აქტიური კატეგორიის მიხედვით
    useEffect(() => {
        const filtered = manufacturers.filter((manufacturer) => {
            if (!manufacturer || typeof manufacturer !== "object") return false;

            const isCar = manufacturer.is_car === "1";
            const isMoto = manufacturer.is_moto === "1";
            const isSpec = manufacturer.is_spec === "1";

            if (activeTab === "car") return isCar;
            if (activeTab === "motorcycle") return isMoto;
            if (activeTab === "tractor") return isSpec;

            return false;
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

            {/* მანქანის ტიპი */}
            <div className="search-section">
                <label>გარიგების ტიპი</label>
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="">აირჩიე</option>
                    <option value="sell">გაყიდვა</option>
                    <option value="rent">ქირავდება</option>
                </select>
            </div>

            {/* მწარმოებელი */}
            <div className="search-section">
                <label>მწარმოებელი</label>
                <select value={selectedManufacturer} onChange={(e) => setSelectedManufacturer(e.target.value)}>
                    <option value="">ყველა მწარმოებელი</option>
                    {filteredManufacturers.map((manufacturer) => (
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
                    <option value="">ყველა კატეგორია</option>
                    <option value="sedan">სედანი</option>
                    <option value="suv">ჯიპი</option>
                    <option value="truck">სატვირთო</option>
                    <option value="bike">მოტოციკლი</option>
                    <option value="tractor">ტრაქტორი</option>
                </select>
            </div>

            {/* ფასი */}
            <div className="search-section">
                <label>ფასი</label>
                <div className="price-container">
                    <input
                        type="number"
                        placeholder="დან"
                        value={priceFrom}
                        onChange={(e) => setPriceFrom(e.target.value)}
                    />
                    <span>-</span>
                    <input
                        type="number"
                        placeholder="მდე"
                        value={priceTo}
                        onChange={(e) => setPriceTo(e.target.value)}
                    />
                </div>
            </div>

            {/* ძიების ღილაკი */}
            <button className="search-button">ძიება</button>
        </div>
    );
};

export default SearchBar;