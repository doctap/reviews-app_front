import React from 'react'
import { Dna } from 'react-loader-spinner'
// zimport "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function Spinner() {
	return (
		<Dna
			visible={true}
			height="80"
			width="80"
			ariaLabel="dna-loading"
			wrapperStyle={{}}
			wrapperClass="dna-wrapper"
		/>
	)
}
