import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Post from './Post';

const Home = () => {

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  
  const fetchPostData = async() =>{
    const response = await axios.get("http://localhost:4000/getPost");
    setPosts(response.data);
    setIsloading(false);
  };

  useEffect(()=>{
    fetchPostData();
  },[]);
  
  if(isLoading){
    return <h1>Loading Data Pls Wait</h1>
  }

  return (
    <main>
      {posts?.length>0 && posts?.map(post => <Post {...post} key={post._id}/>)}
  </main>
  )
}

export default Home