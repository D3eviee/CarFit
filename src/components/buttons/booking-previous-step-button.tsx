"use client";
import { BackButton } from "./back-button";

type BookingPreviousStepButtonProps = {
  bookingStep: number
  previouStepFn: () => void
}

export const BookingPreviousStepButton = ({bookingStep, previouStepFn}:BookingPreviousStepButtonProps) => {    
  if(bookingStep == 1) return null
  return  <BackButton onBackFn={previouStepFn}/>
}