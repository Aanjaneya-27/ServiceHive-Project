import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import API from "../services/Api";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      role: "sales",
    });

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement
    >
  ) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleRegister = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setError("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.password
    ) {

      setError(
        "All fields are required"
      );

      return;
    }

    try {

      setLoading(true);

      const res =
        await API.post(
          "/users/register",
          formData
        );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          res.data.user
        )
      );

      navigate("/dashboard");

    } catch {

      setError(
        "Register failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 text-white">

      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8">

        <h1 className="text-3xl font-bold mb-2">
          Create Account
        </h1>

        <p className="text-zinc-400 mb-6">
          Register your account
        </p>

        <form
          onSubmit={handleRegister}
          className="space-y-4"
        >

          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          <div>

            <label className="block mb-2 text-sm">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 outline-none focus:border-violet-500"
            />

          </div>

          <div>

            <label className="block mb-2 text-sm">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 outline-none focus:border-violet-500"
            />

          </div>

          <div>

            <label className="block mb-2 text-sm">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 outline-none focus:border-violet-500"
            />

          </div>

          <div>

            <label className="block mb-2 text-sm">
              Role
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 outline-none"
            >
              <option value="sales">
                Sales
              </option>

              <option value="admin">
                Admin
              </option>

            </select>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-violet-600 hover:bg-violet-700 transition rounded-lg py-3 font-medium"
          >
            {loading
              ? "Please wait..."
              : "Register"}
          </button>

        </form>

        <p className="text-zinc-400 text-sm mt-6">
          Already have an account?{" "}

          <Link
            to="/login"
            className="text-violet-400"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Register;