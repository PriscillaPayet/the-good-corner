
import '../../index.css'
import { Route, Routes } from 'react-router-dom'
import RecentsAds from '../RecentAds/RecentAds'
import Layout from '../../pages/Layout/Layout'
import About from '../../pages/About/About'
import AdDetails from '../AdDetails/AdDetails'
import AdsByCategory from '../AdsByCategory'
import AdEditorPage from '../../pages/AdEditorPage/AdEditorPage'


function App() {

  return (
    <Routes>
      <Route path="/" element= {<Layout />}>
        <Route index element = {<RecentsAds />} />
        <Route path = "about" element={<About />} />
        <Route path = "ad/:id" element={<AdDetails />} />
        <Route path = "ad/new" element={<AdEditorPage />} />
        <Route path="/ad/:id/edit" element={<AdEditorPage />} />
        <Route path="ads/category/:id/:name" element={<AdsByCategory />} />


      </Route>
    </Routes>
  

  )
}

export default App
