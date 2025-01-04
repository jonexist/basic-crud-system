import LoginForm from "@/components/auth/login-form"
import React from "react"

const Login = () => {
  return (
    <div className="min-h-screen w-full grid place-items-center bg-muted bg-gradient-to-r from-primary/20 to-fuchsia-900/20 backdrop-blur-sm">
      <LoginForm />
    </div>
  )
}

export default Login
