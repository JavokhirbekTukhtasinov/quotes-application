import { useEffect } from 'react';
import { useParams, Route, Link, useRouteMatch } from 'react-router-dom';
import Commments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../lib/api';

const DUMMY_QUOTES = [
	{
		id     : 'p1',
		author : 'Javohir',
		text   : 'learning react is fun!'
	},
	{
		id     : 'p2',
		author : 'TJ_dev',
		text   : 'learning react is not fun anymore!'
	}
];

function QuoteDetail() {
	const params = useParams();
	const match = useRouteMatch();
	const quote = DUMMY_QUOTES.find((quote) => quote.id === params.quoteId);
	const { sendRequest, status, data: loadedQuote, error } = useHttp(getSingleQuote, true);
	const { quoteId } = params;
	useEffect(
		() => {
			sendRequest(quoteId);
		},
		[ sendRequest, quoteId ]
	);
	if (status === 'pending') {
		return (
			<div className="centered">
				<LoadingSpinner />
			</div>
		);
	}
	if (error) {
		return <p className="centered">{error}</p>;
	}
	if (!loadedQuote.text) {
		return <p>Not quotes found</p>;
	}

	return (
		<div>
			<HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
			<div className="centered">
				<Route path={match.path} exact>
					<Link className="btn--flat" to={`/quotes/${params.quoteId}/comments`}>
						Load comment
					</Link>
				</Route>
			</div>
			<Route path={`${match.path}/comments`}>
				<Commments />
			</Route>
		</div>
	);
}

export default QuoteDetail;
