import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addItem } from '../services/api';
import ItemForm from '../components/ItemForm';

const AddItem = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (itemData) => {
    try {
      setLoading(true);
      await addItem({ ...itemData, date: new Date().toISOString() });
      navigate('/');
    } catch (error) {
      alert('Failed to add.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Report Lost or Found Item</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6">Help the campus community by reporting items</p>
      <ItemForm onSubmit={handleSubmit} buttonText="Submit Report" isLoading={loading} />
    </div>
  );
};

export default AddItem;