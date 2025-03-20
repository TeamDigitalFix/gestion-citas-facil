
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Layout from "@/components/Layout";
import { Lock } from "lucide-react";

const formSchema = z.object({
  email: z.string().email("Correo electrónico inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type FormValues = z.infer<typeof formSchema>;

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    
    // Simular una verificación de usuario
    // En una implementación real, esto sería una llamada a la API
    try {
      // Simulamos una respuesta del servidor
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Credenciales de ejemplo para admin
      if (data.email === "admin@example.com" && data.password === "123456") {
        toast.success("Inicio de sesión exitoso");
        // Guardamos el estado de autenticación en localStorage
        localStorage.setItem("isAuthenticated", "true");
        navigate("/admin");
      } else {
        toast.error("Credenciales incorrectas");
      }
    } catch (error) {
      toast.error("Error al iniciar sesión");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout className="bg-gray-50">
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Acceso administrador</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Ingresa tus credenciales para acceder al panel de administración
            </p>
          </div>

          <Card className="shadow-md border-gray-200 animate-fade-in">
            <CardHeader className="space-y-1">
              <div className="w-12 h-12 rounded-full bg-primary/10 mx-auto flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-2xl text-center font-semibold">
                Iniciar sesión
              </CardTitle>
              <CardDescription className="text-center">
                Ingresa tus datos para continuar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contraseña</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Tu contraseña" 
                            type="password" 
                            {...field} 
                            className="transition-all focus:border-success focus:ring-success"
                          />
                        </FormControl>
                        <FormMessage />
                        <p className="text-xs text-muted-foreground mt-2">
                          Demo: admin@example.com / 123456
                        </p>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-success hover:bg-success-dark transition-colors"
                    disabled={isLoading}
                  >
                    {isLoading ? "Procesando..." : "Iniciar sesión"}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-xs text-muted-foreground">
                Área restringida solo para administradores
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
