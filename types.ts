export enum BackgroundTheme {
  BigSur = 'BigSur',
  Monterey = 'Monterey',
  Ventura = 'Ventura',
  Sonoma = 'Sonoma',
  Midnight = 'Midnight',
  Aurora = 'Aurora'
}

export interface ClockSettings {
  is24Hour: boolean;
  showSeconds: boolean;
  showDate: boolean;
  theme: BackgroundTheme;
  showControls: boolean;
}