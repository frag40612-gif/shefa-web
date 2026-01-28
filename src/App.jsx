import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner';
import Navbar from './components/Navbar';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Doctors = lazy(() => import('./pages/Doctors'));
const Login = lazy(() => import('./pages/Login'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const MyProfile = lazy(() => import('./pages/MyProfile'));
const MyAppointments = lazy(() => import('./pages/MyAppointments'));
const Appointment = lazy(() => import('./pages/Appointment'));
const HealthDashboard = lazy(() => import('./pages/HealthDashboard'));
const HealthAnalytics = lazy(() => import('./pages/HealthAnalytics'));
const Emergency = lazy(() => import('./pages/Emergency'));
const DoctorDashboard = lazy(() => import('./pages/DoctorDashboard'));
const DoctorSignUp = lazy(() => import('./pages/DoctorSignUp'));
const PatientSignUp = lazy(() => import('./pages/PatientSignUp'));
const CompanionSignUp = lazy(() => import('./pages/CompanionSignUp'));

const App = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Suspense fallback={<LoadingSpinner size="lg" />}>
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path='/appointment/:docId' element={<Appointment />} />

        {/* مسارات تسجيل كل نوع */}
        <Route path='/signup/doctor' element={<DoctorSignUp />} />
        <Route path='/signup/patient' element={<PatientSignUp />} />
        <Route path='/signup/companion' element={<CompanionSignUp />} />

        {/* صفحات البيانات الصحية */}
        <Route path='/health-dashboard' element={<HealthDashboard />} />
        <Route path='/health-analytics' element={<HealthAnalytics />} />
        <Route path='/emergency' element={<Emergency />} />
        <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App;
