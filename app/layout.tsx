import type { Metadata } from "next";
import "./globals.css";
import DashboardBtns from "./components/DashboardNavBtns";
import { ThemeProvider } from "./components/ThemeProvider";
import { ModeToggle } from "./components/DarkLightModeBtn";
import AuthProvider from "./components/SessionProvider";


export const metadata: Metadata = {
  title: "Unitoria",
  description: "Your Best Study Guide",
  icons: "/favicon.png"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="sora"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          >
          <section className='flex flex-col gap-2 relative w-full px-[25px] py-2 overflow-y-hidden h-screen'>
            <main className=" min-h-[84%] max-h-[100%] overflow-x-hidden overflow-y-scroll py-8 scrollbar-hide">
              <AuthProvider>
                {children} 
              </AuthProvider>
            </main>
            <DashboardBtns/>
            <div className="absolute bottom-[5%] right-5">
              <ModeToggle />
            </div>
          </section> 
        </ThemeProvider>
      </body>
    </html>
  );
}
