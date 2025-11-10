import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Phone, Mail, MessageCircle, Instagram, Facebook, Clock, CheckCircle2 } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: 'patient' | 'attendant';
  timestamp: string;
  channel: 'whatsapp' | 'instagram' | 'facebook' | 'email' | 'phone' | 'website';
  status?: 'sent' | 'delivered' | 'read';
}

interface Patient {
  id: string;
  name: string;
  avatar?: string;
  phone: string;
  lastChannel: string;
  status: 'waiting' | 'active' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  waitTime: string;
}

const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Maria Silva',
    phone: '(11) 99999-9999',
    lastChannel: 'WhatsApp',
    status: 'active',
    priority: 'high',
    waitTime: '5 min'
  },
  {
    id: '2',
    name: 'João Santos',
    phone: '(11) 88888-8888',
    lastChannel: 'Instagram',
    status: 'waiting',
    priority: 'medium',
    waitTime: '12 min'
  },
  {
    id: '3',
    name: 'Ana Costa',
    phone: '(11) 77777-7777',
    lastChannel: 'Facebook',
    status: 'waiting',
    priority: 'low',
    waitTime: '18 min'
  }
];

const mockMessages: Message[] = [
  {
    id: '1',
    content: 'Olá! Gostaria de agendar uma consulta com o cardiologista.',
    sender: 'patient',
    timestamp: '14:30',
    channel: 'whatsapp',
    status: 'read'
  },
  {
    id: '2',
    content: 'Olá Maria! Claro, posso ajudá-la. Temos horários disponíveis para esta semana. Qual seria o melhor dia para você?',
    sender: 'attendant',
    timestamp: '14:32',
    channel: 'whatsapp',
    status: 'delivered'
  },
  {
    id: '3',
    content: 'Seria possível na quinta-feira pela manhã?',
    sender: 'patient',
    timestamp: '14:35',
    channel: 'whatsapp',
    status: 'read'
  }
];

const getChannelIcon = (channel: string) => {
  switch (channel.toLowerCase()) {
    case 'whatsapp': return <MessageCircle className="w-4 h-4 text-green-600" />;
    case 'instagram': return <Instagram className="w-4 h-4 text-pink-600" />;
    case 'facebook': return <Facebook className="w-4 h-4 text-blue-600" />;
    case 'email': return <Mail className="w-4 h-4 text-gray-600" />;
    case 'phone': return <Phone className="w-4 h-4 text-orange-600" />;
    default: return <MessageCircle className="w-4 h-4 text-primary" />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'destructive';
    case 'medium': return 'warning';
    case 'low': return 'secondary';
    default: return 'secondary';
  }
};

export function ChatInterface() {
  const [selectedPatient, setSelectedPatient] = useState<Patient>(mockPatients[0]);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'attendant',
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      channel: 'whatsapp',
      status: 'sent'
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="flex h-[calc(100vh-80px)]">
      {/* Patient List */}
      <div className="w-80 border-r border-border bg-card">
        <div className="p-4 border-b border-border">
          <h2 className="font-semibold text-foreground">Fila de Atendimento</h2>
          <p className="text-sm text-muted-foreground">{mockPatients.length} pacientes aguardando</p>
        </div>
        
        <div className="overflow-y-auto">
          {mockPatients.map((patient) => (
            <div
              key={patient.id}
              className={`p-4 border-b border-border cursor-pointer hover:bg-muted/50 transition-colors ${
                selectedPatient.id === patient.id ? 'bg-muted' : ''
              }`}
              onClick={() => setSelectedPatient(patient)}
            >
              <div className="flex items-start space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={patient.avatar} />
                  <AvatarFallback>{patient.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground truncate">{patient.name}</p>
                    <div className="flex items-center space-x-1">
                      {getChannelIcon(patient.lastChannel)}
                      <Badge variant={getPriorityColor(patient.priority) as any} className="text-xs">
                        {patient.priority}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground">{patient.phone}</p>
                  
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground">{patient.lastChannel}</span>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{patient.waitTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-border bg-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback>{selectedPatient.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-foreground">{selectedPatient.name}</p>
                <div className="flex items-center space-x-2">
                  {getChannelIcon(selectedPatient.lastChannel)}
                  <span className="text-sm text-muted-foreground">{selectedPatient.lastChannel}</span>
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">{selectedPatient.phone}</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button size="sm" variant="outline">
                <Phone className="w-4 h-4 mr-2" />
                Ligar
              </Button>
              <Button size="sm" variant="outline">
                Transferir
              </Button>
              <Button size="sm" variant="default">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Resolver
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'attendant' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === 'attendant'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border text-card-foreground'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs opacity-70">{message.timestamp}</span>
                  {message.sender === 'attendant' && (
                    <div className="flex items-center space-x-1">
                      {getChannelIcon(message.channel)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-border bg-card">
          <div className="flex space-x-2">
            <Input
              placeholder="Digite sua mensagem..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1"
            />
            <Button onClick={sendMessage} size="sm">
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex space-x-2 mt-2">
            <Button variant="outline" size="sm">Respostas Rápidas</Button>
            <Button variant="outline" size="sm">Agendar Consulta</Button>
            <Button variant="outline" size="sm">Solicitar Exames</Button>
          </div>
        </div>
      </div>
    </div>
  );
}