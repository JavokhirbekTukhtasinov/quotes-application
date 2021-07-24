import { Fragment, useRef, useState } from 'react';
import { Prompt } from 'react-router-dom';
import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './QuoteForm.module.css';

const QuoteForm = (props) => {
	const [ isEntering, setIsEntering ] = useState(false);
	const authorInputRef = useRef();
	const textInputRef = useRef();

	function submitFormHandler(event) {
		event.preventDefault();

		const enteredAuthor = authorInputRef.current.value;
		const enteredText = textInputRef.current.value;

		// optional: Could validate here

		props.onAddQuoteHandler({ author: enteredAuthor, text: enteredText });
	}

	const formFocusHandler = () => {
		setIsEntering(true);
	};

	return (
		<Fragment>
			<Prompt
				when={isEntering}
				message={(location) => 'Are you sure You want to leave? All your entered information will disappear!!!'}
			/>
			<Card>
				<form onFocus={formFocusHandler} className={classes.form} onSubmit={submitFormHandler}>
					{props.isLoading && (
						<div className={classes.loading}>
							<LoadingSpinner />
						</div>
					)}

					<div className={classes.control}>
						<label htmlFor="author">Author</label>
						<input type="text" id="author" ref={authorInputRef} />
					</div>
					<div className={classes.control}>
						<label htmlFor="text">Text</label>
						<textarea id="text" rows="5" ref={textInputRef} />
					</div>
					<div className={classes.actions}>
						<button onClick={() => setIsEntering(false)} className="btn">
							Add Quote
						</button>
					</div>
				</form>
			</Card>
		</Fragment>
	);
};

export default QuoteForm;
