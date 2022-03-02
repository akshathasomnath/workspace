import { createSignal, createMemo, createEffect, onCleanup } from "solid-js";
import { Router, Routes, Route, Link, NavLink, useNavigate } from "solid-app-router";
import { useGlobalState } from "./GlobalState";

export default function Sidebar(props) {
	const [userInfo, { updateUserInfo }] = useGlobalState();

	const onTODO = () => {
		alert('TODO')
	}

	const navigate = useNavigate();
	return (
		<nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
			<div class="position-sticky pt-3">
				<ul class="nav flex-column">
					<li class="nav-item">
						<a class="nav-link active" aria-current="page" href="#">
							<span data-feather="home"></span>
							<Link href="/">Home</Link>
						</a>
					</li>
					<li class="nav-item">
						<a class="nav-link active" aria-current="page" href="#">
							<span data-feather="home"></span>
							<Link href="/products">Products</Link>
						</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#">
							<span data-feather="file"></span>
							<Link href="/createproduct">New Product</Link>
						</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#">
							<span data-feather="users"></span>
							<span onClick={onTODO}>Customers</span>
						</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#">
							<span data-feather="bar-chart-2"></span>
							<span onClick={onTODO}>Reports</span>
						</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#">
							<span data-feather="layers"></span>
							<span onClick={onTODO}>Integrations</span>
						</a>
					</li>
				</ul>
				{/* <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
					<span>Saved reports</span>
					<a class="link-secondary" href="#" aria-label="Add a new report">
						<span data-feather="plus-circle"></span>
					</a>
				</h6>
				<ul class="nav flex-column mb-2">
					<li class="nav-item">
						<a class="nav-link" href="#">
							<span data-feather="file-text"></span>
							Current month
						</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#">
							<span data-feather="file-text"></span>
							Last quarter
						</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#">
							<span data-feather="file-text"></span>
							Social engagement
						</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#">
							<span data-feather="file-text"></span>
							Year-end sale
						</a>
					</li>
				</ul> */}
			</div>
		</nav>
	)
}