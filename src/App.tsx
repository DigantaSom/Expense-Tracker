import { FC, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { checkUserSession } from './redux/user/user.actions';

import GlobalStyle from './global.styles';

import Header from './components/header/header.component';
import PrivateRoute from './components/private-route/private-route.component';

import HomePage from './pages/home/home.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CreateReportPage from './pages/create-report/create-report.component';

const App: FC = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <Router>
      <GlobalStyle />
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <PrivateRoute
          path='/create-report'
          component={CreateReportPage}
          isAuthenticated={!!currentUser}
        />
        {currentUser ? (
          <Redirect to='/' />
        ) : (
          <Route path='/sign-in' component={SignInAndSignUpPage} />
        )}
      </Switch>
    </Router>
  );
};

export default App;
