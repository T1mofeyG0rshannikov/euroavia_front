import React, { useEffect, useState } from 'react';
import './LoginForm.scss';
import setToken, { getUserAPI } from '@/utils/user';
import { useUser } from '@/context/UserContext';
import { loginAPI } from '../api';


export const LoginForm = ({onClose, openRegisterForm, required}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { user, setUser} = useUser()

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [complited, setComplited] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    };

    useEffect(() => {
      console.log(user, "USER")
      if (user) {
        onClose(); // Закроется после того, как user действительно обновился
      }
    }, [user]);

    useEffect(() => {
        console.log(formData)
        console.log(Object.values(formData).every(value => value.trim().length > 0))
        setComplited(Object.values(formData).every(value => value.trim().length > 0))
    }, [formData])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setErrors({});    
    if (complited) {
        console.log('Данные для отправки:', formData);
        const response = await loginAPI(formData);
        console.log(response)
        if (response.status === 200){
            setToken(response.data.access_token)

            const getUserResponse = await getUserAPI()
            console.log(getUserResponse)
            setUser(getUserResponse.data)
            
            setFormData({
              email: '',
              password: '',
            });
        } else if (response.status === 400 || response.status === 403 || response.status === 404){
            const updatedErrors = { ...errors };
            Object.keys(response.data.errors).forEach(key => {
                updatedErrors[key] = response.data.errors[key];
            });
            console.log(updatedErrors)
            setErrors(updatedErrors)
        }
    } else {
      setErrors(errors);
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="modal-container">
      <form className="registration-form">
        <div style={{
            display: "flex",
            flexDirection: "end",
            justifyContent: "end",
          }}>
          {!required && 
          <button 
            className="absolute top-2 right-2 text-gray-600 hover:text-black"
            onClick={onClose}
          >
            ✖
          </button>
          }
        </div>
        <h2>Логин</h2>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
            placeholder="example@mail.com"
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Пароль *</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? 'error' : ''}
            placeholder="Не менее 6 символов"
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>
        
        <a className='link' onClick={() => openRegisterForm()}>
          Ещё нет аккаунта? Зарегистрироваться
        </a>

        <button 
          className="submit-btn"
          disabled={isSubmitting || !complited}
          onClick={e => handleSubmit(e)}
        >
          {isSubmitting ? 'Вход...' : 'Войти'}
        </button>
      </form>
    </div>
  );
};