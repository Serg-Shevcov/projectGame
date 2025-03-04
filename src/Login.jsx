import { useState, useEffect } from "react";
import './scss/style.scss';

export default function Login() {
  const heandlClick = (type) => {
    console.log('clicked', type);
  }

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailDirty, setEmailDirty] = useState(false)
  const [passwordDirty, setPasswordDirty] = useState(false)
  const [emailError, setEmailError] = useState('Email не может быть пустым')
  const [passwordError, setPasswordError] = useState('пароль не может быть пустым')
  const [formValid, setFormValid] = useState(false)

  useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [emailError, passwordError])

  const emailHandler = (e) => {
    setEmail(e.target.value)
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Некорректный емейл')
    } else {
      setEmailError('')
    }
  }

  const passwordHandler = (e) => {
    setPassword(e.target.value)
    if (e.target.value.length < 3 || e.target.value.length > 8) {
      setPasswordError('Пароль должен быть длинее 3 и меньше 8')
      if (!e.target.value) {
        setPasswordError('Пароль не может быть пустым')
      }
      else {
        setPasswordError('')
      }
    }
  }

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true)
        break
      case 'password':
        setPasswordDirty(true)
        break
    }
  }

  return (
    <div className="app">
      <main className='style'>
        <form className='form-avtor cont'>
          <h3>Welcome Second round</h3>
          <button>Ссылка для авторизации через Google</button>
          <hr className="border"></hr>
          <div>Email</div>
          {(emailDirty && emailError) && <div style={{ color: 'red' }}>{emailError}</div>}
          <input onChange={e => emailHandler(e)} value={email} onBlur={e => blurHandler(e)} name='email' type='text' placeholder='Email' />
          <div>Password</div>
          {(passwordError && passwordDirty) && <div style={{ color: 'red' }}>{passwordError}</div>}
          <input onChange={e => passwordHandler(e)} value={password} onBlur={e => blurHandler(e)} name='password' type='password' placeholder='Password' />
          <button disabled={!formValid} type='submit'>Sign In</button>
        </form>
      </main>
    </div >
  )


}
