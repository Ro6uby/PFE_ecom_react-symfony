import React, { useState } from 'react';
import './css/Cart.css';  // Importation du fichier CSS pour les styles

const initialProducts = [
  { id: 1, name: 'Emballage Bee Wraps', price: 10.00, quantity: 1, image: '/img/beeswrap.jpg' },
  { id: 2, name: 'Essuie Tout Lavable', price: 20.00, quantity: 2, image: '/img/essuie_tout_lavable.jpg' },
  { id: 3, name: 'Savon Vaisselle Solide', price: 30.00, quantity: 1, image: '/img/savon_vaisselle.jpg' },
];

const Cart = () => {
  const [products, setProducts] = useState(initialProducts);

  const removeProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, quantity: newQuantity } : product
    ));
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
                <img src={product.image} alt={product.name} className="cart-item-image" />
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
