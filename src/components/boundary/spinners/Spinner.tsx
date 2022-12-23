import React from 'react'
import { BallTriangle} from 'react-loader-spinner'
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

interface ISpinnerBallTriangle {
	color: string;
}

export default function SpinnerBallTriangle(props: ISpinnerBallTriangle) {
	return (
		<BallTriangle
			height={100}
			width={100}
			radius={5}
			color={props.color}
			ariaLabel="ball-triangle-loading"
			visible={true}
		/>
	)
}