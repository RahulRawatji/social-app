import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';

import './createPost.css';

const  modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
};

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
];


const CreatePost = () => {
    const [title, setTitle ] = useState();
    const [summary, setSummary] = useState();
    const [content, setContent] = useState();
    const [file, setFile] = useState('');
    const navigate = useNavigate();

    const submitHandler = async (e)=>{
        e.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file',file[0]);
        
        const response = await fetch("http://localhost:4000/post",{
            method:"POST",
            body:data, 
        });

        if(response.status == 200){
            navigate("/");
        }

    }

  return (
    <div className='create-post-container'>
        <h3>
            Create Post
        </h3>
        <form className='create-post-form' onSubmit={submitHandler}>
            <input type="text" placeholder='Title' value={title} onChange={(e)=>setTitle(e.target.value)}/>
            <input type="summary" placeholder='Summary' value={summary} onChange={(e)=>setSummary(e.target.value)}/>
            <input type="file" onChange={(e)=>setFile(e.target.files)} /> 
            <ReactQuill theme="snow" value={content} modules={modules} formats={formats} onChange={(newVal) =>setContent(newVal)} />
            <button type='submit' className='submit_btn'>Post</button>
        </form>
    </div>
  )
}

export default CreatePost