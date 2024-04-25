import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import "@uploadthing/react/styles.css";
import AuthContext from "./context/AuthContext";

const font = Nunito({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Educaconecta",
  description: "Educaconecta",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className} >
        <AuthContext>
        {children}
        <Toaster />
        </AuthContext>
      </body>
    </html>
  );
}
