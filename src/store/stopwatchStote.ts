import { createStore } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { createZustandStore } from '../helpers/createZustandStore'
import { IAddStopwatchPayload, IStopwatch, StopwatchStore } from '../types'

const { useZustandStore: useStopwatchStore, StoreProvider: StopwatchProvider } =
	createZustandStore<StopwatchStore>({
		createStore: () =>
			createStore<StopwatchStore>()(
				persist(
					devtools(
						immer((set, get) => ({
							stopwatches: [],
							selectedStopwatch: null,
							setPaused: (name, isPaused) =>
								set(state => ({ ...state, [name]: isPaused })),
							addStopwatch: (stopwatch: IAddStopwatchPayload) =>
								set(state => ({
									...state,
									stopwatches: [
										...state.stopwatches,
										{
											...stopwatch,
											time: 0,
											isPaused: true,
										},
									],
								})),
							isOpenAddModal: false,
							setIsOpenAddModal: (isOpen: boolean) =>
								set(state => ({ ...state, isOpenAddModal: isOpen })),
							deleteStopwatch: (name: string) => {
								const store = get()

								set(state => ({
									...state,
									selectedStopwatch:
										store.selectedStopwatch?.title === name
											? null
											: store.selectedStopwatch,
									stopwatches: state.stopwatches.filter(
										stopwatch => stopwatch.title !== name
									),
								}))
							},
							setSelectedStopwatch: (stopwatch: IStopwatch) => {
								const { stopwatches } = get()

								const isSelectedValid = stopwatches.some(
									item => item.title === stopwatch.title
								)

								if (!isSelectedValid) {
									set({ selectedStopwatch: null })
									return
								}

								set(state => ({
									stopwatches: state.stopwatches.map(item =>
										item.title === stopwatch.title ? stopwatch : item
									),
								}))
							},
							pauseStopwatch: (name: string, time: number) => {
								const store = get()

								const newStopwatches = store.stopwatches.map(stopwatch => ({
									...stopwatch,
									isPaused:
										stopwatch.title === name
											? !stopwatch.isPaused
											: stopwatch.isParallel
											? stopwatch.isPaused
											: true,
									time: stopwatch.title === name ? time : stopwatch.time,
								}))

								set(state => ({
									...state,
									stopwatches: newStopwatches,
								}))
							},
							setIsSelectedStopwatch: (name: string, time: number) => {
								const store = get()

								const newSelectedStopwatch = {
									...store.stopwatches.find(
										stopwatch => stopwatch.title === name
									),
									time: time,
								}

								set(state => ({
									...state,
									selectedStopwatch: newSelectedStopwatch,
									stopwatches: state.stopwatches.map(stopwatch => ({
										...stopwatch,
										time: stopwatch.title === name ? time : stopwatch.time,
									})),
								}))
							},
						}))
					),
					{
						name: 'stopwatch-storage',
						version: 1,
					}
				)
			),
		name: 'stopwatchStore',
	})

export { StopwatchProvider, useStopwatchStore }
