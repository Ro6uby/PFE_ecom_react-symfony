<?php

namespace App\Entity;

use App\Repository\CommandeRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CommandeRepository::class)]
class Commande
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $idCommande = null;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'commandes')]
    #[ORM\JoinColumn(name: 'id_client', referencedColumnName: 'id', nullable: false)]
    private ?User $user = null;

    #[ORM\Column(type: 'datetime')]
    private ?\DateTimeInterface $dateCommande = null;

    #[ORM\ManyToOne(targetEntity: AdresseClient::class)]
    #[ORM\JoinColumn(name: 'id_adresse_livraison', referencedColumnName: 'id_adresse', nullable: false)]
    private ?AdresseClient $adresseLivraison = null;


    public function getIdCommande(): ?int
    {
        return $this->idCommande;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function getDateCommande(): ?\DateTimeInterface
    {
        return $this->dateCommande;
    }

    public function setDateCommande(\DateTimeInterface $dateCommande): static
    {
        $this->dateCommande = $dateCommande;

        return $this;
    }

    public function getAdresseLivraison(): ?AdresseClient
    {
        return $this->adresseLivraison;
    }

    public function setAdresseLivraison(?AdresseClient $adresseLivraison): static
    {
        $this->adresseLivraison = $adresseLivraison;

        return $this;
    }

}
