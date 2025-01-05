"use client"

import { authenticate } from "@/lib/action"
import { LoginFormData, loginSchema } from "@/utils/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import z from "zod"
import ErrorCard from "../core/error-card"
import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"

const LoginForm = () => {
  const [serverError, setServerError] = useState<string>("")

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const handleLogin = async (values: z.infer<typeof loginSchema>) => {
    const response = await authenticate(values)
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    response ? setServerError(response) : setServerError("")
  }

  const { errors, isSubmitting } = form.formState

  const email = form.watch("username")
  const password = form.watch("password")

  useEffect(() => {
    if (serverError) {
      setServerError("")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password])

  const getFullYear = () => new Date().getFullYear()

  return (
    <Card className="w-full sm:w-[27rem]">
      <CardHeader>
        <CardTitle className="text-center text-xl">
          Welcome to Postbook
        </CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)}>
            {serverError && (
              <ErrorCard className="mb-3">{serverError}</ErrorCard>
            )}
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isSubmitting}
                        type="text"
                        placeholder="Enter your username"
                      />
                    </FormControl>
                    {errors.username && (
                      <FormMessage>{errors.username.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isSubmitting}
                        type="password"
                        placeholder="Enter your password"
                      />
                    </FormControl>
                    {errors.password && (
                      <FormMessage>{errors.password.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </div>
            <Button className="mt-6 w-full" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="grid place-items-center">
        <CardDescription>
          {getFullYear()} &copy; All rights reserved
        </CardDescription>
      </CardFooter>
    </Card>
  )
}

export default LoginForm
