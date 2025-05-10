import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './DashBoard.css';


// Import carousel images
import image2 from '../assets/image2.png';
import image3 from '../assets/image3.png';
import image4 from '../assets/image4.jpg';

const DashBoard = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const images = [image2, image3, image4];

  const handlePrevious = () => {
    setCurrentImage((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImage((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleAddPhoto = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setProfileImage(null); // Clear the profile image
  };

  const togglePopup = () => {
    setPopupVisible((prev) => !prev);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  // Close the popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.profile-popup') && popupVisible) {
        closePopup();
      }
    };
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [popupVisible]);

  return (
    <div>
      <header className="header">
        {/* Profile Section */}
        <div className="profile" onClick={togglePopup}>
          <img
            src={profileImage || 'https://via.placeholder.com/50'}
            alt="Profile"
            className="profile-img"
          />
          <span className="welcome-text">Welcome User!</span>
          {popupVisible && (
            <div className="profile-popup">
              <label className="popup-button">
                Add Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAddPhoto}
                  className="file-input"
                />
              </label>
              <button onClick={handleRemovePhoto} className="popup-button">
                Remove Photo
              </button>
            </div>
          )}
        </div>
        {/* Navbar Section */}
        <nav className="nav">
          <button className="nav-button">Profile</button>
          <Link to="/Announcements">
          <button className="nav-button">Announcements</button>
          </Link>
          <button className="nav-button">Submission</button>
          <button className="nav-button">Home</button>
          <button className="nav-button">Logout</button>
        </nav>
      </header>
      <main className="main-content">
        {/* Text Content */}
        <div className="text-content">
          <h1 className="columbus-title">COLUMBUS</h1>
          <p className="paragraph">
            Artist Inside You!
          </p>
        </div>
        {/* Image Carousel */}
        <div className="image-content">
          <img
            src={images[currentImage]}
            alt={`Slide ${currentImage + 1}`}
            className="carousel-img"
          />
          <div className="carousel-buttons">
            <button onClick={handlePrevious}>&lt;</button>
            <button onClick={handleNext}>&gt;</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashBoard;
