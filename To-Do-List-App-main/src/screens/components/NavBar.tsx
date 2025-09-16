import React from "react";
import { Box, HStack, IconButton, Icon, Text, Image, Pressable } from "native-base";
import { Ionicons } from "@expo/vector-icons";

interface NavBarProps {
  title?: string;
  showBack?: boolean;
  goBack?: () => void;
  showAvatar?: boolean;
  avatarUri?: string;
  onAvatarPress?: () => void;
  goToLogin?: () => void; // função para voltar ao login
}

export default function NavBar({
  title = "",
  showBack = false,
  goBack,
  showAvatar = false,
  avatarUri,
  onAvatarPress,
  goToLogin,
}: NavBarProps) {
  return (
    <Box bg="green.500" px={4} py={3}>
      <HStack alignItems="center" justifyContent="space-between">
        {/* Botão voltar ou logo clicável */}
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

        {/* Avatar */}
        {showAvatar && avatarUri ? (
          <Pressable onPress={onAvatarPress}>
            <Image
              source={{ uri: avatarUri }}
              alt="Avatar"
              size="sm"             
              borderRadius="full"   
            />
          </Pressable>
        ) : (
          <Box w={10} />
        )}
      </HStack>
    </Box>
  );
}
