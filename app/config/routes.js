// import module
var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;    // Assign ReactRouter.Router || Function Router จาก react-router module
var Route = ReactRouter.Route;      // Assign ReactRouter.Route || Function Route จาก react-router module
// var hashHistory = ReactRouter.hashHistory;
var browserHistory = ReactRouter.browserHistory;
var IndexRoute = ReactRouter.IndexRoute;
//  import components
var Main = require('../components/Main');
var Home = require('../components/Home');
var PromptContainer = require('../containers/PromptContainer');
var ConfirmBattleContainer = require('../containers/ConfirmBattleContainer');
var ResultsContainer = require('../containers/ResultsContainer');

var routes = (
    <Router history={browserHistory} >
        <Route path='/' component={Main}>
            <IndexRoute component={Home} />
            <Route path='playerOne' header="Player One" component={PromptContainer} />
            <Route path='playerTwo/:playerOne' header='Player Two' component={PromptContainer} />
            <Route path='battle' component={ConfirmBattleContainer} />
            <Route path='results' component={ResultsContainer} />
        </Route>
    </Router >
);

module.exports = routes;