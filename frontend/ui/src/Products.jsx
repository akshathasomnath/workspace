import { createSignal, createMemo, createEffect, onMount, onCleanup } from "solid-js";
import { useGlobalState } from "./GlobalState";
import { jsonGet } from "./fetch";

export default function Products(props) {
	const [userInfo, { updateProducts }] = useGlobalState();
	const [category, setCategory] = createSignal(null);

	const getProducts = async () => {
		try {
			const categoryValue = category() ?? '';
			const result = await jsonGet(`/api/products/` + categoryValue, userInfo.token)
			updateProducts(result.data);
		}
		catch (e) {
			alert('ERROR in getProducts : ' + e)
			throw e;
		}
	}

	onMount(async () => {
		await getProducts();
	})

	return (
		<>
			<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
				<h1 class="h2">Products</h1>
				<div class="btn-toolbar mb-2 mb-md-0">
					<div class="btn-group me-2">
						<input type="text" class="form-control" placeholder="category" value={category()} onInput={(e) => { setCategory(e.target.value); }} />
						<button type="button" class="btn btn-sm btn-success" onClick={getProducts}>Refresh</button>
					</div>
				</div>
			</div>

			<div class="table-responsive">
				<table class="table table-striped table-sm">
					<thead>
						<tr>
							<th scope="col">Id</th>
							<th scope="col">Name</th>
							<th scope="col">Category</th>
							<th scope="col">Description</th>
							<th scope="col">Units</th>
						</tr>
					</thead>
					<tbody>
						<For each={userInfo.products} fallback={<div>Loading...</div>}>
							{(product) => <tr>
								<td>{product.id}</td>
								<td>{product.name}</td>
								<td>{product.category}</td>
								<td>{product.description}</td>
								<td>{product.units}</td>
							</tr>}
						</For>
					</tbody>
				</table>
			</div>
		</>
	)
}