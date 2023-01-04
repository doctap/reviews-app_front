import React from 'react'
import { IUser } from '../../api/data-contracts/data-contracts';
import styles from './UserCard.module.scss';

interface IUserCard {
	data_user: IUser
}

export default function UserCard(props: IUserCard) {
	return (
		<div className={styles.userCard}>
			<div>
				<img src={props.data_user?.picture} alt={props.data_user?.name} />
			</div>
			<div>
				<h5>{props.data_user?.name}</h5>
				<div>{props.data_user?.email}</div>
			</div>
		</div>
	)
}
