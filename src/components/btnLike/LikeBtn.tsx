import React, { useState } from 'react';
import styles from './LikeBtn.module.scss';

interface ILikeBtn {
	//may need a number of likes
	likes?: number;
	onClick: () => void;
	isLike: boolean;
}

export default function LikeBtn(props: ILikeBtn) {

	return (
		<button
			type='button'
			onClick={props.onClick}
			className={props.isLike ? styles.like : styles.disLike}
		>
			<div className={styles.favorite}>favorite</div>
			<div className={styles.favorite_border}>favorite_border</div>
			{/* <div className={styles.num}>
				{props.likes}
			</div> */}
		</button>
	)
}