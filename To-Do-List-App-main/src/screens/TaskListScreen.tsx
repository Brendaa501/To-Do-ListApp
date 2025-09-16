import React, { useState } from "react";
import { Box, VStack, HStack, Text, Checkbox, Pressable, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import NavBar from "./components/NavBar"; // ajuste o caminho conforme seu projeto

interface Task {
  text: string;
  done: boolean;
}

interface TaskListProps {
  goTo: (screen: "create" | "edit" | "profile", taskText?: string) => void;
  goToLogin: () => void; // nova prop
}

export default function TaskListScreen({ goTo, goToLogin }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([
    { text: "Botar ração para Kyara", done: false },
  ]);

  const toggleTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index].done = !newTasks[index].done;
    setTasks(newTasks);
  };

  const deleteTask = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <Box flex={1}>
      {/* Barra de navegação com avatar e logo clicável */}
      <NavBar
        title="Minhas Tarefas"
        showAvatar
        avatarUri="https://i.pravatar.cc/150?img=5"
        onAvatarPress={() => goTo("profile")}
        goToLogin={goToLogin} // aqui a logo volta para login
      />

      {/* Lista de tarefas */}
      <Box flex={1} p={5}>
        <VStack space={3} mb={20}>
          {tasks.map((task, index) => (
            <HStack
              key={index}
              justifyContent="space-between"
              alignItems="center"
              p={3}
              borderWidth={1}
              borderColor="green.300"
              borderRadius="md"
            >
            <Checkbox
  isChecked={task.done}
  onChange={() => toggleTask(index)}
  colorScheme="green"          // define a cor base como verde
  _checked={{ bg: "green.500", borderColor: "green.500" }}
>
  <Text
    ml={2}
    strikeThrough={task.done}
    color={task.done ? "red.400" : "black"}
  >
    {task.text}
  </Text>
</Checkbox>



              <HStack space={2}>
                <Pressable onPress={() => goTo("edit", task.text)}>
                  <Icon as={MaterialIcons} name="edit" size="sm" color="green.500" />
                </Pressable>
                <Pressable onPress={() => deleteTask(index)}>
                  <Icon as={MaterialIcons} name="delete" size="sm" color="red.500" />
                </Pressable>
              </HStack>
            </HStack>
          ))}
        </VStack>

        {/* Botão flutuante centralizado na parte inferior */}
        <Box position="absolute" bottom={15} left={0} right={0} alignItems="center">
          <Pressable
            onPress={() => goTo("create")}
            bg="green.500"
            p={5}
            borderRadius="full"
          >
            <Icon as={MaterialIcons} name="add" size="2xl" color="white" />
          </Pressable>
        </Box>
      </Box>
    </Box>
  );
}
