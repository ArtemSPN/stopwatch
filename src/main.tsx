import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { StopwatchProvider } from './store/stopwatchStote'
import './styles/index.scss'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<StopwatchProvider>
				<App />
			</StopwatchProvider>
		</BrowserRouter>
	</StrictMode>
)
