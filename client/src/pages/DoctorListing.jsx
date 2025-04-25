import React, { useState, useEffect } from "react";
import axios from "axios";

import SearchBar from "../components/SearchBar";
import SortOptions from "../components/SortOptions";
import FilterPanel from "../components/FilterPanel";
import DoctorCard from "../components/DoctorCard";

import "./DoctorListing.css";

const DoctorListing = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [consultationType, setConsultationType] = useState("");
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [sortOption, setSortOption] = useState("");

  // Fetch once
  useEffect(() => {
    axios
      .get("https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json")
      .then((res) => {
        setDoctors(res.data);
        setFilteredDoctors(res.data);
      })
      .catch((e) => setError(e.message))
      .finally(() => setIsLoading(false));
  }, []);

  // Re-filter & sort on change
  useEffect(() => {
    let result = [...doctors];

    // 1️⃣ search
    if (searchQuery) {
      result = result.filter((d) =>
        d.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 2️⃣ consultation type
    if (consultationType === "Video Consult") {
      result = result.filter((d) => d.video_consult);
    } else if (consultationType === "In Clinic") {
      result = result.filter((d) => d.in_clinic);
    }

    // 3️⃣ specialties
    if (selectedSpecialties.length > 0) {
      result = result.filter((d) =>
        d.specialities.some((s) => selectedSpecialties.includes(s.name))
      );
    }

    // 4️⃣ sort
    if (sortOption === "feesLowToHigh") {
      result.sort((a, b) => {
        const aFee = parseInt(a.fees.replace(/[₹ ,]/g, "")) || 0;
        const bFee = parseInt(b.fees.replace(/[₹ ,]/g, "")) || 0;
        return aFee - bFee;
      });
    } else if (sortOption === "experienceHighToLow") {
      result.sort((a, b) => {
        const aExp = parseInt(a.experience.match(/\d+/)) || 0;
        const bExp = parseInt(b.experience.match(/\d+/)) || 0;
        return bExp - aExp;
      });
    }

    setFilteredDoctors(result);
  }, [
    doctors,
    searchQuery,
    consultationType,
    selectedSpecialties,
    sortOption,
  ]);

  return (
    <div className="doctor-listing">
      {/* Top search bar */}
      <div className="top-bar">
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          doctors={doctors}

          doctorNames={doctors.map((d) => d.name)}
        />
      </div>

      {/* Centered container */}
      <div className="container">
        <div className="content">
          {/* Sidebar: sort + filters */}
          <div className="sidebar">
            <SortOptions
              sortOption={sortOption}
              onSortChange={setSortOption}
            />

            <FilterPanel
              consultationTypes={["Video Consult", "In Clinic"]}
              selectedConsultationType={consultationType}
              onConsultationTypeChange={setConsultationType}
              specialties={Array.from(
                new Set(
                  doctors.flatMap((d) => d.specialities.map((s) => s.name))
                )
              )}
              selectedSpecialties={selectedSpecialties}
              onSpecialtyChange={setSelectedSpecialties}
            />
          </div>

          {/* Main: doctor list */}
          <div className="main">
            {isLoading ? (
              <p>Loading doctors…</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : filteredDoctors.length === 0 ? (
              <p className="no-doctors-message">No doctors found.</p>
            ) : (
              <div className="doctor-cards-container">
                {filteredDoctors.map((doc) => (
                  <DoctorCard key={doc.id} doctor={doc} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorListing;
