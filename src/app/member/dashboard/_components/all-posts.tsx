"use client"

import CreatePostDialog from "@/components/post/create-post-dialog"
import PostCard from "@/components/post/post-card"
import { getPosts } from "@/utils/post"
import { User } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"

const AllPosts = ({ currentUser }: { currentUser: User | null }) => {
  const {
    data: posts,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  })

  return (
    <main className="flex flex-col items-center p-16">
      <div className="mb-8">
        <CreatePostDialog userId={currentUser?.id || ""} refetch={refetch} />
      </div>
      <div className="space-y-8">
        {isLoading ? (
          <div>Fetching posts...</div>
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
          <div>No post for today</div>
        )}
      </div>
    </main>
  )
}

export default AllPosts
