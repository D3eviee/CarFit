"use client";
import { useMobileNavigationStore } from "@/lib/store";
import { AnimatePresence, motion } from "framer-motion"

 export default function MobileNavbarModalRoot(){
  const menu = useMobileNavigationStore(store => store.menu);
  return (
    <AnimatePresence>
      {menu && (
        <motion.div
          initial={{ opacity: 0}}
          animate={ { opacity: 1, }}
          exit={{ opacity: 0,}}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="h-screen inset-0 w-full fixed overflow-hidden z-50 bg-white"
        >
          {menu}
        </motion.div>
      )}
    </AnimatePresence>
  )
}