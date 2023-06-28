import { Metadata } from 'next'
import https from 'https'
import { License } from '../../context/LicenceContext'
import LicenseItem from '../../components/LicenseItem'

async function getLicenses(): Promise<License[]> {
  try {
    const response = await fetch('https://localhost:4000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        query: `
            query licenses {
                licenses {
                    id
                    number
                    rentedAt
                }
            }
            `,
      }),
      agent: new https.Agent({
        rejectUnauthorized: false,
      }),
    } as any)

    const { data } = await response.json()
    return data.licenses
  } catch (error) {
    console.log('error', error)
  }
}

export default async function Linceses() {
  const licenses = await getLicenses()
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="mx-auto w-auto px-4 pb-8 pt-16 sm:pt-24 lg:px-8">
        <h1 className="mx-auto bg-gradient-to-r from-brandred to-brandblue bg-clip-text px-2 text-center text-6xl font-extrabold tracking-tight text-transparent sm:text-7xl lg:text-8xl xl:text-8xl">
          Licenses
        </h1>
        <div className="mx-auto mt-5 flex max-w-xl justify-center space-x-4 md:mt-8">
          {licenses?.length && (
            <ul>
              {licenses.map((license) => (
                <LicenseItem key={license.id} license={license} />
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  )
}
