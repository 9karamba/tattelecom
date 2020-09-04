import React, { Component } from 'react';

class Algorithm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            vertices: this.props.vertices,
            edges: this.props.edges,
            data: {
                vertex_id_from: this.props.vertices.length === 0 ? 0 : this.props.vertices[0].id,
                vertex_id_to: this.props.vertices.length === 0 ? 1 : this.props.vertices[1].id
            }
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            vertices: nextProps.vertices,
            edges: nextProps.edges
        });
    }

    handleInput(key, e) {

        let state = Object.assign({}, this.state.data);
        state[key] = e.target.value;
        this.setState({data: state });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onAdd(this.state.data);
    }

    render() {
        return (
            <div>

                <div>
                    <h2> Найти крайтчайший путь: </h2>

                    <form onSubmit={this.handleSubmit}>

                        <label>
                            Из:
                        </label>
                        <select value={this.state.data.vertex_id_from}
                                onChange={(e) => this.handleInput('vertex_id_from', e)}>
                            {
                                this.state.vertices.map(vertex => {
                                    return (
                                        <option value={vertex.id} key={"algorithm-from" + vertex.id}>
                                            {vertex.name}
                                        </option>
                                    );
                                })
                            }
                        </select>

                        <label>
                            В:
                        </label>
                        <select value={this.state.data.vertex_id_to}
                                onChange={(e) => this.handleInput('vertex_id_to', e)}>
                            {
                                this.state.vertices.map(vertex => {
                                    return (
                                        <option value={vertex.id} key={"algorithm-to" + vertex.id}>
                                            {vertex.name}
                                        </option>
                                    );
                                })
                            }
                        </select>

                        <input type="submit" value="Найти"/>
                    </form>
                </div>
            </div>)
    }
}

export default Algorithm ;

