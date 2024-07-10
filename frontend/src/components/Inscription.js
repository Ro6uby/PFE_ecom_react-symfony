import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Inscription.css';  // Assuming you have styles in Register.css

const Inscription = () => {
    // Inclure `username` dans l'état initial de `formData`
    const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Gérer le changement pour tous les champs, y compris `username`
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            return;
        }
        // Envoyer `formData` qui inclut `username`
        axios.post('/api/register', formData)
            .then(response => {
                alert('Inscription réussie !');
                navigate('/connexion'); // Redirect to login on success
                setFormData({
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                });
            })
            .catch(error => {
                setError('Erreur lors de l\'inscription');
            });
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card mt-5">
                        <div className="card-body">
                            <h2 className="text-center mb-4">S'inscrire</h2>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={handleSubmit}>
                                {/* Champ pour le Nom d'utilisateur */}
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Nom d'utilisateur</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Mot de passe</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">Confirmer le mot de passe</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">S'inscrire</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Inscription;
