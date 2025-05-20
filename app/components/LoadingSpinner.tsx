import React from 'react'

type Props = {}

const LoadingSpinner = (props: Props) => {
  return (
    <div className="w-3 h-3 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
  )
}

export default LoadingSpinner