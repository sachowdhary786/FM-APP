import React, { useEffect, useState } from 'react';
import style from './blog-list.module.scss';


export default function BlogList() {
  const [posts, setPosts] = useState([]);

  const Post = (props) => (
    <div className={style['blog-card']}>
      <div>{props.post.title}</div>
      <div>{props.post.content}</div>
    </div >
  )

  useEffect(() => {
    async function getPosts() {
      const response = await fetch('http://localhost:5000/posts/');

      if (!response.ok) {
        const message = `An error occured ${response.statusText}`;
        window.alert(message);
        return
      }
      const posts = await response.json();
      setPosts(posts);
    }
    getPosts();

    return;
  }, [posts.length]);

  async function deletePost(id) {
    await fetch(`http://localhost:5000${id}`, {
      method: 'DELETE'
    })

    const newPosts = posts.filter((el) => el._id !== id);
    setPosts(newPosts);
  }

  function postList() {
    return posts.map((post) => {
      return (
        <Post post={post} deletePost={() => deletePost(post._id)} key={post._id} />
      )
    })
  }

  return (
    <div className={style['post-container']}>
      {postList()}
    </div>
  )
}