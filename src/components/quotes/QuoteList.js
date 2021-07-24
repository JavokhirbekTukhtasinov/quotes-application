import { Fragment } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

const sortQuotes = (quotes, ascanding) => {
	return quotes.sort((quoteA, quoteB) => {
		if (ascanding) {
			return quoteA.id < quoteB ? 1 : -1;
		} else {
			return quoteA.id > quoteB.id ? 1 : -1;
		}
	});
};

const QuoteList = (props) => {
	const history = useHistory();
	const location = useLocation();
	const queryResult = new URLSearchParams(location.search);
	const isAscanding = queryResult.get('sort') === 'asc';
	const sortedQuotes = sortQuotes(props.quotes, isAscanding);
	const changeSortingHandler = () => {
		history.push({
			pathname : location.pathname,
			search   : `?sort=${isAscanding ? 'desc' : 'asc'}`
		});
	};

	return (
		<Fragment>
			<div className={classes.sorting}>
				<button onClick={changeSortingHandler}>Sorting {isAscanding ? 'Descending' : 'Ascending'}</button>
			</div>
			<ul className={classes.list}>
				{sortedQuotes.map((quote) => (
					<QuoteItem key={quote.id} id={quote.id} author={quote.author} text={quote.text} />
				))}
			</ul>
		</Fragment>
	);
};

export default QuoteList;
