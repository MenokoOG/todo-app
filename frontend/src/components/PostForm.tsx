import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface PostFormProps {
  onPostAdded: (post: any) => void; // Define the type of post according to what you expect to receive
}

const PostForm: React.FC<PostFormProps> = ({ onPostAdded }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    // Update input without refreshing
    setTitle(title);
    setDescription(description);
  }, [title, description]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newPost = { title, description };
      const response = await axios.post('/posts', newPost);
      onPostAdded(response.data);
      setTitle('');
      setDescription('');
      
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <div className="container">
      <h2>Add Stuff</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default PostForm;
