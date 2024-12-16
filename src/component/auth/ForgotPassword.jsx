import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      setMessage("");
      setError("");
  
      try {
          const response = await axios.post("http://localhost:4040/users/forgot-password", null, {
              params: { email }
          });
  
          // Log response data to inspect the structure
          console.log(response.data);  // Check if 'token' is present
  
          // Display success message
          setMessage(response.data.message || "Check your email for reset instructions.");
  
          // Extract token from response or email link if available
          const token = response.data.token;
  
          // Redirect to reset-password page with token as query parameter
          if (token) {
              navigate(`/reset-password?token=${token}`);
          } else {
              console.error("Token is missing in the response");
          }
      } catch (err) {
          setError(err.response?.data?.message || "Something went wrong. Please try again.");
      }
  };
  
    return (
        <div>
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Send Reset Link</button>
            </form>
            {message && <p style={{ color: "green" }}>{message}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default ForgotPassword;
