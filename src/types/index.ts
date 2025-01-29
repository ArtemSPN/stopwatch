export interface StopwatchStore {
	stopwatches: IStopwatch[]
	selectedStopwatch: IStopwatch | null
	setSelectedStopwatch: (name: IStopwatch) => void
	setPaused: (name: string, isPaused: boolean) => void
	addStopwatch: (stopwatch: IAddStopwatchPayload) => void
	isOpenAddModal: boolean
	setIsOpenAddModal: (isOpen: boolean) => void
	deleteStopwatch: (name: string) => void
	pauseStopwatch: (name: string, time: number) => void
	setIsSelectedStopwatch: (name: string, time: number) => void
}

export interface SidebarListItemProps {
	title: string
	time: number
	index: number
	isPaused?: boolean
	onDelete: (name: string) => void
	OnPause: (name: string, time: number) => void
	onSelect: (name: string, time: number) => void
}

export interface IStopwatch {
	isParallel?: boolean
	isPaused?: boolean
	title: string
	time: number
}

export interface IAddStopwatchPayload {
	title: string
	isParallel: boolean
}
