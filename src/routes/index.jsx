import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { Suspense } from 'react';
import {
  ROUTES_BASENAME,
  ROUTES_PATH_ROOT,
  ROUTES_PATH_HOME,
} from '@/constants/routes';
import Home from '@/pages/home';

// 로딩 컴포넌트
const LoadingSpinner = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '18px'
  }}>
    로딩 중...
  </div>
);

const RootNavigator = () => {
  return <Navigate to={ROUTES_PATH_HOME} />;
};

export default function () {
  return (
    <BrowserRouter
      basename={ROUTES_BASENAME}
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route
          path={'*'}
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path={ROUTES_PATH_HOME} element={<Home />} />
                <Route path={ROUTES_PATH_ROOT} element={<RootNavigator />} />
                <Route path="*" element={<RootNavigator />} />
              </Routes>
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
