// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import NavBar from './components/NavBar';
// import HomePage from './components/HomePage';
// import LoginPage from './components/LoginPage';
// import RegisterPage from './components/RegisterPage';
// import ForgotPasswordPage from './components/ForgotPasswordPage';
// import ShopPage from './components/ShopPage';
// import FeaturesPage from './components/FeaturesPage';
// import CalculatorSelection from './components/CalculatorSelection';
// import CalculateFood from './components/CalculateFood';
// import CalculateSalt from './components/CalculateSalt';
// import UserProfile from './components/UserProfile';
// import Logout from './components/Logout';
// import Pond from './components/Pond';
// import BlogPage from './components/BlogPage'; // Import the BlogPage component
// import Contact from './components/Contact'; // Import the Contact component
// import TermsOfService from './components/TermsOfService';
// import AdminPage from './components/AdminPage';
// import ManagerPage from './components/ManagerPage';
// import WaterParameter from './components/WaterParameter';
// import { AuthProvider } from './context/AuthContext'; // Adjust the path as necessary

// const App = () => {
//   return (
//     <AuthProvider>
//       <Router>
//         <NavBar /> {/* Include the NavBar component */}
//         <Routes>
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/register" element={<RegisterPage />} />
//           <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
//           <Route path="/" element={<HomePage />} />
//           <Route path="/shop" element={<ShopPage />} />
//           <Route path="/features" element={<FeaturesPage />} />
//           <Route path="/calculator" element={<CalculatorSelection />} />
//           <Route path="/calculate-food" element={<CalculateFood />} />
//           <Route path="/calculate-salt" element={<CalculateSalt />} />
//           <Route path="/profile" element={<UserProfile />} />
//           <Route path="/logout" element={<Logout />} /> {/* Add the Logout route */}
//           <Route path="/pond" element={<Pond />} />
//           <Route path="/blog" element={<BlogPage />} /> {/* Add the BlogPage route */}
//           <Route path="/contact" element={<Contact />} /> {/* Add the Contact route */}
//           <Route path="/terms-of-service" element={<TermsOfService />} />
//           <Route path="/admin" element={<AdminPage />} />
//           <Route path="/manager/*" element={<ManagerPage />} />
//           <Route path="/water-parameter" element={<WaterParameter />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// };

// export default App;
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import ShopPage from './components/ShopPage';
import FeaturesPage from './components/FeaturesPage';
import CalculatorSelection from './components/CalculatorSelection';
import CalculateFood from './components/CalculateFood';
import CalculateSalt from './components/CalculateSalt';
import UserProfile from './components/UserProfile';
import Logout from './components/Logout';
import Pond from './components/Pond';
import BlogPage from './components/BlogPage'; // Import the BlogPage component
import Contact from './components/Contact'; // Import the Contact component
import TermsOfService from './components/TermsOfService';
import AdminPage from './components/AdminPage';
import ManagerPage from './components/ManagerPage';
import WaterParameter from './components/WaterParameter';
import { AuthProvider } from './context/AuthContext'; // Adjust the path as necessary
import KoiFish from './components/KoiFish';
import PondDetails from './components/PondDetails';
import KoiFishDetails from './components/KoiFishDetails';
import SelectionPage from './components/SelectionPage';
import WaterParameterDetails from './components/WaterParameterDetails';
//import PrivateRoute from './context/PrivateRoute'; // Import the PrivateRoute component

const App = () => {
  useEffect(() => {
    // Initialize authentication service if needed
    // authService.init();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <NavBar /> {/* Include the NavBar component */}
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/calculator" element={<CalculatorSelection />} />
          <Route path="/calculate-food" element={<CalculateFood />} />
          <Route path="/calculate-salt" element={<CalculateSalt />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/logout" element={<Logout />} /> {/* Add the Logout route */}
          <Route path="/pond" element={<Pond />} />
          <Route path="/blog" element={<BlogPage />} /> {/* Add the BlogPage route */}
          <Route path="/contact" element={<Contact />} /> {/* Add the Contact route */}
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/manager/*" element={<ManagerPage />} />


            {/* <Route
            path="/admin"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <AdminPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/manager/*"
            element={
              <PrivateRoute allowedRoles={['manager']}>
                <ManagerPage />
              </PrivateRoute>
            } 
          />  */}
          <Route path="/water-parameter" element={<WaterParameter />} />
          <Route path="/koi-fish" element={<KoiFish />} />
          <Route path="/pond-details" element={<PondDetails />} />
          <Route path="/koi-fish-details" element={<KoiFishDetails />} />
          <Route path="/selection" element={<SelectionPage />} />
          <Route path="/water-parameter-details" element={<WaterParameterDetails />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;





