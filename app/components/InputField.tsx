import React, { useState } from 'react'
import { genericInputProps } from '../utils/interface'
import EyeIcons from './EyeIcons'
import { sora } from '../utils/font'

const InputField: React.FC<genericInputProps> = ({
    id,
    parentClass,
    inputClass, 
    type, 
    placeholder,
    label,
    value,
    handleChange
}) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const toggleVisibility = () => {
        setIsVisible((prev) => !prev);
    };
  return (
    <div className={`relative w-full h-full flex flex-col ${parentClass} ${sora.className}`}>
        <label htmlFor={id} className='label-text'>
         {label}
        </label>
        <div className="relative">
            <input 
                className={`input-style ${inputClass}`} 
                type={isVisible ? "text" : type}
                placeholder={placeholder} 
                id={id} 
                name={id}
                value={value}
                onChange={handleChange}
            />
            <div className="absolute top-1/2 right-5 transform -translate-y-1/2 flex justify-center items-center">
                {type === 'password' ? (
                        <EyeIcons onToggle={toggleVisibility} isVisible={isVisible} /> 
                    ):
                    (<> </>) 
                }
            </div>
        </div>
  </div>
  )
}

export default InputField