import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import CourseOverview from './CourseOverview.jsx'
import ModulePage from './ModulePage.jsx'

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<CourseOverview />} />
        <Route path="/module/:moduleId" element={<ModulePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
