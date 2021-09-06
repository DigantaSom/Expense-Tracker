import { FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import GlobalStyle from './global.styles';

import Header from './components/header/header.component';

import HomePage from './pages/home/home.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CreateReportPage from './pages/create-report/create-report.component';

const App: FC = () => {
  return (
    <Router>
      <GlobalStyle />
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/sign-in' component={SignInAndSignUpPage} />
        <Route path='/create-report' component={CreateReportPage} />
      </Switch>
    </Router>
  );
};

export default App;
