
import '../../index.css'
import { Route, Routes } from 'react-router-dom'
import RecentsAds from '../RecentAds/RecentAds'
import Layout from '../../pages/Layout/Layout'
import About from '../../pages/About/About'
import AdDetails from '../AdDetails/AdDetails'
import AdsByCategory from '../AdsByCategory'
import AdEditorPage from '../../pages/AdEditorPage/AdEditorPage'
import SignupPage from '../../pages/Signup'
import SigninPage from '../../pages/Signin'
import ProtectedRoute from '../ProtectedRoute'


function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<RecentsAds />} />
        <Route path="about" element={<About />} />
        <Route path="ad/:id" element={<AdDetails />} />
        <Route path="ads/category/:id/:name" element={<AdsByCategory />} />

        {/* Routes pour les utilisateurs non connectés */}
        <Route element={<ProtectedRoute requireAuthenticated={false} redirectTo="/" />}>
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>

        {/* Routes pour les utilisateurs connectés */}
        <Route element={<ProtectedRoute requireAuthenticated={true} redirectTo="/signin" />}>
          <Route path="ad/new" element={<AdEditorPage />} />
          <Route path="/ad/:id/edit" element={<AdEditorPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App
