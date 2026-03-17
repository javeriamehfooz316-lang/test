"use client";
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState({
    name: "",
    email: ""
  });

const submit = async () => {
  try {
    const response = await fetch("/api/test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data?.name,
        email: data?.email,
      }),
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error("Error:", error.message);
  }
};
  
  return (
    <>
    <div className="flex items-center justify-center gap-4 h-screen">
    <div className="bg-gray-800 p-6 rounded-lg grid items-center justify-center">
      <label htmlFor="name">Name:</label>
      <input 
        type="text" 
        id="name" 
        name="name" 
        className="bg-gray-600" 
        value={data.name}
        onChange={(e) => setData({...data, name: e.target.value})}
      />
      <br />
      <label htmlFor="email">Email:</label>
      <input 
        type="email" 
        id="email" 
        name="email" 
        className="bg-gray-600" 
        value={data.email}
        onChange={(e) => setData({...data, email: e.target.value})}
      />
      <br />
      <input onClick={submit} type="submit" value="Submit" className="bg-black"/>
    </div>
    </div>
    </>
  );
}
