"use client";
import { useModalStore } from "@/lib/store";
import {AnimatePresence, motion} from "framer-motion"
import { useMediaQuery } from "usehooks-ts";

export default function ModalRoot(){
  const stack  = useModalStore(store => store.stack);
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <AnimatePresence>
      {stack.map((modal, index) => (
        <motion.div
          initial={isMobile ? { x: "100%", opacity: 0 } : { opacity: 0}}
          animate={isMobile ? { x: 0, opacity: 1 } : { opacity: 1, }}
          exit={isMobile ? { x: "100%", opacity: 0 } : { opacity: 0,}}
          transition={ isMobile ? { duration: 0.15, ease: "easeOut" } : { duration: 0.2, ease: "easeOut" }}
          key={index}
          className={`overflow-hidden flex justify-center items-center fixed top-0  left-0 h-dvh w-full z-[999] bg-black/75`}
        >
          {modal}
        </motion.div>
      ))}
    </AnimatePresence>
  )
}