
import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format, isEqual, isSameMonth, isBefore, addHours, addDays } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Check } from "lucide-react";

const unavailableDates = [
  new Date(2023, 10, 23), // Ejemplos de fechas no disponibles
  new Date(2023, 10, 24),
];

// Simulación de horarios disponibles por día
const generateTimeSlots = (date: Date) => {
  // Empezar a las 9:00 AM
  let startTime = new Date(date);
  startTime.setHours(9, 0, 0, 0);

  // Terminar a las 6:00 PM
  const endTime = new Date(date);
  endTime.setHours(18, 0, 0, 0);

  const slots = [];
  
  // Crear intervalos de 1 hora
  while (startTime < endTime) {
    // Aleatoriamente marcar algunos horarios como no disponibles
    const isAvailable = Math.random() > 0.3;
    slots.push({
      time: new Date(startTime),
      available: isAvailable
    });
    startTime = addHours(startTime, 1);
  }
  
  return slots;
};

interface TimeSlot {
  time: Date;
  available: boolean;
}

const CalendarView: React.FC<{
  onSelectSlot: (date: Date, time: Date) => void;
}> = ({ onSelectSlot }) => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(today);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(generateTimeSlots(today));
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setTimeSlots(generateTimeSlots(date));
      setSelectedTime(null);
    }
  };

  const handleTimeSelect = (time: Date) => {
    setSelectedTime(time);
  };

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      onSelectSlot(selectedDate, selectedTime);
    }
  };

  const isDateUnavailable = (date: Date) => {
    // No permitir fechas en el pasado
    if (isBefore(date, new Date())) {
      return true;
    }
    
    // Verificar si está en lista de no disponibles
    return unavailableDates.some(unavailableDate => 
      isEqual(new Date(unavailableDate.setHours(0, 0, 0, 0)), new Date(date.setHours(0, 0, 0, 0)))
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 animate-fade-in">
      <div className="p-4">
        <h3 className="text-lg font-medium mb-4">Selecciona un día</h3>
        <div className="border rounded-xl overflow-hidden shadow-sm">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            locale={es}
            disabled={isDateUnavailable}
            className={cn("p-4 pointer-events-auto")}
          />
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-medium mb-4">
          {selectedDate
            ? `Horarios disponibles para el ${format(selectedDate, "d 'de' MMMM yyyy", { locale: es })}`
            : "Selecciona un día para ver horarios"}
        </h3>
        <div className="border rounded-xl overflow-hidden shadow-sm p-4 min-h-[300px]">
          {selectedDate ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {timeSlots.map((slot, index) => (
                <Button
                  key={index}
                  variant={selectedTime && isEqual(selectedTime, slot.time) ? "default" : "outline"}
                  className={cn(
                    "transition-all flex items-center justify-center h-14 relative overflow-hidden",
                    !slot.available && "opacity-50 cursor-not-allowed",
                    selectedTime && isEqual(selectedTime, slot.time) && "bg-success hover:bg-success-dark"
                  )}
                  disabled={!slot.available}
                  onClick={() => slot.available && handleTimeSelect(slot.time)}
                >
                  <span className="flex items-center">
                    <Clock size={16} className="mr-2" />
                    {format(slot.time, "HH:mm")}
                  </span>
                  {selectedTime && isEqual(selectedTime, slot.time) && (
                    <Check size={14} className="absolute right-2" />
                  )}
                </Button>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">Selecciona una fecha para ver horarios disponibles</p>
            </div>
          )}
        </div>

        <div className="mt-6 text-right">
          <Button
            onClick={handleContinue}
            disabled={!selectedDate || !selectedTime}
            className="bg-success hover:bg-success-dark transition-colors"
          >
            Continuar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
