'use client'
import React, { useEffect, useState } from 'react'
import { Button, Card } from 'ui'
import LicenseItem from './LicenseItem'

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
        className="mb-5 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
      >
        Submit
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
