import "react";
import "./App.css";

const SearchBar = () => {
    return (
        <div className="search-container">
            {/* კატეგორიის ტაბები */}
            <div className="search-tabs">
                <button className="tab active">🚗</button>
                <button className="tab">🚜</button>
                <button className="tab">🏍️</button>
            </div>

            {/* ყველა ელემენტი ერთ div-ში (ლამაზად) */}
            <div className="search-content">
                {/* გარიგების ტიპი */}
                <div className="search-section">
                    <label>გარიგების ტიპი</label>
                    <select>
                        <option>იყიდება</option>
                    </select>
                </div>

                {/* მწარმოებელი */}
                <div className="search-section">
                    <label>მწარმოებელი</label>
                    <select>
                        <option>ყველა მწარმოებელი</option>
                    </select>
                </div>

                {/* კატეგორია */}
                <div className="search-section">
                    <label>კატეგორია</label>
                    <select>
                        <option>ყველა კატეგორია</option>
                    </select>
                </div>

                {/* ფასი */}
                <div className="search-section">
                    <label>ფასი</label>
                    <div className="price-container">
                        <input type="text" placeholder="დან" />
                        <span>-</span>
                        <input type="text" placeholder="მდე" />
                        <button className="currency-btn"></button>
                    </div>
                </div>

                {/* ძებნის ღილაკი */}
                <button className="search-button">ძებნა</button>
            </div>
        </div>
    );
};

export default SearchBar;
