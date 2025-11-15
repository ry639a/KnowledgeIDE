import Tiptap from './Tiptap'
import React, { useState } from "react"
import "./App.css"


const Query = () => {
    const [values, setValues] =useState({
        paper_title: '',
        authors: ''
        })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to submit form");

      const result = await response.json();
      console.log("✅ Server response:", result);
      alert("Message sent successfully!");
    } catch (err) {
      console.error("❌ Error:", err);
      alert("Failed to send message.");
    }
  };

  return (
    <div className="card">
      <h2> Research Papers </h2>
      <h3> Query </h3>
      <form>
      <table>
      <tr><td align="center"><label htmlFor="paper_title"> Paper Title </label></td>
      <td align="center"><input type="text" placeholder="Title" name="paper_title"/></td></tr>
      <tr><td align="center"><label htmlFor="authors"> Authors </label></td>
      <td align="center"><input type="text" placeholder="Authors" name="authors"/></td></tr>
      <tr><td align="center"><label htmlFor="question"> Question </label></td>
      <td align="center"><input type="text" placeholder="Question" name="question"/></td></tr>
      <td><input type="submit" value="Submit"/></td>
      </table>
      </form>
    </div>
  );
}

export default Query