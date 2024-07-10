import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios.get(`/api/products/${id}`)
            .then(response => setProduct(response.data))
            .catch(error => console.error('Error fetching product:', error));
    }, [id]);

    if (!product) return <p>Loading...</p>;

    return (
        <div className="container py-4">
            <h2>{product.name}</h2>
            <img src={`/img/${product.image}`} alt={product.name} style={{ width: '200px' }} />
            <p>{product.description}</p>
            <p>Prix: {product.price} €</p>
        </div>
    );
};

export default ProductDetail;