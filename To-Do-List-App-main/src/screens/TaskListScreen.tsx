import React, { useState, useEffect } from "react";
import { Box, VStack, HStack, Text, Checkbox, Pressable, Icon, Modal, Button, Input, Toast } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import NavBar from "./components/NavBar";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../../App";

// Define estrutura de uma tarefa
interface Task {
  id: number;
  user_id: number;
  text: string;
  done: boolean;
}

// Props que o componente recebe
interface TaskListScreenProps {
  user: User; // Usuário logado
  goTo: (screen: "tasks" | "profile") => void; // Navegação entre telas
  goToLogin: () => void; // Logout leva à tela de login
}

// Componente principal da lista de tarefas
export default function TaskListScreen({ user, goTo, goToLogin }: TaskListScreenProps) {

  // Estados do componente
  const [tasks, setTasks] = useState<Task[]>([]);          // Lista de tarefas
  const [modalVisible, setModalVisible] = useState(false); // Controle do modal de criação/edição
  const [currentTask, setCurrentTask] = useState("");      // Texto da tarefa atual
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null); // Id da tarefa que está sendo editada

  // Função para pegar o token do AsyncStorage
  const getToken = async () => await AsyncStorage.getItem("token");

  // Função para carregar tarefas do backend
  const loadTasks = async () => {
    try {
      const token = await getToken(); // pega token JWT
      // Faz requisição GET passando id do usuário e token
      const res = await axios.get(`http://localhost:3000/tasks/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data); // Atualiza estado com tarefas
    } catch (err) {
      Toast.show({ title: "Erro ao carregar tarefas", status: "error" });
    }
  };

  // Carrega tarefas quando o componente monta
  useEffect(() => { loadTasks(); }, []);

  // Função para criar ou atualizar tarefa
  const saveTask = async () => {
    if (!currentTask.trim()) {
      Toast.show({ title: "Digite uma tarefa", status: "warning" });
      return;
    }

    const token = await getToken();
    if (!token) return Toast.show({ title: "Usuário não autenticado", status: "error" });

    try {
      if (editingTaskId === null) {
        // Cria nova tarefa
        await axios.post("http://localhost:3000/tasks", {
          user_id: user.id,
          text: currentTask.trim()
        }, { headers: { Authorization: `Bearer ${token}` }});
        Toast.show({ title: "Tarefa adicionada!", status: "success" });
      } else {
        // Atualiza tarefa existente
        await axios.put(`http://localhost:3000/tasks/${editingTaskId}`, {
          text: currentTask.trim(),
          done: tasks.find(t => t.id === editingTaskId)?.done,
          user_id: user.id
        }, { headers: { Authorization: `Bearer ${token}` }});
        Toast.show({ title: "Tarefa atualizada!", status: "success" });
      }

      // Fecha modal e limpa campos
      setModalVisible(false);
      setCurrentTask("");
      setEditingTaskId(null);
      loadTasks(); // Recarrega tarefas
    } catch (err) {
      Toast.show({ title: "Erro ao salvar tarefa", status: "error" });
    }
  };

  // Alterna estado de conclusão da tarefa
  const toggleTask = async (task: Task) => {
    const token = await getToken();
    await axios.put(`http://localhost:3000/tasks/${task.id}`, {
      text: task.text,
      done: !task.done,
      user_id: user.id
    }, { headers: { Authorization: `Bearer ${token}` }});
    loadTasks();
  };

  // Deleta uma tarefa
  const deleteTask = async (taskId: number) => {
    const token = await getToken();
    await axios.delete(`http://localhost:3000/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { user_id: user.id }
    });
    loadTasks();
    Toast.show({ title: "Tarefa deletada!", status: "success" });
  };

  return (
    <Box flex={1}>
      <NavBar
        title="Minhas Tarefas"
        goToLogin={goToLogin}
        showAvatar
        userName={user.name}
        onAvatarPress={() => goTo("profile")}
      />

      <Box flex={1} p={5}>
        <VStack space={3} mb={20}>
          {tasks.map(task => (
            <HStack key={task.id} justifyContent="space-between" alignItems="center" p={3} borderWidth={1} borderColor="green.300" borderRadius="md">
              <Checkbox isChecked={task.done} onChange={() => toggleTask(task)} colorScheme="green">
                <Text ml={2} strikeThrough={task.done} color={task.done ? "red.400" : "black"}>{task.text}</Text>
              </Checkbox>
              <HStack space={2}>
                <Pressable onPress={() => { setCurrentTask(task.text); setEditingTaskId(task.id); setModalVisible(true); }}>
                  <Icon as={MaterialIcons} name="edit" size="sm" color="green.500" />
                </Pressable>
                <Pressable onPress={() => deleteTask(task.id)}>
                  <Icon as={MaterialIcons} name="delete" size="sm" color="red.500" />
                </Pressable>
              </HStack>
            </HStack>
          ))}
        </VStack>

        <Box position="absolute" bottom={15} left={0} right={0} alignItems="center">
          <Pressable onPress={() => { setCurrentTask(""); setEditingTaskId(null); setModalVisible(true); }} bg="green.500" p={5} borderRadius="full">
            <Icon as={MaterialIcons} name="add" size="2xl" color="white" />
          </Pressable>
        </Box>
      </Box>

      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>{editingTaskId === null ? "Nova Tarefa" : "Editar Tarefa"}</Modal.Header>
          <Modal.Body>
            <Input value={currentTask} onChangeText={setCurrentTask} placeholder="Nome da tarefa" borderColor="green.500" />
          </Modal.Body>
          <Modal.Footer>
            <Button flex={1} onPress={saveTask} bg="green.500">{editingTaskId === null ? "Adicionar" : "Salvar"}</Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Box>
  );
}
