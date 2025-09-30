import React, { createContext, useReducer, useContext } from 'react';

// 1. Создаем контекст
const UserContext = createContext();

// 2. Определяем начальное состояние
const initialState = {
  user: null,
};

// 3. Редьюсер для управления состоянием
function userReducer(state, action) {
  switch (action.type) {
    case 'SET':
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

// 4. Провайдер
export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const setUser = (user) => {
    console.log(user)
    dispatch({ type: 'SET', payload: user });
  };

  return (
    <UserContext.Provider value={{ ...state, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// 5. Хук для удобного использования
export const useUser = () => useContext(UserContext);