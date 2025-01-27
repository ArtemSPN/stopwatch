import { createStore } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { createZustandStore } from '../helpers/createZustandStore'
import { IAddStopwatchPayload, StopwatchStore } from '../types'

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

								if (store.selectedStopwatch === name) console.log('ebat')

								set(state => ({
									...state,
									selectedStopwatch:
										store.selectedStopwatch === name
											? null
											: store.selectedStopwatch,
									stopwatches: state.stopwatches.filter(
										stopwatch => stopwatch.title !== name
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
							setIsSelectedStopwatch: (name: string, time: number) =>
								set(state => ({
									...state,
									selectedStopwatch: name,
									stopwatches: state.stopwatches.map(stopwatch => ({
										...stopwatch,
										time: stopwatch.title === name ? time : stopwatch.time,
									})),
								})),
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
