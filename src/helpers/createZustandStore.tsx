import { createContext, PropsWithChildren, useContext, useRef } from 'react'
import { useStore } from 'zustand'

interface ICreateZustandStoreOptions {
	createStore: () => unknown
	name?: string
}

export function createZustandStore<State>(options: ICreateZustandStoreOptions) {
	const { createStore, name } = options

	type StoreApi = ReturnType<typeof createStore>
	const Context = createContext<StoreApi | undefined>(undefined)
	const Provider = Context.Provider

	function useZustandStore<T>(selector: (store: State) => T): T {
		const storeContext = useContext(Context)

		if (!storeContext) {
			throw new Error(`use${name} must be used within ${name}Provider`)
		}

		// @ts-expect-error cause idk
		return useStore(storeContext, selector)
	}

	const StoreProvider = ({ children }: PropsWithChildren) => {
		const storeRef = useRef<StoreApi>()
		if (!storeRef.current) {
			storeRef.current = createStore()
		}

		return <Provider value={storeRef.current}>{children}</Provider>
	}

	return {
		StoreProvider,
		useZustandStore,
	}
}
