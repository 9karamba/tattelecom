import React, { Component } from 'react';

class Algorithm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            vertices: this.props.vertices,
            edges: this.props.edges,
            data: {
                vertex_id_from: this.props.vertices[0].id,
                vertex_id_to: this.props.vertices[1].id
            },
            result: 0
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(key, e) {

        let state = Object.assign({}, this.state.data);
        state[key] = e.target.value;
        this.setState({data: state });
    }

    handleSubmit(e) {
        e.preventDefault();

        let minIndex, minDistance;
        let start = parseInt(this.state.data.vertex_id_from);
        let end = parseInt(this.state.data.vertex_id_to);
        let vertices = [];

        this.state.vertices.map(vertex => {
            vertices[vertex.id] = {
                name: vertex.name,
                distance: vertex.id === start ? 0 : 10000,
                visit: 0
            }
        });

        do {
            minIndex = 10000;
            minDistance = 10000;

            vertices.forEach((vertex, index) => {
                if ((vertex.visit === 0) && (vertex.distance < minDistance)) {
                    minDistance = vertex.distance;
                    minIndex = index;

                    if(vertex.id === start) {
                        vertex.visit = 1;
                    }
                }
            });
            // Если соседних вершин нет
            if (minIndex !== 10000)
            {
                for (let i = 0; i < this.state.edges.length; i++) {
                    let id_from = this.state.edges[i].vertex_id_from;
                    let id_to = this.state.edges[i].vertex_id_to;

                    if (id_from === minIndex) {
                        let weight = minDistance + this.state.edges[i].weight;

                        if (weight < vertices[id_to].distance) {
                            vertices[id_to].distance = weight;
                        }
                    }
                }
                vertices[minIndex].visit = 1;
            }
        } while (minIndex < 10000);

        let result = [ vertices[end].name ];
        let weight = vertices[end].distance;

        while (end !== start) {

            for (let i = 0; i < this.state.edges.length; i++) {
                let id_from = this.state.edges[i].vertex_id_from;
                let id_to = this.state.edges[i].vertex_id_to;

                if (id_to === end) {
                    let temp = weight - this.state.edges[i].weight;

                    if (temp === vertices[id_from].distance) {
                        weight = temp;
                        end = id_from;
                        result.push(vertices[id_from].name);
                    }
                }
            }
        }

        this.setState({
            result: result.reverse().join(' -> ') + '; Расстояние=' + vertices[this.state.data.vertex_id_to].distance
        });
    }

    render() {
        return (
            <div>

                <div>
                    <h2> Найти крайтчайший путь: </h2>

                    <form onSubmit={this.handleSubmit}>

                        <label>
                            Из:
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
                        </label>

                        <label>
                            В:
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
                        </label>

                        <input type="submit" value="Найти"/>
                    </form>
                </div>
                <div>
                    <h2> Результат: </h2>
                    <p>
                        {this.state.result}
                    </p>
                </div>
            </div>)
    }
}

export default Algorithm ;

