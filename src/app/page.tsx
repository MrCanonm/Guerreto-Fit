"use client";

import { useAuthService } from "@/services/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Home = () => {
  const router = useRouter();

  router.push("/loging");
  return <div className="h-screen flex">Este es el inicio</div>;
};
export default Home;
