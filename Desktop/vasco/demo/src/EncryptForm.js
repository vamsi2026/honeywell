import React, { useState } from "react";
import axios from "axios";

const EncryptForm = () => {
  const [username, setUsername] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [encryptedData, setEncryptedData] = useState("");
  const [decryptedData, setDecryptedData] = useState("");

  // Function to fetch public key from backend
  const fetchPublicKey = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/publicKey");
      setPublicKey(response.data);
    } catch (error) {
      console.error("Error fetching public key:", error);
    }
  };

  // Function to encrypt username
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

  // Function to decrypt the encrypted data
  const decryptData = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/decrypt", encryptedData, {
        headers: { "Content-Type": "text/plain" },
      });
      setDecryptedData(response.data);
    } catch (error) {
      console.error("Error decrypting data:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>RSA Encryption & Decryption</h2>
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
          <br />
          <button onClick={decryptData}>Decrypt</button>
        </div>
      )}

      {decryptedData && (
        <div>
          <h4>Decrypted Username:</h4>
          <textarea rows="2" cols="60" readOnly value={decryptedData} />
        </div>
      )}
    </div>
  );
};

export default EncryptForm;