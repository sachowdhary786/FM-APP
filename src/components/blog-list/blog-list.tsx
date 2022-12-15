import React, { useEffect, useState } from 'react';
import style from './blog-list.module.scss';
import ReactMarkdown from 'react-markdown'


export default function BlogList() {
  const [posts, setPosts] = useState([]);

  const Post = (props) => (

    <div className={style['post-container']}>
      <div className={style['post-card']}>
        <ReactMarkdown>{'### ' + props.post.title}</ReactMarkdown>
        <ReactMarkdown>{props.post.content}</ReactMarkdown>
        <p>
          <caption>Written by: {props.post.author}</caption>
        </p>
      </div >
    </div >
  )

  useEffect(() => {
    async function getPosts() {
      const response = await fetch(`${process.env.POSTS_URI}`);

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
    await fetch(`${process.env.MONGODB_URI}${id}`, {
      method: 'DELETE'
    })

    const newPosts = posts.filter((el) => el._id !== id);
    setPosts(newPosts);
  }

  function postList() {
    return posts.map((post) => {
      return (
        <Post post={post} deletePost={() => deletePost(post._id)} key={post._id} tabIndex={post._id} />
      )
    })
  }

  return (
    <div className={style['content-container']}>
      {postList()}
    </div>
  )
}