import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from 'styles/createListForm';

export default class CreateListForm extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            title: ``,
        };
    }

    /**
     * Update state with input's value
     */
    _inputChange = (ev) => {
        this.setState({ title: ev.target.value });
    }

    /**
     * Call onSubmit passed as prop and pass form data as arg
     */
    _handleSubmit = (ev) => {
        // Prevents default form action
        ev.preventDefault();

        this.props.onSubmit(Object.assign({}, this.state));
    }

    render() {
        return (
            <form onSubmit={this._handleSubmit}>
                <input placeholder="Type list's name" type="text" value={this.state.title} onChange={this._inputChange} />
                <div className="flex-row actions">
                    <button className="submit-list" id="submitList" type="submit">create</button>
                </div>
                <style jsx>{style}</style>
            </form>
        );
    }
}
