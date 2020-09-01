import React, { Component } from 'react';
import AddGraph from "./add";
import AddVertex from "../Vertex/add";

class ShowGraph extends Component {

    constructor() {

        super();
        this.state = {
            graph: null,
            vertices: []
        }
        this.handleAddVertex = this.handleAddVertex.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.graph !== prevProps.graph) {
            fetch('/api/vertices/?graph_id=' + this.props.graph.id)
                .then(response => {
                    return response.json();
                })
                .then(vertices => {
                    this.setState({
                        vertices: vertices,
                        graph: this.props.graph
                    });
                });
        }
    }

    renderHead() {
        return this.state.vertices.map(vertex => {
            return (
                <th key={vertex.id} >
                    <p>
                        {vertex.name}
                    </p>

                    <p onClick={
                        () =>this.handleDeleteVertex(vertex)}>
                        Delete
                    </p>
                </th>
            );
        })
    }

    handleAddVertex(vertex) {

        fetch( 'api/vertices/', {
            method:'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(vertex)
        })
            .then(response => {
                return response.json();
            })
            .then( data => {

                this.setState((prevState)=> ({
                    vertices: prevState.vertices.concat(data)
                }))
            })
    }

    handleDeleteVertex(vertex) {

        const currentVertex = vertex;
        fetch( 'api/vertices/' + currentVertex.id,
            { method: 'delete' })
            .then(response => {
                var array = this.state.vertices.filter(function(item) {
                    return item !== currentVertex
                });

                this.setState({ vertices: array });

            });
    }

    render() {
        const { graph, vertices } = this.state;

        if(graph === null) {
            return (
                <div>
                    <h4> Выберите граф. </h4>
                </div>

            );
        }
        else {
            return (
                <div>

                    <table>
                        <thead>
                            <tr>
                                <th/>
                                {this.renderHead()}
                            </tr>
                        </thead>
                    </table>

                    <div>
                        <AddVertex graph_id={this.state.graph.id} onAdd={this.handleAddVertex} />
                    </div>
                </div>

            );
        }
    }
}

export default ShowGraph;
