// src/App.js

import React from 'react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import ProductDetail from './components/ProductDetail';
import Connexion from './components/Connexion';
import GestionProd from './components/Admin/GestionProd';
import EditProductForm from './components/Admin/EditProductForm';
// import Cart from './components/Cart';
import NotFound from './components/NotFound';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Inscription from './components/Inscription';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Panier from './components/Panier';


const App = () => (
    <Router>

    <div className="App">
        <Navbar />
        {/* <ProductForm /> */}


         {/* <header className="App-header">
                <ProductList />
            </header> */}

                <Routes>
                    {/* <Route path="/" element={<Home />} /> */}
                    <Route path="/" element={<ProductList />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    <Route path="/connexion" element={<Connexion />} />
                    <Route path="/inscription" element={<Inscription />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/panier" element={<Panier />} />

                {/* PARTIE ADMIN */}
                    <Route
                    path="/gestion"
                    element={<ProtectedRoute element={ProductForm} requiredRole="ROLE_ADMIN" />}
                    />
                    <Route path="/gestion/:id" element={<ProtectedRoute element={EditProductForm} requiredRole="ROLE_ADMIN"  />}  />
                {/* END */}

                    <Route path="*" element={<NotFound />} />
                    {/* <Route path="/addd" element={<GestionProd />} /> */}
                     {/* <Route path="/cart" element={<Cart />} />  */}
                </Routes>

    </div>

    </Router>
);

export default App;