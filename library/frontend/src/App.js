import React from 'react';

import './App.css';
import Cookies from 'universal-cookie';
import ProjectList from './components/Project.js';
import TaskList from './components/ToDo.js';
import ProjectTasksList from './components/ProjectTasks.js';
import LoginForm from './components/Auth.js';
import axios from 'axios';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom'


const NotFound404 = ({ location }) => {
  return (
    <div>
      <h1>Страница по адресу '{location.pathname}' не найдена</h1>
    </div>
  )
}

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      'projects': [],
      'tasks': [],
      'token': ''
    }
  }

  set_token(token) {
    const cookies = new Cookies()
    cookies.set('token', token)
    this.setState({ 'token': token }, () => this.load_data())
  }

  is_authenticated() {
    return this.state.token !== ''
  }

  logout() {
    this.set_token('')
  }

  get_token_from_storage() {
    const cookies = new Cookies()
    const token = cookies.get('token')
    this.setState({ 'token': token }, () => this.load_data())
  }

  get_token(username, password) {
    axios.post('http://127.0.0.1:8000/api-token-auth/', {
      username: username,
      password: password
    })
      .then(response => {
        this.set_token(response.data['token'])
      }).catch(error => alert('Неверный логин или пароль'))
  }

  get_headers() {
    let headers = {
      'Content-Type': 'application/json'
    }
    if (this.is_authenticated()) {
      headers['Authorization'] = 'Token ' + this.state.token
    }
    return headers
  }


  load_data() {
    const headers = this.get_headers()
    axios.get('http://127.0.0.1:8000/api/projects', { headers })
      .then(response => {
        this.setState({ projects: response.data })
      }).catch(error => console.log(error))
    axios.get('http://127.0.0.1:8000/api/tasks', { headers })
      .then(response => {
        this.setState({ tasks: response.data })
      }).catch(error => {
        console.log(error)
        this.setState({ tasks: [] })
      })

  }

  componentDidMount() {
    this.get_token_from_storage()

  }

  render() {
    return (
      <div className='App'>
        <BrowserRouter>
          <nav>
            <ul>
              <li>
                <Link to='/'>Projects</Link>
              </li>
              <li>
                <Link to='/tasks'>Tasks</Link>
              </li>
              <li>
                {/* <Link to='/login'>Login</Link> */}
                {this.is_authenticated() ? <button
                  onClick={() => this.logout()}>Logout</button> : <Link to='/login'>Login</Link>}
              </li>
            </ul>
          </nav>
          <Routes>
            <Route exact path='/' element={() => <ProjectList projects={this.state.projects} />} />
            <Route exact path='/tasks' element={() => <TaskList tasks={this.state.tasks} />} />
            {/* <Route exact path='/login' component={() => <LoginForm />} /> */}
            <Route exact path='/project/:id' element={() => <ProjectTasksList items={this.state.tasks} />} />
            <Route exact path='/login' element={() => <LoginForm get_token={(username, password) => this.get_token(username, password)} />} />
            {/* <Redirect from='/projects' to='/' /> */}
            <Route element={NotFound404} />
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}


export default App;