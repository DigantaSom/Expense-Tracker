import { FC } from 'react';
import { RouteProps, Route, Redirect } from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {
  isAuthenticated: boolean;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ isAuthenticated, ...rest }) =>
  !isAuthenticated ? <Redirect to='/' /> : <Route {...rest} />;

export default PrivateRoute;
