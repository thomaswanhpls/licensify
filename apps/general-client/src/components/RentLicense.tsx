'use client'
import React, { useEffect, useState } from 'react'
import { Button, Card } from 'ui'

const url = 'https://localhost:4000'

export default function RentLicense() {
  const [rentedLicense, setRentedLicense] = useState<any>(null)
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

    const data = await response.json()

    setRentedLicense(data.rentLicense)
  }

  return (
    <>
      {rentedLicense && <Card title={rentedLicense.number} cta="" href="" />}
      <Button onClick={handleClick}>Rent License</Button>
    </>
  )
}
