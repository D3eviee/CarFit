import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <div className="h-dvh w-full overflow-hidden">
    {children}
    </div>
}
