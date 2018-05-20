/* eslint-env jest */

import { mount } from 'enzyme';
import React from 'react';

// Components involved in this test
import mockedGoogle from 'utils/mockedGoogle';
import TaskManager from 'components/taskManager';
import TaskLists from 'components/composition/taskLists';
import TaskListsViewer from 'components/composition/taskListsViewer';
import AppBar from 'components/composition/appBar';

describe(`TaskManager`, () => {
    let mountedTaskManager;

    /**
     * Helper to mount component
     */
    const wrapper = () => {
        if (!mountedTaskManager) {
            mountedTaskManager = mount(<TaskManager google={mockedGoogle} />);
        }
        return mountedTaskManager;
    };

    /**
     * Reset everything to perform a fair test
     */
    beforeEach(() => {
        mountedTaskManager = undefined;
    });

    afterEach(() => {
        wrapper().unmount();
    });

    it(`always renders an "AppBar"`, () => {
        const appBar = wrapper().find(AppBar);
        expect(appBar.length).toBe(1);
    });

    it(`always renders an "TaskLists"`, () => {
        const taskLists = wrapper().find(TaskLists);
        expect(taskLists.length).toBe(1);
    });

    it(`always renders an "TaskListsViewer"`, () => {
        const taskListsViewer = wrapper().find(TaskListsViewer);
        expect(taskListsViewer.length).toBe(1);
    });
});
