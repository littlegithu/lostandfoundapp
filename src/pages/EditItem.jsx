import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getItemById, updateItem } from '../services/api';
import ItemForm from '../components/ItemForm';

const EditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [item, setItem] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getItemById(id);
        setItem(res.data);
      } catch (error) {
        setItem(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleSubmit = async (updatedData) => {
    try {
      setSubmitting(true);
      await updateItem(id, updatedData);
      navigate('/');
    } catch (error) {
      alert('Update failed.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!item) return <div className="p-8 text-center text-red-500">Item not found</div>;

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Edit Item</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6">Update the information below</p>
      <ItemForm initialData={item} onSubmit={handleSubmit} buttonText="Save Changes" isLoading={submitting} />
    </div>
  );
};

export default EditItem;