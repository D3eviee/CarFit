'use client'
import { ServiceMobileHeader } from "@/components/service/mobile/service-mobile-header";
import { ServiceServicesList }  from '@/components/service/service-services-list';
import { FullServiceData, ServicePageTitleDataProps } from "@/lib/types";
import { ServiceMobileViewGallery } from "./service-mobile-view-gallery";
import { ServiceMobileDetails } from "./service-mobile-details";
import { ServiceMobileReviews } from "./service-mobile-reviews";
import { ServiceMobileBookingBar } from "./service-mobile-booking-bar";
import { useEffect, useRef, useState } from "react";

export const ServiceMobileView = ({businessData}:{businessData:FullServiceData}) => {
  const {workingDays, reviews, images, categories} = businessData
  const serviceCount = categories.reduce((acc, curr) => acc + curr.services.length ,0)
  const reviewsRef = useRef<HTMLDivElement>(null)
  const [showBar, setShowBar] = useState(true)

  const handleScroll = () => {
    if (!reviewsRef.current) return;
    const rect = reviewsRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.bottom < windowHeight) {
      setShowBar(false);
    } else {
      setShowBar(true);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [])

    // object containing data for service page tilte component 
    const serviceHeaderData: ServicePageTitleDataProps = {
      facebookUrl: businessData.facebookUrl,
      instagramUrl: businessData.instagramUrl,
      websiteUrl: businessData.websiteUrl,
      name: businessData.name,
      phone: businessData.phone,
      category: businessData.category,
      town: businessData.town,
      zipcode: businessData.zipcode,
      district: businessData.district,
      street: businessData.street,
      reviews: reviews,
      workingDays: workingDays
    }

  return (
    <>
      <div className="w-full flex flex-col overflow-hidden gap-16">
        {/* TOP OVERVIEW */}
        <div className="w-full flex flex-col overflow-hidden gap-5">
          {/* GALLERY */}
          <ServiceMobileViewGallery images={images}/>
          
          {/* HEADER */}
          <ServiceMobileHeader serviceHeaderData={serviceHeaderData}/>
        </div>
        
        {/* DETAILED SECTIONS */}
        <div className="w-full flex-col px-4 space-y-10">
          {/*SERVICES*/}
          <ServiceServicesList categoriesData={categories}/>

          {/* DESCRIPTION */}
          <div ref={reviewsRef}>
            <ServiceMobileDetails 
              serviceDescription={businessData.description}
              workingHoursData={workingDays}
              locationData={{street: businessData.street, city: businessData.town, zipcode: businessData.zipcode}}
              socials={{facebookUrl: businessData.facebookUrl, instagramUrl: businessData.instagramUrl, websiteUrl: businessData.websiteUrl}}
            />
          </div>
        </div>

        {/* REVIEWS */}
        {reviews.length > 0 && <ServiceMobileReviews reviewsData={reviews}/>}
      </div>

      {showBar && <ServiceMobileBookingBar serviceCount={serviceCount} />}
    </>
  );
}