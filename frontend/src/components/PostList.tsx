import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define the structure of a post item
interface Post {
  _id: string;
  title: string;
  description: string;
}

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editItemId, setEditItemId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState<string>('');
  const [editDescription, setEditDescription] = useState<string>('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/posts');
      // Check if the response data is indeed an array
      if (Array.isArray(response.data)) {
        setPosts(response.data);
      } else {
        // Log unexpected data structure
        console.error('Expected an array, but received:', response.data);
        setPosts([]); // Ensuring the state remains an array, preventing .map errors
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]); // Setting to empty array on error to maintain array type in state
    }
  };
  

  const handleDelete = async (itemId: string) => {
    try {
      await axios.delete(`/posts/${itemId}`);
      fetchPosts();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleEdit = (item: Post) => {
    setEditItemId(item._id);
    setEditTitle(item.title);
    setEditDescription(item.description);
  };

  const handleCancelEdit = () => {
    setEditItemId(null);
    setEditTitle('');
    setEditDescription('');
  };

  const handleSubmitEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const updatedItem = {
        title: editTitle,
        description: editDescription
      };
      await axios.put(`/posts/${editItemId}`, updatedItem);
      fetchPosts();
      handleCancelEdit();
    } catch (error) {
      console.error('Error editing item:', error);
    }
  };

  return (
    <div className="container">
      <h2>Stuff</h2>
      <div className="grid-container">
        {posts.map(item => (
          <div className="card" key={item._id}>
            {editItemId === item._id ? (
              <form className="edit-form" onSubmit={handleSubmitEdit}>
                <input type="text" placeholder="Title" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} required />
                <input type="text" placeholder="Description" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
                <button type="submit">Update</button>
                <button type="button" onClick={handleCancelEdit}>Cancel</button>
              </form>
            ) : (
              <>
                <h2>{item.title}</h2>
                <p>Description: {item.description}</p>
                <div>
                  <button onClick={() => handleEdit(item)}>Edit</button>
                  <button onClick={() => handleDelete(item._id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
