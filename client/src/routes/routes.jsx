import {createBrowserRouter} from 'react-router-dom';
import App from '../App';
import Home from '../components/Home';
import Login from '../components/Login';
import Register from '../components/Register';
import CreatePost from '../components/CreatePost';
import PostPage from '../components/PostPage';

const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                path:"",
                element:<Home/>
            },
            {
                path:'/createPost',
                element:<CreatePost/>
            },{
                path:'/post/:tit',
                element:<PostPage/>
            }
        ]
    },
    {
        path:'login',
        element:<Login/>
    },
    {
        path:'register',
        element:<Register/>
    }
])

export default router;