import React, { useState } from "react";
import { toast } from "react-hot-toast";

export default function RegisterModal({ onClose, onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const url = isRegister ? "/api/users/register" : "/api/users/login";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // Safe JSON parsing
      let data;
      const text = await res.text();
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        throw new Error("Invalid server response");
      }

      if (!res.ok) throw new Error(data.message || "Something went wrong");

      // Save token and user
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success(
        isRegister ? "Registered successfully!" : "Logged in successfully!"
      );
      onLoginSuccess(); // Notify parent
      onClose(); // Close modal
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">
          {isRegister ? "Register" : "Sign In"}
        </h2>

        {error && <p className="text-red-500 text-center mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {isRegister && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-500 transition disabled:opacity-50"
          >
            {loading ? "Please wait..." : isRegister ? "Register" : "Sign In"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-blue-600 font-semibold hover:underline"
          >
            {isRegister ? "Sign In" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
}
