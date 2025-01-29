import { FC, useEffect } from 'react'
import { useStopwatch } from 'react-timer-hook'
import { useStopwatchStore } from '../store/stopwatchStote'
import { IStopwatch, StopwatchStore } from '../types'

export interface IStopwatchProps {
	selectedStopwatch: IStopwatch
}

export const Stopwatch: FC<IStopwatchProps> = ({ selectedStopwatch }) => {
	const { time, isPaused, title }: IStopwatch = selectedStopwatch

	const { setSelectedStopwatch } = useStopwatchStore(
		(store: StopwatchStore) => store
	)

	const initialTimestamp = new Date()
	initialTimestamp.setSeconds(initialTimestamp.getSeconds() + time + 0.5)

	const { seconds, minutes, hours, start, pause, reset, totalSeconds } =
		useStopwatch({
			autoStart: false,
			offsetTimestamp: initialTimestamp,
		})

	useEffect(() => {
		console.log('isPaused', isPaused)
		if (!isPaused) start()
		else pause()
	}, [isPaused])

	const pauseHandler = () => {
		pause()
		setSelectedStopwatch({ ...selectedStopwatch, isPaused: true })
	}

	const startHandler = () => {
		start()
		setSelectedStopwatch({ ...selectedStopwatch, isPaused: false })
	}

	const radius = 120
	const circumference = 2 * Math.PI * radius

	const progress = (seconds % 60) / 60

	const isEvenMinute = minutes % 2 === 0
	const secondCircleProgress = isEvenMinute ? progress : 1 - progress

	useEffect(() => {
		const handleBeforeUnload = () => {
			setSelectedStopwatch({ ...selectedStopwatch, time: totalSeconds })
		}

		window.addEventListener('beforeunload', handleBeforeUnload)

		// Удаляем обработчик при размонтировании
		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload)
		}
	}, [setSelectedStopwatch, totalSeconds])

	return (
		<div className='flex flex-col items-center w-full'>
			<h1 className='text-xl font-bold mb-4'>{title}</h1>

			<div className='relative w-64 h-64'>
				{' '}
				<svg className='absolute top-0 left-0 w-full h-full'>
					<circle
						cx='50%'
						cy='50%'
						r={radius}
						stroke='#e5e7eb'
						strokeWidth='8'
						fill='none'
					/>
					<circle
						cx='50%'
						cy='50%'
						r={radius}
						stroke={isEvenMinute ? '#10b981' : '#e11d48'}
						strokeWidth='8'
						fill='none'
						strokeDasharray={circumference}
						strokeDashoffset={
							circumference - secondCircleProgress * circumference
						}
						strokeLinecap='round'
						style={{
							transition: 'stroke-dashoffset 1s linear',
						}}
					/>
				</svg>
				<div className='absolute inset-0 flex items-center justify-center text-4xl font-bold'>
					{`${hours.toString().padStart(2, '0')}:${minutes
						.toString()
						.padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
				</div>
			</div>

			<div className='mt-4 flex gap-2'>
				<button
					onClick={startHandler}
					className='px-4 py-2 bg-green-500 text-white rounded-lg shadow-md cursor-pointer'
				>
					Запустить
				</button>
				<button
					onClick={pauseHandler}
					className='px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-md cursor-pointer'
				>
					Пауза
				</button>
				<button
					onClick={() => reset(new Date(), false)}
					className='px-4 py-2 bg-red-500 text-white rounded-lg shadow-md cursor-pointer'
				>
					Остановить
				</button>
			</div>
		</div>
	)
}
