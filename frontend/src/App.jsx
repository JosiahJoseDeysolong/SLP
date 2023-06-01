import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from './context/AuthContext'

import './App.css';
import Navbar from "./components/Navbar";

import RoutesPublic from "./utils/RoutesPublic";
import RoutesSuper from "./utils/RoutesSuper";
import RoutesAdmin from "./utils/RoutesAdmin";


import ProjectsNavbar from './pages/PublicPage/components/ProjectsNavbar';

// page for my tests/experwiments; delete after use
import Test from './pages/PublicPage/test';

import Home from "./pages/PublicPage/Home"
import Projects from './pages/PublicPage/Projects';
import Articles from './pages/PublicPage/Articles';
import Gallery from './pages/PublicPage/Gallery';

import About from './pages/PublicPage/About';
import Faculty from './pages/PublicPage/Faculty';
import Partner from './pages/PublicPage/Partner';


import Super from './pages/SuperUserPage/SuperHome';
import SuperProjects from './pages/SuperUserPage/SuperProjects';
import SuperArticles from './pages/SuperUserPage/SuperArticles';
import SuperRegistrar from './pages/SuperUserPage/SuperRegistrar';
import SuperGallery from './pages/SuperUserPage/SuperGallery';

import Admin from './pages/AdminPage/AdminHome';
import AdminProjects from './pages/AdminPage/AdminProjects';
import AdminArticles from './pages/AdminPage/AdminArticles';
import AdminRegistrar from './pages/AdminPage/AdminRegistrar';
import AdminGallery from './pages/AdminPage/AdminGallery';
import AdminYear from './pages/AdminPage/ProjectComponents/AdminYear'
import AdminCollege from './pages/AdminPage/ProjectComponents/AdminCollege'
import AdminProjectList from './pages/AdminPage/ProjectComponents/AdminListProject'
import AdminIndividualProject from './pages/AdminPage/ProjectComponents/AdminIndividualProject'
import AdminDean from './pages/AdminPage/ProjectComponents/AdminDean'
import AdminCoordinator from './pages/AdminPage/ProjectComponents/AdminCoordinator'
import AdminFaculty from './pages/AdminPage/ProjectComponents/AdminFaculty'
import AdminStudent from './pages/AdminPage/ProjectComponents/AdminStudent'
import AdminBeneficiary from './pages/AdminPage/ProjectComponents/AdminBeneficiary'
import AdminPartner from './pages/AdminPage/ProjectComponents/AdminPartner'
import AdminUsers from './pages/AdminPage/AdminUsers'

function App() {
  //
//
  return (
    
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>

          
          <Route>

              <Route element={<RoutesPublic/>}>
                <Route element={<Home/>} path ="/" exact/>
                <Route element={<Projects/>} path ="/projects" exact/>
                <Route element={<Articles/>} path ="/articles" exact/>
                <Route element={<Gallery/>} path ="/gallery" exact/>

                <Route element={<About />} path ="/projects/about" exact/> 
                <Route element={<Partner />} path ="/projects/partner" exact/> 
                <Route element={<Faculty />} path ="/projects/faculty" exact/> 

                // page for my tests/experwiments; delete after use
                <Route element={<Test />} path ="/test" exact/> 

              </Route>

              <Route element={<RoutesSuper/>}>
                <Route element={<Super/>} path ="/super" exact/>
                <Route element={<SuperProjects/>} path ="/super-projects" exact/>
                <Route element={<SuperArticles/>} path ="/super-articles" exact/>
                <Route element={<SuperRegistrar/>} path ="/super-registrar" exact/>
                <Route element={<SuperGallery/>} path ="/super-gallery" exact/>
              </Route>

              <Route element={<RoutesAdmin/>}>
                <Route element={<Admin/>} path ="/admin" exact/>
                <Route element={<AdminProjects/>} path ="/admin-projects" exact/>
                <Route element={<AdminArticles/>} path ="/admin-articles" exact/>
                <Route element={<AdminRegistrar/>} path ="/admin-registrar" exact/>
                <Route element={<AdminGallery/>} path ="/admin-gallery" exact/>
                <Route element={<AdminYear/>} path ="/admin-year" exact/>
                <Route element={<AdminCollege/>} path ="/admin-college" exact/>
                <Route element={<AdminProjectList/>} path ="/admin-project-list" exact/>
                <Route element={<AdminIndividualProject/>} path ="/admin-individual-project" exact/>
                <Route element={<AdminDean/>} path ="/admin-projects-dean" exact/>
                <Route element={<AdminCoordinator/>} path ="/admin-projects-coordinator" exact/>
                <Route element={<AdminFaculty/>} path ="/admin-projects-faculty" exact/>
                <Route element={<AdminStudent/>} path ="/admin-projects-student" exact/>
                <Route element={<AdminBeneficiary/>} path ="/admin-projects-beneficiary" exact/>
                <Route element={<AdminPartner/>} path ="/admin-projects-partner" exact/>
                <Route element={<AdminUsers/>} path ="/admin-users" exact/>

                
              </Route>

          </Route>
          
          

        </Routes>

      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
