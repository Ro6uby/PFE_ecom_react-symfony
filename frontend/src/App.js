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
                    <Route path="/addd" element={<GestionProd />} />
                    <Route path="/gestion" element={<ProtectedRoute component={ProductForm} />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/edit/:id" element={<EditProductForm />}  />
                     {/* <Route path="/cart" element={<Cart />} />  */}
                    <Route path="*" element={<NotFound />} />
                </Routes>

    </div>

    </Router>
);

export default App;