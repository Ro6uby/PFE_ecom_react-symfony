<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\Validator\Validator\ValidatorInterface;



class UserController extends AbstractController
{



    #[Route('/user', name: 'app_user')]
    public function index(): Response
    {
        return $this->render('user/index.html.twig', [
            'controller_name' => 'UserController',
        ]);
    }

    #[Route('/api/register', name: 'api_register', methods: ['POST'])]
    public function register(Request $request, EntityManagerInterface $entityManager, UserPasswordHasherInterface $passwordHasher, ValidatorInterface $validator): Response
    {

        // Obtenir les données de la requête
        $data = json_decode($request->getContent(), true);
        $username = $data['username'] ?? null;
        $email = $data['email'] ?? null;
        $password = $data['password'] ?? null;
    
        // Créer l'utilisateur
        $user = new User();
        $user->setNom($username);
        $user->setEmail($email);
        $user->setMdp($password);
    
        // Valider l'objet utilisateur
        $errors = $validator->validate($user);
    
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
    
        // Sauvegarder l'utilisateur
        $entityManager->persist($user);
        $entityManager->flush();
    
        return $this->json([
            'status' => 'success',
            'user' => $user,
        ], Response::HTTP_CREATED);
    }



    private $entityManager;
    private $tokenStorage;

    public function __construct(EntityManagerInterface $entityManager, TokenStorageInterface $tokenStorage)
    {
        $this->entityManager = $entityManager;
        $this->tokenStorage = $tokenStorage;
    }

    #[Route('/api/login', name: 'api_login', methods: ['POST'])]
    public function login(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        $email = $data['email'] ?? null;
        $password = $data['password'] ?? null;

        if (!$email || !$password) {
            return $this->json(['message' => 'Email ou mot de passe manquant'], Response::HTTP_BAD_REQUEST);
        }

        // Charger l'utilisateur par email
        $user = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $email]);

        if ($password !== $user->getMdp()) {
            return $this->json(['message' => 'Email ou mot de passe incorrect'], Response::HTTP_UNAUTHORIZED);
        }

        // Authentifier l'utilisateur
        $token = new UsernamePasswordToken($user, '', ['main'], $user->getRoles());
        $this->tokenStorage->setToken($token);

        return $this->json([
            'message' => 'Connexion réussie',
            'user' => $user->getEmail(),
        ]);
    }












    #[Route('/api/logout', name: 'api_logout', methods: ['POST'])]
    public function logout(): Response
    {
        $this->tokenStorage->setToken(null);

        return $this->json(['message' => 'Déconnexion réussie']);
    }
}
