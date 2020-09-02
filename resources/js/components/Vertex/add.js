import React, { Component } from 'react';

class AddVertex extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newVertex: {
                name: '',
                graph_id: parseInt(this.props.graph_id)
            }
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.handleInput('graph_id', nextProps.graph_id);
    }

    handleInput(key, e) {

        let state = Object.assign({}, this.state.newVertex);
        state[key] = e.target.value;
        this.setState({newVertex: state });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onAdd(this.state.newVertex);
    }

    render() {
        return(
            <div>

                <div>
                    <h2> Добавить новую вершину </h2>

                    <form onSubmit={this.handleSubmit}>

                        <label>
                            Имя:
                            <input type="text" onChange={(e)=>this.handleInput('name',e)} />
                        </label>

                        <input  type="submit" value="Добавить" />
                    </form>
                </div>
            </div>)
    }
}

export default AddVertex;
