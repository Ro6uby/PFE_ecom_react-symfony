import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/ProductList.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        axios.get('/api/products')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleQuantityChange = (productId, value) => {
        setQuantities({
            ...quantities,
            [productId]: value
        });
    };

    const handleAddToCart = (productId) => {
        const quantity = quantities[productId] || 1; // Default to 1 if no quantity selected
        console.log(`Ajouter ${quantity} de produit ${productId} au panier`);
        // Vous pouvez ici ajouter le produit au panier avec la quantité sélectionnée
    };

    console.log(localStorage.getItem('userRoles'));

    return (
        <div className="container py-4">
            <img 
                src={`/img/banner.PNG`} 
                className="card-img-top" 
                alt={'banner'}
                style={{ height: '200px', objectFit: 'cover' }}
            />
            <br /><br />
            <h2 className="mb-4">Nos produits</h2>
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
                                <input
                                    type="number"
                                    min="1"
                                    className="form-control mb-2"
                                    placeholder="Quantité"
                                    value={quantities[product.id] || 1}
                                    onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                                />
                                <button 
                                    className="btn btn-primary"
                                    onClick={() => handleAddToCart(product.id)}
                                >
                                    Ajouter au panier
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
