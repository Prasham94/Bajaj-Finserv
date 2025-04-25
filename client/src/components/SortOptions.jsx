import React from "react";
import './SortOptions.css';

const SortOptions = ({ sortOption, onSortChange }) => {
  return (
    <div className="sort-options-container">
      <h4>Sort by</h4>
      <select value={sortOption} onChange={(e) => onSortChange(e.target.value)}>
        <option value="feesLowToHigh">Price: Low-High</option>
        <option value="experienceHighToLow">Experience: Most Experience first</option>
      </select>
    </div>
  );
};

export default SortOptions;
