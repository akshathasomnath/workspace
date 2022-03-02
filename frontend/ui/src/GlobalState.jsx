import { createSignal, createContext, createEffect, useContext } from "solid-js";
import { createStore } from "solid-js/store";

const LOCAL_STORAGE_KEY = "inventorystore";
function createLocalStore(value) {
	const stored = localStorage.getItem(LOCAL_STORAGE_KEY),
		[userInfo, setUserInfo] = createStore(stored ? JSON.parse(stored) : value);
	createEffect(() => {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userInfo));
	});
	return [userInfo, setUserInfo];
}

const GlobalStateContext = createContext();

export function GlobalStateProvider(props) {
	const [userInfo, setUserInfo] = createLocalStore({
		id: '',
		email: '',
		token: '',
		products: [],
	}),
		store = [
			userInfo,
			{
				updateUserInfo(info) {
					setUserInfo("id", c => info.id);
					setUserInfo("email", c => info.email);
					setUserInfo("token", c => info.token);
				},
				updateProducts(products) {
					setUserInfo("products", c => products)
				},
			}
		];

	return (
		<GlobalStateContext.Provider value={store}>
			{props.children}
		</GlobalStateContext.Provider>
	);
}

export function useGlobalState() { return useContext(GlobalStateContext); }