
import './App.css'
import { Route, Routes } from 'react-router-dom'
import RecentsAds from '../recentAds/RecentAds'
import Layout from '../../pages/Layout/Layout'
import About from '../../pages/About/About'
import AdDetails from '../AdDetails/AdDetails'


function App() {

  return (
    <Routes>
      <Route path="/" element= {<Layout />}>
        <Route index element = {<RecentsAds />} />
        <Route path = "about" element={<About />} />
        <Route path = "ad/:id" element={<AdDetails />} />


      </Route>
    </Routes>
  

  )
}

export default App
