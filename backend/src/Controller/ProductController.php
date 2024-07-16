<?php

namespace App\Controller;

use App\Entity\Product;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\ConstraintViolationListInterface;



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


        return $this->json($products);
    }

    
    #[Route('/api/products', name: 'api_products_post', methods: ['POST'])]
    public function createProduct(Request $request, EntityManagerInterface $entityManager, SerializerInterface $serializer, ValidatorInterface $validator): Response
    {
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

}



