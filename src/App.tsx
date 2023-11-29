import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './pages/home'
import Company from './pages/Company'
import Contact from './pages/contact'
import Projects from './pages/projects'
import Container from './layout/container'
import NewProject from './pages/new-project'
import EditProject from './pages/edit-project'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Container />}>

          <Route index element={<Home />} />
          <Route path="/company" element={<Company />} />
          <Route path="/contact" element={<Contact />} />
          <Route path='/projects' element={<Projects />} />
          <Route path="/new-project" element={<NewProject />} />
          <Route path='/project/:id' element={<EditProject />} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
