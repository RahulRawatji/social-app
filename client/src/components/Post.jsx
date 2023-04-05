import React from 'react'
import { Link } from 'react-router-dom';

const Post = (props) => {
  const {title, summary, content, cover, createdAt} = props;
  console.log(props)
  return (
    <div className="post">
      <div className="image">
        <img src={'http://localhost:4000/'+cover} />
      </div>
      <div className="texts">
        <h3><Link to={`post/${title}`}>{title}</Link></h3>
        <p className="info">
          <a className="author">Jack</a>
          <time>{createdAt}</time>
        </p>
        <p className="post_summary">
          {content}
        </p>
      </div>
      </div>
  )
}

export default Post