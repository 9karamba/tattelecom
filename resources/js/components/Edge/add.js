import React, { Component } from 'react';

class AddEdge extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newEdge: {
                weight: 0,
                vertex_id_from: this.props.vertices.length === 0 ? 0 : this.props.vertices[0].id,
                vertex_id_to: this.props.vertices.length === 0 ? 1 : this.props.vertices[1].id
            },
            vertices: this.props.vertices
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            vertices: nextProps.vertices
        });
    }

    handleInput(key, e) {

        let state = Object.assign({}, this.state.newEdge);
        state[key] = e.target.value;
        this.setState({newEdge: state });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onAdd(this.state.newEdge);
    }

    render() {
        return(
            <div>

                <div>
                    <h2> Добавить новую ячейку </h2>

                    <form onSubmit={this.handleSubmit}>

                        <input type="text" placeholder="Введите вес..." onChange={(e)=>this.handleInput('weight',e)} />

                        <label>
                            Из точки:
                        </label>
                        <select value={this.state.newEdge.vertex_id_from} onChange={(e)=>this.handleInput('vertex_id_from',e)}>
                            {
                                this.state.vertices.map(vertex => {
                                    return (
                                        <option value={vertex.id} key={"from" + vertex.id}>
                                            {vertex.name}
                                        </option>
                                    );
                                })
                            }
                        </select>

                        <label>
                            В точку:
                        </label>
                        <select value={this.state.newEdge.vertex_id_to} onChange={(e)=>this.handleInput('vertex_id_to',e)}>
                            {
                                this.state.vertices.map(vertex => {
                                    return (
                                        <option value={vertex.id} key={"to" + vertex.id}>
                                            {vertex.name}
                                        </option>
                                    );
                                })
                            }
                        </select>

                        <input  type="submit" value="Добавить" />
                    </form>
                </div>
            </div>)
    }
}

export default AddEdge;
