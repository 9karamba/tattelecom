import React, { Component } from 'react';

class ShowGraph extends Component {

    constructor() {

        super();
        this.state = {
            graph: null,
            vertices: []
        }
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
                    {vertex.name}
                </th>
            );
        })
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
                                <th></th>
                                {this.renderHead()}
                            </tr>
                        </thead>
                    </table>
                </div>

            );
        }
    }
}

export default ShowGraph;
