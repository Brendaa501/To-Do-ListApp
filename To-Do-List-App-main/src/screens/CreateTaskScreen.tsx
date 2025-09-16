import React, { useState } from "react";
import { Box, Input, Button, VStack, Text } from "native-base";
import NavBar from "./components/NavBar";

interface CreateTaskProps {
  goTo: (screen: "tasks" | "profile") => void;
}

export default function CreateTaskScreen({ goTo }: CreateTaskProps) {
  const [task, setTask] = useState("");

  return (
    <Box flex={1}>
      <NavBar
        title="Criar Tarefa"
        showBack
        goBack={() => goTo("tasks")}
        showAvatar
        avatarUri="https://i.pravatar.cc/150?img=5"
        onAvatarPress={() => goTo("profile")}
      />

      <Box flex={1} justifyContent="center" alignItems="center" p={5}>
        <VStack space={4} width="90%">
          <Text fontSize="2xl" textAlign="center">
            Criar uma nova tarefa
          </Text>

          {/* Input da tarefa */}
          <Input
            placeholder="Nome da tarefa"
            value={task}
            onChangeText={setTask}
            variant="outline"
            borderColor="green.500"
            _hover={{ borderColor: "green.600", bg: "green.100" }}
            _focus={{ borderColor: "green.700", bg: "green.50" }}
            _focusVisible={{ outline: "none", boxShadow: "0 0 0 2px green.700" }}
          />

          {/* Botão verde */}
          <Button
            onPress={() => {
              console.log("Criou tarefa:", task);
              goTo("tasks");
            }}
            bg="green.500"
            _hover={{ bg: "green.600" }}
            _pressed={{ bg: "green.700" }}
          >
            Criar
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}
