import { License } from '../context/LicenceContext'

interface LicenseItemProps {
  license: License
}

export default function LicenseItem({ license }: LicenseItemProps) {
  return (
    <li className="mb-2 max-w-sm overflow-hidden rounded bg-white shadow-lg">
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
