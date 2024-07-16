import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Name: '',
    description: '',
    categorie: '',
    price: '',
    image: ''
  });

  useEffect(() => {
    axios.get(`/api/products/${id}`)
      .then(response => {
        setFormData(response.data);
      })
      .catch(error => {
        console.error('Il y a eu une erreur!', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/products/${id}`, formData)
      .then(response => {
        navigate('/');
      })
      .catch(error => {
        console.error('Il y a eu une erreur lors de la mise à jour!', error);
      });
  };

  return (
    <div className="form-container">
      <h1>Modifier le Produit</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nom:</label>
          <input type="text" name="Name" value={formData.Name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Categorie:</label>
          <input type="text" name="categorie" value={formData.categorie} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Prix:</label>
          <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Image URL:</label>
          <input type="text" name="image" value={formData.image} onChange={handleChange} required />
        </div>
        <button type="submit" className="submit-button">Modifier</button>
      </form>
    </div>
  );
};

export default EditProductForm;
