import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { useNavigate } from "solid-app-router";
import { useGlobalState } from "./GlobalState";
import { jsonPost } from "./fetch";

export default function Products(props) {
	const [userInfo, { updateProducts }] = useGlobalState();
	const [fields, setFields] = createStore({
		id: 'ID10',
		name: 'Product Name',
		category: 'Commercial',
		description: 'Sample description',
		units: 1,
	});

	const navigate = useNavigate();

	const setFieldValue = (fieldName, fieldValue) => {
		setFields(fieldName, fieldValue);
	}

	const saveProduct = async () => {
		try {
			const newProduct = fields;
			const result = await jsonPost(`/api/products/`, newProduct, userInfo.token)
			navigate('/products', { replace: true });
			alert('saved - ' + result?.data?.id)
		}
		catch (e) {
			alert('ERROR in saveProduct : ' + e)
			throw e;
		}
	}

	return (
		<>
			<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
				<h1 class="h2">New Product</h1>
				<div class="btn-toolbar mb-2 mb-md-0">
					<div class="btn-group me-2">
						<button type="button" class="btn btn-sm btn-success" onClick={saveProduct}>Save</button>
					</div>
				</div>
			</div>

			<form id="loginForm" class="form">
				<label class="form-label">Id</label>
				<input type="text" class="form-control" placeholder="id" required autofocus value={fields.id} onInput={(e) => { setFieldValue('id', e.target.value); }} />
				
				<label class="form-label pt-3">Name</label>
				<input type="text" class="form-control" placeholder="name" required autofocus value={fields.name} onInput={(e) => { setFieldValue('name', e.target.value); }} />
				
				<label class="form-label pt-3">Category</label>
				<input type="text" class="form-control" placeholder="category" required autofocus value={fields.category} onInput={(e) => { setFieldValue('category', e.target.value); }} />
				
				<label class="form-label pt-3">Description</label>
				<textarea rows="5" class="form-control" placeholder="description" required value={fields.description} onInput={(e) => { setFieldValue('description', e.target.value); }} />
				
				<label class="form-label pt-3">Units</label>
				<input type="number" class="form-control" min="1" placeholder="units" required value={fields.units} onInput={(e) => { setFieldValue('units', e.target.value); }} />
			</form>
		</>
	)
}