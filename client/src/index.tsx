import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import store from 'store';

import CharacterScreen from './screens/character-board';
import { Wiki } from './screens/wiki';
import { ElementType } from './screens/wiki/section-elements/element';
import './styles.scss';

class App extends React.Component {
    public render() {
        return <Provider store={store}>
            <BrowserRouter>
                {/*<div>
                    <Link to="/wiki">Go to wiki</Link>
                    <br />
                    <Link to="/map">Go to map</Link>
                    <Route path="/wiki" component={() => <Wiki {...wikiInfo} />}/>
                    <Route path="/map" component={() => <p>todo</p>}/>
                </div>*/}
                <CharacterScreen/>
            </BrowserRouter>
        </Provider>
    }
}
const Wrapped = DragDropContext(HTML5Backend)(App);

render( <Wrapped />, document.getElementById( "harper" ) );
