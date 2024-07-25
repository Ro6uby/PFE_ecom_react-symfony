<?php

namespace App\Controller;

use App\Entity\Product;
use App\Entity\Panier;
use App\Entity\User;
use App\Repository\ProductRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ProductController extends AbstractController
{
    #[Route('/api/products', name: 'api_products', methods: ['GET'])]
    public function getProducts(EntityManagerInterface $entityManager): Response
    {
        $products = $entityManager->getRepository(Product::class)->findAll();
        return $this->json($products);
    }

    #[Route('/api/products/{id}', name: 'delete_product', methods: ['DELETE'])]
    public function deleteProduct($id, EntityManagerInterface $entityManager): Response
    {
        $product = $entityManager->getRepository(Product::class)->find($id);

        if (!$product) {
            return new Response('Produit non trouvé', 404);
        }

        $entityManager->remove($product);
        $entityManager->flush();

        return new Response('Produit supprimé avec succès');
    }

    #[Route('/api/products/{id}', name: 'edit_product', methods: ['GET'])]
    public function editProduct($id, EntityManagerInterface $entityManager): Response
    {
        $product = $entityManager->getRepository(Product::class)->find($id);

        if (!$product) {
            return $this->json(['message' => 'Produit non trouvé'], Response::HTTP_NOT_FOUND);
        }

        return $this->json($product);
    }

    #[Route('/api/products', name: 'api_products_post', methods: ['POST'])]
    public function createProduct(
        Request $request,
        EntityManagerInterface $entityManager,
        SerializerInterface $serializer,
        ValidatorInterface $validator
    ): Response {
        // Obtenir les données de la requête
        $data = $request->getContent();

        // Désérialiser les données JSON en objet Product
        /** @var Product $product */
        $product = $serializer->deserialize($data, Product::class, 'json');

        // Valider l'objet produit
        $errors = $validator->validate($product);

        if (count($errors) > 0) {
            // Convertir les erreurs en tableau
            $errorsArray = [];
            /** @var \Symfony\Component\Validator\ConstraintViolation $error */
            foreach ($errors as $error) {
                $errorsArray[$error->getPropertyPath()] = $error->getMessage();
            }

            return $this->json([
                'status' => 'error',
                'errors' => $errorsArray,
            ], Response::HTTP_BAD_REQUEST);
        }

        // Enregistrer le produit dans la base de données
        $entityManager->persist($product);
        $entityManager->flush();

        // Retourner la réponse
        return $this->json([
            'status' => 'success',
            'product' => $product,
        ], Response::HTTP_CREATED);
    }

    #[Route('/api/products/{id}', name: 'update_product', methods: ['PUT'])]
    public function updateProduct($id, Request $request, EntityManagerInterface $entityManager): Response
    {
        $product = $entityManager->getRepository(Product::class)->find($id);

        if (!$product) {
            return $this->json(['message' => 'Produit non trouvé'], Response::HTTP_NOT_FOUND);
        }

        $data = json_decode($request->getContent(), true);

        $product->setName($data['Name']);
        $product->setDescription($data['description']);
        $product->setCategorie($data['categorie']);
        $product->setPrice($data['price']);
        $product->setImage($data['image']);

        $entityManager->persist($product);
        $entityManager->flush();

        return $this->json(['message' => 'Produit mis à jour avec succès']);
    }

    // #[Route('/api/cart', name: 'add_to_cart', methods: ['POST'])]
    // public function addToCart(
    //     Request $request,
    //     EntityManagerInterface $entityManager,
    //     SerializerInterface $serializer,
    //     ValidatorInterface $validator
    // ): Response {
    //     $data = $request->getContent();
    //     $dataArray = json_decode($data, true);
    
    //     // Récupérer l'utilisateur et le produit
    //     $user = $entityManager->getRepository(User::class)->find($dataArray['idUser']);
    //     $product = $entityManager->getRepository(Product::class)->find($dataArray['idProduit']);
    
    //     // Vérifier si l'utilisateur et le produit existent
    //     if (!$user) {
    //         return $this->json([
    //             'status' => 'error',
    //             'message' => 'User not found'
    //         ], Response::HTTP_BAD_REQUEST);
    //     }
    
    //     if (!$product) {
    //         return $this->json([
    //             'status' => 'error',
    //             'message' => 'Product not found'
    //         ], Response::HTTP_BAD_REQUEST);
    //     }
    
    //     // Vérifier si le produit est déjà dans le panier de l'utilisateur
    //     $panier = $entityManager->getRepository(Panier::class)->findOneBy([
    //         'user' => $user,
    //         'product' => $product
    //     ]);
    
    //     if ($panier) {
    //         // Mettre à jour la quantité
    //         $panier->setQuantite($panier->getQuantite() + $dataArray['quantite']);
    //     } else {
    //         // Créer un nouveau panier
    //         $panier = new Panier();
    //         $panier->setQuantite($dataArray['quantite']);
    //         $panier->setUser($user);
    //         $panier->setProduct($product);
    //     }
    
    //     $errors = $validator->validate($panier);
    
    //     if (count($errors) > 0) {
    //         $errorsArray = [];
    //         foreach ($errors as $error) {
    //             $errorsArray[$error->getPropertyPath()] = $error->getMessage();
    //         }
    
    //         return $this->json([
    //             'status' => 'error',
    //             'errors' => $errorsArray,
    //         ], Response::HTTP_BAD_REQUEST);
    //     }
    
    //     $entityManager->persist($panier);
    //     $entityManager->flush();
    
    //     return $this->json([
    //         'status' => 'success',
    //         'panier' => $panier,
    //     ], Response::HTTP_CREATED);
    // }
    
    
}
