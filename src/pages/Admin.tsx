
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  FileText,
  X,
  Check,
  Download,
  LogOut,
  Search,
  Filter,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Datos de ejemplo para las citas
const SAMPLE_APPOINTMENTS = [
  {
    id: 1,
    name: "Carlos Rodríguez",
    email: "carlos@example.com",
    phone: "+34 612 345 678",
    date: new Date(2023, 10, 25, 10, 0),
    service: "Consultoría web",
    status: "confirmed",
    notes: "Primera consulta para proyecto de e-commerce",
  },
  {
    id: 2,
    name: "María López",
    email: "maria@example.com",
    phone: "+34 623 456 789",
    date: new Date(2023, 10, 26, 12, 0),
    service: "Estrategia digital",
    status: "confirmed",
    notes: "",
  },
  {
    id: 3,
    name: "Juan Pérez",
    email: "juan@example.com",
    phone: "+34 634 567 890",
    date: new Date(2023, 10, 27, 16, 0),
    service: "Diseño UX/UI",
    status: "pending",
    notes: "Necesita consulta urgente",
  },
  {
    id: 4,
    name: "Ana Martínez",
    email: "ana@example.com",
    phone: "+34 645 678 901",
    date: new Date(2023, 10, 28, 11, 0),
    service: "Marketing digital",
    status: "cancelled",
    notes: "",
  },
  {
    id: 5,
    name: "Roberto Sánchez",
    email: "roberto@example.com",
    phone: "+34 656 789 012",
    date: new Date(2023, 10, 29, 15, 30),
    service: "Consultoría web",
    status: "confirmed",
    notes: "Segundo seguimiento",
  },
];

const Admin = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [appointments, setAppointments] = useState(SAMPLE_APPOINTMENTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    // Verificar autenticación
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus !== "true") {
      navigate("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
    toast.success("Sesión cerrada correctamente");
  };

  const handleStatusChange = (appointmentId: number, newStatus: string) => {
    setAppointments(prevAppointments =>
      prevAppointments.map(appointment =>
        appointment.id === appointmentId
          ? { ...appointment, status: newStatus }
          : appointment
      )
    );

    const statusMessages = {
      confirmed: "Cita confirmada correctamente",
      cancelled: "Cita cancelada correctamente",
      pending: "Cita marcada como pendiente",
    };

    toast.success(statusMessages[newStatus as keyof typeof statusMessages] || "Estado actualizado");
  };

  const handleExportCsv = () => {
    // En una implementación real, esto generaría un CSV real para descargar
    toast.success("Exportando datos...", {
      description: "El archivo CSV se descargará en breve",
    });
  };

  // Filtrar las citas basadas en los filtros actuales
  const filteredAppointments = appointments.filter(appointment => {
    // Filtro por estado
    if (statusFilter !== "all" && appointment.status !== statusFilter) {
      return false;
    }

    // Filtro por fecha
    if (dateFilter && !appointment.date.toISOString().includes(dateFilter)) {
      return false;
    }

    // Filtro por término de búsqueda
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        appointment.name.toLowerCase().includes(searchLower) ||
        appointment.email.toLowerCase().includes(searchLower) ||
        appointment.phone.toLowerCase().includes(searchLower) ||
        appointment.service.toLowerCase().includes(searchLower) ||
        (appointment.notes && appointment.notes.toLowerCase().includes(searchLower))
      );
    }

    return true;
  });

  // Función auxiliar para formatear fechas
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  if (!isAuthenticated) {
    return null; // No mostrar nada hasta que se verifique la autenticación
  }

  return (
    <div className="min-h-screen bg-secondary/40">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            Panel de <span className="text-success">Administración</span>
          </h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Cerrar sesión
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            title="Citas hoy"
            value="2"
            icon={<Calendar className="w-5 h-5 text-success" />}
          />
          <StatsCard
            title="Citas pendientes"
            value="4"
            icon={<Clock className="w-5 h-5 text-amber-500" />}
          />
          <StatsCard
            title="Total citas este mes"
            value="28"
            icon={<User className="w-5 h-5 text-blue-500" />}
          />
        </div>

        <Card className="shadow-sm border-gray-200 mb-8">
          <CardHeader className="pb-3">
            <CardTitle>Gestión de citas</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <TabsList>
                  <TabsTrigger value="all">Todas las citas</TabsTrigger>
                  <TabsTrigger value="confirmed">Confirmadas</TabsTrigger>
                  <TabsTrigger value="pending">Pendientes</TabsTrigger>
                  <TabsTrigger value="cancelled">Canceladas</TabsTrigger>
                </TabsList>

                <div className="flex flex-wrap gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type="search"
                      placeholder="Buscar..."
                      className="pl-9 w-[200px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Input
                    type="date"
                    className="w-[180px]"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                  />
                  <div className="flex items-center">
                    <Filter className="w-4 h-4 mr-2 text-gray-400" />
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos los estados</SelectItem>
                        <SelectItem value="confirmed">Confirmadas</SelectItem>
                        <SelectItem value="pending">Pendientes</SelectItem>
                        <SelectItem value="cancelled">Canceladas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleExportCsv}>
                    <Download className="w-4 h-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </div>

              <TabsContent value="all" className="m-0">
                <AppointmentsTable
                  appointments={filteredAppointments}
                  onStatusChange={handleStatusChange}
                  formatDate={formatDate}
                  formatTime={formatTime}
                />
              </TabsContent>
              <TabsContent value="confirmed" className="m-0">
                <AppointmentsTable
                  appointments={filteredAppointments.filter(a => a.status === "confirmed")}
                  onStatusChange={handleStatusChange}
                  formatDate={formatDate}
                  formatTime={formatTime}
                />
              </TabsContent>
              <TabsContent value="pending" className="m-0">
                <AppointmentsTable
                  appointments={filteredAppointments.filter(a => a.status === "pending")}
                  onStatusChange={handleStatusChange}
                  formatDate={formatDate}
                  formatTime={formatTime}
                />
              </TabsContent>
              <TabsContent value="cancelled" className="m-0">
                <AppointmentsTable
                  appointments={filteredAppointments.filter(a => a.status === "cancelled")}
                  onStatusChange={handleStatusChange}
                  formatDate={formatDate}
                  formatTime={formatTime}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

// Componentes auxiliares
const StatsCard = ({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) => (
  <Card className="shadow-sm border-gray-200">
    <CardContent className="p-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
        </div>
        <div className="bg-primary/5 p-3 rounded-full">{icon}</div>
      </div>
    </CardContent>
  </Card>
);

interface AppointmentsTableProps {
  appointments: Array<{
    id: number;
    name: string;
    email: string;
    phone: string;
    date: Date;
    service: string;
    status: string;
    notes?: string;
  }>;
  onStatusChange: (id: number, status: string) => void;
  formatDate: (date: Date) => string;
  formatTime: (date: Date) => string;
}

const AppointmentsTable: React.FC<AppointmentsTableProps> = ({
  appointments,
  onStatusChange,
  formatDate,
  formatTime,
}) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
            <TableHead>Contacto</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Hora</TableHead>
            <TableHead>Servicio</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                No hay citas que coincidan con los filtros actuales
              </TableCell>
            </TableRow>
          ) : (
            appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{appointment.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-sm">
                      <Mail className="w-3 h-3 text-muted-foreground" />
                      <span>{appointment.email}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Phone className="w-3 h-3 text-muted-foreground" />
                      <span>{appointment.phone}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{formatDate(appointment.date)}</TableCell>
                <TableCell>{formatTime(appointment.date)}</TableCell>
                <TableCell>{appointment.service}</TableCell>
                <TableCell>
                  <StatusBadge status={appointment.status} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0"
                      onClick={() => onStatusChange(appointment.id, "confirmed")}
                      disabled={appointment.status === "confirmed"}
                    >
                      <Check className="h-4 w-4" />
                      <span className="sr-only">Confirmar</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0"
                      onClick={() => onStatusChange(appointment.id, "cancelled")}
                      disabled={appointment.status === "cancelled"}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Cancelar</span>
                    </Button>
                    {appointment.notes && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0"
                        title={appointment.notes}
                      >
                        <FileText className="h-4 w-4" />
                        <span className="sr-only">Ver notas</span>
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "confirmed":
      return (
        <Badge className="bg-success/20 text-success hover:bg-success/30 border-success/20">
          Confirmada
        </Badge>
      );
    case "pending":
      return (
        <Badge className="bg-amber-500/20 text-amber-700 hover:bg-amber-500/30 border-amber-500/20">
          Pendiente
        </Badge>
      );
    case "cancelled":
      return (
        <Badge className="bg-destructive/20 text-destructive hover:bg-destructive/30 border-destructive/20">
          Cancelada
        </Badge>
      );
    default:
      return null;
  }
};

export default Admin;
