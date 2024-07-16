<?php

namespace App\Entity;

use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\DBAL\Types\Types;
use Symfony\Component\Security\Core\User\UserInterface;


#[ORM\Entity(repositoryClass: UserRepository::class)]
class User implements UserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $nom = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    private ?string $mdp = null;


    public function getId(): ?int
    {
        return $this->id;
    }



    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): static
    {
        $this->nom = $nom;

        return $this;
    }


    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

   

    public function getMdp(): ?string
    {
        return $this->mdp;
    }

    public function setMdp(string $mdp): static
    {
        $this->mdp = $mdp;

        return $this;
    }


    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        // Assurez-vous que votre utilisateur a un rôle par défaut
        return ['ROLE_USER'];
    }

    /**
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        // Ne pas utiliser de salt car bcrypt le fait déjà
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // Si vous stockez des données sensibles temporairement, nettoyez-les ici
        // $this->plainPassword = null;
    }

    /**
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getUsername(): string
    {
        // Si votre identifiant est l'email, renvoyez-le ici
        return (string) $this->email;
    }


    
}



