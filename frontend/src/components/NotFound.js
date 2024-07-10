import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
    <div className="container py-4">
        <h2>Page Non Trouvée</h2>
        <p>Nous ne pouvons pas trouver la page que vous cherchez.</p>
        <Link to="/" className="btn btn-primary">Retour à l'accueil</Link>
    </div>
);

export default NotFound;