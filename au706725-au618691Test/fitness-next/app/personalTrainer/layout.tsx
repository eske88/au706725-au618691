"use client";
import React from "react";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();

  return (
    <ProtectedRoute roles={["PersonalTrainer"]}>
      <div className="w-full pb-4 items-center justify-center flex gap-2">
        <Button
          text={"Overview"}
          onClick={() => router.push("/personalTrainer")}
        />
        <Button
          text={"Add Client"}
          onClick={() => router.push("/personalTrainer/addClient")}
        />
      </div>
      {children}
    </ProtectedRoute>
  );
};

export default Layout;
