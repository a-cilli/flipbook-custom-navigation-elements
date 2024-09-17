import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Custom navigation elements",
  description: "Navigation elements created using the JS API",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex flex-col min-h-screen bg-white`}
      >
        <nav className="w-full h-16 flex items-center px-6 border-b-2 border-gray-200">
          <span className="text-2xl font-bold">Title</span>
        </nav>
        <div className="w-full min-h-[calc(100vh-4rem)] flex">{children}</div>
      </body>
    </html>
  );
}
