import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    brand: '',
    stock: '',
    rating: '',
  });
  const [image, setImage] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('name', form.name);
  formData.append('description', form.description);
  formData.append('price', form.price);
  formData.append('category', form.category);
  formData.append('brand', form.brand);
  formData.append('stock', form.stock);
  formData.append('rating', form.rating);

  if (image) {
    formData.append('image', image);
  }

  try {
    const res = await api.post('/product/add', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    alert("Add product Successfully")
    navigate('/')

    console.log('Product added:', res.data);
  } catch (error) {
    console.error('Error adding product:', error);
    if (error.response) {
      console.error('Server error:', error.response.data);
      alert(`Server error: ${error.response.data.message || 'Something went wrong.'}`);
    } else {
      alert('Unexpected error occurred.');
    }
  }
};


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-xl"
      >
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Add New Product
        </h1>

        {/* Input fields */}
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            onChange={handleChange}
            value={form.name}
            className="input outline-none border border-gray-300 p-2 rounded"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            onChange={handleChange}
            value={form.description}
            className="input outline-none border border-gray-300 p-2 rounded"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            value={form.price}
            className="input outline-none border border-gray-300 p-2 rounded"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            onChange={handleChange}
            value={form.category}
            className="input outline-none border border-gray-300 p-2 rounded"
          />
          <input
            type="text"
            name="brand"
            placeholder="Brand"
            onChange={handleChange}
            value={form.brand}
            className="input outline-none border border-gray-300 p-2 rounded"
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            onChange={handleChange}
            value={form.stock}
            className="input outline-none border border-gray-300 p-2 rounded"
          />
          <input
            type="number"
            step="0.1"
            name="rating"
            placeholder="Rating"
            onChange={handleChange}
            value={form.rating}
            className="input outline-none border border-gray-300 p-2 rounded "
          />
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="file-input file-input-bordered file-input-md w-full"
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
        >
          Submit Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
