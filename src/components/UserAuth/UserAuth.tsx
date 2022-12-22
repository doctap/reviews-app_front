import { useAuth0 } from "@auth0/auth0-react";
import { IRegisterUser } from "../../api/data-contracts/data-contracts";
import { registerUser } from "../../api/http-client";
import { AuthButton } from "../authButton/AuthButton";

// interface IUserAuth {
// 	givenName?: string;
// 	familyName?: string;
// }

export default function UserAuth() {

	const { user, getAccessTokenSilently } = useAuth0()

	const data: IRegisterUser = {
		token: '',
		sub: user?.sub,
		firstName: user?.given_name,
		lastName: user?.family_name,
	}

	const register = () => {
		getAccessTokenSilently()
			.then(t => {
				data.token = t;
				registerUser(data)
					.then(r => {
						console.log(r)
					})
			})
	}



	return (
		<>
			<span>
				{`${user?.given_name ?? ''} ${user?.family_name ?? ''}`}
			</span>
			<AuthButton />
			<button children='зарегистрироваться' onClick={register} />
		</>
	)
}
