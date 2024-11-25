"use client";
import React, { useEffect, useState } from "react";
import { GET } from "@/app/api/personalTrainer/route";
import { useAuth } from "@/context/authContext";
import ClientsPreview from "@/components/ClientsPreview";

const Page = () => {
  const [clients, setClients] = useState<any[]>([]); // Ensure state is initialized as an array
  const { token } = useAuth();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        if (!token) return;
        const response = await GET(token);
        setClients(response);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, [token]);

  return <ClientsPreview clients={clients} />;
};

export default Page;
