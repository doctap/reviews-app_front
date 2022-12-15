import { AuthButton } from "../authButton/AuthButton";

interface IUserAuth {
	givenName?: string;
	familyName?: string;
}

export default function UserAuth(props: IUserAuth) {
	if (props.givenName === undefined && props.familyName === undefined) return <AuthButton />;
	return (
		<>
			<span>
				{`${props.givenName ?? ''} ${props.familyName ?? ''}`}
			</span>
			<AuthButton />
		</>
	)
}
