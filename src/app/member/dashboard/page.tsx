import React from "react"
import { auth } from "../../../../auth"
import AllPosts from "./_components/all-posts"

const Dashboard = async () => {
  const user = await auth()
  return <>{user && <AllPosts currentUser={user} />}</>
}

export default Dashboard
