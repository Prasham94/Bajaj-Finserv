import React, { useState, useEffect } from "react";
import "./SearchBar.css";

const SearchBar = ({ searchQuery, onSearchChange, doctors }) => {
  const [input, setInput] = useState(searchQuery);
  const [suggestions, setSuggestions] = useState([]);
  const [activeIdx, setActiveIdx] = useState(0);

  // Initialize input from prop
  useEffect(() => {
    setInput(searchQuery);
  }, [searchQuery]);

  // Compute suggestion objects when input changes
  useEffect(() => {
    const term = input.trim().toLowerCase();
    if (!term) {
      setSuggestions([]);
      return;
    }
    const matches = doctors
      .filter(d => d.name.toLowerCase().includes(term))
      .slice(0, 3);
    setSuggestions(matches);
    setActiveIdx(0);
  }, [input, doctors]);

  const applySuggestion = (doc) => {
    setInput(doc.name);
    setSuggestions([]);
    onSearchChange(doc.name);
  };

  const onKeyDown = e => {
    if (e.key === "ArrowDown" && activeIdx < suggestions.length - 1) {
      setActiveIdx(ai => ai + 1);
    } else if (e.key === "ArrowUp" && activeIdx > 0) {
      setActiveIdx(ai => ai - 1);
    } else if (e.key === "Enter" && suggestions[activeIdx]) {
      applySuggestion(suggestions[activeIdx]);
    }
  };

  return (
    <div className="search-bar-container">
      <input
        data-testid="autocomplete-input"
        type="text"
        placeholder="Search Symptoms, Doctors, Specialties, Clinics"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={onKeyDown}
        className="search-bar"
      />

      {input.trim() && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((doc, idx) => (
            <li
              key={doc.id}
              data-testid="suggestion-item"
              className={idx === activeIdx ? "active" : ""}
              onMouseDown={() => applySuggestion(doc)}
            >
              <img
                src={doc.photo}
                alt={doc.name}
                className="suggestion-photo"
              />
              <div className="suggestion-text">
                <span className="suggestion-name">{doc.name}</span>
                <span className="suggestion-specialty">
                  {doc.specialities[0]?.name || ""}
                </span>
              </div>
              <span className="suggestion-arrow">›</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
