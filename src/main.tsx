import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import 'reset-css/sass/_reset.scss';
import './styles/main.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
