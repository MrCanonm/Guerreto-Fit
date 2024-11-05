"use client";

import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  router.push("/login");
  return <div className="h-screen flex">Este es el inicio</div>;
};
export default Home;
