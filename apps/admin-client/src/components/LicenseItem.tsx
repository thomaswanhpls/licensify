import { License } from '../context/LicenceContext'

interface LicenseItemProps {
  license: License
}

export default function LicenseItem({ license }: LicenseItemProps) {
  return (
    <li className="mb-2 max-w-sm overflow-hidden rounded bg-white p-3 shadow-lg">
      {license.available ? (
        <span className="mr-2 rounded bg-green-100 px-3 py-2 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
          Available
        </span>
      ) : (
        <span className="mr-2 rounded bg-red-100 px-3 py-2 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
          Not available
        </span>
      )}

      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold">License #{license.number}</div>
        {license.rentedAt && (
          <p className="mb-2 text-base text-gray-700">
            Last rented: {license.rentedAt}
          </p>
        )}
      </div>
    </li>
  )
}
