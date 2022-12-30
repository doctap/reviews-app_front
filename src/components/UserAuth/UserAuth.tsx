import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { IUser } from "../../api/data-contracts/data-contracts";
import { registerUser } from "../../api/http-client";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/redux";
import { userSlice } from "../../redux/reducers/UserSlice";
import { AuthButton } from "../buttons/authButton/AuthButton";

export default function UserAuth() {

	const { token, data_user } = useAppSelector(state => state.userSlice);
	const { userRecognition } = userSlice.actions;
	const dispatch = useAppDispatch();

	const { isAuthenticated, user, getAccessTokenSilently, loginWithRedirect, logout } = useAuth0();

	const log_in = () => loginWithRedirect();

	const log_out = () => logout({ returnTo: window.location.origin });

	if (isAuthenticated) {
		getAccessTokenSilently()
			.then(t => {
				dispatch(
					userRecognition({
						token: t,
						data_user: user as IUser,
						admin: false,
						isAuthenticated
					})
				)
			})
	}

	useEffect(() => {
		if (isAuthenticated)
			registerUser({
				sub: data_user?.sub,
				given_name: data_user?.given_name,
				family_name: data_user?.family_name
			}, token);
	}, [data_user])

	return (
		<>
			<span>
				{`${user?.given_name ?? ''} ${user?.family_name ?? ''}`}
			</span>
			<AuthButton onLogin={log_in} onLogout={log_out} />
		</>
	)
}
