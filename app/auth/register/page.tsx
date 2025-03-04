"use client";
import MessageBox from '@/app/components/ErrorAndSuccessMsg'
import FormBtn from '@/app/components/FormBtn'
import InputField from '@/app/components/InputField'
import Image from 'next/image'
import Link from 'next/link'
import Logo from "../../../public/logo.svg"
import googleLogo from "../../../public/google-icon.svg"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from 'react'

const RegisterPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  // const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [Data, setData] = useState({
    full_name: "",
    email: "",
    password:"",
    password2: ""
  });


  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true)
    // setBtnDisabled()
    // Prepare the data object
    const updatedData = {
      full_name: (event.target as HTMLFormElement).full_name.value,
      email: (event.target as HTMLFormElement).email.value,
      password: (event.target as HTMLFormElement).password.value,
      password2: (event.target as HTMLFormElement).password2.value,
    };
  
    // Reset error message
    setErrorMessage("");
  
    try {
      // Make the API call
      const response = await fetch("https://tutormeapi-6w2f.onrender.com/api/v2/user/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData), // Send the correct structure
      });
  
      const userInfo = await response.json();
  
      // Check if the registration was successful
      if (response.ok) {
        console.log("Registration successful:", userInfo);
        router.push("/auth/signIn");
      } else {
        console.error("Registration failed:", userInfo);
        setErrorMessage(userInfo.error || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setErrorMessage("An error occurred. Please try again.");
    }finally{
      setLoading((prev)=> !prev)
    }
  };
  


  return (
    <section className='w-full min-h-screen flex flex-col justify-center items-center '>
    <div className='w-[60%] h-full mx-auto my-[47.17px]'>
      <Image
        src={Logo}
        alt="logo"
        priority
      />
    </div>
    <section id="main-box" className="text-center rounded-[10px] h-auto w-[80%] mx-auto">
      <div>
        <div className="flex w-full">
          <div className="w-1/2 rounded-tl-[10px] sign-in entry-select"> Sign in </div>
          <div className="w-1/2 rounded-tr-[10px] create-account"> Create an account </div>
        </div>
        <div className="w-full p-5">
          {ErrorMessage && <MessageBox message={ErrorMessage} type="error"/>}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-[30px]">
              <InputField
              id='full_name'
              label='Full name'
              type='text'
              value={Data.full_name}
              handleChange={(e)=> {setData({...Data, full_name: e.target.value})}}
              parentClass='mt-3'
              />
              <InputField
              id='email'
              label='Email address'
              type='text'
              value={Data.email}
              handleChange={(e)=> {setData({...Data, email: e.target.value})}}
              parentClass='mt-3'
              />
              <InputField
              id='password'
              label='Password'
              value={Data.password}
              handleChange={(e)=> {setData({...Data, password: e.target.value})}}
              type='password'
              parentClass='mt-3'
              />
              <InputField
              id='password2'
              label='Confirm Password'
              type='password'
              value={Data.password2}
              handleChange={(e)=> {setData({...Data, password2: e.target.value})}}
              parentClass='mt-3'
              />
             
            </div>
            <div className="w-full flex justify-end mt-2 h-auto">
              <Link 
              href="/forgotPassword"
              className="forgot-password-link"
              >
                forgot password
              </Link>
            </div>
            <div className="flex flex-col gap-5 mt-[45px]">
              <FormBtn 
              isDisabled={loading}
              btnlabel='Sign Up' 
              btnStyling='p-3 sign-in-btn'
              btnName='credentials'
              />
              <FormBtn
              btnlabel='Sign Up with Google' 
              btnStyling='google-sign-in-btn p-3'
              btnName='google'
              icon={googleLogo}
              />
            </div>

          </form>
        </div>
      </div>
    </section>
  </section>
  )
}

export default RegisterPage