import React from 'react';
import { 
  Maximize, 
  Minimize, 
  Settings, 
  Clock, 
  Calendar, 
  Image,
  Type
} from 'lucide-react';
import { BackgroundTheme, ClockSettings } from '../types';

interface ControlsProps {
  settings: ClockSettings;
  updateSettings: (newSettings: Partial<ClockSettings>) => void;
  toggleFullscreen: () => void;
  isFullscreen: boolean;
  visible: boolean;
}

export const Controls: React.FC<ControlsProps> = ({
  settings,
  updateSettings,
  toggleFullscreen,
  isFullscreen,
  visible,
}) => {
  if (!visible) return null;

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 transition-opacity duration-500">
      <div className="flex items-center gap-4 px-6 py-3 bg-black/30 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl">
        
        {/* Toggle 12/24h */}
        <button
          onClick={() => updateSettings({ is24Hour: !settings.is24Hour })}
          className="p-2 rounded-full hover:bg-white/10 transition-colors group relative"
          title="Cambiar formato 12/24h"
        >
          <Clock className="w-6 h-6 text-white/90" />
          <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 text-xs text-white bg-black/50 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {settings.is24Hour ? '24h' : '12h'}
          </span>
        </button>

        {/* Toggle Seconds */}
        <button
          onClick={() => updateSettings({ showSeconds: !settings.showSeconds })}
          className={`p-2 rounded-full hover:bg-white/10 transition-colors group relative ${!settings.showSeconds ? 'opacity-50' : 'opacity-100'}`}
          title="Mostrar segundos"
        >
          <Type className="w-6 h-6 text-white/90" />
           <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 text-xs text-white bg-black/50 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Segundos
          </span>
        </button>

        {/* Toggle Date */}
        <button
          onClick={() => updateSettings({ showDate: !settings.showDate })}
          className={`p-2 rounded-full hover:bg-white/10 transition-colors group relative ${!settings.showDate ? 'opacity-50' : 'opacity-100'}`}
          title="Mostrar fecha"
        >
          <Calendar className="w-6 h-6 text-white/90" />
           <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 text-xs text-white bg-black/50 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Fecha
          </span>
        </button>

        <div className="w-px h-6 bg-white/20 mx-1"></div>

        {/* Theme Selector */}
        <div className="flex gap-2">
            {(Object.keys(BackgroundTheme) as Array<keyof typeof BackgroundTheme>).map((themeKey) => (
                <button
                    key={themeKey}
                    onClick={() => updateSettings({ theme: BackgroundTheme[themeKey] })}
                    className={`w-6 h-6 rounded-full border-2 transition-all ${
                        settings.theme === BackgroundTheme[themeKey] 
                        ? 'border-white scale-110 shadow-lg' 
                        : 'border-transparent hover:scale-105 opacity-70 hover:opacity-100'
                    }`}
                    style={{
                        background: getThemePreviewColor(BackgroundTheme[themeKey])
                    }}
                    title={themeKey}
                />
            ))}
        </div>

        <div className="w-px h-6 bg-white/20 mx-1"></div>

        {/* Fullscreen */}
        <button
          onClick={toggleFullscreen}
          className="p-2 rounded-full hover:bg-white/10 transition-colors group relative"
          title="Pantalla completa"
        >
          {isFullscreen ? (
            <Minimize className="w-6 h-6 text-white/90" />
          ) : (
            <Maximize className="w-6 h-6 text-white/90" />
          )}
           <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 text-xs text-white bg-black/50 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {isFullscreen ? 'Salir' : 'Full'}
          </span>
        </button>

      </div>
    </div>
  );
};

// Helper to show color dots in settings
function getThemePreviewColor(theme: BackgroundTheme): string {
    switch (theme) {
        case BackgroundTheme.BigSur: return 'linear-gradient(to bottom right, #ec4899, #ef4444)';
        case BackgroundTheme.Monterey: return 'linear-gradient(to bottom right, #7e22ce, #ec4899)';
        case BackgroundTheme.Ventura: return 'linear-gradient(to bottom right, #fb923c, #9333ea)';
        case BackgroundTheme.Sonoma: return 'linear-gradient(to bottom right, #2dd4bf, #4f46e5)';
        case BackgroundTheme.Midnight: return '#111827';
        case BackgroundTheme.Aurora: return 'linear-gradient(to top, #86efac, #9333ea)';
        default: return '#000';
    }
}
