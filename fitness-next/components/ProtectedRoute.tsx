"use client";
import { useEffect } from "react";
import { validAccountTypes } from "@/app/Types";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";

const ProtectedRoute = ({
  roles,
  children,
}: {
  roles: validAccountTypes[];
  children: React.ReactNode;
}) => {
  const { user, loading } = useAuth(); // Include loading state
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // Wait until loading is finished
      if (!user) {
        router.push("/"); // Redirect if not logged in
      } else if (!roles.includes(user.Role)) {
        router.push("/unauthorized"); // Redirect if role is not allowed
      }
    }
  }, [user, roles, router, loading]);

  if (loading || (!user && typeof window !== "undefined")) {
    // Show a loading state while waiting for AuthProvider to load user
    return <div>Loading...</div>; // Replace with a spinner or custom loading UI
  }

  return <>{children}</>;
};

export default ProtectedRoute;
