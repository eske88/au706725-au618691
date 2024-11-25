import React from "react";
import { User } from "@/app/Types";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";

type ClientsPreviewProps = {
  clients: User[] | undefined;
};

const ClientsPreview = ({ clients }: ClientsPreviewProps) => {
  const router = useRouter();

  // Ensure clients is an array before attempting to map
  if (!Array.isArray(clients)) {
    return (
      <div>
        <h2>Client Overview</h2>
        <p>No valid client data available.</p>
      </div>
    );
  }

  const handleSeeProgram = (client: User) => {
    router.push(`/personalTrainer/programs/${client.userId}`);
  };

  const handleAddProgram = (client: User) => {
    router.push(`/personalTrainer/addProgram/${client.userId}`);
  };

  return (
    <div>
      <h2 className="text-4xl text-center leading-none">Client Overview</h2>
      <p className="text-center leading-none pb-6">
        Here you can see a list of all your clients.
      </p>
      <ul className="space-y-2">
        {clients.map((client) => {
          const fullClientName = `${client.firstName} ${client.lastName}`;
          return (
            <li
              className="w-full flex pl-6 justify-between bg-slate-200 rounded-md p-2"
              key={client.userId}
            >
              <section>
                <p className="font-bold text-2xl">{fullClientName}</p>
                <p className="text-sm leading-none text-slate-600">
                  {client.email}
                </p>
              </section>
              <div className="flex gap-4">
                <Button
                  text={"See Programs"}
                  onClick={() => handleSeeProgram(client)}
                />
                <Button
                  text={"Add Program"}
                  onClick={() => handleAddProgram(client)}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ClientsPreview;
