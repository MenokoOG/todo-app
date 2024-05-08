// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import styles from './app.module.css';
import React, { useState } from 'react';
import './app.css';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import axios from 'axios';

interface Post {
  id: number;
  title: string;
  content: string;
}


export function App() {
  const [posts, setPosts] = useState<Post[]>([]);

  // Function to handle adding posts
  const handlePostAdded = (newPost: Post) => {
    setPosts([...posts, newPost]);
  };

  return (
    <div>
      <h1>Lawrence "Menoko OG-Original Geek" Jefferson</h1>
      <h2>Stuff App Built in Nx Dev, Nest.js, React with Typescript, and MongoDB</h2>
      {/* Pass handlePostAdded function as onPostAdded prop */}
      <PostForm onPostAdded={handlePostAdded} />
      {/* Render the list of posts */}
      <PostList />
    </div>
  );
}
export default App;
