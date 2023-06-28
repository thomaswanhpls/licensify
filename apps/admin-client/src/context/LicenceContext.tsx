'use client'
import { createContext, useContext, useState } from 'react'

export type License = {
  id: string
  number: string
  rentedAt: string
  available: boolean
  owner: string
}

interface LicensesContextValue {
  licenses: License[]
  setLicenses: (licenses: License[]) => void
}

const LicensesContext = createContext<LicensesContextValue>({
  licenses: [],
  setLicenses: () => {},
})

export const useLicenses = () => useContext(LicensesContext)

export const LicensesProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [licenses, setLicenses] = useState<License[]>([])

  return (
    <LicensesContext.Provider value={{ licenses, setLicenses }}>
      {children}
    </LicensesContext.Provider>
  )
}
