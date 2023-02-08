import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Select } from '../index';

interface ICreateReviewCard {
	authorId?: string;
	labels: ICreateReviewCardLabels;
	submitForm(body: FormData): void;
}

export interface ICreateReviewCardLabels {
	labelTitle: string;
	labelType: string;
	labelTags: string;
	labelAuthorRating: string;
	labelNameWork: string;
	labelText: string;
	labelImage: string;
}

const authorRates = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
const reviewTypes = ['book', 'film', 'game'];
type image = { f: File | null, isDownloaded: boolean };

export const CreateReviewForm = (props: ICreateReviewCard) => {

	const [title, setTitle] = useState('');
	const [typeReview, setTypeReview] = useState('');
	const [tags, setTags] = useState('');
	const [text, setText] = useState('');
	const [nameWork, setNameWork] = useState('');
	const [authorRate, setAuthorRate] = useState('');
	const [drag, setDrag] = useState(false);
	const [image, setImage] = useState<image>({ f: null, isDownloaded: false });

	const onDragStartHandler = (e: React.DragEvent<HTMLFormElement>) => {
		e.preventDefault();
		setDrag(true);
	}

	const onDragLeaveHandler = (e: React.DragEvent<HTMLFormElement>) => {
		e.preventDefault();
		setDrag(false);
	}

	const onDropHandler = (e: React.DragEvent<HTMLFormElement>) => {
		e.preventDefault();
		let files = [...e.dataTransfer.files];
		setDrag(false)
		setImage({ f: files[0], isDownloaded: true })
	}

	const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.stopPropagation();
		e.preventDefault();
		let formData = new FormData();
		if (
			props.authorId && authorRate && nameWork && tags && text && title && typeReview && image.f
		) {
			formData.append("fileName", image.f.name);
			formData.append("file", image.f);
			formData.append(
				"reviewData",
				JSON.stringify({
					sub: props.authorId ?? '',
					author_rating: parseInt(authorRate as string),
					name_work: nameWork,
					tags: tags,
					text: text,
					title: title,
					type: typeReview,
					date: new Date().toUTCString()
				}));
			props.submitForm(formData)
		}
	}

	return (
		<Form
			className={`p-4 border border-2 rounded-3 ${drag ? 'border-success' : 'border-dark border-opacity-25'}`}
			onDragStart={onDragStartHandler}
			onDragLeave={onDragLeaveHandler}
			onDragOver={onDragStartHandler}
			onDrop={onDropHandler}
			onSubmit={submitForm}
		>
			<Form.Group className="mb-3">
				<Form.Label>
					{props.labels.labelTitle}
				</Form.Label>
				<Form.Control maxLength={100} value={title} onChange={(e) => setTitle(e.currentTarget.value)} type="text" />
			</Form.Group>

			<Form.Group className="mb-3">
				<Form.Label>
					{props.labels.labelType}
				</Form.Label>
				<Select
					value={typeReview}
					options={reviewTypes}
					selectOption={e => setTypeReview(e.currentTarget.value)}
				/>
			</Form.Group>

			<Form.Group className="mb-3">
				<Form.Label>
					{props.labels.labelTags}
				</Form.Label>
				<Form.Control value={tags} onChange={(e) => setTags(e.currentTarget.value)} type="text" />
			</Form.Group>

			<Form.Group className="mb-3">
				<Form.Label>
					{props.labels.labelAuthorRating}
				</Form.Label>
				<Select
					value={authorRate}
					options={authorRates}
					selectOption={e => setAuthorRate(e.currentTarget.value)}
				/>
			</Form.Group>

			<Form.Group className="mb-3">
				<Form.Label>
					{props.labels.labelNameWork}
				</Form.Label>
				<Form.Control maxLength={100} value={nameWork} onChange={(e) => setNameWork(e.currentTarget.value)} type="text" />
			</Form.Group>

			<Form.Group className="mb-3">
				<Form.Label>
					{props.labels.labelText}
				</Form.Label>
				<Form.Control as="textarea" value={text} onChange={(e) => setText(e.currentTarget.value)} />
			</Form.Group>

			<Form.Group className="mb-3">
				<Form.Label>
					{`${props.labels.labelImage} ${image.isDownloaded ? `✔️ ${image.f?.name}` : ``} `}
				</Form.Label>
			</Form.Group>

			<Button variant="primary" type="submit">
				Create
			</Button>
		</Form>
	)
}
