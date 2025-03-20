import React, { useState } from "react";
import Layout from "@/components/Layout";
import CalendarView from "@/components/CalendarView";
import AppointmentForm from "@/components/AppointmentForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, Check, ArrowRight } from "lucide-react";
import { es } from "date-fns/locale";
import { format as formatDate } from "date-fns";

// Etapas del proceso de reserva
enum BookingStep {
  WELCOME,
  SELECT_DATE,
  COMPLETE_DETAILS,
  CONFIRMATION,
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState<BookingStep>(BookingStep.WELCOME);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [formData, setFormData] = useState<any>(null);

  const handleStartBooking = () => {
    setCurrentStep(BookingStep.SELECT_DATE);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSlotSelection = (date: Date, time: Date) => {
    setSelectedDate(date);
    setSelectedTime(time);
    setCurrentStep(BookingStep.COMPLETE_DETAILS);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setCurrentStep(BookingStep.SELECT_DATE);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFormSubmit = (data: any) => {
    setFormData(data);
    setCurrentStep(BookingStep.CONFIRMATION);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNewAppointment = () => {
    setCurrentStep(BookingStep.WELCOME);
    setSelectedDate(null);
    setSelectedTime(null);
    setFormData(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout>
      <div className="pt-24 pb-16 md:pt-32 md:pb-20">
        {/* Contenido principal */}
        <div className="container px-6 mx-auto">
          {currentStep === BookingStep.WELCOME && (
            <div className="max-w-4xl mx-auto animate-fade-in">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-success/10 text-success hover:bg-success/20 px-3 py-1">
                  Fácil y rápido
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                  Reserva tu cita en minutos
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                  Selecciona el día y hora que mejor te convenga para tu próxima consulta. Sin complicaciones y en pocos pasos.
                </p>
                <Button 
                  onClick={handleStartBooking}
                  className="bg-success hover:bg-success-dark text-white px-8 py-6 text-lg rounded-lg shadow-sm transition-all hover-scale"
                >
                  Reservar ahora <ArrowRight className="ml-2" size={18} />
                </Button>
              </div>

              {/* Características principales */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                <FeatureCard
                  icon={<CalendarDays className="w-10 h-10 text-success" />}
                  title="Horarios flexibles"
                  description="Encuentra el momento perfecto para tu consulta con nuestra amplia disponibilidad de horarios."
                />
                <FeatureCard
                  icon={<Clock className="w-10 h-10 text-success" />}
                  title="Reserva rápida"
                  description="Completa tu reserva en menos de 2 minutos con nuestro proceso simplificado."
                />
                <FeatureCard
                  icon={<Check className="w-10 h-10 text-success" />}
                  title="Confirmación inmediata"
                  description="Recibe confirmación instantánea por correo electrónico para tu tranquilidad."
                />
              </div>

              {/* Proceso simplificado */}
              <div className="mt-24">
                <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12">
                  Proceso simple en tres pasos
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <ProcessStep
                    number={1}
                    title="Elige fecha y hora"
                    description="Selecciona el día y horario que mejor se adapte a tu agenda."
                  />
                  <ProcessStep
                    number={2}
                    title="Completa tus datos"
                    description="Introduce la información básica necesaria para tu cita."
                  />
                  <ProcessStep
                    number={3}
                    title="Confirmación"
                    description="Recibe la confirmación de tu cita instantáneamente."
                  />
                </div>
              </div>

              <div className="text-center mt-16">
                <Button 
                  onClick={handleStartBooking}
                  className="bg-success hover:bg-success-dark text-white px-8 py-6 text-lg rounded-lg shadow-sm transition-all hover-scale"
                >
                  Reservar ahora <ArrowRight className="ml-2" size={18} />
                </Button>
              </div>
            </div>
          )}

          {currentStep === BookingStep.SELECT_DATE && (
            <div className="max-w-4xl mx-auto">
              <div className="mb-8 animate-slide-down">
                <h1 className="text-3xl font-bold mb-2">Reserva tu cita</h1>
                <p className="text-muted-foreground">
                  Selecciona la fecha y hora que prefieras para tu cita
                </p>
              </div>
              <CalendarView onSelectSlot={handleSlotSelection} />
            </div>
          )}

          {currentStep === BookingStep.COMPLETE_DETAILS && selectedDate && selectedTime && (
            <div className="max-w-3xl mx-auto">
              <AppointmentForm
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onBack={handleBack}
                onSubmit={handleFormSubmit}
              />
            </div>
          )}

          {currentStep === BookingStep.CONFIRMATION && (
            <div className="max-w-2xl mx-auto text-center animate-fade-in">
              <div className="mb-10">
                <div className="w-24 h-24 rounded-full bg-success/20 mx-auto flex items-center justify-center mb-6">
                  <Check className="w-12 h-12 text-success" />
                </div>
                <h1 className="text-3xl font-bold mb-4">¡Cita reservada con éxito!</h1>
                <p className="text-lg text-muted-foreground">
                  Te hemos enviado un correo electrónico de confirmación con todos los detalles.
                </p>
              </div>

              <Card className="border border-border/50 shadow-sm mb-10">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="text-left">
                        <p className="text-sm text-muted-foreground mb-1">Nombre</p>
                        <p className="font-medium">{formData?.name}</p>
                      </div>
                      <div className="text-left">
                        <p className="text-sm text-muted-foreground mb-1">Servicio</p>
                        <p className="font-medium">
                          {services.find(s => s.id === formData?.service)?.name || "No especificado"}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="text-left">
                        <p className="text-sm text-muted-foreground mb-1">Fecha</p>
                        <p className="font-medium flex items-center">
                          <CalendarDays size={16} className="mr-2 text-success" />
                          {selectedDate && format(selectedDate, "EEEE d 'de' MMMM yyyy", { locale: es })}
                        </p>
                      </div>
                      <div className="text-left">
                        <p className="text-sm text-muted-foreground mb-1">Hora</p>
                        <p className="font-medium flex items-center">
                          <Clock size={16} className="mr-2 text-success" />
                          {selectedTime && format(selectedTime, "HH:mm")} h
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button
                onClick={handleNewAppointment}
                className="mt-6"
              >
                Reservar nueva cita
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <Card className="hover-scale transition-all border-border/40">
    <CardContent className="pt-6 text-center">
      <div className="mb-5 flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const ProcessStep = ({ number, title, description }: { number: number, title: string, description: string }) => (
  <div className="flex flex-col items-center text-center">
    <div className="w-14 h-14 rounded-full bg-success flex items-center justify-center text-white text-xl font-bold mb-4">
      {number}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const services = [
  { id: "1", name: "Consultoría web" },
  { id: "2", name: "Estrategia digital" },
  { id: "3", name: "Diseño UX/UI" },
  { id: "4", name: "Marketing digital" },
  { id: "5", name: "Otro servicio" },
];

const format = (date: Date, formatStr: string, options?: any) => {
  return formatDate(date, formatStr, { locale: es, ...options });
};

export default Index;
