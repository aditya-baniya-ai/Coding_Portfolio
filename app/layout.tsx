import Link from "next/link";
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Navbar from "@/components/navbar";
import "./globals.css";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL("https://adityabaniya.netlify.app"),
  title: "Aaditya Baniya — Software Engineer & Computer Vision Researcher",
  description:
    "Software engineering meets real-world AI. Explore Aaditya Baniya’s edge computer vision research, full-stack applications, robotics, and work at Texas State University.",
  openGraph: {
    title: "Aaditya Baniya — Software + AI",
    description:
      "Intelligent systems. Real-world impact. Software engineering, edge AI, and computer vision.",
    url: "https://adityabaniya.netlify.app",
    type: "website",
  },
  robots: { index: true, follow: true },
};
const themeScript = `try{var t=localStorage.getItem('portfolio-theme');if(t==='dark')document.documentElement.dataset.theme='dark'}catch(e){}`;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${space.variable}`}>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Link className="skip-link" href="#main">
          Skip to content
        </Link>
        <Navbar />
        <main id="main">{children}</main>
        <footer className="site-footer">
          <Link className="footer-name" href="/#top">
            Aaditya Baniya<span>↗</span>
          </Link>
          <p>Made with curiosity. Built with purpose.</p>
          <span>© {new Date().getFullYear()} Aaditya Baniya</span>
          <Link href="/#top">Back to top ↑</Link>
        </footer>
      </body>
    </html>
  );
}
