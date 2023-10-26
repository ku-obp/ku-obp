import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";

import { ReduxProvider } from "@/redux/provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";
import AuthSession from "@/components/auth/auth-session";
import { ModalProvider } from "@/components/providers/modal-provider";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Open Boardgame Project",
  description: "This project is managed by oxboxx.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={font.className}>
        <AuthSession>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            storageKey="ku-obp"
          >
            <ReduxProvider>
              <ModalProvider />
              {children}
            </ReduxProvider>
          </ThemeProvider>
        </AuthSession>
      </body>
    </html>
  );
}
