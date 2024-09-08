"use client";

import { useAuthService } from "@/services/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Home = () => {
  const [accessName, setAccessName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, loading } = useAuthService();
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    try {
      const response = await login({ accessName, password });
      if (response.token) {
        // Guarda el token en localStorage
        localStorage.setItem("authToken", response.token);
        router.push("/pages/home");
      }
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="h-screen flex">
      <div className="flex w-1/2 bg-gradient-to-tr from-orange-900 to-blue-900 justify-around items-center">
        {/* Left side content remains the same */}
      </div>
      <div className="flex w-1/2 justify-center items-center bg-white">
        <form className="bg-white" onSubmit={handleSubmit}>
          <h1 className="text-gray-800 font-bold text-2xl mb-1">
            Hola de nuevo!
          </h1>
          <p className="text-sm font-normal text-gray-600 mb-7">Bienvenido</p>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none"
              type="text"
              placeholder="Nombre de usuario"
              value={accessName}
              onChange={(e) => setAccessName(e.target.value)}
            />
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
            <svg
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="block w-full bg-blue-900 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
            disabled={loading}
          >
            {loading ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>
          <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
            Olvidaste tu contraseña ?
          </span>
        </form>
      </div>
    </div>
  );
};
export default Home;
