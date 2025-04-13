import React from 'react'
import {formBtnProps } from '../utils/interface'
import Image from 'next/image'
import LoadingSpinner from './LoadingSpinner'

const FormBtn: React.FC<formBtnProps> = ({
    btnStyling,
    btnlabel,
    icon,
    iconStyle,
    btnName,
    isDisabled,
    id,
    isLoading
}) => {
  return (
    <div id={id}>
      <button type='submit' name={btnName} className={`w-full rounded-[15px] flex justify-center items-center gap-5  ${btnStyling}`} disabled={isDisabled}>
        {isLoading ? (
          <div className='w-full flex justify-center items-center'>
            <LoadingSpinner/>
          </div>
        ) : (
          icon ? (
            <div className='flex gap-2'>
              <span className='flex object-cover'>
                <Image src={icon} className={`${iconStyle}`} alt='side-icon'/>
              </span>
              <p>{btnlabel}</p>
            </div>
          ):(
            <>
              <p>{btnlabel}</p>
            </>
          )
        )}
      </button>
    </div>
  )
}

export default FormBtn