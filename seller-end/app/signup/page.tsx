import Link from "next/link"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col md:flex-row">
        <div className="flex flex-1 flex-col items-center justify-center p-6">
          <Logo />
        </div>
        <div className="flex flex-1 flex-col items-center justify-center p-6">
          <div className="mx-auto w-full max-w-md space-y-6">
            <div className="space-y-2 text-center">
              <div className="flex justify-center">
                <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0H36L48 12V36L36 48H12L0 36V12L12 0Z" fill="#0088CC" />
                  <path d="M24 12L12 24L18 30L30 18L36 24V12L24 12Z" fill="white" />
                  <path d="M36 24L24 36L18 30L30 18L24 12L36 12V24Z" fill="white" />
                  <path d="M12 24L24 12L30 18L18 30L24 36L12 36V24Z" fill="white" />
                  <path d="M24 36L36 24L30 18L18 30L12 24V36H24Z" fill="white" />
                  <path d="M12 12L36 36M36 12L12 36" stroke="#00CC88" strokeWidth="6" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold">Create an account</h1>
              <p className="text-gray-500">Start your 30-day free trial.</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Name*
                </label>
                <Input id="name" placeholder="Enter your name" required />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Email*
                </label>
                <Input id="email" placeholder="Enter your email" type="email" required />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Password*
                </label>
                <Input id="password" placeholder="Create a password" type="password" required />
                <p className="text-xs text-gray-500">Must be at least 8 characters.</p>
              </div>
              <Button className="w-full bg-[#1a73e8] hover:bg-[#1a73e8]/90">Get started</Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Or</span>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                  <path
                    fill="#FFC107"
                    d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                  />
                  <path
                    fill="#FF3D00"
                    d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                  />
                </svg>
                Sign up with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline text-[#0088CC]">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

