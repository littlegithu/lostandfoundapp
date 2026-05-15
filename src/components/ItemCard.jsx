import React from 'react';
import { useNavigate } from 'react-router-dom';

const ItemCard = ({ item, onDelete }) => {
  const navigate = useNavigate();
  const { id, name, location, status, description, date } = item;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition p-5">
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
        <button onClick={() => navigate(`/edit/${id}`)} className="text-blue-600 dark:text-blue-400 hover:text-blue-800 text-sm font-medium">Edit</button>
        <button onClick={() => onDelete(id)} className="text-red-500 dark:text-red-400 hover:text-red-700 text-sm font-medium">Delete</button>
      </div>
    </div>
  );
};

export default ItemCard;