import { FormHeader } from "../form-header";

const formHeadings = [
  {
    title: "Witamy w CarFit",
    subtitle: "Stwórz konto dla swojego biznesu i pozwól mu rosnąć",
  },
  {
    title: "Jaki rodzaj biznesu prowadzisz?",
    subtitle: "Wybierz kategorię, która najlepiej opisuje usługi, które dostarczasz."
  },
  {
    title: "Informacje o biznesie",
    subtitle: "Dostarcz informację o właścicielu i biznesie",
  },
  { 
    title: "Adres ", 
    subtitle: "Gdzie znajduje się twój biznes?" 
  },
  { title: "Opis ", 
    subtitle: "Opowiedz nam o swoim biznesie" 
  },
  {
    title: "Czas pracy",
    subtitle: "Daj znać klientom, w jakich dniach pracujesz",
  },
]

export default function BusinessOnboardingFormHeader({formPage}:{formPage:number}) {
  return (
    <FormHeader title={formHeadings[formPage].title} subtitle={formHeadings[formPage].subtitle}/>
  )
}

