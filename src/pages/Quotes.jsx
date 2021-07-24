import React, { useEffect } from 'react';
import { getAllQuotes } from '../lib/api';
import useHttp from '../hooks/use-http';
import QuoteList from '../components/quotes/QuoteList';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import NoQuote from '../components/quotes/NoQuotesFound';
import { useHistory } from 'react-router-dom';
function Quotes() {
	const history = useHistory();
	const { sendRequest, status, data: loadedQuote, error } = useHttp(getAllQuotes, true);
	useEffect(
		() => {
			sendRequest();
		},
		[ sendRequest ]
	);
	if (status === 'pending') {
		return (
			<div className="centered">
				<LoadingSpinner />
			</div>
		);
	}

	if (status === 'error') {
		return <dvi className="centered focused">{error}</dvi>;
	}
	if (status === 'completed' && loadedQuote.length === 0) {
		return (
			<div className="centered focused">
				<NoQuote />
			</div>
		);
	}

	return (
		<div>
			<QuoteList quotes={loadedQuote} />
		</div>
	);
}

export default Quotes;
