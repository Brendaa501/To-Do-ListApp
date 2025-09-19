import React, { useState } from "react";
import { NativeBaseProvider, Box } from "native-base";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import TaskListScreen from "./src/screens/TaskListScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

export interface User { id: number; name: string; email: string }
type ScreenType = "login" | "register" | "tasks" | "profile";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [screen, setScreen] = useState<ScreenType>("login");


  //////navegacao
  return (
    <NativeBaseProvider>
      <Box flex={1}>
        {screen === "login" && (
          <LoginScreen
            onLogin={(u: User) => { setUser(u); setScreen("tasks"); }}
            goToRegister={() => setScreen("register")}
          />
        )}
        {screen === "register" && (
          <RegisterScreen
            goToLogin={() => setScreen("login")}
            onRegister={(u: User) => { setUser(u); setScreen("tasks"); }}
          />
        )}
        {screen === "tasks" && user && (
          <TaskListScreen
            user={user}
            goTo={setScreen}
            goToLogin={() => { setUser(null); setScreen("login"); }}
          />
        )}
        {screen === "profile" && user && (
          <ProfileScreen
            user={user}
            goTo={setScreen}
            logout={() => { setUser(null); setScreen("login"); }}
          />
        )}
      </Box>
    </NativeBaseProvider>
  );
}
