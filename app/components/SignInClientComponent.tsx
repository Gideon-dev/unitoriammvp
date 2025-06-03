"use client";
import { signIn, useSession } from "next-auth/react";
import Image from 'next/image';
import unitoriaLogo from '../../public/unitoria-fav-icon.svg';  
import googleLogo from '../../public/google-icon.svg';
import Link from 'next/link';
import { useEffect, useState } from "react";
import InputField from "@/app/components/InputField";
import FormBtn from "@/app/components/FormBtn";
import MessageBox from "@/app/components/ErrorAndSuccessMsg";
import { useRouter } from "next/navigation";
import { SignInFormData, signInSchema } from "@/app/lib/validations/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const SignInClientComponent = ({callbackUrl}:{callbackUrl: string}) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  const handleGoogleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent form submission
    try {
      setIsGoogleLoading(true);
      const result = await signIn("google", { 
        callbackUrl,
        redirect: false 
      });
      
      if (result?.error) {
        setErrorMessage("Google sign-in failed. Please try again.");
        return;
      }

      if (result?.url) {
        router.push(result.url);
      }
    } catch (error) {
      setErrorMessage("An error occurred during Google sign-in.");
      console.error("Google sign-in error:", error);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const onSubmit = async (data: SignInFormData) => {
    try {
      setIsLoading(true);
      setErrorMessage(null);

      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl,
      });

      if (result?.error) {
        setErrorMessage("Invalid email or password. New user? Try creating an account.");
        return;
      }

      if (result?.url) {
        router.push(result.url);
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className='w-full h-screen flex flex-col items-center'>
      <div className='w-[60%] h-auto mx-auto my-5 flex justify-center items-center'>
        <Image
          src={unitoriaLogo}
          alt="logo"
          width={100}
          height={150}
          priority
        />
      </div>
      <section id="main-box" className="text-center rounded-[10px] h-auto w-full">
        <div>
          <div className="flex w-full">
            <div className="w-1/2 rounded-tl-[10px] sign-in" role="button">
              Sign in
            </div>
            <div 
              className="w-1/2 rounded-tr-[10px] create-account entry-select" 
              role="button" 
              onClick={() => router.push("/auth/register")}
            >
              Create an account
            </div>
          </div>
          
          <div className="w-full p-5">
            {errorMessage && <MessageBox message={errorMessage} type="error" />}
            {Object.keys(errors).length > 0 && (
              <MessageBox 
                message={Object.values(errors)[0]?.message || "Please check your input"} 
                type="error" 
              />
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-col gap-[30px]">
                <InputField
                  id="email"
                  label="Email address"
                  type="email"
                  parentClass="mt-3"
                  error={errors.email?.message}
                  {...register("email")}
                />
                <InputField
                  id="password"
                  label="Password"
                  type="password"
                  error={errors.password?.message}
                  {...register("password")}
                />
              </div>

              <div className="w-full flex justify-end mt-2">
                <Link 
                  href="/auth/forgot-password"
                  className="forgot-password-link hover:text-red-500 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="flex flex-col gap-5 mt-[45px]">
                <FormBtn 
                  btnlabel={isLoading ? 'Signing in...' : 'Sign in'} 
                  btnStyling='sign-in-btn p-3'
                  btnName='credentials'
                  isDisabled={isLoading || isGoogleLoading}
                  isLoading={isLoading}
                  type="submit"
                />
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 text-gray-500 bg-white">Or continue with</span>
                  </div>
                </div>
                <FormBtn
                  btnlabel='Sign in with Google' 
                  btnStyling='google-sign-in-btn p-3'
                  btnName='google'
                  icon={googleLogo}
                  isLoading={isGoogleLoading}
                  isDisabled={isLoading || isGoogleLoading}
                  onClick={handleGoogleSignIn}
                  type="button"
                />
              </div>
            </form>
          </div>
        </div>
      </section>
    </section>
  );
};

export default SignInClientComponent;