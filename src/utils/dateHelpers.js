// Constantes
export const FIXED_YEAR = 2025;

export const monthNames = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

export const dayNames = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];

export const dayNamesFull = [
  'Domingo', 'Lunes', 'Martes', 'Miércoles', 
  'Jueves', 'Viernes', 'Sábado'
];

// Obtener días en un mes
export const getDaysInMonth = (year, monthIndex) => {
  return new Date(year, monthIndex + 1, 0).getDate();
};

// Obtener primer día del mes (0 = Domingo, 6 = Sábado)
export const getFirstDayOfMonth = (year, monthIndex) => {
  return new Date(year, monthIndex, 1).getDay();
};

// Formatear fecha a ISO YYYY-MM-DD
export const formatKey = (year, monthIndex, day) => {
  const month = String(monthIndex + 1).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  return `${year}-${month}-${d}`;
};

// Obtener fecha actual ISO
export const getCurrentDateISO = () => {
  const now = new Date();
  return now.toISOString().split('T')[0];
};

// Verificar si una fecha es hoy
export const isToday = (year, month, day) => {
  const today = new Date();
  return (
    today.getFullYear() === year &&
    today.getMonth() === month &&
    today.getDate() === day
  );
};

// Obtener información del mes actual
export const getCurrentMonthInfo = () => {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: now.getMonth(),
    day: now.getDate()
  };
};