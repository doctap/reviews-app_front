import React from 'react'
import { Form } from 'react-bootstrap'

interface ISelect {
	size?: Size;
	getRate: (rate: number) => void;
	options: OptionType[];
}

type Size = 'sm' | 'lg';
type OptionType = string | number;

export default function Select(props: ISelect) {

	const onListener = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const elem = e.currentTarget;
		props.getRate(parseInt(elem.value))
	}

	return (
		<Form.Select
			size={props.size}
			defaultValue='d'
			onChange={onListener}
			aria-label="Default select example"
		>
			<option value='d' disabled>Give a rating</option>
			{props.options.map(s => (
				<option key={s} value={s}>{s}</option>
			))}
		</Form.Select>
	)
}
