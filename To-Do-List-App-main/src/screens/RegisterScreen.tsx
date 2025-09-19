import React, { useState } from "react";
import { Box, Input, Button, VStack, Heading, Image, Pressable, Icon, Text } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import NavBar from "./components/NavBar";

// Define os tipos das props que a tela recebe
interface RegisterProps {
  goToLogin: () => void; // função para navegar de volta para a tela de login
  onRegister?: (user: { id: number; name: string; email: string }) => void; // callback opcional ao registrar
}

// Componente principal da tela de cadastro
export default function RegisterScreen({ goToLogin, onRegister }: RegisterProps) {

  // Estados para armazenar dados do formulário
  const [name, setName] = useState("");           // Nome do usuário
  const [email, setEmail] = useState("");         // Email do usuário
  const [password, setPassword] = useState("");   // Senha do usuário
  const [showPassword, setShowPassword] = useState(false); // Para mostrar/ocultar senha
  const [message, setMessage] = useState("");     // Mensagem de feedback
  const [isError, setIsError] = useState(false);  // Indica se a mensagem é de erro

  // Função que será chamada ao pressionar o botão "Cadastrar"
  const handleRegister = async () => {
    try {
      // Faz requisição POST para a rota de cadastro
      const res = await axios.post("http://localhost:3000/register", { name, email, password });

      // Atualiza mensagem de sucesso
      setMessage(res.data.message || "Cadastro realizado com sucesso!");
      setIsError(false);

      // Chama callback opcional passando os dados do usuário recém-criado
      onRegister?.({ id: res.data.user.id, name: res.data.user.name, email: res.data.user.email });

      // Após 1,5 segundos, redireciona para a tela de login
      setTimeout(() => goToLogin(), 1500);
    } catch (err: any) {
      // Em caso de erro, mostra mensagem de erro
      setMessage(err.response?.data?.error || "Erro ao cadastrar");
      setIsError(true);
    }
  };

  return (
    <Box flex={1} bg="white">
      <NavBar title="Cadastro" showBack goBack={goToLogin} />
      <Box flex={1} justifyContent="center" alignItems="center" p={5}>
        <VStack space={3} width="90%" alignItems="center">
          <Image source={require("../../assets/logo.png")} alt="Logo" height={100} width={220} resizeMode="contain" mb={1} />
          <Heading size="lg" mb={3}>Cadastro</Heading>

          <Input placeholder="Nome" value={name} onChangeText={setName} width="100%" h={12} borderColor="green.500" />
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

          <Button width="100%" h={12} bg="green.500" onPress={handleRegister}>Cadastrar</Button>
        </VStack>
      </Box>
    </Box>
  );
}
