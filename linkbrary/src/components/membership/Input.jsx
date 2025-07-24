// src/components/common/Input.jsx
import React from "react";

export default function Input({ type, value, onChange, placeholder, error, style, ...props }) {
  return (
    <>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: "100%",
          height: 54,
          borderRadius: 200,
          border: error ? "1px solid red" : "1px solid #757575",
          backgroundColor: "#2C2C2C",
          padding: "0 20px",
          color: "#fff",
          fontSize: 16,
          outline: "none",
          boxSizing: "border-box",
          marginTop: 6,
          ...style,
        }}
        {...props}
      />
      {error && <p style={{ color: "red", fontSize: 12 }}>{error}</p>}
    </>
  );
} 