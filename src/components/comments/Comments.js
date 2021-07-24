import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import CommentList from './CommentsList';
const Comments = () => {
	const [ isAddingComment, setIsAddingComment ] = useState(false);
	const quoteId = useParams();

	const { sendRequest, status, data: loadedComments, error } = useHttp(getAllComments);

	useEffect(
		() => {
			sendRequest(quoteId);
		},
		[ sendRequest, quoteId ]
	);

	const startAddCommentHandler = () => {
		setIsAddingComment(true);
	};
	let comment;
	if (status === 'pending') {
		comment = (
			<div className="centered">
				<LoadingSpinner />
			</div>
		);
	}
	if (status === 'completed' && loadedComments && loadedComments.length > 0) {
		comment = (
			<div className="centered">
				<CommentList comments={loadedComments} />
			</div>
		);
	}
	if (status === 'completed' && (!loadedComments || loadedComments.length <= 0)) {
		comment = (
			<div className="centered">
				<h2>No comment entered yet</h2>
			</div>
		);
	}
	const addedcommentHandler = useCallback(
		() => {
			sendRequest(quoteId);
		},
		[ sendRequest, quoteId ]
	);
	return (
		<section className={classes.comments}>
			<h2>User Comments</h2>
			{!isAddingComment && (
				<button className="btn" onClick={startAddCommentHandler}>
					Add a Comment
				</button>
			)}
			{isAddingComment && <NewCommentForm quoteId={quoteId} onAddedComment={addedcommentHandler} />}
			{comment}
		</section>
	);
};

export default Comments;
