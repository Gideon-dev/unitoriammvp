"use client";
import MessageBox from '@/app/components/ErrorAndSuccessMsg'
import FormBtn from '@/app/components/FormBtn'
import InputField from '@/app/components/InputField'
import Image from 'next/image'
import Link from 'next/link'
import Logo from "../../../public/logo.svg"
import googleLogo from "../../../public/google-icon.svg"
import { useRouter } from "next/navigation"
import { FormEvent, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';

const RegisterPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  // const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [Data, setData] = useState({
    full_name: "",
    email: "",
    password:"",
    password2: ""
  });
  const [password, setPassword] = useState("");
  const passwordRules = {
    minLength: {
      test: (password: string) => password.length >= 8,
      label: "Minimum of 8 characters",
    },
    lowercase: {
      test: (password: string) => /[a-z]/.test(password),
      label: "Include one lowercase letter",
    },
    uppercase: {
      test: (password: string) => /[A-Z]/.test(password),
      label: "Include one uppercase letter",
    },
    digit: {
      test: (password: string) => /\d/.test(password),
      label: "Include one number",
    },
    specialChar: {
      test: (password: string) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
      label: "Include one special character",
    },
  };
  const [validations, setValidations] = useState({
    minLength: false,
    lowercase: false,
    uppercase: false,
    digit: false,
    specialChar: false,
  });

  // Validate the password every time it changes
  useEffect(() => {
    setValidations({
      minLength: passwordRules.minLength.test(password),
      lowercase: passwordRules.lowercase.test(password),
      uppercase: passwordRules.uppercase.test(password),
      digit: passwordRules.digit.test(password),
      specialChar: passwordRules.specialChar.test(password),
    });
  }, [password]);

  // To Check if all conditions are met
  const isValidPassword = Object.values(validations).every((v) => v);

  // const [isLoading, setisLoading] = useState<boolean>(false);

  const satisfiedRulesCount = Object.values(validations).filter(Boolean).length;
  const loaderWidth = `${satisfiedRulesCount * 20}%`; 


   useEffect(() => {
      if (status === "authenticated") {
        router.push("/auth/dashboard"); // Redirect if already logged in
      }
    }, [status, router]);

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
        if (userInfo.email && Array.isArray(userInfo.email)) {
          setErrorMessage(userInfo.email[0]); // "user with this email already exists."
        } else {
          setErrorMessage(userInfo.error || "Registration failed. Please try again.");
        }
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
      <section id="main-box" className="text-center rounded-[10px] h-auto w-full mx-auto">
        <div>
          <div className="flex w-full">
            <div className="w-1/2 rounded-tl-[10px] sign-in entry-select" role="button" onClick={()=> router.push("/auth/signIn")}> Sign in </div>
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
                handleChange={(e)=> {setData({...Data, password: e.target.value}); setPassword(e.target.value)}}
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
              <div className="w-full h-2 flex mt-2">
                <div id="p-loader" className="relative bg-green-500 h-full rounded-r-md rounded-l-md transition-all duration-300" style={{width: loaderWidth}}></div>
              </div>
              <div className="w-full flex justify-end mt-2 h-auto">
                <Link 
                href="/forgotPassword"
                className="forgot-password-link"
                >
                  forgot password
                </Link>
              </div>
              <div className="sora">
                  <ul className="mb-4 space-y-2">
                    {Object.entries(passwordRules).map(([key, rule]) => (
                      <div key={key} className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            validations[key as keyof typeof validations] 
                              ? "bg-[#46D126]"  // Green when satisfied
                              : "bg-[#ADE1A0]"    // Gray when not satisfied
                          }`}
                        />
                        <li
                          className={`text-[10px]/[12.6px] font-normal ${
                            validations[key as keyof typeof validations] 
                              ? "text-green-600"  // Green text when satisfied
                              : "text-[#9EAD9A]"    // Gray text otherwise
                          }`}
                        >
                          {rule.label} 
                        </li>
                      </div>
                    ))}
                  </ul>
              </div>
              <div className="flex flex-col gap-5 mt-[45px]">
                <FormBtn 
                isDisabled={!isValidPassword}
                btnlabel='Sign Up' 
                btnStyling='p-3 sign-in-btn'
                btnName='credentials'
                isLoading={loading}
                />
                <FormBtn
                btnlabel='Sign Up with Google' 
                btnStyling='google-sign-in-btn p-3'
                btnName='google'
                icon={googleLogo}
                isLoading={loading}
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