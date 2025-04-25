import React from "react";
import "./DoctorCard.css";

const DoctorCard = ({ doctor }) => {
  const specialties = (doctor.specialities || []).map(s => s.name).join(", ");

  const experience = doctor.experience || "";
  const fee = doctor.fees || "";
  const clinicName = doctor.clinic?.name || "";
  const locality = doctor.clinic?.address?.locality || "";
  const city = doctor.clinic?.address?.city || "";

  return (
    <div data-testid="doctor-card" className="doctor-card">
      {/* Photo */}
      <div className="dc-photo">
        <img src={doctor.photo} alt={doctor.name} />
      </div>

      {/* Main info */}
      <div className="dc-info">
        <h2 data-testid="doctor-name" className="dc-name">
          {doctor.name}
        </h2>

        <p data-testid="doctor-specialty" className="dc-specialty">
          {specialties}
        </p>

       

        <p data-testid="doctor-experience" className="dc-experience">
          {experience}
        </p>

        <div className="dc-clinic">
          <div className="clinic-item">
            <span className="clinic-icon">🏥</span>
            <span className="clinic-text">{clinicName}</span>
          </div>
          <div className="clinic-item">
            <span className="clinic-icon">📍</span>
            <span className="clinic-text">
              {locality}{city ? `, ${city}` : ""}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="dc-action">
        <p data-testid="doctor-fee" className="dc-fee">
          {fee}
        </p>
        <button className="dc-button">Book Appointment</button>
      </div>
    </div>
  );
};

export default DoctorCard;
