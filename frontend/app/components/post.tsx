import React, { useState } from "react";
import axiosInstance from "../axiosInstance";
import "./../css/theme.css";

type Author = {
  name: string;
  email: string;
};

interface PostProps {
  id: number;
  title: string;
  author: Author;
  content: string;
  reRenderNotes: Function;
}

const Post: React.FC<PostProps> = ({
  id,
  title,
  author,
  content,
  reRenderNotes,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState({
    title,
    author,
    content,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("author.")) {
      const authorKey = name.split(".")[1] as keyof Author;
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
    axiosInstance
      .put(`/notes/${id}`, editedNote)
      .then((response) => {
        console.log(`Updated post with id: ${id}`);
        setIsEditing(false);
        reRenderNotes();
      })
      .catch((error) => {
        console.error("Error updating post:", error);
      });
  };

  const handleDelete = (id: number) => {
    axiosInstance
      .delete(`/notes/${id}`)
      .then((response) => {
        console.log(`Deleted post with id: ${id}`);
        reRenderNotes();
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };

  return (
    <div className="note">
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
            className={`text_input-${id}`}
            value={editedNote.content}
            onChange={handleChange}
            placeholder="Content"
            required
          ></textarea>
          <button className={`text_input_save-${id}`} onClick={handleEdit}>
            Save
          </button>
          <button
            className={`text_input_cancel-${id}`}
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <h2>{title}</h2>
          <p>By: {author.name}</p>
          <p>{content}</p>
          <button className={`edit-${id}`} onClick={() => setIsEditing(true)}>
            Edit
          </button>
          <button className={`delete-${id}`} onClick={() => handleDelete(id)}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Post;
