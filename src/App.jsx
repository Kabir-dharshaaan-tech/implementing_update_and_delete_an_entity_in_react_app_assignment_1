import React, { useState, useEffect } from "react";

const API_URI = "http://localhost:8000/doors"; 

function App() {
  const [item, setItem] = useState(null);
  const [updatedValue, setUpdatedValue] = useState("");
  const [message, setMessage] = useState("");
  const itemId = "1"; 


  useEffect(() => {
    fetch(`${API_URI}/${itemId}`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch item");
        return response.json();
      })
      .then((data) => {
        setItem(data);
        setUpdatedValue(data.name || ""); 
      })
      .catch((error) => {
        console.error("Error fetching item:", error);
        setMessage("Error fetching item.");
      });
  }, []);


  const handleChange = (e) => {
    setUpdatedValue(e.target.value);
  };

 
  const handleUpdate = () => {
    fetch(`${API_URI}/${itemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: updatedValue }), // Ensure correct structure
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to update item");
        return response.json();
      })
      .then((data) => {
        setMessage("Item updated successfully!");
        setItem(data);
      })
      .catch((error) => {
        console.error("Error updating item:", error);
        setMessage("Failed to update item.");
      });
  };

  return (
    <div>
      <h1>Update Door</h1>
      {item ? (
        <>
          <p>Current Name: {item.name}</p>
          <input type="text" value={updatedValue} onChange={handleChange} />
          <button onClick={handleUpdate}>Update</button>
          {message && <p>{message}</p>}
        </>
      ) : (
        <p>Loading door...</p>
      )}
    </div>
  );
}

export default App;
