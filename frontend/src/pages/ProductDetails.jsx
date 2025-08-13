import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import defaultImage from '../assets/1.jpg';

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const naviagte = useNavigate()

  const fetchData = async () => {
    try {
      const response = await api.get(`/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProduct(response.data.product);
    } catch (err) {
      console.error("Error fetching product details:", err);
      alert(err.response?.data?.msg || "Couldn't fetch data");
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);


  const handleClick = async() =>{
      try {
        await api.delete(`/product/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      naviagte('/')

      } catch (error) {
        console.log("Not delete this product the reson is ",error.massage)
      }
  }

  // Show loader or message while data is loading
  if (!product) return <div className="p-6">Loading product details...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
      <img
        src={`${import.meta.env.VITE_BACKEND_URL}${product.image}` || defaultImage}
        alt={product.name}
        className="w-full max-h-96 rounded mb-4"
      />
      <p className="text-gray-700 mb-2">{product.description}</p>
      <p className="text-2xl font-semibold">Price: ₹{product.price}</p>
      <p>Stock: {product.stock}</p>
      <p>Category: {product.category}</p>
      <p>Brand: {product.brand}</p>
      <p>Rating: ⭐ {product.rating}</p>
      <button className='bg-red-500 rounded p-2 my-2' onClick={()=>handleClick(id)}>Delete Product </button>
    </div>
  );
};

export default ProductDetails;
