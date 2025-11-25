import React from 'react';

interface ClockDisplayProps {
  date: Date;
  is24Hour: boolean;
  showSeconds: boolean;
  showDate: boolean;
}

export const ClockDisplay: React.FC<ClockDisplayProps> = ({
  date,
  is24Hour,
  showSeconds,
  showDate,
}) => {
  // Format Time
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: !is24Hour,
    }).format(date);
  };

  const getSeconds = (date: Date) => {
    return date.getSeconds().toString().padStart(2, '0');
  };

  // Format Date (Spanish: "Lunes, 14 de Octubre")
  const formatDate = (date: Date) => {
    const d = new Intl.DateTimeFormat('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    }).format(date);
    // Capitalize first letter
    return d.charAt(0).toUpperCase() + d.slice(1);
  };

  const timeString = formatTime(date);
  
  // Split time string to handle AM/PM separately if needed, 
  // but Intl usually handles it well. 
  // For visual separation, let's keep it simple.

  return (
    <div className="flex flex-col items-center justify-center text-white drop-shadow-2xl select-none p-4">
      {/* Date */}
      {showDate && (
        <div className="text-xl md:text-3xl font-medium tracking-wide mb-2 md:mb-4 opacity-90 animate-float">
          {formatDate(date)}
        </div>
      )}

      {/* Time */}
      <div className="flex items-baseline font-bold tracking-tighter leading-none">
        <span className="text-[15vw] md:text-[12rem] xl:text-[16rem]">
          {timeString}
        </span>
        {showSeconds && (
          <span className="text-[5vw] md:text-[4rem] xl:text-[5rem] ml-4 font-light opacity-80 w-[2ch]">
             {getSeconds(date)}
          </span>
        )}
      </div>
    </div>
  );
};