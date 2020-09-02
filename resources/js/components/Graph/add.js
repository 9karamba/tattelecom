import React, { Component } from 'react';

class AddGraph extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newGraph: {
                name: ''
            }
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(key, e) {

        let state = Object.assign({}, this.state.newGraph);
        state[key] = e.target.value;
        this.setState({newGraph: state });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onAdd(this.state.newGraph);
    }

    render() {
        return(
            <div>

                <div>
                    <h4> Добавить новый граф: </h4>

                    <form onSubmit={this.handleSubmit}>

                        <input type="text" placeholder="Введите имя.." onChange={(e)=>this.handleInput('name',e)} />
                        <input  type="submit" value="Добавить" />

                    </form>
                </div>
            </div>)
    }
}

export default AddGraph;
