import React, { useState, useCallback, useEffect } from 'react';
import { Background } from './components/Background';
import { ClockDisplay } from './components/ClockDisplay';
import { Controls } from './components/Controls';
import { useTime } from './hooks/useTime';
import { useIdle } from './hooks/useIdle';
import { BackgroundTheme, ClockSettings } from './types';

function App() {
  const currentTime = useTime();
  const isIdle = useIdle(4000); // 4 seconds idle timeout
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // App State
  const [settings, setSettings] = useState<ClockSettings>({
    is24Hour: true,
    showSeconds: false,
    showDate: true,
    theme: BackgroundTheme.Sonoma,
    showControls: true
  });

  const updateSettings = (newSettings: Partial<ClockSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  }, []);

  // Listen for fullscreen changes (e.g. user presses Esc)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className={`relative w-full h-screen flex flex-col items-center justify-center overflow-hidden transition-all duration-500 ${isIdle ? 'cursor-none' : 'cursor-default'}`}>
      
      {/* Dynamic Background */}
      <Background theme={settings.theme} />

      {/* Main Clock UI */}
      <main className="z-10 w-full max-w-7xl mx-auto flex items-center justify-center flex-grow">
        <ClockDisplay 
            date={currentTime} 
            is24Hour={settings.is24Hour}
            showSeconds={settings.showSeconds}
            showDate={settings.showDate}
        />
      </main>

      {/* Settings / Controls */}
      {/* Only show when not idle */}
      <Controls 
        settings={settings}
        updateSettings={updateSettings}
        toggleFullscreen={toggleFullscreen}
        isFullscreen={isFullscreen}
        visible={!isIdle}
      />
      
      {/* Hint for new users if controls fade out */}
      <div className={`fixed top-4 text-white/30 text-xs font-light tracking-widest transition-opacity duration-1000 select-none pointer-events-none ${isIdle ? 'opacity-0' : 'opacity-100'}`}>
        Mueve el cursor para ver las opciones
      </div>

    </div>
  );
}

export default App;