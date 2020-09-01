import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Main extends Component {

    constructor() {

        super();
        this.state = {
            graphs: [],
            currentGraph: null

        }
    }

    componentDidMount() {
        fetch('/api/graphs')
            .then(response => {
                return response.json();
            })
            .then(graphs => {
                this.setState({ graphs });
            });
    }

    renderGraphs() {
        return this.state.graphs.map(graph => {
            return (
                <li onClick={
                    () =>this.handleClick(graph)} key={graph.id} >
                    { graph.name }
                </li>
            );
        })
    }

    handleClick(graph) {
        this.setState({currentGraph:graph});
    }

    render() {

        return (
            <div>
                <div>
                    <div>
                        <h3> Графы: </h3>
                        <ul>
                            { this.renderGraphs() }
                        </ul>

                    </div>
                </div>

            </div>

        );
    }
}

export default Main;

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}
