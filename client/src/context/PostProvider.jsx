import React, { useState } from 'react'
import { PostContext } from './PostContext'

const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([])

  const createPost = (post) => {
    // API call or logic to add post
    setPosts(prev => [...prev, post])
  }

  return (
    <PostContext.Provider value={{ posts, createPost }}>
      {children}
    </PostContext.Provider>
  )
}

export default PostProvider
