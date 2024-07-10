// src/components/ProductForm.js

import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = () => {
    const [formData, setFormData] = useState({
        Name: '',
        description: '',
        price: '',
        image: ''
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
                    image: ''
                });
            })
            .catch(error => console.error('Erreur lors de l\'envoi du produit :', error));
    };

    return (
        <div>
            <h1>Ajouter un Produit</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nom:</label>
                    <input type="text" name="Name" value={formData.Name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Description:</label>
                    <input type="text" name="description" value={formData.description} onChange={handleChange} required />
                </div>
                <div>
                    <label>Prix:</label>
                    <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} required />
                </div>
                <div>
                    <label>Image URL:</label>
                    <input type="text" name="image" value={formData.image} onChange={handleChange} required />
                </div>
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
};

export default ProductForm;
