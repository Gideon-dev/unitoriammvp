import React from 'react'
import {formBtnProps } from '../utils/interface'
import Image from 'next/image'

const FormBtn: React.FC<formBtnProps> = ({
    btnStyling,
    btnlabel,
    icon,
    iconStyle,
    btnName,
    isDisabled,
    id
}) => {
  return (
    <div id={id}>
      <button type='submit' name={btnName} className={`w-full rounded-[15px] flex justify-center items-center gap-5  ${btnStyling}`} disabled={isDisabled}>
        {icon && (
          <span className='flex object-cover'>
            <Image src={icon} className={`${iconStyle}`} alt='side-icon'/>
          </span>
        )}
        <p>{btnlabel}</p>
      </button>
    </div>
  )
}

export default FormBtn