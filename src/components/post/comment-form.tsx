"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { createComment } from "@/utils/post"
import {
  CommentFormData,
  CreateCommentSchema,
  RefetchType,
} from "@/utils/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

type CommentFormType = {
  postId: string
  userId: string
  refetch: RefetchType
}

const CommentForm = ({ postId, userId, refetch }: CommentFormType) => {
  const { toast } = useToast()
  const form = useForm<CommentFormData>({
    resolver: zodResolver(CreateCommentSchema),
    defaultValues: {
      content: "",
    },
  })

  const createCommentMutation = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      toast({
        title: "Comment Created Successfully",
        description: "Your new comment has been created.",
      })
      form.reset()
      refetch()
    },
    onError: (error) => {
      toast({
        title: "Comment Creation Failed",
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while creating the comments. Please try again.",
        variant: "destructive",
      })
    },
  })

  const handleSubmit = (data: CommentFormData) => {
    createCommentMutation.mutate({ ...data, postId, userId })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="pt-4">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Write a comment..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={createCommentMutation.isPending}>
            {createCommentMutation.isPending
              ? "Posting comment..."
              : "Post comment"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default CommentForm
