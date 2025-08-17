'use client'
import instagram_icon from '@/../public/instagram.png'
import facebook_icon from '@/../public/facebook.png'
import website_icon from '@/../public/website.png'
import Image from "next/image"
import Link from 'next/link'

type ServiceMobileSocials = {
    facebookUrl: string
    instagramUrl: string
    websiteUrl: string
}

export const ServiceMobileSocials = ({facebookUrl, instagramUrl, websiteUrl}:ServiceMobileSocials) => {
  const socials = [
    { platform: "Facebook", url: facebookUrl?.trim() || null, icon: facebook_icon },
    { platform: "Instagram", url: instagramUrl?.trim() || null, icon: instagram_icon },
    { platform: "Website", url: websiteUrl?.trim() || null, icon: website_icon }
  ].filter(s => s.url)
  
  return (
    <div className="p-1 flex flex-row w-full items-center justify-center rounded-xl border-4 border-[#F2F2F7]">
      {socials.map(({ platform, url, icon }) => (
        <div key={platform} className="py-2 w-full flex flex-row hover:cursor-pointer rounded-lg hover:bg-[#F2F2F7] active:scale-95 transition-all duration-150">
          <Link href={url} target="_blank" className="w-full">
            <div className="flex flex-col gap-2 items-center justify-center">
              <Image alt={platform} src={icon} width={25} height={25} className="aspect-square"/>
              <p className="text-[#8E8E92] text-[13px] xl:text-sm font-medium leading-3">{platform}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
