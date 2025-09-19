import React, { useState } from "react";
import { Box, Input, Button, VStack, Heading, Image, Pressable, Icon, Text, HStack } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

//  tipos das props que a tela de login recebe
interface LoginProps {
  onLogin: (user: { id: number; name: string; email: string }) => void; // função chamada após login
  goToRegister: () => void; // função para navegar para a tela de cadastro
}


export default function LoginScreen({ onLogin, goToRegister }: LoginProps) {
  // Estado para armazenar o email digitado
  const [email, setEmail] = useState("");
  // Estado para armazenar a senha digitada
  const [password, setPassword] = useState("");
  // Controla se a senha está visível ou escondida
  const [showPassword, setShowPassword] = useState(false);
  // Mensagem de feedback para o usuário
  const [message, setMessage] = useState("");
  // Indica se a mensagem é de erro ou sucesso
  const [isError, setIsError] = useState(false);



// Função chamada ao clicar no botão "Entrar"
  const handleLogin = async () => {
    try {
      // Envia email e senha para o backend
      const res = await axios.post("http://localhost:3000/login", { email, password });
      const { user, token } = res.data; // recebe o usuário e o token do backend

      // Salva o token no AsyncStorage para usar em requisições futuras
      await AsyncStorage.setItem("token", token);

      // Chama a função onLogin do App para atualizar o estado global
      onLogin(user);

      // Exibe mensagem de sucesso
      setMessage("Login realizado com sucesso!");
      setIsError(false);
    } catch (err: any) {
      // Exibe mensagem de erro caso falhe
      setMessage(err.response?.data?.error || "Erro ao fazer login");
      setIsError(true);
    }
  };

  return (
    <Box flex={1} justifyContent="center" alignItems="center" p={5} bg="white">
      <VStack space={3} width="90%" alignItems="center">
        <Image source={require("../../assets/logo.png")} alt="Logo" height={100} width={220} resizeMode="contain" mb={1} />
        <Heading size="lg" textAlign="center" mb={3}>Login</Heading>

        <Input placeholder="Email" value={email} onChangeText={setEmail} width="100%" h={12} borderColor="green.500" />
        <Input
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          type={showPassword ? "text" : "password"}
          width="100%"
          h={12}
          borderColor="green.500"
          InputRightElement={
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <Icon as={Ionicons} name={showPassword ? "eye-off" : "eye"} size={5} mr={3} color="muted.400" />
            </Pressable>
          }
        />

        {message ? (
          <Box w="100%" p={2} bg={isError ? "red.100" : "green.100"} borderRadius={5}>
            <Text color={isError ? "red.600" : "green.600"} textAlign="center" fontWeight="bold">{message}</Text>
          </Box>
        ) : null}

        <Button width="100%" h={12} bg="green.500" onPress={handleLogin}>Entrar</Button>

        <HStack justifyContent="center" mt={2}>
          <Text>Ainda não tem conta? </Text>
          <Pressable onPress={goToRegister}>
            <Text color="green.600" fontWeight="bold">Cadastre-se</Text>
          </Pressable>
        </HStack>
      </VStack>
    </Box>
  );
}
