import { BusinessFooter } from "@/components/business-footer";
import "../globals.css";
import BusinessNavbar from "@/components/business/navbar/business-navbar";

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <>
      <BusinessNavbar/>
      {children}
      <BusinessFooter/>
    </>
  );
}
