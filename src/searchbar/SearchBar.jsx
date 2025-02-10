import { useState, useEffect } from "react";
import axios from "axios";

const SearchBar = () => {
    const [manufacturers, setManufacturers] = useState([]);
    const [filteredManufacturers, setFilteredManufacturers] = useState([]);
    const [activeTab, setActiveTab] = useState("car"); // Default: car

    // API-დან მონაცემების წამოღება
    useEffect(() => {
        axios.get("https://static.my.ge/myauto/js/mans.json")
            .then((response) => {
                console.log("📢 API Response:", response.data);
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
        console.log("🔄 Active Tab Changed:", activeTab);

        const filtered = manufacturers.filter((manufacturer) => {
            if (!manufacturer || typeof manufacturer !== "object") return false;

            const isCar = manufacturer.is_car === "1";
            const isMoto = manufacturer.is_moto === "1";
            const isSpec = manufacturer.is_spec === "1";

            console.log(`🛠 Checking: ${manufacturer.man_name} | Car: ${isCar}, Moto: ${isMoto}, Tractor: ${isSpec}`);

            if (activeTab === "car") return isCar;
            if (activeTab === "motorcycle") return isMoto;
            if (activeTab === "tractor") return isSpec;

            return false;
        });

        console.log("✅ Filtered Manufacturers:", filtered);
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

            {/* მწარმოებელი */}
            <div className="search-section">
                <label>მწარმოებელი</label>
                <select>
                    <option value="">ყველა მწარმოებელი</option>
                    {filteredManufacturers.map((manufacturer) => (
                        <option key={manufacturer.man_id} value={manufacturer.man_id}>
                            {manufacturer.man_name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default SearchBar;
