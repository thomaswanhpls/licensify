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
  return (
    <li className="ui-mb-2 ui-max-w-sm ui-overflow-hidden ui-rounded ui-bg-white ui-p-3 ui-shadow-lg">
      {license.available ? (
        <span className="ui-dark:bg-green-900 ui-dark:text-green-300 ui-mr-2 ui-rounded ui-bg-green-100 ui-px-3 ui-py-2 ui-text-xs ui-font-medium ui-text-green-800">
          Available
        </span>
      ) : (
        <span className="ui-dark:bg-red-900 ui-dark:text-red-300 ui-mr-2 ui-rounded ui-bg-red-100 ui-px-3 ui-py-2 ui-text-xs ui-font-medium ui-text-red-800">
          Not available
        </span>
      )}

      <div className="ui-px-6 ui-py-4">
        <div className="ui-mb-2 ui-text-xl ui-font-bold">
          License #{license.number}
        </div>
        {license.rentedAt && (
          <p className="ui-mb-2 ui-text-base ui-text-gray-700">
            Last rented: {license.rentedAt}
          </p>
        )}
      </div>
    </li>
  )
}
