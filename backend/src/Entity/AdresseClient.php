<?php

namespace App\Entity;

use App\Repository\AdresseClientRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AdresseClientRepository::class)]
class AdresseClient
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $idAdresse = null;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'adresses')]
    #[ORM\JoinColumn(name: 'id_client', referencedColumnName: 'id', nullable: false)]
    private ?User $user = null;

    #[ORM\Column(length: 255)]
    private ?string $adresse = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $adresseComplement = null;

    #[ORM\Column(length: 100)]
    private ?string $ville = null;

    #[ORM\Column(length: 20)]
    private ?string $codePostal = null;

    #[ORM\Column(length: 100)]
    private ?string $pays = null;

    public function getIdAdresse(): ?int
    {
        return $this->idAdresse;
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

    public function getAdresse(): ?string
    {
        return $this->adresse;
    }

    public function setAdresse(string $adresse): static
    {
        $this->adresse = $adresse;

        return $this;
    }

    public function getAdresseComplement(): ?string
    {
        return $this->adresseComplement;
    }

    public function setAdresseComplement(?string $adresseComplement): static
    {
        $this->adresseComplement = $adresseComplement;

        return $this;
    }

    public function getVille(): ?string
    {
        return $this->ville;
    }

    public function setVille(string $ville): static
    {
        $this->ville = $ville;

        return $this;
    }

    public function getCodePostal(): ?string
    {
        return $this->codePostal;
    }

    public function setCodePostal(string $codePostal): static
    {
        $this->codePostal = $codePostal;

        return $this;
    }

    public function getPays(): ?string
    {
        return $this->pays;
    }

    public function setPays(string $pays): static
    {
        $this->pays = $pays;

        return $this;
    }

    
}
