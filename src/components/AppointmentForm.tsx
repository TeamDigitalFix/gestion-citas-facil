
import React, { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Check, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";

const formSchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio"),
  email: z.string().email("Correo electrónico inválido"),
  phone: z.string().min(9, "Número de teléfono inválido"),
  service: z.string().min(1, "Selecciona un servicio"),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const DEFAULT_VALUES: FormValues = {
  name: "",
  email: "",
  phone: "",
  service: "",
  notes: "",
};

const services = [
  { id: "1", name: "Consultoría web" },
  { id: "2", name: "Estrategia digital" },
  { id: "3", name: "Diseño UX/UI" },
  { id: "4", name: "Marketing digital" },
  { id: "5", name: "Otro servicio" },
];

interface AppointmentFormProps {
  selectedDate: Date;
  selectedTime: Date;
  onBack: () => void;
  onSubmit: (data: FormValues) => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  selectedDate,
  selectedTime,
  onBack,
  onSubmit,
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const handleSubmit = (data: FormValues) => {
    // Aquí manejaríamos el envío real del formulario
    onSubmit(data);
    toast.success("¡Cita reservada con éxito!", {
      description: "Te hemos enviado un correo de confirmación.",
    });
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Completa tus datos</h2>
        <Card className="bg-secondary/50 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <div className="flex items-center text-success">
                <Calendar className="mr-2" size={20} />
                <span className="font-medium">
                  {format(selectedDate, "EEEE d 'de' MMMM yyyy", {
                    locale: es,
                  })}
                </span>
              </div>
              <div className="flex items-center text-success">
                <Clock className="mr-2" size={20} />
                <span className="font-medium">
                  {format(selectedTime, "HH:mm")} h
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 animate-slide-up"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre completo</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Introduce tu nombre" 
                      {...field}
                      className="transition-all focus:border-success focus:ring-success" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo electrónico</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="correo@ejemplo.com" 
                      type="email" 
                      {...field} 
                      className="transition-all focus:border-success focus:ring-success"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de teléfono</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="+34 600 000 000" 
                      {...field} 
                      className="transition-all focus:border-success focus:ring-success"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Servicio</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="transition-all focus:border-success focus:ring-success">
                        <SelectValue placeholder="Selecciona un servicio" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notas adicionales (opcional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Escribe cualquier información adicional que necesitemos saber..." 
                    {...field} 
                    className="min-h-[120px] transition-all focus:border-success focus:ring-success"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="transition-all"
            >
              Volver
            </Button>
            <Button 
              type="submit"
              className="bg-success hover:bg-success-dark transition-colors"
            >
              Confirmar cita
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AppointmentForm;
