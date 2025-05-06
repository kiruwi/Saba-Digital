import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './themes/theme';
import { Home } from './pages';
import ContactPage from './pages/contactus';
import { ErrorPage } from './pages/Error';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeToggle } from './components/ThemeToggle';
import { BackToTop } from './components/BackToTop';
import { SEO } from './components/SEO';
import { GlobalStyles } from './styles/GlobalStyles';
import { ThemeUtils } from './utils/theme';
import { routes } from './utils/routes';
import { Skeleton } from './components/Skeleton';

function App() {
  const [theme, setTheme] = React.useState<'light' | 'dark'>(
    ThemeUtils.getInitialTheme()
  );
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(false);
  }, []);

  const toggleTheme = () => {
    const newTheme = ThemeUtils.toggleTheme(theme);
    setTheme(newTheme);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <HelmetProvider>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyles />
        <Router>
          <div className="app">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <SEO />
            <BackToTop />
            <Routes>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <Suspense fallback={<Skeleton />}>
                      {route.element}
                    </Suspense>
                  }
                  exact={route.exact}
                />
              ))}
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
