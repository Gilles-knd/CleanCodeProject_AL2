import type { Metadata } from "next";
import { Geist } from "next/font/google";
import classNames from "classnames";
import "../styles/globals.css";
import { Toast } from "@/ui/organisms/Toast/Toast";
import * as Alert from "@/ui/organisms/Alert/Alert";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Leitner system",
  description: "Graphical interface for Leitner System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={classNames(geistSans.className, "fixed overflow-hidden h-screen w-screen antialiased")}
      >
        {children}
        <Toast />
        <Alert.Root />
      </body>
    </html>
  );
}
