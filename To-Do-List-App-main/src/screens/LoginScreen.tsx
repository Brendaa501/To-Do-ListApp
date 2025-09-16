import React, { useState } from "react";
import { Box, Input, Button, VStack, Heading, Image, Pressable, Icon, Text, HStack } from "native-base";
import { Ionicons } from "@expo/vector-icons";

interface LoginProps {
  onLogin: (email: string) => void;
  goToRegister: () => void; // função para navegar para tela de registro
}

export default function LoginScreen({ onLogin, goToRegister }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box flex={1} justifyContent="center" alignItems="center" p={5} bg="white">
      <VStack space={5} width="90%" alignItems="center">
        {/* Logo */}
        <Image
          source={require("../../assets/logo.png")}
          alt="Logo OrganizeMais"
          height={100}
          width={220}
          resizeMode="contain"
          mb={1}
        />

        <Heading size="lg" textAlign="center" mb={3}>
          Login
        </Heading>

        {/* Input de Email */}
        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          width="100%"
          h={12}
          variant="outline"
          borderColor="green.500"
          placeholderTextColor="green.300"
          _hover={{ borderColor: "green.600", bg: "green.100" }}
          _focus={{ borderColor: "green.700", bg: "green.50" }}
          _focusVisible={{ outline: "none", boxShadow: "0 0 0 2px green.700" }}
        />

        {/* Input de Senha */}
        <Input
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          type={showPassword ? "text" : "password"}
          width="100%"
          h={12}
          variant="outline"
          borderColor="green.500"
          placeholderTextColor="green.300"
          _hover={{ borderColor: "green.600", bg: "green.100" }}
          _focus={{ borderColor: "green.700", bg: "green.50" }}
          _focusVisible={{ outline: "none", boxShadow: "0 0 0 2px green.700" }}
          InputRightElement={
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <Icon
                as={Ionicons}
                name={showPassword ? "eye-off" : "eye"}
                size={5}
                mr={3}
                color="muted.400"
              />
            </Pressable>
          }
        />

        {/* Botão Entrar */}
        <Button
          width="100%"
          h={12}
          bg="green.500"
          _hover={{ bg: "green.600" }}
          _pressed={{ bg: "green.700" }}
          shadow={2}
          onPress={() => onLogin(email)}
        >
          Entrar
        </Button>

        {/* Link para registro */}
        <HStack justifyContent="center" mt={2}>
          <Text>Ainda não tem conta? </Text>
          <Pressable onPress={goToRegister}>
            <Text color="green.600" fontWeight="bold">
              Cadastre-se
            </Text>
          </Pressable>
        </HStack>
      </VStack>
    </Box>
  );
}
