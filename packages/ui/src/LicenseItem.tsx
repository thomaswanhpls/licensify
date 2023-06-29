type License = {
  id: string
  number: string
  rentedAt?: string
  available?: boolean
  owner?: string
}

interface LicenseItemProps {
  license: License
}

export const LicenseItem = ({ license }: LicenseItemProps) => {
  const timestamp = Number(license.rentedAt)
  const time = new Date(timestamp)
  const timeLeft = Math.max(
    Math.floor((timestamp + 15 * 1000 - Date.now()) / 1000),
    0
  )
  const showAvailability =
    license.available === true || license.available === false

  const Availability = ({
    show,
    children,
  }: {
    show: boolean
    children: React.ReactNode
  }) => {
    if (!show) return null
    return children
  }

  return (
    <li className="ui-mb-2 ui-max-w-sm ui-overflow-hidden ui-rounded ui-bg-white ui-p-3 ui-shadow-lg">
      <Availability show={showAvailability}>
        {license.available ? (
          <span className="ui-dark:bg-green-900 ui-dark:text-green-300 ui-mr-2 ui-rounded ui-bg-green-100 ui-px-3 ui-py-2 ui-text-xs ui-font-medium ui-text-green-800">
            Available
          </span>
        ) : (
          <span className="ui-dark:bg-red-900 ui-dark:text-red-300 ui-mr-2 ui-rounded ui-bg-red-100 ui-px-3 ui-py-2 ui-text-xs ui-font-medium ui-text-red-800">
            Not available
          </span>
        )}
      </Availability>
      <div className="ui-px-6 ui-py-4">
        <div className="ui-mb-2 ui-text-xl ui-font-bold">
          License #{license.number}
        </div>
        <Availability show={showAvailability}>
          {license.rentedAt && !license.available && (
            <p className="ui-mb-2 ui-text-base ui-text-gray-700">
              Available in {timeLeft} seconds
            </p>
          )}
        </Availability>
        {license.rentedAt && license.available && (
          <p className="ui-mb-2 ui-text-base ui-text-gray-700">
            Last rented: {time.toLocaleDateString()}
          </p>
        )}
      </div>
    </li>
  )
}
