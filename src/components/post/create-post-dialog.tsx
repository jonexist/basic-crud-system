"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { createPost } from "@/utils/post"
import { CreatePostSchema, PostFormData, RefetchType } from "@/utils/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, UseQueryResult } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"

type CreateDialogType = {
  userId: string
  refetch: RefetchType
}

const CreatePostDialog = ({ userId, refetch }: CreateDialogType) => {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  const form = useForm<PostFormData>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      title: "",
      message: "",
    },
  })

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      toast({
        title: "Post Created Successfully",
        description:
          "Your new post has been created and shared with your followers.",
      })
      form.reset()
      refetch()
      setOpen(false)
    },
    onError: (error) => {
      toast({
        title: "Post Creation Failed",
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while creating the post. Please try again.",
        variant: "destructive",
      })
    },
  })

  const onSubmit = (data: PostFormData) => {
    createPostMutation.mutate({
      ...data,
      userId,
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create New Post</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
          <DialogDescription>
            Create a new post to share with your followers.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter post title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your post message here"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={createPostMutation.isPending}>
                {createPostMutation.isPending
                  ? "Creating post..."
                  : "Create post"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CreatePostDialog
