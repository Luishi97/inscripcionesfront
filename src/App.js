import { lazy, Suspense } from 'react'
import { Spin } from 'antd'
import { Router } from '@reach/router'
import 'antd/dist/antd.css'
import './App.css'

const Register = lazy(
  () =>
    new Promise(resolve => {
      setTimeout(() => resolve(import('./Register')), 500)
    })
)

const Admin = lazy(
  () =>
    new Promise(resolve => {
      setTimeout(() => resolve(import('./Admin')), 500)
    })
)

function App() {
  return (
    <Suspense className="App" fallback={<Spin className="center" />}>
      <Router>
        <Register path="/register" />
        <Admin path="/register/admin" />
      </Router>
    </Suspense>
  )
}

export default App
