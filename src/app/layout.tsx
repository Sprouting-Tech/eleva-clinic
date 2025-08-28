import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = { 
  title: "Eleva Clinic", 
  description: "Showcase",
  viewport: "width=device-width, initial-scale=1" // Add viewport meta
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 w-full">
            {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
