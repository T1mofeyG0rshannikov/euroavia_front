import React, { createContext, useReducer, useContext, useEffect } from 'react';

// 1. Создаем контекст
const AirportContext = createContext();

// 2. Определяем начальное состояние
const initialState = {
  originAirport: null,
  destinationAirport: null,
};

// 3. Редьюсер для управления состоянием
function airportReducer(state, action) {
  switch (action.type) {
    case 'SET_ORIGIN':
      return { ...state, originAirport: action.payload };
    case 'SET_DESTINATION':
      return { ...state, destinationAirport: action.payload };
    default:
      return state;
  }
}

// 4. Провайдер
export function AirportProvider({ children }) {
  // читаем данные из localStorage при инициализации
  const [state, dispatch] = useReducer(
    airportReducer,
    initialState,
    (initial) => {
      const storedOrigin = localStorage.getItem('originAirport');
      const storedDestination = localStorage.getItem('destinationAirport');
      return {
        originAirport: storedOrigin ? JSON.parse(storedOrigin) : initial.originAirport,
        destinationAirport: storedDestination ? JSON.parse(storedDestination) : initial.destinationAirport,
      };
    }
  );

  const setOriginAirport = (airport) => {
    console.log(airport);
    dispatch({ type: 'SET_ORIGIN', payload: airport });
  };

  const setDestinationAirport = (airport) => {
    console.log(airport);
    dispatch({ type: 'SET_DESTINATION', payload: airport });
  };

  // сохраняем в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('originAirport', JSON.stringify(state.originAirport));
  }, [state.originAirport]);

  useEffect(() => {
    localStorage.setItem('destinationAirport', JSON.stringify(state.destinationAirport));
  }, [state.destinationAirport]);

  return (
    <AirportContext.Provider value={{ ...state, setOriginAirport, setDestinationAirport }}>
      {children}
    </AirportContext.Provider>
  );
}

// 5. Хук для удобного использования
export const useAirport = () => useContext(AirportContext);