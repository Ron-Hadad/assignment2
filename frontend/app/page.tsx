"use client";

import { useState, useEffect, useCallback } from "react";
import Post from "./components/post";
import Pagination from "./components/pagination";
import axiosInstance from "./axiosInstance";
import AddNote from "./components/AddNote";

export default function Home() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [numOfPages, setNumOfPages] = useState<number>(1);
  const [posts, setPosts] = useState<any[]>([]);
  const [theme, setTheme] = useState<boolean>(false);
  const postsPerPage = 10;

  const fetchPosts = async () => {
    console.log("Fetching posts for page:", currentPage);
    try {
      const response = await axiosInstance.get(`/notes/page/${currentPage}`);
      const data = response.data;
      console.log("Fetched posts data:", data);
      if (data && data.notes) {
        console.log("Fetching data for page:", data.notes);
        setNumOfPages(data.totalPages);
        setPosts(data.notes);
      } else {
        console.error("Invalid response structure:", data);
        setPosts([]);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [currentPage, postsPerPage]);

  const handleNavButtonClick = (type: string) => {
    switch (type) {
      case "First":
        setCurrentPage(1);
        break;
      case "Last":
        setCurrentPage(numOfPages);
        break;
      case "Next":
        setCurrentPage((prevPage) => Math.min(prevPage + 1, numOfPages));
        break;
      case "Prev":
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
        break;
      default:
        break;
    }
  };

  const handlePaginationButtonClick = (page: number) => {
    setCurrentPage(page);
  };

  const handleAddNote = async (note: any) => {
    try {
      const response = await axiosInstance.post(`/notes`, note);
      console.log("Note added successfully:", response.data);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const reRenderNotes = async () => {
    fetchPosts();
  };

  return (
    <main className={theme === false ? "light-theme" : "dark-theme"}>
      <button
        className="change_theme"
        onClick={() => {
          setTheme((prevTheme: boolean) =>
            prevTheme === false ? true : false
          );
        }}
      >
        Switch to {theme === false ? "dark" : "light"} theme
      </button>
      <div>
        <Pagination
          numOfPages={numOfPages}
          currentPage={currentPage}
          handleNavButtonClick={handleNavButtonClick}
          handlePaginationButtonClick={handlePaginationButtonClick}
        />
        <div>
          <AddNote handleAddNote={handleAddNote} />
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <Post
                key={post.id}
                {...post}
                className="note"
                reRenderNotes={reRenderNotes}
              />
            ))
          ) : (
            <p>No posts available</p>
          )}
        </div>
      </div>
    </main>
  );
}
