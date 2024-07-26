import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/Cart.css';  // Importation du fichier CSS pour les styles

const Cart = () => {
  const [products, setProducts] = useState([]);
  
  // Effectuer la demande d'obtention des produits du panier lorsque le composant se monte
  useEffect(() => {
    const userId = localStorage.getItem('id'); // Assurez-vous que l'utilisateur est connecté
    if (!userId) {
      console.error('User ID is missing. Cannot fetch cart.');
      return;
    }

    axios.get(`/api/cart/${userId}`)
      .then(response => {
        // Convertir les prix en nombres, si nécessaire
        const updatedProducts = response.data.map(product => ({
          ...product,
          price: parseFloat(product.price)  // Assurez-vous que le prix est un nombre
        }));
        setProducts(updatedProducts);
      })
      .catch(error => console.error('Error fetching cart data:', error));
  }, []);

  const removeProduct = (id) => {
    // Suppression du produit du panier localement
    setProducts(products.filter(product => product.id !== id));

    // Suppression du produit du panier sur le serveur
    const userId = localStorage.getItem('id');
    axios.delete(`/api/cart/${userId}/product/${id}`)
      .catch(error => console.error('Error removing product:', error));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    // Mise à jour de la quantité du produit localement
    setProducts(products.map(product =>
      product.id === id ? { ...product, quantity: newQuantity } : product
    ));

    // Mise à jour de la quantité du produit sur le serveur
    const userId = localStorage.getItem('id');
    axios.put(`/api/cart/${userId}/product/${id}`, { quantity: newQuantity })
      .catch(error => console.error('Error updating product quantity:', error));
  };

  const totalPrice = products.reduce((total, product) => total + product.price * product.quantity, 0);

  return (
    <div className="cart">
      <h2>Mon Panier</h2>
      {products.length === 0 ? (
        <p>Votre panier est vide</p>
      ) : (
        <div>
          <ul>
            {products.map((product) => (
              <li key={product.id} className="cart-item">
                <img src={`/img/${product.image}`} alt={product.name} className="cart-item-image" />
                <span className="cart-item-name">{product.name}</span>
                <span className="cart-item-price">{product.price.toFixed(2)} €</span>
                <input
                  type="number"
                  value={product.quantity}
                  min="1"
                  onChange={(e) => updateQuantity(product.id, parseInt(e.target.value))}
                  className="cart-item-quantity"
                />
                <button onClick={() => removeProduct(product.id)} className="cart-item-remove">Supprimer</button>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <strong>Total: {totalPrice.toFixed(2)} €</strong>
          </div>
          <button className="cart-checkout" onClick={() => alert('Procéder au paiement')}>Passer la commande</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
