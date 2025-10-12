import React, { useEffect, useState } from 'react';
import './RegisterForm.scss';
import { registerAPI } from '../api';
import setToken, { getUserAPI } from '../../../utils/user';
import { useUser } from '../../../context/UserContext';


export const RegisterForm = ({onClose, openLoginForm}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    secondName: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: ''
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
        console.log(formData)
        console.log(Object.values(formData).every(value => value.trim().length > 0))
        setComplited(Object.values(formData).every(value => value.trim().length > 0))
    }, [formData])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setErrors({});    
    if (Object.keys(errors).length === 0) {
        console.log('Данные для отправки:', formData);
        const response = await registerAPI(formData);
        console.log(response)
        if (response.status === 201){
            setToken(response.data)

            const getUserResponse = await getUserAPI()
            console.log(getUserResponse)
            setUser(getUserResponse.data.user)
            onClose()
            // Сброс формы
            setFormData({
                firstName: '',
                secondName: '',
                email: '',
                password: '',
                birthDate: '',
                confirmPassword: '',
            });
        } else if (response.status === 400){
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
      <form className="registration-form" onSubmit={handleSubmit}>
        <div style={{
            display: "flex",
            flexDirection: "end",
            justifyContent: "end",
          }}>
          <button 
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
          onClick={onClose}
        >
          ✖
        </button>
        </div>
        <h2>Регистрация</h2>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">Имя *</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={errors.firstName ? 'error' : ''}
              placeholder="Введите ваше имя"
            />
            {errors.firstName && <span className="error-message">{errors.firstName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="secondName">Фамилия *</label>
            <input
              type="text"
              id="secondName"
              name="secondName"
              value={formData.secondName}
              onChange={handleChange}
              className={errors.secondName ? 'error' : ''}
              placeholder="Введите вашу фамилию"
            />
            {errors.secondName && <span className="error-message">{errors.secondName}</span>}
          </div>
        </div>

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
          <label htmlFor="birthDate">Дата рождения *</label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            className={errors.birthDate ? 'error' : ''}
            placeholder="01.01.2000"
          />
          {errors.birthDate && <span className="error-message">{errors.birthDate}</span>}
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

        <div className="form-group">
          <label htmlFor="confirmPassword">Подтверждение пароля *</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={errors.confirmPassword ? 'error' : ''}
            placeholder="Повторите пароль"
          />
          {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
        </div>
        
        <a className='link' onClick={() => openLoginForm()}>Уже есть аккаунт? Войти</a>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={isSubmitting || !complited}
        >
          {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
        </button>
      </form>
    </div>
  );
};