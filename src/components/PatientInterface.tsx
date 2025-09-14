import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Phone, Mail, Instagram, Facebook, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const channels = [
  { 
    id: 'online', 
    name: 'Atendimento Online', 
    icon: MessageSquare, 
    color: 'bg-primary', 
    online: true 
  },
  { 
    id: 'whatsapp', 
    name: 'WhatsApp', 
    icon: MessageSquare, 
    color: 'bg-green-500', 
    contact: '(11) 99999-9999',
    online: false 
  },
  { 
    id: 'phone', 
    name: 'Telefone', 
    icon: Phone, 
    color: 'bg-blue-500', 
    contact: '(11) 3456-7890',
    online: false 
  },
  { 
    id: 'email', 
    name: 'E-mail', 
    icon: Mail, 
    color: 'bg-red-500', 
    contact: 'atendimento@clinicamediacare.com.br',
    online: false 
  },
  { 
    id: 'instagram', 
    name: 'Instagram', 
    icon: Instagram, 
    color: 'bg-pink-500', 
    contact: '@clinicamediacare',
    online: false 
  },
  { 
    id: 'facebook', 
    name: 'Facebook', 
    icon: Facebook, 
    color: 'bg-blue-600', 
    contact: 'Clínica MediaCare',
    online: false 
  }
];

export const PatientInterface = () => {
  const [selectedChannel, setSelectedChannel] = useState('online');
  const [patientName, setPatientName] = useState('');
  const [patientContact, setPatientContact] = useState('');
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!patientName || !patientContact || !message) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }

    // Simulate message sending
    toast({
      title: "Mensagem enviada!",
      description: `Sua mensagem foi enviada via ${channels.find(c => c.id === selectedChannel)?.name}. Em breve entraremos em contato.`
    });

    // Reset form
    setPatientName('');
    setPatientContact('');
    setMessage('');
  };

  const selectedChannelData = channels.find(c => c.id === selectedChannel);
  const SelectedIcon = selectedChannelData?.icon || MessageSquare;

  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Central de Atendimento ao Paciente
          </h1>
          <p className="text-lg text-muted-foreground">
            Escolha seu canal preferido e entre em contato conosco
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Channel Selection */}
          <Card className="card-glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                Escolha o Canal de Atendimento
              </CardTitle>
              <CardDescription>
                Selecione como você gostaria de ser atendido
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {channels.map((channel) => {
                const Icon = channel.icon;
                return (
                  <Button
                    key={channel.id}
                    variant={selectedChannel === channel.id ? "default" : "outline"}
                    className="w-full justify-start gap-3 h-12"
                    onClick={() => setSelectedChannel(channel.id)}
                  >
                    <div className={`p-1.5 rounded-full ${channel.color} text-white`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    {channel.name}
                    {selectedChannel === channel.id && (
                      <Badge variant="secondary" className="ml-auto">
                        Selecionado
                      </Badge>
                    )}
                  </Button>
                );
              })}
            </CardContent>
          </Card>

          {/* Contact Form or Contact Info */}
          <Card className="card-glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SelectedIcon className="w-5 h-5 text-primary" />
                {selectedChannelData?.online ? 'Atendimento Online' : `Contato via ${selectedChannelData?.name}`}
              </CardTitle>
              <CardDescription>
                {selectedChannelData?.online 
                  ? 'Preencha seus dados e descreva como podemos ajudar'
                  : 'Use as informações abaixo para entrar em contato'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedChannelData?.online ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Nome Completo
                    </label>
                    <Input
                      placeholder="Digite seu nome completo"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      E-mail
                    </label>
                    <Input
                      placeholder="seu@email.com"
                      type="email"
                      value={patientContact}
                      onChange={(e) => setPatientContact(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Mensagem
                    </label>
                    <Textarea
                      placeholder="Descreva como podemos ajudar você (agendamento, dúvidas, resultados de exames, etc.)"
                      className="min-h-[120px]"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>

                  <Button type="submit" className="w-full gap-2">
                    <Send className="w-4 h-4" />
                    Iniciar Conversa Online
                  </Button>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className={`inline-flex p-4 rounded-full ${selectedChannelData?.color} text-white mb-4`}>
                      <SelectedIcon className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Entre em contato via {selectedChannelData?.name}
                    </h3>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-2xl font-bold text-foreground">
                        {selectedChannelData?.contact}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground text-center space-y-2">
                    <p>Horário de atendimento:</p>
                    <p className="font-medium">Segunda a Sexta: 8h às 18h</p>
                    <p className="font-medium">Sábado: 8h às 12h</p>
                  </div>

                  <div className="bg-accent/20 p-4 rounded-lg">
                    <p className="text-sm text-foreground">
                      💡 <strong>Dica:</strong> Para atendimento imediato, use nosso 
                      <Button 
                        variant="link" 
                        className="p-0 h-auto font-semibold text-primary"
                        onClick={() => setSelectedChannel('online')}
                      >
                        {" "}Atendimento Online
                      </Button>
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="card-glass mt-8">
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>
              Acesso rápido aos serviços mais utilizados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-16 flex-col gap-2">
                <MessageSquare className="w-5 h-5" />
                <span className="text-sm">Agendar Consulta</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-2">
                <Phone className="w-5 h-5" />
                <span className="text-sm">Resultados de Exames</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-2">
                <Mail className="w-5 h-5" />
                <span className="text-sm">Segunda Via de Guias</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};