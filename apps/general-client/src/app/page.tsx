import { Metadata } from 'next'
import { Card, Toast } from 'ui'
import RentLicense from '../components/RentLicense'

const CARD_CONTENT = [
  {
    title: 'Are you an admin?',
    href: 'http://localhost:3001',
    cta: 'Go to the dashboard',
  },
]

export const metadata: Metadata = {
  title: 'Licensify App',
}

export default async function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="mx-auto w-auto px-4 pb-8 pt-16 sm:pt-24 lg:px-8">
        <h1 className="mx-auto text-center text-6xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl xl:text-8xl">
          Licensify
          <span className="block bg-gradient-to-r from-brandred to-brandblue bg-clip-text px-2 text-transparent">
            License Machine
          </span>
        </h1>
        <div className="mx-auto mt-5 max-w-xl sm:flex sm:justify-center md:mt-8">
          <RentLicense />
        </div>

        <div className="mt-12 grid grid-cols-1 place-content-evenly gap-4 sm:grid-cols-3">
          {CARD_CONTENT.map((card) => (
            <Card key={card.title} {...card} />
          ))}
        </div>
      </main>
    </div>
  )
}
