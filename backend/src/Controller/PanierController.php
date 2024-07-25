<?php
// src/Controller/PanierController.php

namespace App\Controller;


use App\Entity\Product;
use App\Entity\Panier;
use App\Entity\User;
use App\Repository\ProductRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;

class PanierController extends AbstractController
{
   
    #[Route('/api/cart', name: 'add_to_cart', methods: ['POST'])]
    public function addToCart(
        Request $request,
        EntityManagerInterface $entityManager,
        SerializerInterface $serializer,
        ValidatorInterface $validator
    ): Response {
        $data = $request->getContent();
        $dataArray = json_decode($data, true);
    
        // Récupérer l'utilisateur et le produit
        $user = $entityManager->getRepository(User::class)->find($dataArray['idUser']);
        $product = $entityManager->getRepository(Product::class)->find($dataArray['idProduit']);
    
        // Vérifier si l'utilisateur et le produit existent
        if (!$user) {
            return $this->json([
                'status' => 'error',
                'message' => 'User not found'
            ], Response::HTTP_BAD_REQUEST);
        }
    
        if (!$product) {
            return $this->json([
                'status' => 'error',
                'message' => 'Product not found'
            ], Response::HTTP_BAD_REQUEST);
        }
    
        // Vérifier si le produit est déjà dans le panier de l'utilisateur
        $panier = $entityManager->getRepository(Panier::class)->findOneBy([
            'user' => $user,
            'product' => $product
        ]);
    
        if ($panier) {
            // Mettre à jour la quantité
            $panier->setQuantite($panier->getQuantite() + $dataArray['quantite']);
        } else {
            // Créer un nouveau panier
            $panier = new Panier();
            $panier->setQuantite($dataArray['quantite']);
            $panier->setUser($user);
            $panier->setProduct($product);
        }
    
        $errors = $validator->validate($panier);
    
        if (count($errors) > 0) {
            $errorsArray = [];
            foreach ($errors as $error) {
                $errorsArray[$error->getPropertyPath()] = $error->getMessage();
            }
    
            return $this->json([
                'status' => 'error',
                'errors' => $errorsArray,
            ], Response::HTTP_BAD_REQUEST);
        }
    
        $entityManager->persist($panier);
        $entityManager->flush();
    
        return $this->json([
            'status' => 'success',
            'panier' => $panier,
        ], Response::HTTP_CREATED);
    }
    
    
    
}
