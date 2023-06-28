import * as React from 'react'

interface ButtonProps {
  children: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}
export const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <div className="rounded-md ">
      <button onClick={onClick}>
        <div className="ui-flex ui-w-full ui-items-center ui-justify-center ui-rounded-md ui-border ui-border-transparent ui-bg-white ui-px-8 ui-py-3 ui-text-base ui-font-medium ui-text-black ui-no-underline hover:ui-bg-gray-300 md:ui-px-10 md:ui-py-3 md:ui-text-lg md:ui-leading-6">
          {children}
          <span className="ui-ml-2 ui-bg-gradient-to-r ui-from-brandred ui-to-brandblue ui-bg-clip-text ui-text-transparent">
            →
          </span>
        </div>
      </button>
    </div>
  )
}
