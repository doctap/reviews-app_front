import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { IUserData } from "../../api/data-contracts/data-contracts";
import { registerUser } from "../../api/http-client";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/redux";
import { usersSlice } from "../../redux/reducers/UserSlice";
import { AuthButton } from "../authButton/AuthButton";

export default function UserAuth() {

	const { token, admin, data_user } = useAppSelector(state => state.usersSlice);
	const { userRecognition } = usersSlice.actions;
	const dispatch = useAppDispatch();

	const { isAuthenticated, user, getAccessTokenSilently, loginWithRedirect, logout } = useAuth0();

	// const getRegistration = () => {
	// 	getAccessTokenSilently()
	// 		.then(t => {
	// 			data.token = t;
	// 			registerUser(data)
	// 				.then(r => {
	// 					console.log(r)
	// 				})
	// 		})
	// }

	const log_in = () => loginWithRedirect();

	const log_out = () => logout({ returnTo: window.location.origin });

	if (isAuthenticated) {
		getAccessTokenSilently()
			.then(t => {
				dispatch(userRecognition({ token: t, data_user: user, admin: false }))
			})
	}

	useEffect(() => {
		if (isAuthenticated) registerUser({ sub: user?.sub, given_name: user?.given_name, family_name: user?.family_name }, token);
	}, [user])

	return (
		<>
			<span>
				{`${user?.given_name ?? ''} ${user?.family_name ?? ''}`}
			</span>
			<AuthButton onLogin={log_in} onLogout={log_out} />
			{/* <button children='зарегистрироваться' onClick={getRegistration} /> */}
		</>
	)
}
