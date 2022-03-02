/* @refresh reload */
import { render } from 'solid-js/web';
import './index.css';
import App from './App';
import { GlobalStateProvider } from './GlobalState'

render(() => (
	<GlobalStateProvider>
		<App />
	</GlobalStateProvider>
), document.getElementById('main'));
