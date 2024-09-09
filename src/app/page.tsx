"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Home = () => {
  const router = useRouter();

  router.push("/login");
  return <div className="h-screen flex">Este es el inicio</div>;
};
export default Home;
