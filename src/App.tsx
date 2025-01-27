import AddStopwatchModal from './components/AddStopwatch'
import ContentBlock from './components/ContentBlock'
import { Sidebar } from './components/Sidebar'
import { useStopwatchStore } from './store/stopwatchStote'
import './styles/index.scss'
import { IAddStopwatchPayload, StopwatchStore } from './types'

function App() {
	const { isOpenAddModal, setIsOpenAddModal, addStopwatch } = useStopwatchStore(
		(store: StopwatchStore) => store
	)

	const handleAddStopwatch = (payload: IAddStopwatchPayload) => {
		addStopwatch(payload)
		setIsOpenAddModal(false)
	}

	return (
		<div className='bg-[#cde7fe] h-screen p-10 flex justify-center gap-[60px]'>
			<AddStopwatchModal
				open={isOpenAddModal}
				onClose={() => setIsOpenAddModal(false)}
				onAdd={handleAddStopwatch}
			/>
			<Sidebar />
			<ContentBlock />
		</div>
	)
}

export default App

// пофиксить удаление
// синхронизировать сайдбар и контентблок
// сделать итоги дня
// поправить стили
// сделать норм для всех компов
