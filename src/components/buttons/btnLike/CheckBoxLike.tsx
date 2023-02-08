import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

interface ICheckBoxLike {
	isLike?: boolean;
	onLike: (isLike: boolean) => void;
	text?: string;
}

export const CheckBoxLike = (props: ICheckBoxLike) => {

	const [like, setLike] = useState<boolean | undefined>(false);

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setLike(!like);
		const elem = event.currentTarget;
		props.onLike(elem.checked);
	}

	useEffect(() => {
		setLike(props.isLike)
	}, [props.isLike])

	return (
		<Form.Check label='Like it?' id='likeCheckbox' type='checkbox' checked={like} onChange={onChange} />
	)
}
