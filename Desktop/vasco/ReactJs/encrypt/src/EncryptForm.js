import React, { useState } from "react";
import axios from "axios";

const EncryptForm = () => {
  const [username, setUsername] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [encryptedData, setEncryptedData] = useState("");

  // Function to fetch public key from backend
  const fetchPublicKey = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/publicKey");
      setPublicKey(response.data);
    } catch (error) {
      console.error("Error fetching public key:", error);
    }
  };

  // Function to send username and receive encrypted data
  const encryptUsername = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/encrypt", username, {
        headers: { "Content-Type": "text/plain" },
      });
      setEncryptedData(response.data);
    } catch (error) {
      console.error("Error encrypting username:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>RSA Encryption</h2>
      <button onClick={fetchPublicKey}>Get Public Key</button>
      {publicKey && (
        <div>
          <h4>Public Key:</h4>
          <textarea rows="5" cols="60" readOnly value={publicKey} />
        </div>
      )}

      <div>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={encryptUsername}>Encrypt</button>
      </div>

      {encryptedData && (
        <div>
          <h4>Encrypted Data:</h4>
          <textarea rows="3" cols="60" readOnly value={encryptedData} />
        </div>
      )}
    </div>
  );
};

export default EncryptForm;
