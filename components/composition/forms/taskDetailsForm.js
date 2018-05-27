import React, { Component } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';
import PropTypes from 'prop-types';
import style from 'styles/taskDetailsForm';
import 'react-day-picker/lib/style.css';

import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';

function parseDate(str, format, locale) {
    const parsed = dateFnsParse(str, format, { locale });
    if (DateUtils.isDate(parsed)) {
        return parsed;
    }
    return undefined;
}

function formatDate(date, format, locale) {
    return dateFnsFormat(date, format, { locale });
}

export default class TaskDetailsForm extends Component {
    static propTypes = {
        task: PropTypes.object,
        onSubmit: PropTypes.func.isRequired,
        submitText: PropTypes.string.isRequired,
    }

    static defaultProps = {
        task: undefined,
    }

    constructor(props) {
        super(props);

        this.state = {
            status: props.task ? props.task.status === `completed` : false,
            title: props.task ? props.task.title : ``,
            due: props.task ? props.task.due : null,
            notes: props.task ? (props.task.notes === null ? `` : props.task.notes) : ``,
        };
    }

    /**
     * Update state with input's value
     */
    _handleInputChange = (ev) => {
        const { target } = ev;
        if (target) {
            const { name } = target;
            const value = target.type === `checkbox` ? target.checked : target.value;
            this.setState({
                [name]: value,
            });
        } else {
            this.setState({
                due: ev,
            });
        }
    }

    /**
     * Call onSubmit passed as prop and pass form data as arg
     */
    _handleSubmit = (ev) => {
        // Prevents default form action
        ev.preventDefault();

        const form = Object.assign({}, this.state);
        if (form.due) {
            form.due = (new Date(form.due)).toISOString();
        }

        this.props.onSubmit(form);
    }

    render() {
        const FORMAT = `DD/MM/YYYY`;

        return (
            <form onSubmit={this._handleSubmit}>
                <div className="input-group">
                    <input
                        name="status"
                        type="checkbox"
                        checked={this.state.status}
                        onChange={this._handleInputChange}
                    />

                    <input
                        placeholder="Task title"
                        name="title"
                        type="text"
                        value={this.state.title}
                        onChange={this._handleInputChange}
                    />
                </div>

                <label htmlFor="due">
                    <span>Due date</span>
                    <DayPickerInput
                        name="due"
                        value={this.state.due ? formatDate(this.state.due, FORMAT) : ``}
                        onDayChange={this._handleInputChange}
                        formatDate={formatDate}
                        format={FORMAT}
                        parseDate={parseDate}
                        placeholder={`${FORMAT}`}
                        dayPickerProps={{ from: new Date() }}
                    />
                </label>


                <label htmlFor="due">
                    <span>Notes</span>
                    <textarea placeholder="Type notes here if needed..." name="notes" value={this.state.notes} onChange={this._handleInputChange} />
                </label>

                <div className="flex-row actions">
                    <button className="submit-task-details" type="submit">{this.props.submitText}</button>
                </div>
                <style global jsx>{style}</style>
            </form>
        );
    }
}
