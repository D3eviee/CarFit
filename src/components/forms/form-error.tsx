export const FormError = ({error}:{error?:string}) => {
  return (
    <>{error && <p className="text-xs text-red-400 pl-1">{error}</p>}</>
  )
}