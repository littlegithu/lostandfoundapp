// ItemCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ItemCard = ({ item, onDelete }) => {
  const navigate = useNavigate();
  const { id, name, location, status, description, date, photo } = item;

  const handleCardClick = () => {
    navigate(`/item/${id}`);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();  // prevent card click
    navigate(`/edit/${id}`);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();  // prevent card click
    onDelete(id);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition cursor-pointer p-5"
    >
      {/* Photo area (same as before) */}
      <div className="w-full h-40 mb-3 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
        {photo ? (
          <img src={photo} alt={name} className="w-full h-full object-cover" />
        ) : (
          <svg className="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        )}
      </div>

      {/* Status and date row */}
      <div className="flex justify-between items-start">
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${
          status === 'Lost' 
            ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
            : 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
        }`}>
          {status.toUpperCase()}
        </span>
        {date && <span className="text-xs text-gray-400 dark:text-gray-500">{new Date(date).toLocaleDateString()}</span>}
      </div>

      <h3 className="text-xl font-semibold mt-3 text-gray-900 dark:text-white">{name}</h3>
      <div className="flex items-center text-gray-600 dark:text-gray-400 mt-2">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span className="text-sm">{location}</span>
      </div>

      {description && <p className="text-gray-500 dark:text-gray-400 text-sm mt-3 line-clamp-2">{description}</p>}

      <div className="flex gap-3 mt-5 pt-3 border-t border-gray-100 dark:border-gray-700">
        <button onClick={handleEditClick} className="text-blue-600 dark:text-blue-400 hover:text-blue-800 text-sm font-medium">Edit</button>
        <button onClick={handleDeleteClick} className="text-red-500 dark:text-red-400 hover:text-red-700 text-sm font-medium">Delete</button>
      </div>
    </div>
  );
};

export default ItemCard;