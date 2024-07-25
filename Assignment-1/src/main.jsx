import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom'
import OtpForm from './components/OtpForm.jsx'
import CourseList from './components/CourseList.jsx'
import Batches from './components/Batches.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Navigate to="/otp-form" />} />
      <Route path="/otp-form" element={<OtpForm />} />
      <Route path="/course-list" element={<CourseList />} />
      <Route path="/batches" element={<Batches />} />
      <Route path="*" element={<div>Page not found</div>} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
