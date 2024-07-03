import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';

type Author = {
  name: string;
};

interface PostProps {
  id: number;
  title: string;
  author: Author;
  content: string;
}

const Post: React.FC<PostProps> = ({ id, title, author, content }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState({
    title,
    author,
    content,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('author.')) {
      const authorKey = name.split('.')[1] as keyof Author;
      setEditedNote((prevNote) => ({
        ...prevNote,
        author: {
          ...prevNote.author,
          [authorKey]: value,
        },
      }));
    } else {
      setEditedNote((prevNote) => ({
        ...prevNote,
        [name]: value,
      }));
    }
  };

  const handleEdit = () => {
    axiosInstance.put(`/notes/${id}`, editedNote)
      .then(response => {
        console.log(`Updated post with id: ${id}`);
        setIsEditing(false);
      })
      .catch(error => {
        console.error('Error updating post:', error);
      });
  };

  const handleDelete = (id: number) => {
    axiosInstance.delete(`/notes/${id}`)
      .then(response => {
        console.log(`Deleted post with id: ${id}`);
      })
      .catch(error => {
        console.error('Error deleting post:', error);
      });
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input
            type="text"
            name="title"
            value={editedNote.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />
          <input
            type="text"
            name="author.name"
            value={editedNote.author.name}
            onChange={handleChange}
            placeholder="Author Name"
            required
          />
          <textarea
            name="content"
            value={editedNote.content}
            onChange={handleChange}
            placeholder="Content"
            required
          ></textarea>
          <button onClick={handleEdit}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h2>{title}</h2>
          <p>By: {author.name}</p>
          <p>{content}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => handleDelete(id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Post;
