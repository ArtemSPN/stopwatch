import { useStopwatchStore } from '../store/stopwatchStote'
import { StopwatchStore } from '../types'
import { Stopwatch } from './Stopwatch'

const ContentBlock = () => {
	const { selectedStopwatch } = useStopwatchStore(
		(store: StopwatchStore) => store
	)

	return (
		<div className='flex flex-col justify-center items-center p-4 bg-white rounded-2xl shadow-md border border-black w-[800px]'>
			{selectedStopwatch && <Stopwatch selectedStopwatch={selectedStopwatch} />}
		</div>
	)
}

export default ContentBlock
