import { useState, useEffect } from 'react';

/**
 * Hook personalizado para sincronizar estado con localStorage
 * @param {string} key - Clave en localStorage
 * @param {any} initialValue - Valor inicial si no existe en localStorage
 * @returns {[any, Function]} - [valor, función para actualizar]
 */
export function useLocalStorage(key, initialValue) {
  // Estado para almacenar el valor
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Obtener del localStorage
      const item = window.localStorage.getItem(key);
      // Parsear JSON o retornar initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error al leer localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Función para actualizar el estado y localStorage
  const setValue = (value) => {
    try {
      // Permitir que value sea una función como en useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Guardar estado
      setStoredValue(valueToStore);
      
      // Guardar en localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      
      // Disparar evento personalizado para sincronizar entre tabs
      window.dispatchEvent(new Event('local-storage'));
    } catch (error) {
      console.error(`Error al guardar en localStorage key "${key}":`, error);
    }
  };

  // Sincronizar entre tabs/ventanas
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const item = window.localStorage.getItem(key);
        setStoredValue(item ? JSON.parse(item) : initialValue);
      } catch (error) {
        console.error(`Error al sincronizar localStorage key "${key}":`, error);
      }
    };

    // Escuchar cambios en otras tabs
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('local-storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('local-storage', handleStorageChange);
    };
  }, [key, initialValue]);

  return [storedValue, setValue];
}

/**
 * Hook para sessionStorage (similar a localStorage pero para sesión)
 */
export function useSessionStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error al leer sessionStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error al guardar en sessionStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}