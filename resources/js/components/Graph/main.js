import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AddGraph from "./add";
import ShowGraph from "./show";

class Main extends Component {

    constructor() {

        super();
        this.state = {
            graphs: [],
            currentGraph: null

        }
        this.handleAddGraph = this.handleAddGraph.bind(this);
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
                <li key={graph.id} >
                    <p onClick={
                        () =>this.handleClick(graph)}>
                        { graph.name }
                    </p>
                    <p onClick={
                        () =>this.handleDeleteGraph(graph)} className="delete-button">
                        Delete
                    </p>
                </li>
            );
        })
    }

    handleClick(graph) {
        this.setState({currentGraph:graph});
    }

    handleAddGraph(graph) {

        fetch( 'api/graphs/', {
            method:'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(graph)
        })
            .then(response => {
                return response.json();
            })
            .then( data => {

                this.setState((prevState)=> ({
                    graphs: prevState.graphs.concat(data),
                    currentGraph : data
                }))
            })
    }

    handleDeleteGraph(graph) {

        const currentGraph = graph;
        fetch( 'api/graphs/' + currentGraph.id,
            { method: 'delete' })
            .then(response => {
                var array = this.state.graphs.filter(function(item) {
                    return item !== currentGraph
                });

                this.setState({ graphs: array, currentGraph: null});

            });
    }

    render() {

        return (
            <div className="main">
                <div className="main-graphs">
                    <div>
                        <h3> Графы: </h3>
                        <ul>
                            { this.renderGraphs() }
                        </ul>
                    </div>
                    <AddGraph onAdd={this.handleAddGraph} />
                </div>
                <ShowGraph graph={this.state.currentGraph} />
            </div>

        );
    }
}

export default Main;

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}
