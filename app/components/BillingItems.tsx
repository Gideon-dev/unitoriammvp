import React from 'react'

type billingProps = {
  left: string,
  right: number | string |  undefined | null
}

const BillingItems = ({left, right}: billingProps) => {
  return (
    <div className='flex justify-between'>
      <p className='text-[10px]/[12.6px] font-normal sora text-[#99A097] text-left'>{left}</p>
      <p className='text-[10px]/[12.6px] font-normal sora text-white text-right'>{right}</p>
    </div>
  )
}

export default BillingItems