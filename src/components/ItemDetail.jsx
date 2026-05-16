// ItemDetail.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ItemDetail = ({ items, onDelete }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = items.find(i => i.id === parseInt(id));

  if (!item) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 dark:text-gray-400">Item not found.</p>
        <button onClick={() => navigate('/')} className="mt-4 text-blue-600 underline">Go back</button>
      </div>
    );
  }

  const { name, location, status, description, date, photo } = item;

  const handleDelete = () => {
    onDelete(item.id);
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md my-8">
      {/* Large photo */}
      <div className="w-full h-80 mb-6 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
        {photo ? (
          <img src={photo} alt={name} className="w-full h-full object-contain" />
        ) : (
          <svg className="w-20 h-20 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        )}
      </div>

      {/* Status badge */}
      <div className="flex justify-between items-center mb-4">
        <span className={`text-sm font-bold px-3 py-1 rounded-full ${
          status === 'Lost' 
            ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
            : 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
        }`}>
          {status.toUpperCase()}
        </span>
        <span className="text-sm text-gray-500">{date ? new Date(date).toLocaleDateString() : 'Date not set'}</span>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">{name}</h1>

      <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span className="text-lg">{location}</span>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Description</h2>
        <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
          {description || "No description provided."}
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex gap-4 mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => navigate(`/edit/${item.id}`)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Edit Item
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Delete Item
        </button>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ItemDetail;