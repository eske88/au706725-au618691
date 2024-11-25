import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import React from "react";
import NavBar from "@/components/navBar";
import { AuthProvider } from "@/context/authContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`flex flex-col w-full h-full ${geistSans.variable} ${geistMono.variable} antialiased h-screen bg-white`}
      >
        <AuthProvider>
          <NavBar />
          <main className="max-w-5xl w-full flex-grow h-full mx-auto px-2 mt-5">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}