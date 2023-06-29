'use client'
import React, { useState } from 'react'
import { LicenseItem } from 'ui'

const url = 'https://localhost:4000'

export default function AddLicenseForm() {
  const [alphanumericString, setAlphanumericString] = useState<string>('')
  const [rentedLicense, setRentedLicense] = useState<any>(null)
  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          query: `
        mutation AddLicense($number: String!) {
          addLicense(number: $number) {
            number
            rentedAt
            owner
          }
        }
            
        `,
          variables: {
            number: alphanumericString,
          },
        }),
      })

      const { data } = await response.json()

      setRentedLicense(data.addLicense)
    } catch (error) {
      console.log('error', error)
    }
  }

  function handleInputChange(event) {
    setAlphanumericString(event.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <label
          htmlFor="text"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Add alphanumeric string
        </label>
        <input
          type="text"
          id="license"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="ABC123"
          onChange={handleInputChange}
          required
        />
      </div>

      <button
        type="submit"
        className="group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-green-400 to-blue-600 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-green-200 group-hover:from-green-400 group-hover:to-blue-600 dark:text-white dark:focus:ring-green-800"
      >
        <span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
          Submit
        </span>
      </button>
      {rentedLicense && (
        <>
          <p className="mb-5 dark:text-white">License created!</p>
          <ul>
            <LicenseItem license={rentedLicense} />
          </ul>
        </>
      )}
    </form>
  )
}
