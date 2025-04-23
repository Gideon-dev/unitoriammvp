import type { Metadata } from "next";
import "./globals.css";
import DashboardBtns from "./components/DashboardNavBtns";
import { ThemeProvider } from "./components/ThemeProvider";
import { ModeToggle } from "./components/DarkLightModeBtn";
import AuthProvider from "./components/SessionProvider";
import { Providers } from "./components/Providers";

export const metadata: Metadata = {
  title: "Unitoria",
  description: "Your Best Study Guide",
  icons: "/favicon.png"
};

export default  function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="sora"
      >
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <section className='flex flex-col w-full px-[25px] py-5 overflow-y-hidden h-screen'>
              <main className="overflow-x-hidden overflow-y-scroll pb-32 scrollbar-hide">
                <AuthProvider>
                  {children} 
                </AuthProvider>
              </main>
              <div className="fixed bottom-1 w-[85.5%] py-1 flex justify-center items-center">
                <DashboardBtns/>
              </div>
              <div className="absolute bottom-[5%] right-5">
                <ModeToggle />
              </div>
            </section> 
          </ThemeProvider>
        </Providers>
       
      </body>
    </html>
  );
}
