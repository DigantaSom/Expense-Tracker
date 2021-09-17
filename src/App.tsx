import { FC, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';

import GlobalStyle from './global.styles';

import PrivateRoute from './components/private-route/private-route.component';
import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';
import Header from './components/header/header.component';

import HomePage from './pages/home/home.component';
const SignInAndSignUpPage = lazy(
  () => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'),
);
const CreateReportPage = lazy(
  () => import('./pages/create-report/create-report.component'),
);
const ProfilePage = lazy(() => import('./pages/profile/profile.component'));
const ReportPage = lazy(() => import('./pages/report-page/report-page.component'));

const App: FC = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <Router>
      <GlobalStyle />
      <Header />
      <Suspense fallback={<Spinner />}>
        <Switch>
          <ErrorBoundary>
            <Route exact path='/' component={HomePage} />
            <PrivateRoute
              path='/create-report'
              component={CreateReportPage}
              isAuthenticated={!!currentUser}
            />
            <PrivateRoute
              path='/profile'
              component={ProfilePage}
              isAuthenticated={!!currentUser}
            />
            <PrivateRoute
              path='/report'
              component={ReportPage}
              isAuthenticated={!!currentUser}
            />
            <Route
              exact
              path='/sign-in'
              render={() => (currentUser ? <Redirect to='/' /> : <SignInAndSignUpPage />)}
            />
          </ErrorBoundary>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
