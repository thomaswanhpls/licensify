import { LicensesProvider } from '../context/LicenceContext'
import '../styles/globals.css'
// include styles from the ui package
import 'ui/styles.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-zinc-900">
      <body>
        <LicensesProvider>{children}</LicensesProvider>
      </body>
    </html>
  )
}
