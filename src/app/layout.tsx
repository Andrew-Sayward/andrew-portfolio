import "./globals.scss";
import { Oswald } from "next/font/google";

const bangers = Oswald({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Andrew Sayward | Front-end Web developer",
  description: "Hi, my name is Andrew, I am a front-end web developer specialising in responsive, animated, react framework based websites.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={bangers.className}>{children}</body>
    </html>
  );
}
