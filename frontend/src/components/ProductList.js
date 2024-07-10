
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/ProductList.css';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('/api/products')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);





    return (

        

        <div className="container py-4">

                            <img 
                                src={`/img/banner.PNG`} 
                                className="card-img-top" 
                                alt={'banner'}
                                style={{ height: '200px', objectFit: 'cover' }}
                            />
            
            <br/><br/>
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
                                <button 
                                    className="btn btn-primary">
                                    Ajouter au panier
                                </button>
                                <Link to={`/products/${product.Name}`} className="btn btn-primary">Voir détails</Link>
                            </div>
                        </div>
                        
                    </div>
                ))}
            </div>
            
        </div>
    );
};

export default ProductList;