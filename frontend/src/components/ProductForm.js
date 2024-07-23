// src/components/ProductForm.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/ProductList.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductForm = () => {
    const [formData, setFormData] = useState({
        Name: '',
        description: '',
        price: '',
        image: '',
        categorie: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/products', formData)
            .then(response => {
                alert('Produit créé avec succès !');
                setFormData({
                    Name: '',
                    description: '',
                    price: '',
                    image: '',
                    categorie: ''
                });
            })
            .catch(error => console.error('Erreur lors de l\'envoi du produit :', error));
    };

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('/api/products')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleDelete = (productId) => {
        axios.delete(`/api/products/${productId}`)
          .then(response => {
            // Filtrer le produit supprimé de l'état
            setProducts(products.filter(product => product.id !== productId));
          })
          .catch(error => {
            console.error('Il y a eu une erreur lors de la suppression!', error);
          });
      };


    return (
        <div>
           <h1>Ajouter un Produit</h1>
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
        <button type="submit" className="submit-button">Ajouter</button>
      </form>


      <div className="container py-4">
      <h2 className="mb-4">Modifier/Supprimer un produit :</h2>
      <div className="row">
        {products.map(product => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card h-100">
              <img
                src={`/img/${product.image}`}
                className="card-img-top"
                alt={product.name}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{product.Name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text"><strong>Prix:</strong> {product.price} €</p>
                <Link to={`/gestion/${product.id}`} className="btn btn-primary">
                  Modifier
                </Link>
                <button 
                  className="btn btn-danger" 
                  onClick={() => handleDelete(product.id)}
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

        </div>

        
    );
};

export default ProductForm;
