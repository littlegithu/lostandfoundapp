import React, { useState } from 'react';

// --- Fixed image compression (returns Promise) ---
const compressImage = (file, maxWidth = 800, quality = 0.7) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        // Directly get compressed Base64 – no extra FileReader
        const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedBase64);
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
};
// --- End of compression helper ---

const ItemForm = ({ initialData, onSubmit, buttonText, isLoading }) => {
  const [item, setItem] = useState(initialData || { name: '', location: '', status: 'Lost', description: '', photo: null });
  const [photoPreview, setPhotoPreview] = useState(initialData?.photo || null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem(prev => ({ ...prev, [name]: value }));
  };

  // --- Updated handlePhotoChange using async/await ---
  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const compressedBase64 = await compressImage(file, 800, 0.7);
        setItem(prev => ({ ...prev, photo: compressedBase64 }));
        setPhotoPreview(compressedBase64);
      } catch (error) {
        console.error('Image compression failed:', error);
      }
    } else {
      setItem(prev => ({ ...prev, photo: null }));
      setPhotoPreview(null);
    }
  };
  // --- End of update ---

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!item.name.trim() || !item.location.trim()) return;
    onSubmit(item);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 space-y-5 border border-gray-100 dark:border-gray-700">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Photo</label>
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition cursor-pointer"
        />
        {photoPreview && (
          <img src={photoPreview} alt="Preview" className="mt-3 w-full h-40 object-cover rounded-lg border border-gray-300 dark:border-gray-600" />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Item Name *</label>
        <input
          type="text"
          name="name"
          value={item.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          placeholder="e.g., iPhone 14, Student ID"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location *</label>
        <input
          type="text"
          name="location"
          value={item.location}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          placeholder="e.g., Library, Cafeteria"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
        <select
          name="status"
          value={item.status}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="Lost">Lost</option>
          <option value="Found">Found</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
        <textarea
          name="description"
          value={item.description}
          onChange={handleChange}
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          placeholder="Describe color, brand, features..."
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition disabled:opacity-50 font-medium"
      >
        {isLoading ? 'Processing...' : buttonText}
      </button>
    </form>
  );
};

export default ItemForm;