import React from "react";
import { Box, Text, VStack, Button } from "native-base";
import NavBar from "./components/NavBar";

//  tipos das props que a tela recebe
interface ProfileProps {
  goTo: (screen: "tasks" | "login") => void; // função para navegar entre telas
  user: { name: string; email: string };     // dados do usuário logado
  logout: () => void;                         // função para deslogar
}

// Componente principal da tela de perfil
export default function ProfileScreen({ goTo, user, logout }: ProfileProps) {

  // Função para pegar as iniciais do nome do usuário
  const getInitials = (name: string) => {
    if (!name) return "";                    // se não tiver nome, retorna string vazia
    const names = name.split(" ");           // divide o nome por espaços
    return names.map(n => n[0].toUpperCase()) // pega a primeira letra de cada nome e coloca maiúscula
                .join("")                    // junta todas as letras
                .slice(0, 2);                // pega apenas as duas primeiras letras
  };

  return (
    <Box flex={1}>
      <NavBar title="Perfil" showBack goBack={() => goTo("tasks")} />

      <VStack flex={1} justifyContent="center" alignItems="center" space={4} p={5}>
        {/* Avatar com iniciais */}
        <Box
          w={24} h={24}                    
          borderRadius="full"
          bg="green.700"
          justifyContent="center"
          alignItems="center"
          display="flex"
        >
          <Text
            color="white"
            fontWeight="bold"
            fontSize="4xl"                  
            textAlign="center"
          >
            {getInitials(user.name)}
          </Text>
        </Box>

      
        <Text>Nome: {user.name}</Text>
        <Text>Email: {user.email}</Text>

        <Button colorScheme="red" mt={4} onPress={logout}>Sair</Button>
      </VStack>
    </Box>
  );
}
