import React, { useState } from "react";
import { Box, Input, Button, VStack, Heading, Image, Pressable, Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import NavBar from "./components/NavBar";

interface RegisterProps {
  onRegister: (name: string, email: string, password: string) => void;
  goToLogin: () => void;
}

export default function RegisterScreen({ onRegister, goToLogin }: RegisterProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box flex={1} bg="white">
      <NavBar title="Cadastro" showBack goBack={goToLogin} goToLogin={goToLogin} />
      <Box flex={1} justifyContent="center" alignItems="center" p={5}>
        <VStack space={5} width="90%" alignItems="center">
          <Image
            source={require("../../assets/logo.png")}
            alt="Logo OrganizeMais"
            height={100}
            width={220}
            resizeMode="contain"
            mb={1}
          />

          {/* Input de Nome */}
          <Input
            placeholder="Nome"
            value={name}
            onChangeText={setName}
            width="100%"
            h={12}
            variant="outline"
            borderColor="green.500"
            _hover={{ borderColor: "green.600", bg: "green.100" }}
            _focus={{ borderColor: "green.700", bg: "green.50" }}
          />

          {/* Input de Email */}
          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            width="100%"
            h={12}
            variant="outline"
            borderColor="green.500"
            _hover={{ borderColor: "green.600", bg: "green.100" }}
            _focus={{ borderColor: "green.700", bg: "green.50" }}
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
            _hover={{ borderColor: "green.600", bg: "green.100" }}
            _focus={{ borderColor: "green.700", bg: "green.50" }}
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

          {/* Botão verde */}
          <Button
            width="100%"
            h={12}
            bg="green.500"
            _hover={{ bg: "green.600" }}
            _pressed={{ bg: "green.700" }}
            shadow={2}
            onPress={goToLogin} // volta para login ao cadastrar
          >
            Cadastrar
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}
