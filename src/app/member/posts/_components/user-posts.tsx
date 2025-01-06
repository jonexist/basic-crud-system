"use client"

import CardSkeleton from "@/components/core/card-skeleton"
import EmptyState from "@/components/core/empty-state"
import CreatePostDialog from "@/components/post/create-post-dialog"
import PostCard from "@/components/post/post-card"
import { getPostsByUserId } from "@/utils/post"
import { User } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"

const UserPosts = ({ currentUser }: { currentUser: User | null }) => {
  const {
    data: posts,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPostsByUserId(currentUser?.id || ""),
  })

  return (
    <main className="flex flex-col items-center p-16">
      <div className="mb-8">
        <CreatePostDialog userId={currentUser?.id || ""} refetch={refetch} />
      </div>
      <div className="space-y-8">
        {isLoading ? (
          <>
            {Array.from({ length: 4 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </>
        ) : posts && posts.length > 0 ? (
          <>
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                currentUser={currentUser}
                refetch={refetch}
              />
            ))}
          </>
        ) : (
          <EmptyState
            title={`No posts yet, ${currentUser?.firstName}`}
            description="Start sharing your thoughts by creating a new post."
          />
        )}
      </div>
    </main>
  )
}

export default UserPosts
