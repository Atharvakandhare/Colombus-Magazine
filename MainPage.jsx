import React, { useEffect } from "react";
import "./MainPage.css";
import { Link } from "react-router-dom";

const MainPage = () => {
  const handleMouseMove = (e) => {
    const viewportHeight = window.innerHeight;
    const distanceFromBottom = viewportHeight - e.clientY;
    if (distanceFromBottom < 100) {
      document.getElementById("card-section").scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const cards = [
    { year: "2020", thumbnail: "https://via.placeholder.com/150" },
    { year: "2021", thumbnail: "https://via.placeholder.com/150" },
    { year: "2022", thumbnail: "https://via.placeholder.com/150" },
    { year: "2023", thumbnail: "https://via.placeholder.com/150" },
  ];

  return (
    <div className="main-page">
      {/* Main Section */}
      <div className="main-section">
        {/* Rotating Earth */}
        <div className="earth-animation"></div>
        <h1 className="main-title">Columbus</h1>
        <p className="main-subtitle">Scroll down to explore our magazines</p>

        {/* Login and Signup Buttons */}
        <div className="btn-container">
          
          <Link to="/Signup">
            <button className="btn2">Get In</button>
          </Link>
          <Link to="/Login">
            <button className="btn3">Login</button>
          </Link>
        </div>
      </div>

      {/* Card Section */}
      <div id="card-section" className="card-section">
        <div className="card-grid">
          {cards.map((card, index) => (
            <div key={index} className="card">
              <img src={card.thumbnail} alt={`Columbus Magazine ${card.year}`} className="card-thumbnail" />
              <div className="card-title">Columbus Magazine {card.year}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
