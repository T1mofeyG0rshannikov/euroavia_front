import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { getUserAPI } from '../utils/user';

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

  const checkAuth = async () => {
    const response = await getUserAPI()
    if (response.status === 200){
      if (response.data != null){
        setUser(response.data)
      }
    }
  }

  // Автоматическая проверка авторизации при монтировании
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <UserContext.Provider value={{ ...state, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// 5. Хук для удобного использования
export const useUser = () => useContext(UserContext);