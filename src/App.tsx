import { FC, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';

import GlobalStyle from './global.styles';

import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';
import Header from './components/header/header.component';

const HomePage = lazy(() => import('./pages/home/home.component'));
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
            <Route
              path='/sign-in'
              render={() => (currentUser ? <Redirect to='/' /> : <SignInAndSignUpPage />)}
            />
            <Route
              path='/create-report'
              render={() =>
                currentUser ? <CreateReportPage /> : <Redirect to='/sign-in' />
              }
            />
            <Route
              path='/profile'
              render={() => (currentUser ? <ProfilePage /> : <Redirect to='/sign-in' />)}
            />
            <Route
              path='/report'
              render={() => (currentUser ? <ReportPage /> : <Redirect to='/sign-in' />)}
            />
          </ErrorBoundary>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
