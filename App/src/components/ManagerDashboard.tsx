import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  MessageSquare, 
  Clock, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle,
  PhoneCall,
  Mail,
  Instagram,
  Facebook,
  MessageCircle,
  BarChart3,
  Calendar,
  Star
} from "lucide-react";

interface AttendantMetrics {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'busy' | 'away';
  activeChats: number;
  resolvedToday: number;
  avgResponseTime: string;
  rating: number;
  efficiency: number;
}

const mockAttendants: AttendantMetrics[] = [
  {
    id: '1',
    name: 'Ana Costa',
    status: 'online',
    activeChats: 3,
    resolvedToday: 24,
    avgResponseTime: '2m 15s',
    rating: 4.8,
    efficiency: 92
  },
  {
    id: '2',
    name: 'Carlos Silva',
    status: 'busy',
    activeChats: 5,
    resolvedToday: 18,
    avgResponseTime: '3m 42s',
    rating: 4.6,
    efficiency: 87
  },
  {
    id: '3',
    name: 'Maria Santos',
    status: 'online',
    activeChats: 2,
    resolvedToday: 31,
    avgResponseTime: '1m 58s',
    rating: 4.9,
    efficiency: 95
  }
];

const channelStats = [
  { name: 'WhatsApp', messages: 145, icon: MessageCircle, color: 'text-green-600' },
  { name: 'Instagram', messages: 67, icon: Instagram, color: 'text-pink-600' },
  { name: 'Facebook', messages: 89, icon: Facebook, color: 'text-blue-600' },
  { name: 'E-mail', messages: 34, icon: Mail, color: 'text-gray-600' },
  { name: 'Telefone', messages: 23, icon: PhoneCall, color: 'text-orange-600' }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'online': return 'success';
    case 'busy': return 'warning';
    case 'away': return 'secondary';
    default: return 'secondary';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'online': return 'Online';
    case 'busy': return 'Ocupado';
    case 'away': return 'Ausente';
    default: return 'Offline';
  }
};

export function ManagerDashboard() {
  const totalMessages = channelStats.reduce((sum, channel) => sum + channel.messages, 0);
  const avgResponseTime = '2m 38s';
  const resolutionRate = 94;
  const satisfactionRate = 4.7;

  return (
    <div className="p-6 space-y-6 bg-background">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-card hover:shadow-hover transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mensagens Hoje</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{totalMessages}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+12%</span> em relação a ontem
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-hover transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo Médio Resposta</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{avgResponseTime}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">-8%</span> melhoria no SLA
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-hover transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa Resolução</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{resolutionRate}%</div>
            <p className="text-xs text-muted-foreground">
              Meta: 90% <span className="text-success">✓ Atingida</span>
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-hover transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfação</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{satisfactionRate}/5</div>
            <p className="text-xs text-muted-foreground">
              Baseado em 127 avaliações
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Channel Statistics */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Mensagens por Canal</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {channelStats.map((channel) => {
              const Icon = channel.icon;
              const percentage = Math.round((channel.messages / totalMessages) * 100);
              
              return (
                <div key={channel.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon className={`h-4 w-4 ${channel.color}`} />
                      <span className="font-medium">{channel.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-medium">{channel.messages}</span>
                      <span className="text-sm text-muted-foreground ml-2">({percentage}%)</span>
                    </div>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Team Performance */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Performance da Equipe</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAttendants.map((attendant) => (
                <div key={attendant.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={attendant.avatar} />
                        <AvatarFallback>{attendant.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${
                        attendant.status === 'online' ? 'bg-success' :
                        attendant.status === 'busy' ? 'bg-warning' : 'bg-muted-foreground'
                      }`} />
                    </div>
                    
                    <div>
                      <p className="font-medium text-foreground">{attendant.name}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>Chats: {attendant.activeChats}</span>
                        <span>Resolvidos: {attendant.resolvedToday}</span>
                        <span>Tempo: {attendant.avgResponseTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <Badge variant={getStatusColor(attendant.status) as any} className="mb-1">
                      {getStatusText(attendant.status)}
                    </Badge>
                    <div className="flex items-center space-x-2 text-sm">
                      <Star className="w-4 h-4 text-warning fill-current" />
                      <span>{attendant.rating}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-success">{attendant.efficiency}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <Button>
            <Calendar className="w-4 h-4 mr-2" />
            Relatório Completo
          </Button>
          <Button variant="outline">
            <TrendingUp className="w-4 h-4 mr-2" />
            Análise Detalhada
          </Button>
        </div>

        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <AlertTriangle className="w-4 h-4 text-warning" />
          <span>2 atendimentos críticos pendentes</span>
        </div>
      </div>
    </div>
  );
}