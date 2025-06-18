import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useDispatch, useSelector } from 'react-redux';

// Layout components
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import Dashboard from './pages/Dashboard';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import BandList from './pages/bands/BandList';
import BandDetail from './pages/bands/BandDetail';
import BandCreate from './pages/bands/BandCreate';
import BandEdit from './pages/bands/BandEdit';
import RehearsalList from './pages/rehearsals/RehearsalList';
import RehearsalDetail from './pages/rehearsals/RehearsalDetail';
import RehearsalCreate from './pages/rehearsals/RehearsalCreate';
import RehearsalEdit from './pages/rehearsals/RehearsalEdit';
import SetlistList from './pages/setlists/SetlistList';
import SetlistDetail from './pages/setlists/SetlistDetail';
import SetlistCreate from './pages/setlists/SetlistCreate';
import SetlistEdit from './pages/setlists/SetlistEdit';
import SongList from './pages/songs/SongList';
import SongCreate from './pages/songs/SongCreate';
import SongEdit from './pages/songs/SongEdit';
import Profile from './pages/profile/Profile';
import ProfileEdit from './pages/profile/ProfileEdit';
import NotFound from './pages/NotFound';

// Redux actions
import { checkAuth } from './store/slices/authSlice';

// Create a theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

// Protected route component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Auth routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
          </Route>

          {/* App routes */}
          <Route
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<ProfileEdit />} />
            
            <Route path="/bands" element={<BandList />} />
            <Route path="/bands/create" element={<BandCreate />} />
            <Route path="/bands/:bandId" element={<BandDetail />} />
            <Route path="/bands/:bandId/edit" element={<BandEdit />} />
            
            <Route path="/bands/:bandId/rehearsals" element={<RehearsalList />} />
            <Route path="/bands/:bandId/rehearsals/create" element={<RehearsalCreate />} />
            <Route path="/rehearsals/:rehearsalId" element={<RehearsalDetail />} />
            <Route path="/rehearsals/:rehearsalId/edit" element={<RehearsalEdit />} />
            
            <Route path="/bands/:bandId/setlists" element={<SetlistList />} />
            <Route path="/bands/:bandId/setlists/create" element={<SetlistCreate />} />
            <Route path="/setlists/:setlistId" element={<SetlistDetail />} />
            <Route path="/setlists/:setlistId/edit" element={<SetlistEdit />} />
            
            <Route path="/bands/:bandId/songs" element={<SongList />} />
            <Route path="/bands/:bandId/songs/create" element={<SongCreate />} />
            <Route path="/songs/:songId/edit" element={<SongEdit />} />
          </Route>

          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;