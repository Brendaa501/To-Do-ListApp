import React from "react";
import { Box, HStack, IconButton, Icon, Text, Image, Pressable } from "native-base";
import { Ionicons } from "@expo/vector-icons";

interface NavBarProps {
  title?: string;                // Título central da barra
  showBack?: boolean;            // Mostrar botão de voltar
  goBack?: () => void;           // Função de voltar
  showAvatar?: boolean;          // Mostrar avatar com iniciais
  userName?: string;             // Nome do usuário para pegar iniciais
  onAvatarPress?: () => void;    // Função ao clicar no avatar
  goToLogin?: () => void;        // Função para voltar ao login
}

export default function NavBar({
  title = "",
  showBack = false,
  goBack,
  showAvatar = false,
  userName,
  onAvatarPress,
  goToLogin,
}: NavBarProps) {

  // Função para pegar até 2 iniciais do nome
  const getInitials = (name: string) => {
    if (!name) return "";
    const names = name.split(" ");
    return names.map(n => n[0].toUpperCase()).join("").slice(0, 2);
  };

  return (
    <Box bg="green.500" px={4} py={3}>
      <HStack alignItems="center" justifyContent="space-between">

        {/* Botão de voltar ou logo clicável */}
        {showBack ? (
          <IconButton
            icon={<Icon as={Ionicons} name="arrow-back" color="white" size="lg" />}
            onPress={goBack}
          />
        ) : (
          <Pressable onPress={goToLogin}>
            <Image
              source={require("../../../assets/logo.png")}
              alt="Logo"
              resizeMode="cover"
              height={16}       
              width={16}        
              borderRadius={100} 
            />
          </Pressable>
        )}

        {/* Título centralizado */}
        <Text color="white" fontSize="lg" flex={1} textAlign="center">
          {title}
        </Text>

        {/* Avatar com iniciais */}
        {showAvatar && userName ? (
          <Pressable onPress={onAvatarPress}>
            <Box
              w={16} h={16}                  // tamanho do círculo
              borderRadius="full"
              bg="green.700"                 // cor de fundo
              justifyContent="center"         // centraliza vertical
              alignItems="center"             // centraliza horizontal
              display="flex"
            >
              <Text
                color="white"
                fontWeight="bold"
                fontSize="lg"
                textAlign="center"           // centraliza texto dentro do círculo
              >
                {getInitials(userName)}
              </Text>
            </Box>
          </Pressable>
        ) : (
          <Box w={12} h={12} />           // espaço vazio para manter layout
        )}
      </HStack>
    </Box>
  );
}
