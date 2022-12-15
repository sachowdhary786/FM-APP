import React, { useState } from 'react';
import style from './login-form.module.scss';

export default function LoginForm() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value }
    })
  }

  async function onSubmit(e) {
    e.preventDefault()
    e.target.reset();

    const newPost = { ...form };

    await fetch('http://127.0.0.1:5000/posts/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(newPost),
    }).catch(error => {
      window.alert(error);
      return
    })
  }
  return (
    <div className={style['content-container']}>
      <form onSubmit={onSubmit} className={style['login-form']}>
        <ul className={style['flex-outer']}>
          <li>
            <label htmlFor='email'>Email</label>
            <input id='email' type='text' name='email' onChange={(e) => updateForm({ title: e.target.value })} placeholder='Enter your email' />
          </li>
          <li>
            <label htmlFor='Password'>Password</label>
            <input id='password' type='text' name='password' onChange={(e) => updateForm({ content: e.target.value })} placeholder='Enter your password' />
          </li>
          <li>
            <button type='submit'>Login</button>
          </li>
        </ul>
      </form>
    </div>
  )
}