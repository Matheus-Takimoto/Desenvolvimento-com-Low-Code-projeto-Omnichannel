import { useState } from "react";
import { Header } from "@/components/Header";
import { ChatInterface } from "@/components/ChatInterface";
import { ManagerDashboard } from "@/components/ManagerDashboard";

const Index = () => {
  const [currentUser, setCurrentUser] = useState({
    name: "Dr. Ana Silva",
    role: 'atendente' as 'atendente' | 'gerente',
    avatar: undefined
  });

  const handleRoleChange = (role: 'atendente' | 'gerente') => {
    setCurrentUser(prev => ({ ...prev, role }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header currentUser={currentUser} onRoleChange={handleRoleChange} />
      
      {currentUser.role === 'atendente' ? (
        <ChatInterface />
      ) : (
        <ManagerDashboard />
      )}
    </div>
  );
};

export default Index;