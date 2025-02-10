"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { RootState, store, useAppSelector } from "./store/index.slice";
import { ToastContainer } from "react-toastify";
import Sidebar from "./_components/Sidebar";
import { RouteGuard } from "./_components/RouteGuard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <RouteGuard>
            <MainLayout>{children}</MainLayout>
          </RouteGuard>
        </Provider>
      </body>
    </html>
  );
}

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAppSelector((state: RootState) => state.auth);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      {user && (
        <div className="w-[240px] flex-shrink-0 border-r">
          <Sidebar />
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto">{children}</main>
    </div>
  );
};
