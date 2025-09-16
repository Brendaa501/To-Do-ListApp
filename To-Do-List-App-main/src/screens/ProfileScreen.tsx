import React from "react";
import { Box, Text, VStack, Image, Button } from "native-base";
import NavBar from "./components/NavBar";

interface ProfileProps {
  goTo: (screen: "tasks" | "login") => void;
  user: { email: string };
  logout: () => void;
}

export default function ProfileScreen({ goTo, user, logout }: ProfileProps) {
  return (
    <Box flex={1}>
      {/* Barra de navegação com seta de voltar */}
      <NavBar title="Perfil" showBack goBack={() => goTo("tasks")} />

      <VStack flex={1} justifyContent="center" alignItems="center" space={4} p={5}>
        {/* Avatar do usuário */}
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=5" }}
          alt="Avatar"
          size="2xl"
          borderRadius={100}
        />
        <Text fontSize="2xl">Perfil</Text>
        <Text>Email: {user.email}</Text>

        {/* Botão de sair */}
        <Button colorScheme="red" mt={4} onPress={logout}>
          Sair
        </Button>
      </VStack>
    </Box>
  );
}
