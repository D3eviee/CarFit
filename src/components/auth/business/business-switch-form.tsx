import Link from "next/link"

export default function BusinessSwitchForm() {
  return(
    <p className="text-center text-[#333] text-sm font-light">Nie posiadasz konta dla swojego biznesu?
      <Link href='/business/onboarding'>
        <span className="text-[#007AFF] font-semibold"> Utwórz konto</span>
      </Link>
    </p>
  )
}

