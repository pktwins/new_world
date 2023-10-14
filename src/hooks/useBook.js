import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";

export default (id) => {
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const state = useContext(UserContext)

  const loadBook = async () => {
    try {
      const result = await axios.get(
        `http://192.168.1.3:8000/api/v1/books/${id}`
      );
      setBook(result.data.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteBook = (id) => {
    return axios.delete(
      `http://192.168.1.3:8000/api/v1/books/${id}`,
      {
        headers:{
          Authorization:"Bearer "+ state.token
        }
      }
    );
  };

  useEffect(() => {
    loadBook();
  }, []);

  return [book, error, deleteBook];
};
