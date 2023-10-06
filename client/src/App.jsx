import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { UserContextProvider } from './context/UserContext'

import Header from './components/header/Header'
import Home from './pages/home/Home'
import LoginPage from './pages/loginPage/LoginPage'
import RegisterPage from './pages/registerPage/RegisterPage'
import CreatePost from './pages/createPost/CreatePost'
import PostPage from './pages/postPage/PostPage'
import EditPost from './pages/editPost/EditPost'
import PageNotFound from './pages/pageNotFound/PageNotFound'


const App = () => {
	return (
		<BrowserRouter>
			<UserContextProvider>
				<Header />
				<Routes>
					<Route path='/' element={<Home />}/>
					<Route path='/login' element={<LoginPage />}/>
					<Route path='/register' element={<RegisterPage />}/>
					<Route path='/createPost' element={<CreatePost />}/>
					<Route path='/post/:id' element={<PostPage />} />
					<Route path='/edit/:id' element={<EditPost />} />
					<Route path='*' element={<PageNotFound />} />
				</Routes>
			</UserContextProvider>
		</BrowserRouter>
	)
}

export default App
