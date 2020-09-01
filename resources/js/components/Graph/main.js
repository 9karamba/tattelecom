import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AddGraph from "./add";

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
                    <AddGraph onAdd={this.handleAddGraph} />
                </div>

            </div>

        );
    }
}

export default Main;

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}
