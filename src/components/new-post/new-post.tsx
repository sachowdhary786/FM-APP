import React, { useState } from 'react';
import style from './new-post.module.scss';

export default function NewPost() {
  const [form, setForm] = useState({
    title: '',
    content: '',
    author: ''
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
      <form onSubmit={onSubmit}>
        <label htmlFor='title'>Title</label>
        <input id='title' type='text' name='title' onChange={(e) => updateForm({ title: e.target.value })} />
        <label htmlFor='Content'>Content</label>
        <input id='content' type='text' name='content' onChange={(e) => updateForm({ content: e.target.value })} />
        <label htmlFor='Author'>Author</label>
        <input id='author' type='text' name='author' onChange={(e) => updateForm({ author: e.target.value })} />
        <button type='submit'>Create Post</button>
      </form>
    </div>
  )
}