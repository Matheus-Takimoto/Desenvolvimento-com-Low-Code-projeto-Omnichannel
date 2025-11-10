import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, MessageSquare, Users, BarChart3, Settings, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";

interface HeaderProps {
  currentUser: {
    name: string;
    role: 'atendente' | 'gerente';
    avatar?: string;
  };
  onRoleChange: (role: 'atendente' | 'gerente') => void;
}

export function Header({ currentUser, onRoleChange }: HeaderProps) {
  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">MediaCare Omnichannel</h1>
          </div>
          
          <Link to="/patient">
            <Button variant="outline" size="sm" className="gap-2">
              <User className="w-4 h-4" />
              Portal do Paciente
            </Button>
          </Link>
          
          <Badge variant="outline" className="text-sm">
            {currentUser.role === 'gerente' ? 'Gerente' : 'Atendente'}
          </Badge>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            <Button
              variant={currentUser.role === 'atendente' ? 'default' : 'secondary'}
              size="sm"
              onClick={() => onRoleChange('atendente')}
            >
              <Users className="w-4 h-4 mr-2" />
              Atendente
            </Button>
            <Button
              variant={currentUser.role === 'gerente' ? 'default' : 'secondary'}
              size="sm"
              onClick={() => onRoleChange('gerente')}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Gerente
            </Button>
          </div>

          <Button variant="ghost" size="sm">
            <Bell className="w-4 h-4" />
          </Button>
          
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>

          <div className="flex items-center space-x-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src={currentUser.avatar} />
              <AvatarFallback>{currentUser.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-foreground">{currentUser.name}</span>
          </div>

          <Button variant="ghost" size="sm">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}