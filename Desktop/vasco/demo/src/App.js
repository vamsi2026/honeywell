import React from "react";
import EncryptForm from "./EncryptForm";

function App() {
  return (
    <div style={{ textAlign: "center" }}>
      <img 
        src="https://www.google.com/url?sa=i&url=https%3A%2F%2F1000logos.net%2Fhoneywell-logo%2F&psig=AOvVaw2jmpPrrwSoq02Olu791iqE&ust=1742545666376000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCODb7c2emIwDFQAAAAAdAAAAABAE" 
        alt="Honeywell Logo" 
        style={{ width: "200px", marginBottom: "20px" }}
      />
      <h1>RSA Encryption App</h1>
      <EncryptForm />
    </div>
  );
}

export default App;
