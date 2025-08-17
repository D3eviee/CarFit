export const AppointmentTablePriceCell = ({getValue}) => {
    const rawPrice = getValue()
    const price = `${parseFloat(rawPrice)} PLN`

    return (
        <p className="min-w-20 text-xs lg:text-sm">{price}</p>
    )
}