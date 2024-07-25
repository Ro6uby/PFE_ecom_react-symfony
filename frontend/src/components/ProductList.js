import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importez useNavigate
import axios from 'axios';
import './css/ProductList.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [quantities, setQuantities] = useState({});
    const navigate = useNavigate(); // Créez une instance de useNavigate

    useEffect(() => {
        // Charger les produits
        axios.get('/api/products')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));

        // Vérifiez si l'utilisateur est connecté
        const userId = localStorage.getItem('id');
        if (!userId) {
            console.error('User ID is missing in localStorage.');
        }
    }, []);

    const handleQuantityChange = (productId, value) => {
        setQuantities({
            ...quantities,
            [productId]: value
        });
    };

    const handleAddToCart = (productId) => {
        const quantity = parseInt(quantities[productId], 10) || 1; // Convertir en entier
        const userId = localStorage.getItem('id'); // Assurez-vous que l'ID utilisateur est dans localStorage

        if (!userId) {
            console.error('User ID is missing. Cannot add to cart.');
            navigate('/connexion'); // Redirigez vers la page de connexion si l'ID utilisateur est manquant
            return;
        }

        axios.post('/api/cart', {
            idProduit: productId,
            quantite: quantity,
            idUser: userId
        })
        .then(response => {
            console.log('Produit ajouté au panier', response.data);
            // Optionnel : Vous pouvez effacer la quantité après l'ajout réussi
            setQuantities({
                ...quantities,
                [productId]: ''
            });
        })
        .catch(error => console.error('Erreur lors de l\'ajout au panier:', error));
    };

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
