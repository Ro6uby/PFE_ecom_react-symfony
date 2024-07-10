import { Link } from 'react-router-dom';


const Navbar = () => {

    const handleOpenModal = () => {
        
    };

    const handleCloseModal = () => {
        
    };

    return (
        <div>
            <div style={{background : '#f3a847'}}>Bonjour Rouby !</div>
        <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
            
        <div className="container-fluid">
        <Link to="/" className="btn">
            <a className="navbar-brand" href="#" style={{ color : '#ff9900' }}>ECOM</a>
        </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarColor02">
                <ul className="navbar-nav me-auto">

                    <li className="nav-item" style={{ fontSize: '0.8rem' }}>
                <a className="nav-link" href="#">
                    <div className="row align-items-center">
                        <div className="col-auto">
                            <i className="fa-solid fa-location-dot" style={{ color: 'white', fontSize: '1.1rem' }}></i>
                        </div>
                        <div className="col">
                            <div>Livraison à : 
                                <span> Paris 75000</span>
                            </div>
                            <div style={{ font : 'bold' }}>Mettre à jour l'emplacement</div>
                        </div>
                    </div>
                </a>
            </li>

                    
                </ul>
                <form className="flex-grow-1 search-form" method="get" action="searchRes.php">
                    <div className="input-group" style={{ paddingRight: '100px', paddingLeft: '100px' }}>
                        <input
                        type="text"
                        className="form-control search-input"
                        placeholder="Rechercher Ecom.fr"
                        aria-label="Search"
                        name="searchbar"
                        style={{ height: '45px' }}
                        />
                        <div className="input-group-append">
                        <button
                            className="btn search-button"
                            type="submit"
                            style={{ height: '45px', borderTopLeftRadius: '0', borderBottomLeftRadius: '0', backgroundColor: '#ff9900', borderColor: '#ff9900' }}
                        >
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <div className="nav-item dropdown" style={{color:'white'}}>
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Dropdown
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="#">Action</a>
                            <a className="dropdown-item" href="#">Another action</a>
                            <a className="dropdown-item" href="#">Something else here</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">Deconnexion <i class="fa-solid fa-right-from-bracket" style={{ color: '#ffffff'}}></i></a>
                        </div>
                    </div>

                    &nbsp; &nbsp; &nbsp; 

        <Link to="/panier" className="btn">
            <a className="nav-link" style={{ color: '#ffffff' }} href="cart.php"><i className="fa-solid fa-shopping-cart" style={{ color: '#ff9900' }}></i> (0) Panier</a>
        </Link>

        <Link to="/connexion" className="btn">
            <a class="nav-link" style={{ color: '#ffffff' }} href="login.php"><i class="fa-solid fa-user" style={{ color: '#ff9900' }}></i> Se connecter</a>
        </Link>
        

        
    </nav>

    </div>





    );
};

export default Navbar;