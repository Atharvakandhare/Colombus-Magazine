import React, { useState } from 'react';
import './Announcements.css';
import { useNavigate } from 'react-router-dom';

const Announcements = () => {
  const navigate = useNavigate();

  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      name: 'New Project Guidelines',
      publishedDate: '2024-12-01',
      endDate: '2024-12-10',
      isSubmitted: true,
    },
    {
      id: 2,
      name: 'Final Report Submission',
      publishedDate: '2024-11-25',
      endDate: '2024-12-05',
      isSubmitted: false,
    },
    {
      id: 3,
      name: 'Monthly Feedback Form',
      publishedDate: '2024-11-15',
      endDate: '2024-11-30',
      isSubmitted: true,
    },
  ]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleOpenPopup = (announcement) => {
    setCurrentAnnouncement(announcement);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setUploadedFile(null);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile({
        name: file.name,
        size: (file.size / 1024).toFixed(2) + ' KB',
      });
    }
  };

  const handleFileRemove = () => {
    setUploadedFile(null);
  };

  const postPDF = (pdfFile) => {
    if (!pdfFile) {
      alert('PDF file not selected.');
      return;
    }

    if (pdfFile.type === 'application/pdf') {
      const data = new FormData();
      data.append('file', pdfFile);
      data.append('upload_preset', 'mydrive');
      data.append('cloud_name', 'dgmkwv786');

      fetch('https://api.cloudinary.com/v1_1/dgmkwv786/upload', {
        method: 'POST',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          const pdfUrl = data.secure_url;
          handleSubmitWork(pdfUrl);
        })
        .catch((err) => {
          console.log(err);
          alert('Error uploading PDF.');
        });
    } else {
      alert('Please select a PDF file.');
    }
  };

  const handleSubmitWork = (pdfUrl) => {
    const description = document.querySelector('.work-description').value;

    fetch('http://localhost:5000/api/notes/addnote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token:localStorage.getItem("token"),

      },
      body: JSON.stringify({
        description,
        pdf: pdfUrl,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert('Work submitted successfully!');
          handleClosePopup();
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Failed to submit work.');
      });
  };

  return (
    <div className="announcements-page">
      {/* Navbar */}
      <header className="header">
        <nav className="nav">
          <button className="nav-button active">Announcements</button>
          <button className="nav-button">Profile</button>
          <button className="nav-button">Submission</button>
          <button className="nav-button">Home</button>
          <button className="nav-button">Logout</button>
        </nav>
      </header>

      {/* Announcements Content */}
      <main className="announcements-content">
        <h1 className="announcements-title">Announcements</h1>
        <table className="announcements-table">
          <thead>
            <tr>
              <th>Announcement Name</th>
              <th>Published Date</th>
              <th>End Date</th>
              <th>Submission Status</th>
              <th>Submit Work</th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((announcement) => (
              <tr key={announcement.id}>
                <td>{announcement.name}</td>
                <td>{announcement.publishedDate}</td>
                <td>{announcement.endDate}</td>
                <td>
                  {announcement.isSubmitted ? (
                    <span className="submitted-box">✔ Submitted</span>
                  ) : (
                    <span className="not-submitted-box">Not Submitted</span>
                  )}
                </td>
                <td>
                  <button
                    className="submit-button"
                    onClick={() => handleOpenPopup(announcement)}
                    disabled={announcement.isSubmitted}
                  >
                    {announcement.isSubmitted ? 'Submitted' : 'Submit'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      {/* Popup for File Submission */}
      {isPopupOpen && (
        <div className="popup-overlay" onClick={handleClosePopup}>
          <div
            className="popup-container"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the popup
          >
            <button className="popup-close-button" onClick={handleClosePopup}>
              &times;
            </button>
            <h2>Submit Work</h2>
            <textarea
              className="work-description"
              placeholder="Enter a brief description of your work..."
            ></textarea>
            <div className="file-upload-section">
              {!uploadedFile ? (
                <>
                  <input
                    type="file"
                    className="file-input"
                    accept="application/pdf"
                    onChange={(e) => postPDF(e.target.files[0])}
                  />
                </>
              ) : (
                <div className="file-details">
                  <span>
                    {uploadedFile.name} ({uploadedFile.size})
                  </span>
                  <button className="remove-file-button" onClick={handleFileRemove}>
                    &times;
                  </button>
                </div>
              )}
              <button
                className="submit-file-button"
                onClick={() => postPDF(uploadedFile)}
                disabled={!uploadedFile}
              >
                Submit File
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Announcements;
