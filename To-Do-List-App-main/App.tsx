import React, { useState } from "react";
import { NativeBaseProvider, Box } from "native-base";

import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import TaskListScreen from "./src/screens/TaskListScreen";
import CreateTaskScreen from "./src/screens/CreateTaskScreen";
import EditTaskScreen from "./src/screens/EditTaskScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

export default function App() {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [screen, setScreen] = useState<
    "login" | "register" | "tasks" | "create" | "edit" | "profile"
  >("login");
  const [selectedTask, setSelectedTask] = useState<string>("");

  // Função para login
  const handleLogin = (email: string) => {
    setUser({ email });
    setScreen("tasks");
  };

  // Função para cadastro
  const handleRegister = (name: string, email: string, password: string) => {
    console.log("Cadastro:", { name, email, password });
    setUser({ email });
    setScreen("tasks");
  };

  // Função de navegação
  const goTo = (next: "tasks" | "create" | "edit" | "profile", task?: string) => {
    if (task) setSelectedTask(task);
    setScreen(next);
  };

  // Logout / voltar para login
  const goToLogin = () => {
    setUser(null);
    setScreen("login");
  };

  return (
    <NativeBaseProvider>
      <Box flex={1}>
        {screen === "login" ? (
          <LoginScreen
            onLogin={handleLogin}
            goToRegister={() => setScreen("register")}
          />
        ) : screen === "register" ? (
          <RegisterScreen onRegister={handleRegister} goToLogin={goToLogin} />
        ) : screen === "tasks" ? (
          <TaskListScreen goTo={goTo} goToLogin={goToLogin} />
        ) : screen === "create" ? (
          <CreateTaskScreen goTo={goTo} goToLogin={goToLogin} />
        ) : screen === "edit" ? (
          <EditTaskScreen goTo={goTo} taskText={selectedTask} goToLogin={goToLogin} />
        ) : (
          <ProfileScreen goTo={goTo} user={user} logout={goToLogin} />
        )}
      </Box>
    </NativeBaseProvider>
  );
}
