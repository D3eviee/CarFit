'use client'
import Image from "next/image";
import login_image from "../../../../../public/login_image.jpg"
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import FormHeader from "@/components/form-header";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { businessSignIn } from "@/lib/auth";

export default function SignIn() {
  const [error, setError] = useState<string | undefined>("");
  const router = useRouter();
  
  type FormData =   {
    email: string
    password: string
  }
  
    const {register, handleSubmit} = useForm<FormData>({
      defaultValues: {
        email: '',
        password: ''
      }
    })
  
    const onSubmit = async (data: FormData) => {
      const response = await businessSignIn(data);
      try {
        if (response.success) {
          router.push('/dashboard');
        } else {
          setError(response.error);
        }
      }catch {
        setError(response.error)
      }
    }

  return (
    <div className="w-full h-screen flex">
      <Link href="/business" className="absolute left-[80px] top-[40px]">
        <div className=" bg-[#111] rounded-md hover:bg-[#222222] border p-1">
          <ArrowLeft color="#FFFFFF" className="size-7" />
        </div>
      </Link>

      <div className="w-1/2 bg-[#FDFCFF] text-white flex flex-col items-center justify-center">
        <div className="w-[380px] bg-[#FFFFFF] flex flex-col px-[45px] py-[75px] gap-[30px] rounded-xl shadow-[0px_0px_35px_5px_#D4D4D4]">

          <FormHeader title="Wellcome back" subtitle="Log in into your business account"/>

          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email" className="inline-block text-[#333] text-[14px] mb-[5px]">Email</label>
            <input
            {...register('email')}
              type="text"
              id="email"
              placeholder="carfit@gmail.com"
              className="border-[0.5px] border-[#CCCCCC] w-full px-[7px] py-[5px] text-[#111] text-sm rounded-md mb-[15px] focus:outline-[#333333]"
              onFocus={()=>{setError("")}}
            />

            <label htmlFor="password" className="inline-block text-[#333] text-[14px] mb-[5px]">Password</label>
            <input
              {...register('password')}
              type="password"
              id="password"
              placeholder="***********"
              className="border-[0.5px] border-[#CCCCCC] w-full px-[7px] py-[5px] text-[#111] text-sm rounded-md focus:outline-[#333333]"
              onFocus={()=>{setError("")}}
            />

          <button className="w-full flex bg-[#111111] py-2 justify-center items-center gap-3 rounded-[7px] font-medium text-sm mt-[25px]">Log in</button>  
          </form>
        
          <p className="block text-red-500 text-xs">{error}</p>
        
          <div>
            <p className="text-xs text-[#333] text-pretty font-extralight tracking-wide">By clicking <b>Log in</b> you acknowledge you have read, understood and agree for our 
              <span className="text-xs font-normal text-[#333]"> Policy and Terms
            </span></p>
              <p className="mt-[25px] text-center text-[#333333] text-xs font-light">Do not have an account? 
                <Link href='/business/onboarding'><span className="text-blue-900 font-semibold"> Create</span></Link>
              </p>
          </div>

        
    </div>
    </div>
      <div className="w-1/2 text-white"> 
      <Image src={login_image} alt="login image" className="h-full object-cover"/>
      </div>
    </div>
  );
}
