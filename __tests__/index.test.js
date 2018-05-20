/* eslint-env jest */

import { mount } from 'enzyme';
import React from 'react';

// Components involved in this test
import AppContainer from 'pages/index';
import TaskLists from 'components/taskLists';
import TaskListsViewer from 'components/taskListsViewer';

describe(`App container`, () => {
    let mountedAppContainer;

    // This helper will assist in component mounting
    const appContainer = () => {
        if (!mountedAppContainer) {
            mountedAppContainer = mount(<AppContainer />);
        }
        return mountedAppContainer;
    };

    // We will have a fresh mount on every test
    beforeEach(() => {
        mountedAppContainer = undefined;
    });

    it(`always renders a div`, () => {
        const divs = appContainer().find(`div`);
        expect(divs.length).toBeGreaterThan(0);
    });

    it(`contains everything else that gets rendered`, () => {
        expect(appContainer().children().length).toBe(1);
    });

    it(`always renders a "TaskLists"`, () => {
        expect(appContainer().find(TaskLists).length).toBe(1);
    });

    describe(`rendered "TaskLists"`, () => {
        it(`always receives "lists" prop`, () => {
            const taskLists = appContainer().find(TaskLists);
            expect(taskLists.props().lists.length).toBeGreaterThanOrEqual(0);
        });
    });

    it(`always renders a "TaskListsViewer"`, () => {
        expect(appContainer().find(TaskListsViewer).length).toBe(1);
    });

    describe(`rendered "TaskListsViewer"`, () => {
        it(`always receives "lists" prop`, () => {
            const taskListsViewer = appContainer().find(TaskListsViewer);
            expect(taskListsViewer.props().lists.length).toBeGreaterThanOrEqual(0);
        });
    });
});
