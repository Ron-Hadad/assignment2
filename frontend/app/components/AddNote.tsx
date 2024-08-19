import React, { useState, ChangeEvent, FormEvent } from "react";

type Note = {
  title?: string;
  author?: {
    name?: string;
  };
  content?: string;
};

interface AddNoteProps {
  handleAddNote: (note: Note) => void;
}

const AddNote: React.FC<AddNoteProps> = ({ handleAddNote }) => {
  const [note, setNote] = useState<Note>({
    title: "",
    author: { name: "" },
    content: "",
  });

  const [showForm, setShowForm] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name.startsWith("author.")) {
      const authorKey = name.split(".")[1] as keyof Note["author"];
      setNote((prevNote) => ({
        ...prevNote,
        author: {
          ...prevNote.author,
          [authorKey]: value,
        },
      }));
    } else {
      setNote((prevNote) => ({
        ...prevNote,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddNote(note);
    setNote({
      title: "",
      author: { name: "" },
      content: "",
    });
    setShowForm(false);
  };

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      {showForm ? (
        <button
          className="text_input_cancel_new_note"
          onClick={handleToggleForm}
        >
          cancel
        </button>
      ) : (
        <button className="add_new_note" onClick={handleToggleForm}>
          Add note
        </button>
      )}

      {showForm && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={note.title}
            onChange={handleChange}
            placeholder="Title"
          />
          <input
            type="text"
            name="author.name"
            value={note.author?.name}
            onChange={handleChange}
            placeholder="Author Name"
          />
          <textarea
            name="content"
            className="text_input_new_note"
            value={note.content}
            onChange={handleChange}
            placeholder="Content"
          ></textarea>
          <button className="text_input_save_new_note" type="submit">
            save
          </button>
        </form>
      )}
    </div>
  );
};

export default AddNote;
