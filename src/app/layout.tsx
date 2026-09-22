import type { Metadata } from "next";
import "./globals.css";
import { LocaleProvider } from "./components/LocaleProvider";

export const metadata: Metadata = {
  title: "GoAvir | Travel, with room to wander",
  description: "Small-group journeys for curious people.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><LocaleProvider>{children}</LocaleProvider></body></html>;
}
