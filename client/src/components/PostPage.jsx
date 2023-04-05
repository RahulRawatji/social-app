import React from 'react'
import { useParams } from 'react-router-dom';

const PostPage = () => {
    const params = useParams();
    console.log(params.tit);
    ///Make Page for single Post by fetching data from that post
  return (
    <div>PostPage</div>
  )
}

export default PostPage