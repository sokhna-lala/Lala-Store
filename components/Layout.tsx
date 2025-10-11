import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
