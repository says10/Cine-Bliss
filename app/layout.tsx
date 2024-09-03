import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import Provider from "@/components/Provider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Netyflix",
  description: "Netflix |",
  // You can add other metadata here
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="public\favicon.ico" />
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>
        <Provider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </Provider>
      </body>
    </html>
  );
}
