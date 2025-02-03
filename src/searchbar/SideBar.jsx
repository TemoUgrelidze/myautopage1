import "react";
import PropTypes from "prop-types";

const SideBar = ({ manufacturers }) => {
    return (
        <aside className="sidebar">

            <ul className="manufacturer-list">
                {manufacturers.map((item) => (
                    <li key={item.man_id} className="manufacturer-item">
                        {item.man_name}
                    </li>
                ))}
            </ul>
        </aside>
    );
};


SideBar.propTypes = {
    manufacturers: PropTypes.arrayOf(
        PropTypes.shape({
            man_id: PropTypes.number.isRequired,
            man_name: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default SideBar;
