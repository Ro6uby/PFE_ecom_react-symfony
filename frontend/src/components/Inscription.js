import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Inscription.css';  // Assuming you have styles in Register.css

const Inscription = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

        if (!usernameRegex.test(formData.username)) {
            return "Le nom d'utilisateur doit comporter entre 3 et 20 caractères et ne contenir que des lettres et des chiffres.";
        }

        if (!formData.email.includes('@')) {
            return "L'email n'est pas valide.";
        }

        if (!passwordRegex.test(formData.password)) {
            return "Le mot de passe doit contenir au moins 8 caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial.";
        }

        if (formData.password !== formData.confirmPassword) {
            return 'Les mots de passe ne correspondent pas.';
        }

        return null;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errorMsg = validateForm();
        if (errorMsg) {
            setError(errorMsg);
            return;
        }

        axios.post('/api/register', formData)
            .then(response => {
                alert('Inscription réussie !');
                navigate('/connexion');
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
