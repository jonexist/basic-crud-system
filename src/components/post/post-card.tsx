"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { updatelikes } from "@/lib/action"
import { PostType } from "@/types/types"
import { RefetchType } from "@/utils/schema"
import { User } from "@prisma/client"
import { format } from "date-fns"
import { Heart, MessageCircle } from "lucide-react"
import { useState } from "react"
import CommentForm from "./comment-form"

type PostCardProps = {
  post: PostType
  currentUser: User | null
  refetch: RefetchType
}

const PostCard = ({ post, currentUser, refetch }: PostCardProps) => {
  const [likes, setLikes] = useState(post.likes)
  const [isLiked, setIsLiked] = useState(false)

  const handleLike = async () => {
    const mode = isLiked ? "dislike" : "like"
    const postLikes = await updatelikes(post.id, mode)
    setIsLiked(!isLiked)
    setLikes(postLikes.likes)
  }

  return (
    <Card className="w-[26rem]">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${post.user.username}`}
            alt={post.user.username}
          />
          <AvatarFallback>{`${post.user.firstName.charAt(
            0
          )}${post.user.lastName.charAt(0)}`}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="text-sm font-semibold">{`${post.user.firstName} ${post.user.lastName}`}</p>
          <p className="text-xs text-muted-foreground">
            {format(post.createdAt, "MMMM d, yyyy 'at' h:mm a")}
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <h3 className="text-lg font-semibold">{post.title}</h3>
        <p className="text-sm text-muted-foreground">{post.message}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <form action={handleLike}>
          <Button
            type="submit"
            variant="ghost"
            size="sm"
            className={isLiked ? "text-red-500" : ""}
          >
            <Heart className="mr-2 h-4 w-4" />
            {likes}
          </Button>
        </form>
        <Button variant="ghost" size="sm">
          <MessageCircle className="mr-2 h-4 w-4" />
          {post.comments.length}
        </Button>
      </CardFooter>
      {post.comments.length > 0 && (
        <>
          <Separator />
          <CardContent>
            <h4 className="mb-4 text-sm font-semibold">Comments</h4>
            <ul className="space-y-4">
              {post.comments.map((comment) => (
                <li key={comment.id} className="flex items-start gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage
                      src={`https://api.dicebear.com/6.x/initials/svg?seed=${comment.user.username}`}
                      alt={comment.user.username}
                    />
                    <AvatarFallback>{`${comment.user.firstName.charAt(
                      0
                    )}${comment.user.lastName.charAt(0)}`}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="text-xs font-semibold">{`${comment.user.firstName} ${comment.user.lastName}`}</p>
                    <p className="text-xs">{comment.content}</p>
                    <p className="text-xs text-muted-foreground">
                      {format(comment.createdAt, "MMMM d, yyyy 'at' h:mm a")}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </>
      )}
      <Separator />
      <CardContent>
        {currentUser && (
          <CommentForm
            postId={post.id}
            userId={currentUser.id}
            refetch={refetch}
          />
        )}
      </CardContent>
    </Card>
  )
}

export default PostCard
