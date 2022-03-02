import { createSignal, createMemo, createEffect, onCleanup, lazy } from "solid-js";
import { Router, Routes, Route, Link, Outlet } from "solid-app-router";
import { useGlobalState } from "./GlobalState";

import Sidebar from "./Sidebar";
import Products from "./Products"
import NewProduct from "./NewProduct"
import NotFound from "./NotFound"

export default function MainPage(props) {
	const [userInfo, { updateUserInfo }] = useGlobalState();
	const onLogout = () => {
		updateUserInfo({
			id: undefined,
			email: undefined,
			token: undefined
		});
	}

	return (
		<Router>
			<header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
				<a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Inventory</a>
				<button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="navbar-nav">
					<div class="nav-item text-nowrap">
						<a class="nav-link px-3" href="#" onClick={onLogout}>{userInfo.email} - Sign out</a>
					</div>
				</div>
			</header>
			<div class="container-fluid">
				<div class="row">
					<Sidebar />
					<main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
						<Routes>
							<Route path="/" element={<Products />} />
							<Route path="/products" element={<Products />} />
							<Route path="/createproduct" element={<NewProduct />} />
							<Route path="/*all" element={<NotFound />} />
						</Routes>
						<Outlet />
					</main>
				</div>
			</div>
		</Router>
	)
}