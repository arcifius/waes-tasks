import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from "mobx-react";
import taskListsStore from 'stores/taskLists';
import Modal from 'react-modal';
import TaskListsItem from 'components/composition/lists/taskListsItem';
import CreateListForm from 'components/composition/forms/createListForm';
import style from 'styles/taskLists';

class TaskLists extends Component {
    static propTypes = {
        title: PropTypes.string,
        taskLists: PropTypes.object.isRequired,
        google: PropTypes.object.isRequired,
    }

    static defaultProps = {
        title: undefined,
    }

    constructor(props) {
        super(props);

        this.state = {
            modal: {
                open: false,
            },
        };
    }

    /**
     * Opens create list modal upon button click
     */
    _openNewListModal = () => {
        this.setState({
            modal: {
                open: true,
            },
        });
    }

    /**
     * Closes create list modal
     * Triggered by esc, button click or overlay click
     */
    _closeNewListModal = () => {
        this.setState({
            modal: {
                open: false,
            },
        });
    }

    /**
     * Receives list information and ask google to create it
     */
    _handleListCreation = (tasklist) => {
        this.props.google.apis.tasks.tasklists.insert(tasklist)
            .then((response) => {
                taskListsStore.add(Object.assign({}, response.result));
                this._closeNewListModal();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    /**
     * Receives a tasklist id and ask google to remove it
     */
    _handleListItemRemove = (listID) => {
        return () => {
            this.props.google.apis.tasks.tasklists.delete({ tasklist: listID })
                .then(() => {
                    taskListsStore.remove({ id: listID });
                })
                .catch((error) => {
                    console.log(error);
                });
        };
    }

    /**
     * Renders each list as a "TaskListsItem" passing
     * list's information as props
     */
    renderLists = () => {
        return this.props.taskLists.items.map((list) => {
            return (
                <TaskListsItem
                    key={list.id}
                    list={list}
                    onRemove={this._handleListItemRemove(list.id)}
                />
            );
        });
    }

    render() {
        return (
            <div className={`task-lists`}>
                <Modal
                    className="appModal noselect"
                    overlayClassName="appOverlay"
                    ariaHideApp={false}
                    isOpen={this.state.modal.open}
                    onRequestClose={this._closeNewListModal}
                    contentLabel="Create new list modal"
                >
                    <header>
                        <h1>New list</h1>
                        <button className="close" onClick={this._closeNewListModal}>
                            <i className="fas fa-times" />
                        </button>
                    </header>
                    <section>
                        <CreateListForm onSubmit={this._handleListCreation} />
                    </section>
                </Modal>

                {
                    this.props.title &&
                    <h1>{this.props.title}</h1>
                }

                <button id="newListButton" className="new-list-button" onClick={this._openNewListModal}>
                    <i className="fas fa-plus" />
                    <span>new list</span>
                </button>

                <ul>
                    {this.renderLists()}
                </ul>
                <style global jsx>{style}</style>
            </div>
        );
    }
}

export default inject(`google`)(inject(`taskLists`)(observer(TaskLists)));
