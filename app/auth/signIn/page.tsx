"use client";
import { signIn, useSession } from "next-auth/react";
import Image from 'next/image';
import unitoriaLogo from '../../../public/logo.svg';  
import googleLogo from '../../../public/google-icon.svg';
import Link from 'next/link';
import { FormEvent, useEffect, useState } from "react";
import InputField from "@/app/components/InputField";
import FormBtn from "@/app/components/FormBtn";
import MessageBox from "@/app/components/ErrorAndSuccessMsg";
import { useRouter } from "next/navigation";

const SignInPage: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [ErrorMessage, setErrorMessage] = useState<string|null>("");
  // const [password, setPassword] = useState("");
  // const passwordRules = {
  //   minLength: {
  //     test: (password: string) => password.length >= 8,
  //     label: "Minimum of 8 characters",
  //   },
  //   lowercase: {
  //     test: (password: string) => /[a-z]/.test(password),
  //     label: "Include one lowercase letter",
  //   },
  //   uppercase: {
  //     test: (password: string) => /[A-Z]/.test(password),
  //     label: "Include one uppercase letter",
  //   },
  //   digit: {
  //     test: (password: string) => /\d/.test(password),
  //     label: "Include one number",
  //   },
  //   specialChar: {
  //     test: (password: string) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
  //     label: "Include one special character",
  //   },
  // };
  // const [validations, setValidations] = useState({
  //   minLength: false,
  //   lowercase: false,
  //   uppercase: false,
  //   digit: false,
  //   specialChar: false,
  // });

  // // Validate the password every time it changes
  // useEffect(() => {
  //   setValidations({
  //     minLength: passwordRules.minLength.test(password),
  //     lowercase: passwordRules.lowercase.test(password),
  //     uppercase: passwordRules.uppercase.test(password),
  //     digit: passwordRules.digit.test(password),
  //     specialChar: passwordRules.specialChar.test(password),
  //   });
  // }, [password]);

  // // To Check if all conditions are met
  // const isValidPassword = Object.values(validations).every((v) => v);

  const [isLoading, setisLoading] = useState<boolean>(false);

  // const satisfiedRulesCount = Object.values(validations).filter(Boolean).length;
  // const loaderWidth = `${satisfiedRulesCount * 20}%`; 
  
  // useEffect(() => {
  //   if (session) {
  //     router.push("/auth/dashboard"); // Redirect logged-in users
  //   }
  // }, [session, router]);
  
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/auth/dashboard"); // Redirect if already logged in
    }
  }, [status, router]);
 
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setisLoading((previsLoading) => !previsLoading);
   
    const updatedData = {
      email: (event.target as HTMLFormElement).email.value,
      password: (event.target as HTMLFormElement).password.value,
    };

    const clickedBtn = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;
    //  console.log(password)
    
    const clickedBtnType = clickedBtn?.name

    try {
      if (clickedBtnType === "google") {
        // Handles Google sign-in
        const result = await signIn("google", { redirect: false });
        if (!result || !result.ok) {
          throw new Error("Google sign-in failed. Please try again.");
        }
      } else {
        // Handles regular credentials sign-in
        const result = await signIn("credentials", 
        {
          redirect: false, 
          callbackUrl: "/auth/signIn",
          email: updatedData.email,
          password: updatedData.password,
        });

          console.log("Sign-in response:", result);
        if (result?.ok) {
          setErrorMessage(null);
          router.push("/auth/dashboard");
        } else {
          setErrorMessage("Invalid email or password,new? try creating an account.");
        }
      }
      
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Invalid credentials:", error.message);
        setErrorMessage(error.message || "An error occurred while signing in.");
      } else {
        console.error("An unexpected error occurred.");
        setErrorMessage("An unexpected error occurred.");
      }
    } finally{
      setisLoading((previsLoading) => !previsLoading);
    }

   
  };

  
  
  return (
    <section className='w-full h-screen flex flex-col items-center'>  
      <div className='w-[60%] h-auto mx-auto my-5' >
        <Image
          src={unitoriaLogo}
          alt="logo"
          priority
        />
      </div>
      <section id="main-box" className="text-center rounded-[10px] h-auto w-full">
        <div>
          <div className="flex w-full">
            <div className="w-1/2 rounded-tl-[10px] sign-in" role="button" onClick={() => router.back() }> Sign in </div>
            <div className="w-1/2 rounded-tr-[10px] create-account entry-select" role="button" onClick={() => router.push("/auth/register")}> Create an account </div>
          </div>
          <div className="w-full p-5">
            {ErrorMessage && <MessageBox message={ErrorMessage} type="error"/>}
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-[30px]">
                <InputField
                id='email'
                label='Email address'
                type='text'
                parentClass='mt-3'
                />
                <InputField
                id='password'
                label='Password'
                type='password' 
                // handleChange={(e)=> setPassword(e.target.value)}
                />
              </div>
              {/* <div className="w-full h-2 flex mt-2">
                <div id="p-loader" className="relative bg-green-500 h-full rounded-r-md rounded-l-md transition-all duration-300" style={{width: loaderWidth}}></div>
              </div> */}
              <div className="w-full flex justify-end mt-2">
                <Link 
                href="/forgotPassword"
                className="forgot-password-link"
                >
                  forgot password
                </Link>
              </div>
              <div className="flex flex-col gap-5 mt-[45px]">
                <FormBtn 
                btnlabel={isLoading ? 'Signing in...' : 'Sign in'} 
                btnStyling='sign-in-btn p-3'
                btnName='credentials'
                isDisabled={isLoading}
                />
                <FormBtn
                btnlabel='Sign in with Google' 
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

export default SignInPage;