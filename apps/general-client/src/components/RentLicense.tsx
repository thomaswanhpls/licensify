'use client'
import React, { useEffect, useState } from 'react'
import { Button, LicenseItem } from 'ui'

const url = 'https://localhost:4000'

function useTimer(initialTime: number, startTimer: boolean) {
  const [timeLeft, setTimeLeft] = useState<number>(initialTime)

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null

    if (startTimer && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    }

    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [startTimer, timeLeft])

  return { timeLeft, setTimeLeft }
}

export default function RentLicense() {
  const [rentedLicense, setRentedLicense] = useState<any>(null)
  const { timeLeft, setTimeLeft } = useTimer(15, !!rentedLicense)
  async function handleClick() {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        query: `
            mutation rentLicense {
            rentLicense {
                id
                number
                rentedAt
            }
            }
            
        `,
      }),
    })

    const { data } = await response.json()

    setRentedLicense(data.rentLicense)
    setTimeLeft(15)
  }

  useEffect(() => {
    if (timeLeft === 0) {
      setRentedLicense(null)
    }
  }, [timeLeft])

  return (
    <div>
      {rentedLicense && (
        <>
          <p className="text-gray-500 dark:text-gray-400">
            License expires in{' '}
            <span className="font-semibold text-gray-900 underline decoration-indigo-500 dark:text-white">
              {timeLeft} seconds
            </span>
          </p>

          <ul>
            <LicenseItem license={rentedLicense} />
          </ul>
        </>
      )}
      {!rentedLicense && <Button onClick={handleClick}>Rent License</Button>}
    </div>
  )
}
