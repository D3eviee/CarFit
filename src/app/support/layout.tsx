import { ClientFooter } from "@/components/client-footer";
import Navbar from "@/components/navbar/navbar";

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <>
      <Navbar/>
      {children}
      <div className="md:absolute bottom-0 w-full">
        <ClientFooter/>
       </div>
    </>
  );
}


