import { Metadata } from 'next'
import AddLicense from '../components/AddLicenseForm'
import RoutingButton from '../components/RoutingButton'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="mx-auto w-auto px-4 pb-8 pt-16 sm:pt-24 lg:px-8">
        <h1 className="mx-auto text-center text-6xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl xl:text-8xl">
          Licensify
          <span className="block bg-gradient-to-r from-brandred to-brandblue bg-clip-text px-2 text-transparent">
            Admin panel
          </span>
        </h1>
        <div className="mx-auto mt-5 flex max-w-xl justify-center space-x-4 md:mt-8">
          <RoutingButton href="/add-license">Add License</RoutingButton>
          <RoutingButton href="/licenses">List Licenses</RoutingButton>
        </div>
      </main>
    </div>
  )
}
