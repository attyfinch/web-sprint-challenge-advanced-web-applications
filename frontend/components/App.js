import React, { useState } from 'react'
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Articles from './Articles'
import LoginForm from './LoginForm'
import Message from './Message'
import ArticleForm from './ArticleForm'
import Spinner from './Spinner'
import PrivateRoutes from './PrivateRoute'
import { axiosAuth } from '../axios'

const articlesUrl = 'http://localhost:9000/api/articles'
const loginUrl = 'http://localhost:9000/api/login'

export default function App() {
  // ✨ MVP can be achieved with these states
  const [message, setMessage] = useState('')
  const [articles, setArticles] = useState([])
  const [currentArticleId, setCurrentArticleId] = useState()
  const [spinnerOn, setSpinnerOn] = useState(false)

  // ✨ Research `useNavigate` in React Router v.6
  const navigate = useNavigate()
  const redirectToLogin = () => { /* ✨ implement */ navigate('/')}
  const redirectToArticles = () => { /* ✨ implement */ navigate('/articles')}

  const logout = () => {
    setMessage('Goodbye!');
    localStorage.removeItem('token');
    setCurrentArticleId();
    redirectToLogin();
  }

  const login = ({ username, password }) => {
    setSpinnerOn(true);

    axios.post(loginUrl, { username, password })
      .then((res) => {
        setMessage('');
        localStorage.setItem('token', res.data.token);
        redirectToArticles();
        getArticles();
      })
      .catch(err => console.log(err))    
  }

  const getArticles = () => {
    setSpinnerOn(true)
    axiosAuth().get(articlesUrl)
        .then((res) => {
          if(message === '') {
            setMessage(res.data.message);
          }
          setArticles(res.data.articles);
          setSpinnerOn(false);  
        })
        .catch((err) => console.err)   
  }

  const postArticle = article => {
      axiosAuth()
      .post(articlesUrl, article)
        .then((res) => {
          setMessage(res.data.message);
          getArticles();
          
        })
        .then((err) => console.error)
  }

  const updateArticle = (currentArticleId, values) => {
    // ✨ implement
    // You got this!

    // MY NOTES
    // set values based on currentArticleID
    // pass these values down to form

    axiosAuth()
    .put(`${articlesUrl}/${currentArticleId}`, values)
      .then((res) => {
        setMessage(res.data.message);
        getArticles();
        
      })
      .then((err) => console.error)
    
  }

  const deleteArticle = article_id => {
    axiosAuth()
      .delete(articlesUrl + '/' + article_id)
        .then((res => {
          getArticles();
          setMessage(res.data.message)
        }))
        .catch((err) => console.error)
  }

  console.log(currentArticleId)

  return (
    // ✨ fix the JSX: `Spinner`, `Message`, `LoginForm`, `ArticleForm` and `Articles` expect props ❗
    <>
      <Spinner on={spinnerOn}/>
      <Message message={message} />
      <button id="logout" onClick={logout}>Logout from app</button>
      <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}> {/* <-- do not change this line */}
        <h1>Advanced Web Applications</h1>
        <nav>
          <NavLink id="loginScreen" to="/">Login</NavLink>
          <NavLink id="articlesScreen" to="/articles">Articles</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<LoginForm login={login}/>} />
          
          <Route path="articles" element={
            <PrivateRoutes>
              <ArticleForm postArticle={postArticle} articles={articles} getArticles={getArticles} currentArticleID={currentArticleId} setCurrentArticleId={setCurrentArticleId} updateArticle={updateArticle} />
              <Articles articles={articles} deleteArticle={deleteArticle} getArticles={getArticles} setCurrentArticleId={setCurrentArticleId}
              currentArticleID={currentArticleId} />
            </PrivateRoutes>
          } />
        </Routes>
        <footer>Bloom Institute of Technology 2022</footer>
      </div>
    </>
  )
}
