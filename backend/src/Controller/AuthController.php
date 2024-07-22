<?php
// src/Controller/AuthController.php
// namespace App\Controller;

// use Symfony\Component\HttpFoundation\Request;
// use Symfony\Component\HttpFoundation\JsonResponse;
// use Symfony\Component\Routing\Annotation\Route;
// use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
// use Symfony\Component\Security\PasswordHasher\UserPasswordHasherInterface;
// use App\Entity\User;
// use Doctrine\ORM\EntityManagerInterface;

// class AuthController extends AbstractController
// {
//     private UserPasswordHasherInterface $passwordHasher;
//     private EntityManagerInterface $entityManager;

//     public function __construct(UserPasswordHasherInterface $passwordHasher, EntityManagerInterface $entityManager)
//     {
//         $this->passwordHasher = $passwordHasher;
//         $this->entityManager = $entityManager;
//     }

//     #[Route('/api/login', name: 'api_login', methods: ['POST'])]
//     public function login(Request $request): Response
//     {
//         $data = json_decode($request->getContent(), true);
//         $email = $data['email'] ?? null;
//         $password = $data['password'] ?? null;

//         if (!$email || !$password) {
//             return $this->json(['message' => 'Email ou mot de passe manquant'], Response::HTTP_BAD_REQUEST);
//         }

//         $user = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $email]);

//         if (!$user || !$this->passwordHasher->isPasswordValid($user, $password)) {
//             return $this->json(['message' => 'Email ou mot de passe incorrect'], Response::HTTP_UNAUTHORIZED);
//         }

//         $token = new UsernamePasswordToken($user, 'main', $user->getRoles());
//         $this->tokenStorage->setToken($token);

//         return $this->json([
//             'message' => 'Connexion réussie',
//             'user' => $user->getEmail(),
//         ]);
//     }
    
// }
