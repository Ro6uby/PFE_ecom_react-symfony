<?php
// src/Security/JsonLoginSuccessHandler.php

namespace App\Security;

use Symfony\Component\Security\Http\Authentication\AuthenticationSuccessHandlerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

class JsonLoginSuccessHandler implements AuthenticationSuccessHandlerInterface
{
    private JWTTokenManagerInterface $jwtManager;

    public function __construct(JWTTokenManagerInterface $jwtManager)
    {
        $this->jwtManager = $jwtManager;
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token): JsonResponse
    {
        // Récupérer l'utilisateur depuis le token
        $user = $token->getUser();

        // Générer le token JWT
        $jwtToken = $this->jwtManager->create($user);

        $data = [
            'message' => 'Authentication successful',
            'token' => $jwtToken,
            'user' => [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'username' => $user->getNom(),
                'roles' => $user->getRoles(),
            ],
        ];

        return new JsonResponse($data);
    }
}
