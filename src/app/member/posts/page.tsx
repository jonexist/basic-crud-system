import React from "react"
import { auth } from "../../../../auth"
import UserPosts from "./_components/user-posts"

const Posts = async () => {
  const user = await auth()
  return (
    <>
      <UserPosts currentUser={user} />
    </>
  )
}

export default Posts
