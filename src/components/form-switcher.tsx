type FormSwitcherProps = {
  currentForm: 1 | 2;
  onSwitch: (form: 1 | 2) => void;
}

export const FormSwitcher = ({ currentForm, onSwitch }: FormSwitcherProps) => {
  const isLogin = currentForm === 1;

  return (
    <p className="text-center text-[#191919] text-sm font-light">
      {isLogin ? "Nie masz konta?" : "Masz już konto?"}
      <span
        onClick={() => onSwitch(isLogin ? 2 : 1)}
        className="ml-1 text-[#007AFF] font-semibold hover:cursor-pointer"
      >
        {isLogin ? "Utwórz" : "Zaloguj"}
      </span>
    </p>
  )
}