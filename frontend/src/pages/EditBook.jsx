import React, { useEffect, useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {toast} from "react-toastify"

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then((response) => {
        setLoading(false);
        toast.success(response.data.message)

        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loading && <Spinner />}
      <div className="flex flex-col border border-gray-300 rounded-lg max-w-md p-4 mx-auto">
        <div className="my-4">
          <label htmlFor="title" className="text-lg text-gray-800 font-semibold">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:border-sky-400"
          />
        </div>
        <div className="my-4">
          <label htmlFor="author" className="text-lg text-gray-800 font-semibold">
            Author
          </label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:border-sky-400"
          />
        </div>
        <div className="my-4">
          <label htmlFor="publishYear" className="text-lg text-gray-800 font-semibold">
            Publish Year
          </label>
          <input
            id="publishYear"
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:border-sky-400"
          />
        </div>
        <button
          className="p-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition duration-300"
          onClick={handleEditBook}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;
