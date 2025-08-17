import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";
import ModalRoot from "@/components/modals/modal-root";
import { ToastRoot } from "@/components/toasts/toast-root";
import MobileNavbarModalRoot from "@/components/modals/mobile-navbar-modal-root";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Carfit App",
  description: "Book your car service provider",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="pl">
      <body className={`${inter.className} antialiased bg-[#FFF] overflow-x-hidden h-full`}>
        <QueryProvider>
          {/* <ReactQueryDevtools position="bottom" buttonPosition="bottom-right"/> */}
          {children}
          <ModalRoot/>
          <MobileNavbarModalRoot/>
          <ToastRoot />
        </QueryProvider>
      </body>
    </html>
  );
}
