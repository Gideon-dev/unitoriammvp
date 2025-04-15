"use client";
import { useEffect, useState, useTransition } from "react";
import { IconProps } from "../utils/interface";
import { usePathname, useRouter } from "next/navigation";

 const DashboardBtns = () =>{
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const hiddenRoutes = [
    "/auth/signIn", 
    "/auth/register", 
    "/auth/signUp", 
    "/search",
    "/auth/checkout"
    ];
  const isHidden = hiddenRoutes.some((route) => pathname.startsWith(route));
     // Dynamically set active navigation based on pathname
  const getActivePage = () => {
    if (pathname.startsWith("/auth/library")) return "Library";
    if (pathname.startsWith("/auth/explore")) return "Explore";
    return "Home";
  };
  const [navigation, setNavigation] = useState(getActivePage());

  useEffect(() => {
    setNavigation(getActivePage());
  }, [pathname]);

  const handleNavigation = (page: string, path: string) => {
    setNavigation(page);
    startTransition(() => {
      router.push(path);
    });
  };

  const BtnStyles = "w-[25px] aspect-square ";
  const containerStyles = "flex flex-col items-center gap-3";
  const textSyles ="font-normal text-xs leading-[15.12px] tracking-[0.01em]";
  const selectedIcon = "#DB0D0D";
  return(
    <>
      {!isHidden && (
        <section className="rounded-[56.59px] w-full border border-[#534949] py-4 bg-[#131313]">
          <div className="flex justify-around w-full sora">
            <div className={containerStyles} onClick={() => {handleNavigation("Home", "/dashboard")}}>
              <HomeIcon fillProperty={navigation === "Home" ? selectedIcon : "#eceef3"} styles={BtnStyles}/>
              <p className={textSyles} style={navigation === "Home"? {color: "#DB0D0D"}: {color: "white"}}>Home</p>
            </div>
            <div className={containerStyles} onClick={() => handleNavigation("Library", "/auth/library")}>
              <Library fillProperty={navigation === "Library" ? selectedIcon : "#eceef3"} styles={BtnStyles}/>
              <p className={textSyles} style={navigation === "Library"? {color: "#DB0D0D"}: {color: "white"}}>My Library</p>
            </div>
            <div className={containerStyles} onClick={() => handleNavigation("Explore", "/auth/explore")}>
              <ExploreIcon fillProperty={navigation === "Explore" ? selectedIcon : "#eceef3"} styles={BtnStyles}/>
            <p className={textSyles} style={navigation === "Explore"? {color: "#DB0D0D"}: {color: "white"}}> Explore</p>
            </div>
          </div>
          {isPending && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </section>
      )}
    </>
   
  )
}
export default DashboardBtns;

export const HomeIcon = (props: IconProps) => {
  return (
    <svg viewBox="0 0 24 24" fill={props.fillProperty} xmlns="http://www.w3.org/2000/svg" className={`${props.styles}`}>
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier"> 
        <path fillRule="evenodd" clipRule="evenodd" d="M2.5192 7.82274C2 8.77128 2 9.91549 2 12.2039V13.725C2 17.6258 2 19.5763 3.17157 20.7881C4.34315 22 6.22876 22 10 22H14C17.7712 22 19.6569 22 20.8284 20.7881C22 19.5763 22 17.6258 22 13.725V12.2039C22 9.91549 22 8.77128 21.4808 7.82274C20.9616 6.87421 20.0131 6.28551 18.116 5.10812L16.116 3.86687C14.1106 2.62229 13.1079 2 12 2C10.8921 2 9.88939 2.62229 7.88403 3.86687L5.88403 5.10813C3.98695 6.28551 3.0384 6.87421 2.5192 7.82274ZM11.25 18C11.25 18.4142 11.5858 18.75 12 18.75C12.4142 18.75 12.75 18.4142 12.75 18V15C12.75 14.5858 12.4142 14.25 12 14.25C11.5858 14.25 11.25 14.5858 11.25 15V18Z" >
        </path> 
      </g>
    </svg>
  )
}

export const Library = (props:IconProps)=> {
  return(
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={`${props.styles}`}>
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier"> 
        <path d="M4 8C4 5.17157 4 3.75736 4.87868 2.87868C5.75736 2 7.17157 2 10 2H14C16.8284 2 18.2426 2 19.1213 2.87868C20 3.75736 20 5.17157 20 8V16C20 18.8284 20 20.2426 19.1213 21.1213C18.2426 22 16.8284 22 14 22H10C7.17157 22 5.75736 22 4.87868 21.1213C4 20.2426 4 18.8284 4 16V8Z" stroke={props.fillProperty} strokeWidth="1.5"></path> 
      <path d="M19.8978 16H7.89778C6.96781 16 6.50282 16 6.12132 16.1022C5.08604 16.3796 4.2774 17.1883 4 18.2235" stroke={props.fillProperty} strokeWidth="1.5"></path> 
      <path d="M8 7H16" stroke={props.fillProperty} strokeWidth="1.5" strokeLinecap="round"></path> 
        <path d="M8 10.5H13" stroke={props.fillProperty} strokeWidth="1.5" strokeLinecap="round"></path> 
      </g>
    </svg>
  )
}

export const ExploreIcon = (props:IconProps)=>{
  return(
    <svg viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg" className={`${props.styles}`}>
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier"> <circle cx="12" cy="12" r="10" stroke={props.fillProperty} strokeWidth="1.5"></circle>
       <path d="M13.024 14.5601C10.7142 15.484 9.5593 15.946 8.89964 15.4977C8.74324 15.3914 8.60834 15.2565 8.50206 15.1001C8.0538 14.4405 8.51575 13.2856 9.43967 10.9758C9.63673 10.4831 9.73527 10.2368 9.90474 10.0435C9.94792 9.99429 9.99429 9.94792 10.0435 9.90474C10.2368 9.73527 10.4831 9.63673 10.9758 9.43966C13.2856 8.51575 14.4405 8.0538 15.1001 8.50206C15.2565 8.60834 15.3914 8.74324 15.4977 8.89964C15.946 9.5593 15.484 10.7142 14.5601 13.024C14.363 13.5166 14.2645 13.763 14.095 13.9562C14.0518 14.0055 14.0055 14.0518 13.9562 14.095C13.763 14.2645 13.5166 14.363 13.024 14.5601Z" stroke={props.fillProperty} strokeWidth="1.5"></path> 
      </g>
    </svg>
  )
}

