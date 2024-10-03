
import '../../index.css'
import { Route, Routes } from 'react-router-dom'
import RecentsAds from '../RecentAds/RecentAds'
import Layout from '../../pages/Layout/Layout'
import About from '../../pages/About/About'
import AdDetails from '../AdDetails/AdDetails'
import NewAdForm from '../../pages/NewAdForm/NewAdForm'
import AdsByCategory from '../AdsByCategory'


function App() {

  return (
    <Routes>
      <Route path="/" element= {<Layout />}>
        <Route index element = {<RecentsAds />} />
        <Route path = "about" element={<About />} />
        <Route path = "ad/:id" element={<AdDetails />} />
        <Route path = "ad/new" element={<NewAdForm />} />
        <Route path="ads/category/:id/:name" element={<AdsByCategory />} />


      </Route>
    </Routes>
  

  )
}

export default App
