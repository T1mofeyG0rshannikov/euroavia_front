import React, { createContext, useReducer, useContext } from 'react';

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
  const [state, dispatch] = useReducer(airportReducer, initialState);

  const setOriginAirport = (airport) => {
    console.log(airport)
    dispatch({ type: 'SET_ORIGIN', payload: airport });
  };

  const setDestinationAirport = (airport) => {
    console.log(airport)
    dispatch({ type: 'SET_DESTINATION', payload: airport });
  };

  return (
    <AirportContext.Provider value={{ ...state, setOriginAirport, setDestinationAirport }}>
      {children}
    </AirportContext.Provider>
  );
}

// 5. Хук для удобного использования
export const useAirport = () => useContext(AirportContext);