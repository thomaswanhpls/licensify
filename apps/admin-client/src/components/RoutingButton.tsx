'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from 'ui'

export default async function RoutingButton({
  children,
  href,
}: {
  children: React.ReactNode
  href: string
}) {
  const router = useRouter()

  function handleClick() {
    router.push(href)
  }

  return <Button onClick={handleClick}>{children}</Button>
}
