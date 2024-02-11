import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from '../components/BackButton';
import Spinner from "../components/Spinner";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

  }, []);

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-4">
            <div className="my-2">
              <span className="text-lg font-semibold text-gray-800">Id:</span>
              <span className="ml-2">{book._id}</span>
            </div>
            <div className="my-2">
              <span className="text-lg font-semibold text-gray-800">Title:</span>
              <span className="ml-2">{book.title}</span>
            </div>
            <div className="my-2">
              <span className="text-lg font-semibold text-gray-800">Author:</span>
              <span className="ml-2">{book.author}</span>
            </div>
            <div className="my-2">
              <span className="text-lg font-semibold text-gray-800">Publish Year:</span>
              <span className="ml-2">{book.publishYear}</span>
            </div>
            <div className="my-2">
              <span className="text-lg font-semibold text-gray-800">Create Time:</span>
              <span className="ml-2">{new Date(book.createdAt).toString()}</span>
            </div>
            <div className="my-2">
              <span className="text-lg font-semibold text-gray-800">Last Update Time:</span>
              <span className="ml-2">{new Date(book.updatedAt).toString()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
