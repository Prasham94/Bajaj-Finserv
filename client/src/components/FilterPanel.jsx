import React, { useState, useEffect } from "react";
import "./FilterPanel.css";

const FilterPanel = ({
  consultationTypes = [],
  selectedConsultationType = "",
  onConsultationTypeChange,
  specialties = [],
  selectedSpecialties = [],
  onSpecialtyChange,
}) => {
  const [specSearch, setSpecSearch] = useState("");
  const [visibleSpecs, setVisibleSpecs] = useState(specialties);

  // Update visible specs whenever the search term or specialties list changes
  useEffect(() => {
    const lower = specSearch.toLowerCase();
    setVisibleSpecs(
      specialties.filter((name) => name.toLowerCase().includes(lower))
    );
  }, [specSearch, specialties]);

  // Sanitize for test-id
  const toId = (str) =>
    str.replace(/\s+/g, "-").replace(/\//g, "-");

  const clearAll = () => {
    onSpecialtyChange([]);
    onConsultationTypeChange("");
    setSpecSearch("");
  };

  return (
    <div className="filter-panel-container">
      {/* Header with Clear All */}
      <div className="filter-panel-header">
        <h3>Filters</h3>
        <button className="clear-all-btn" onClick={clearAll}>
          Clear All
        </button>
      </div>

      {/* Specialties */}
      <div className="filter-section">
        <h4 data-testid="filter-header-speciality">Specialties</h4>
        <input
          type="text"
          placeholder="Search specialties..."
          className="filter-search"
          value={specSearch}
          onChange={(e) => setSpecSearch(e.target.value)}
        />
        <div className="filter-list specialties-list">
          {visibleSpecs.map((name) => {
            const id = toId(name);
            const checked = selectedSpecialties.includes(name);
            return (
              <label key={name} className="filter-label">
                <input
                  type="checkbox"
                  data-testid={`filter-specialty-${id}`}
                  value={name}
                  checked={checked}
                  onChange={(e) => {
                    const next = e.target.checked
                      ? [...selectedSpecialties, name]
                      : selectedSpecialties.filter((s) => s !== name);
                    onSpecialtyChange(next);
                  }}
                />
                {name}
              </label>
            );
          })}
          {visibleSpecs.length === 0 && (
            <p className="no-specs">No specialties found.</p>
          )}
        </div>
      </div>

      {/* Consultation Mode */}
      <div className="filter-section">
        <h4 data-testid="filter-header-moc">Mode of consultation</h4>
        <div className="filter-list consultation-list">
          {consultationTypes.map((type) => {
            let testid = "";
            if (type === "Video Consult") testid = "filter-video-consult";
            else if (type === "In Clinic") testid = "filter-in-clinic";

            return (
              <label key={type} className="filter-label">
                <input
                  type="radio"
                  name="consultation-type"
                  data-testid={testid}
                  value={type}
                  checked={selectedConsultationType === type}
                  onChange={() => onConsultationTypeChange(type)}
                />
                {type}
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
