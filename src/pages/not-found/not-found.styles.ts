import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { getHomeLinkStyles } from '../../components/error-boundary/error-boundary.styles';

export const HomeLink = styled(Link)`
  ${getHomeLinkStyles}
`;
