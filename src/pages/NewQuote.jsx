import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import QuoteForm from '../components/quotes/QuoteForm';
import useHttp from '../hooks/use-http';
import { addQuote } from '../lib/api';
function NewQuote() {
	const { sendRequest, status } = useHttp(addQuote);
	const history = useHistory();

	useEffect(
		() => {
			if (status === 'completed') {
				history.push('/quotes');
			}
		},
		[ status, history ]
	);
	const addQuoteHandler = (quoteData) => {
		sendRequest(quoteData);
	};
	return (
		<div>
			<QuoteForm isLoading={status === 'pending'} onAddQuoteHandler={addQuoteHandler} />
		</div>
	);
}

export default NewQuote;
