import { createSignal, createMemo, createEffect, onCleanup } from "solid-js";
import { useGlobalState } from "./GlobalState";
import { jsonPost } from "./fetch";

export default function Login(props) {
	const [userInfo, { updateUserInfo }] = useGlobalState();
	const [email, setEmail] = createSignal("user1@buyproducts.com");
	const [password, setPassword] = createSignal("user123");

	const onLoginClicked = async (e) => {
		const loginForm = document.getElementById('loginForm');
		if (!loginForm.checkValidity()) {
			alert('all inputs are mandatory');
			return;
		}

		try {
			const request = {
				email: email(),
				password: password(),
			}

			const result = await jsonPost(`/api/login/`, request)
			updateUserInfo({
				id: result.id,
				email: result.email,
				token: result.token
			})
		}
		catch (e) {
			alert('ERROR in login : ' + e)
			throw e;
		}
	}

	return (
		<form id="loginForm" class="formsignin" style="text-align: center; margin-top: 10rem;">
			<h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
			<input type="email" class="form-control" placeholder="Email address" required autofocus value={email()} onInput={(e) => {setEmail(e.target.value);}} />
			<input type="password" class="form-control" placeholder="Password" required value={password()} onInput={(e) => {setPassword(e.target.value);}} />
			<button class="btn btn-lg btn-success btn-block" type="button" onClick={onLoginClicked}>Sign in</button>
		</form>
	)
}