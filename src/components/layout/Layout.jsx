import React, { Fragment } from 'react';
import Classes from './Layout.module.css';
import MainNavigation from './MainNavigation';
function Layout(props) {
	return (
		<Fragment>
			<MainNavigation />
			<main className={Classes.main}>{props.children}</main>
		</Fragment>
	);
}

export default Layout;
