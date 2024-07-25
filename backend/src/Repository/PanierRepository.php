<?php

namespace App\Repository;


use App\Entity\User;
use App\Entity\Product;
use App\Entity\Panier;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\EntityManagerInterface;

/**
 * @extends ServiceEntityRepository<Panier>
 *
 * @method Panier|null find($id, $lockMode = null, $lockVersion = null)
 * @method Panier|null findOneBy(array $criteria, array $orderBy = null)
 * @method Panier[]    findAll()
 * @method Panier[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PanierRepository extends ServiceEntityRepository
{
    private $entityManager;

    public function __construct(ManagerRegistry $registry, EntityManagerInterface $entityManager)
    {
        parent::__construct($registry, Panier::class);
        $this->entityManager = $entityManager;
    }


    public function addOrUpdateProduct(User $user, Product $product, int $quantite): void
    {
        $panier = $this->findOneBy(['user' => $user, 'product' => $product]);

        if ($panier) {
            // Si le produit est déjà dans le panier, mettre à jour la quantité
            $panier->setQuantite($panier->getQuantite() + $quantite);
        } else {
            // Sinon, ajouter un nouvel enregistrement
            $panier = new Panier();
            $panier->setUser($user);
            $panier->setProduct($product);
            $panier->setQuantite($quantite);
        }

        $this->entityManager->persist($panier);
        $this->entityManager->flush();
    }

    

//    /**
//     * @return Panier[] Returns an array of Panier objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('p.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Panier
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
