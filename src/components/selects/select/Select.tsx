import React from 'react'
import { Form } from 'react-bootstrap';

interface ISelect {
	size?: 'sm' | 'lg'
	selectOption: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	options: string[];
	value: string;
	defaultValue?: string;
}

export default function Select(props: ISelect) {
	return (
		<Form.Select
			value={props.value}
			size={props.size}
			onChange={props.selectOption}
		>
			<option value='' disabled>{props.defaultValue}</option>
			{props.options.map(s => (
				<option key={s} value={s}>{s}</option>
			))}
		</Form.Select>
	)
}
