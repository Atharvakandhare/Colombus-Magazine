import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import '../screens/Signup.css'

const Signup = () => {
  const [showForm, setShowForm] = useState(false);
  const [userType, setUserType] = useState("student");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    class: "",
    password: "",
    facultyId: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, class: className, password, facultyId } = formData;

    try {
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          profile: userType,
          class: userType === "student" ? className : undefined,
          facultyId: userType === "admin" ? facultyId : undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "User registered successfully!");
        setFormData({
          name: "",
          email: "",
          class: "",
          password: "",
          facultyId: "",
        });
        setShowForm(false); // Reset form visibility
      } else {
        alert(data.errors ? data.errors.map((err) => err.msg).join(", ") : data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to register. Please check your network connection and try again.");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        {showForm ? (
          <form className="signup-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            {userType === "student" && (
              <>
                <label htmlFor="class">Class</label>
                <select
                  id="class"
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select your class</option>
                  <option value="MCA">MCA</option>
                  <option value="MBA">MBA</option>
                </select>
              </>
            )}

            {userType === "admin" && (
              <>
                <label htmlFor="facultyId">Faculty ID</label>
                <input
                  type="text"
                  id="facultyId"
                  name="facultyId"
                  value={formData.facultyId}
                  onChange={handleChange}
                  required
                />
              </>
            )}

            <label htmlFor="password">Password</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button type="submit">Submit</button>
          </form>
        ) : (
          <>
            <button
              onClick={() => {
                setShowForm(true);
                setUserType("student");
              }}
            >
              Student
            </button>
            <button
              onClick={() => {
                setShowForm(true);
                setUserType("admin");
              }}
            >
              Admin
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;
