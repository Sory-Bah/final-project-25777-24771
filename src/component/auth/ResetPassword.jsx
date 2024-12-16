import axios from "axios";
import React, { useEffect, useState } from "react";

const ResetPassword = () => {
    const [token, setToken] = useState(null);
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const userToken = localStorage.getItem('userToken'); // Or sessionStorage, or cookies


    useEffect(() => {
        // Extract the token from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const tokenParam = urlParams.get("token");
        setToken(tokenParam);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");
        try {
          const response = await axios.post(
            `http://localhost:4040/users/reset-password?token=${token}&newPassword=${newPassword}`
        );
        
        
        
            setMessage(response.data.message || "Password reset successfully!");
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong. Please try again.");
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>
            {token ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>New Password:</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Reset Password</button>
                </form>
            ) : (
                <p style={{ color: "red" }}>Invalid or missing token. Please check your reset link.</p>
            )}
            {message && <p style={{ color: "green" }}>{message}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default ResetPassword;
