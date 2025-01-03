import { ThemeProvider } from "../components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/components/auth-provider";
import { Navigation } from "@/components/navigation";
import { ToastProvider } from "@/components/ui/use-toast"; // Ensure use-toast is correctly imported
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <ToastProvider>
              <div className="min-h-screen bg-background">
                <Navigation />
                <main className="container mx-auto py-8">{children}</main>
                <Toaster />
              </div>
            </ToastProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
