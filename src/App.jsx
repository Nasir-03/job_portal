// import React from 'react'

// import HomePage from './pages/HomePage'
// import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";
// import Header from './Header/Header';
// import Footer from './landing page/Footer';
// import FindJobs from './pages/FindJobs';
// import Talent from './pages/Talent';
// import TalentProfilePage from './Talent/TalentProfilePage';
// import PostJobPage from './pages/PostJobPage';
// import JobDesc from './DescJob/JobDesc';
// import DescJob from './pages/DescJob';
// import ApplyJobPages from './pages/ApplyJobPages';
// import CompanyPage from './pages/CompanyPage';
// import PostedJobPage from './pages/PostedJobPage';
// import SignUpPage from './pages/SignUpPage';
// import Border from './component/Border';
// import ProfilePage from './pages/ProfilePage';
// import ForgetPassword from './signUpLogin/ForgetPassword';
// import LoginWithPasswordModals from './signUpLogin/LoginWithPasswordModals';
// import { useSelector } from 'react-redux';
// import JobHistoryPage from './pages/JobHistoryPage';
// import ProtectedRoute from './services/ProtectedRoute';



//    const Layout = ({ children }) => {
//   const location = useLocation();
//   const hideHeaderFooter = location.pathname === '/sign' || location.pathname === '/login' ||
//          location.pathname === '/forgot-password';

//   return (
//     <>
//       {!hideHeaderFooter && <Header />}
//       {!hideHeaderFooter && <Border />}
//       {children}
//       {!hideHeaderFooter && <Footer />}
//     </>
//   );
// };

// const App = () => {
//   const user = useSelector((state) => state.user);
//    return (
//     <div>
//        <BrowserRouter>
//        <Layout>
//        <Routes>
//         <Route path='/' element={<HomePage />}/>
//         <Route path='/find-job' element={<FindJobs />}/>
//         <Route path='/find-talent' element={<Talent />}/>
//         <Route path='/talent-profile/:id' element={<TalentProfilePage />}/>
//         <Route path='/jobs/:id' element={<DescJob />}/>
//         <Route path='/post-jobs/:id' element={<ProtectedRoute allowedRole={"EMPLOYER"}><PostJobPage /></ProtectedRoute>}/>
//         <Route path='/job-desc' element={<JobDesc />}/>
//         <Route path='/apply-job/:id' element={<ApplyJobPages />}/>
//         <Route path='/company' element={<CompanyPage />}/>
//         <Route path='/posted-job/:id' element={<PostedJobPage />}/>
//         <Route path='/signup' element={user ? <Navigate to="/"/>:<SignUpPage />}/>
//         <Route path='/sign' element={user ? <Navigate to='/'/> : <SignUpPage />}/>
//         <Route path='/login' element={user ? <Navigate to='/' /> : <SignUpPage />}/>
//         <Route path='/profile' element={<ProfilePage />}/>
//         <Route path='/forgot-password' element={<LoginWithPasswordModals />}/>
//         <Route path='job-history' element={<JobHistoryPage />}/>
//         <Route path='*' element={<HomePage />}/>
//        </Routes>
//        </Layout>
//        {/* {!hideHeaderFooter && <Footer />} */}
//        </BrowserRouter>
//     </div>
//   )
// }

// export default App







import React from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Pages & Components
import HomePage from './pages/HomePage';
import Header from './Header/Header';
import Footer from './landing page/Footer';
import FindJobs from './pages/FindJobs';
import Talent from './pages/Talent';
import TalentProfilePage from './Talent/TalentProfilePage';
import PostJobPage from './pages/PostJobPage';
import JobDesc from './DescJob/JobDesc';
import DescJob from './pages/DescJob';
import ApplyJobPages from './pages/ApplyJobPages';
import CompanyPage from './pages/CompanyPage';
import PostedJobPage from './pages/PostedJobPage';
import SignUpPage from './pages/SignUpPage';
import Border from './component/Border';
import ProfilePage from './pages/ProfilePage';
import ForgetPassword from './signUpLogin/ForgetPassword';
import LoginWithPasswordModals from './signUpLogin/LoginWithPasswordModals'; 
import JobHistoryPage from './pages/JobHistoryPage';
import ProtectedRoute from './services/ProtectedRoute';
import UnAuthorized from './services/UnAuthorized';

const Layout = ({ children }) => {
  const location = useLocation();
  const hideHeaderFooter = 
    location.pathname === '/sign' || 
    location.pathname === '/login' ||
    location.pathname === '/forgot-password';

  return (
    <>
      {!hideHeaderFooter && <Header />}
      {!hideHeaderFooter && <Border />}
      {children}
      {!hideHeaderFooter && <Footer />}
    </>
  );
};

const App = () => {
  const user = useSelector((state) => state.user);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/find-job' element={<FindJobs />}/>
          <Route path='/find-talent' element={<Talent />}/>
          <Route path='/talent-profile/:id' element={<TalentProfilePage />}/>
          <Route path='/jobs/:id' element={<DescJob />}/>
          
          <Route 
            path='/post-jobs/:id' 
            element={
              <ProtectedRoute allowedRole="EMPLOYER">
                <PostJobPage />
              </ProtectedRoute>
            } 
          />

          <Route path='/job-desc' element={<JobDesc />}/>
          <Route path='/apply-job/:id' element={<ApplyJobPages />}/>
          <Route path='/company' element={<CompanyPage />}/>
          <Route path='/posted-job/:id' element={
            <ProtectedRoute allowedRole="EMPLOYER">
               <PostedJobPage />
            </ProtectedRoute>
            }
            />

          {/* Auth Routes */}
          <Route path='/signup' element={user ? <Navigate to='/'/> :<SignUpPage />}/>
          <Route path='/sign' element={user ? <Navigate to='/'/> : <SignUpPage />}/>
          <Route path='/login' element={user ? <Navigate to='/' /> : <LoginWithPasswordModals />}/>
          <Route path='/forgot-password' element={<ForgetPassword />}/>

          {/* Protected pages */}
          <Route path='/profile' element={<ProfilePage />}/>
          <Route path='/job-history' element={<JobHistoryPage />}/>

          {/* Unauthorized & Fallback */}
          <Route path='/unauthorized' element={<UnAuthorized />} />
          <Route path='*' element={<HomePage />}/>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
