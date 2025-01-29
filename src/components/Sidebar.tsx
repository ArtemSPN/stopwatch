import {
	Delete as DeleteIcon,
	PauseCircle,
	PlayCircle as PlayCircleIcon,
} from '@mui/icons-material'
import AddIcon from '@mui/icons-material/Add'
import { FC, useEffect } from 'react'
import { useStopwatch } from 'react-timer-hook'
import { useStopwatchStore } from '../store/stopwatchStote'
import { SidebarListItemProps, StopwatchStore } from '../types'

const SidebarListItem: FC<SidebarListItemProps> = props => {
	const { title, time, isPaused, index, onDelete, OnPause, onSelect } = props

	const initialTimestamp = new Date()
	initialTimestamp.setSeconds(initialTimestamp.getSeconds() + time)

	const { seconds, minutes, hours, start, pause, totalSeconds } = useStopwatch({
		autoStart: false,
		offsetTimestamp: initialTimestamp,
	})

	useEffect(() => {
		if (isPaused) pause()
	}, [isPaused])

	const pauseHandler = (e: any) => {
		e.stopPropagation()
		if (isPaused) start()
		else pause()

		OnPause(title, totalSeconds)
	}

	const onSelectHandler = (e: any) => {
		onSelect(title, totalSeconds)
	}

	const deleteHandler = (e: any) => {
		e.stopPropagation()
		onDelete(title)
	}

	return (
		<div
			className='flex items-center justify-between p-4 bg-white rounded-md shadow-md border border-black w-85  mb-4'
			onClick={onSelectHandler}
		>
			<div className='w-full flex justify-between items-center'>
				<div>
					<h2 className='text-lg font-bold mb-1'>{`${index + 1} ${title}`}</h2>
					<div className='text-lg font-bold'>
						{`${hours.toString().padStart(2, '0')} час : ${minutes
							.toString()
							.padStart(2, '0')} мин : ${seconds
							.toString()
							.padStart(2, '0')} сек`}
					</div>
				</div>
				<div className='flex items-center gap-2'>
					{!isPaused ? (
						<PauseCircle
							style={{ color: '#2196F3', fontSize: '2rem' }}
							className='cursor-pointer'
							onClick={pauseHandler}
						/>
					) : (
						<PlayCircleIcon
							style={{ color: '#2196F3', fontSize: '2rem' }}
							className='cursor-pointer'
							onClick={pauseHandler}
						/>
					)}
					<DeleteIcon
						style={{ color: '#f44336', fontSize: '2rem' }}
						className='cursor-pointer'
						onClick={deleteHandler}
					/>
				</div>
			</div>
		</div>
	)
}

export const Sidebar = () => {
	const {
		setIsOpenAddModal,
		stopwatches,
		deleteStopwatch,
		pauseStopwatch,
		setIsSelectedStopwatch,
	} = useStopwatchStore((store: StopwatchStore) => store)

	const onDelete = (title: string) => {
		deleteStopwatch(title)
	}

	const OnPause = (name: string, time: number) => pauseStopwatch(name, time)

	const onSelect = (name: string, time: number) =>
		setIsSelectedStopwatch(name, time)

	return (
		<div className='flex flex-col justify-between items-center p-4 bg-white rounded-2xl shadow-md border border-black w-92'>
			<div>
				{stopwatches.map((item, idx) => (
					<SidebarListItem
						key={item.title}
						{...{ ...item, index: idx }}
						onDelete={onDelete}
						OnPause={OnPause}
						onSelect={onSelect}
					/>
				))}
			</div>
			<div className='flex w-full items-center justify-center gap-8 p-2 '>
				<button
					onClick={() => console.log('click')}
					className='flex text-xl items-center justify-center w-[80%] px-4 py-2 text-sm font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 cursor-pointer'
				>
					Закончить день
				</button>
				<div className='flex items-center justify-center w-10 h-10 text-white bg-blue-500 rounded-full hover:bg-blue-600 cursor-pointer'>
					<AddIcon onClick={() => setIsOpenAddModal(true)} />
				</div>
			</div>
		</div>
	)
}
