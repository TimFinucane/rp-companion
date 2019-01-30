import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import store from 'store';

import CharacterScreen from './screens/character-board';
import Wiki from './screens/wiki';
import * as styles from './styles.scss';

declare var URL_ROOT: string;
const url_root = URL_ROOT || "/";

console.log(URL_ROOT);

const App = () => <div className={styles.app}>
    <div className={styles.header}>
        <Link className={styles.link} to="/wiki">Wiki</Link>
        <Link className={styles.link} to="/map">Map</Link>
        <Link className={styles.link} to="/characters">Characters</Link>
    </div>
    <div className={styles.body}>
        <Route path="/characters" component={() => <CharacterScreen/>}/>
        <Route path="/wiki" component={() => <Wiki />}/>
        <Route path="/map" component={() => <p>todo</p>}/>
    </div>
</div>;

const Wrapped = DragDropContext(HTML5Backend)(() =>
    <Provider store={store}>
        <BrowserRouter basename={url_root}>
            <App />
        </BrowserRouter>
    </Provider>
);
render( <Wrapped />, document.getElementById( "coaster" ) );
