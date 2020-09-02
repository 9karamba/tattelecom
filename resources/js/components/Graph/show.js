import React, { Component } from 'react';
import AddVertex from "../Vertex/add";
import AddEdge from "../Edge/add";
import Algorithm from "../algorithm";

class ShowGraph extends Component {

    constructor() {

        super();
        this.state = {
            graph: null,
            vertices: [],
            edges: [],
            error: null
        }

        this.handleAddVertex = this.handleAddVertex.bind(this);
        this.handleAddEdge = this.handleAddEdge.bind(this);
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.graph !== prevProps.graph) {
            const firstResponse = await Promise.all([
                axios.get('/api/vertices/?graph_id=' + this.props.graph.id)
            ]);
            const secondResponse = await axios.get('/api/edges/?vertices=' + JSON.stringify(firstResponse[0].data));
            this.setState({
                vertices: firstResponse[0].data,
                graph: this.props.graph,
                edges: secondResponse.data
            });
        }
    }

    renderHead() {
        return this.state.vertices.map(vertex => {
            return (
                <th key={"header" + vertex.id} >
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

    renderBody() {
        return this.state.vertices.map(vertex_to => {
            let row = this.state.vertices.map(vertex_from => {
                let cell = [];
                console.log(this.state.error);
                if(this.state.edges.length !== undefined){
                    cell = this.state.edges.filter(edge => {
                        return edge.vertex_id_from === vertex_from.id && edge.vertex_id_to === vertex_to.id;
                    });
                }
                if(cell.length === 0 ) {
                    return (
                        <td key={"empty-cell" + vertex_from.id}> 0 </td>
                    );
                }
                else{
                    return (
                        <td key={"cell" + cell[0].id}>
                            {cell[0].weight}
                            <p onClick={
                                () =>this.handleDeleteEdge(cell[0])}>
                                Delete
                            </p>
                        </td>
                    );
                }
            });
            return (
                <tr key={"row" + vertex_to.id} >
                    <td>
                        {vertex_to.name}
                    </td>
                    { row }
                </tr>
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

    handleAddEdge(edge) {

        fetch( 'api/edges/', {
            method:'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(edge)
        })
            .then(response => {
                return response.json();
            })
            .then( data => {

                if(!data.message) {
                    this.setState({
                        edges: data
                    })
                }
                else{
                    this.setState({
                        error: data.message
                    })
                }
            })
    }

    handleDeleteEdge(edge) {

        const currentEdge = edge;
        fetch( 'api/edges/' + currentEdge.id,
            { method: 'delete' })
            .then(response => {
                var array = this.state.edges.filter(function(item) {
                    return item !== currentEdge
                });

                this.setState({ edges: array });

            });
    }

    render() {
        const { graph, error } = this.state;

        if(error !== null) {
            return (
                <div>
                    <h4>
                        {error}
                        <br/>
                        Обновите страницу и попробуйте еще раз.
                    </h4>
                </div>

            );
        }
        else if(graph === null) {
            return (
                <div>
                    <h4> Выберите граф. </h4>
                </div>

            );
        }
        else {
            return (
                <div>
                    <p>{this.state.error}</p>

                    <table>
                        <thead>
                            <tr>
                                <th/>
                                {this.renderHead()}
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderBody()}
                        </tbody>
                    </table>

                    <div>
                        <AddVertex graph_id={this.state.graph.id} onAdd={this.handleAddVertex} />
                        <AddEdge vertices={this.state.vertices} onAdd={this.handleAddEdge} />
                        <Algorithm vertices={this.state.vertices} edges={this.state.edges} />
                    </div>
                </div>

            );
        }
    }
}

export default ShowGraph;
