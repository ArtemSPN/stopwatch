import { FC } from 'react'
import { useTimer } from 'react-timer-hook'

interface IStopwatchProps {
	expiryTimestamp: Date
}

export const Timer: FC<IStopwatchProps> = ({ expiryTimestamp }) => {
	const {
		seconds,
		minutes,
		hours,
		days,
		isRunning,
		start,
		pause,
		resume,
		restart,
	} = useTimer({
		expiryTimestamp,
		onExpire: () => console.warn('onExpire called'),
	})

	return (
		<div style={{ textAlign: 'center' }}>
			<h1>react-timer-hook </h1>
			<p>Timer Demo</p>
			<div style={{ fontSize: '100px' }}>
				<span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
				<span>{seconds}</span>
			</div>
			<p>{isRunning ? 'Running' : 'Not running'}</p>
			<button onClick={start}>Start</button>
			<button onClick={pause}>Pause</button>
			<button onClick={resume}>Resume</button>
			<button
				onClick={() => {
					restart(expiryTimestamp)
				}}
			>
				Restart
			</button>
		</div>
	)
}
