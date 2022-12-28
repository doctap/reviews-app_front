import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'

interface IGiveRate {
	size?: 'sm' | 'lg';
	getRate: (rate: number) => void;
	options: number[];
	value?: number;
}

export default function GiveRate(props: IGiveRate) {

	const [value, setValue] = useState<number | string | undefined>();

	const onListener = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const elem = e.currentTarget;
		setValue(elem.value);
		props.getRate(parseInt(elem.value));
	}

	useEffect(() => {
		setValue(props.value)
	}, [props.value])

	return (
		<Form.Select
			value={value}
			size={props.size}
			defaultValue={props.value}
			onChange={onListener}
			aria-label="Default select example"
		>
			{props.options.map(s => (
				<option key={s} value={s}>{s}</option>
			))}
		</Form.Select>
	)
}
