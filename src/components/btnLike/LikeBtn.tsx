import React, { useState } from 'react';
import styles from './LikeBtn.module.scss';

interface ILikeBtn {
	value: number;
	onClick?: (value: number) => void;
}

export default function LikeBtn(props: ILikeBtn) {

	const [like, setLike] = useState(props.value);

	const plusLike = () => {
		const newLike = like === props.value ? like + 1 : like - 1;
		setLike(newLike);
		props.onClick?.(newLike);
	}

	return (
		<button
			type='button'
			onClick={plusLike}
			className={like === props.value ? styles.like: styles.disLike}
		>
			<div className={styles.favorite}>favorite</div>
			<div className={styles.favorite_border}>favorite_border</div>
			<div className={styles.num}>
				{like}
			</div>
		</button>
	)
}