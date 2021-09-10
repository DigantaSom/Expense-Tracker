import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
	* {
		box-sizing: border-box;
	}

	body {
  margin: 0;
	/* font-family: 'Open Sans Condensed', sans-serif; */
	font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

	code {
		font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
			monospace;
	}

	a {
		color: black;
		text-decoration: none;
	}
`;

export default GlobalStyle;
