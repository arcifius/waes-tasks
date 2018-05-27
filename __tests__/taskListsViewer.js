/* eslint-env jest */

import { mount } from 'enzyme';
import React from 'react';
import mockValues from 'utils/mockValues';

// Components involved in this test
import TaskListsViewer from 'components/composition/taskListsViewer';
import TaskListsViewerItem from 'components/composition/lists/taskListsViewerItem';

// Google library
import google from 'utils/google';

// Mock Google library
jest.mock(`utils/google`);

describe(`TaskListsViewer`, () => {
    let mountedTaskListsViewer;
    let props;

    /**
     * Helper to mount component
     */
    const taskListsViewer = () => {
        if (!mountedTaskListsViewer) {
            mountedTaskListsViewer = mount(<TaskListsViewer {...props} />);
        }
        return mountedTaskListsViewer;
    };

    /**
     * Reset everything to perform a fair test
     */
    beforeEach(() => {
        mountedTaskListsViewer = undefined;
        props = {
            google,
            taskLists: { items: [] },
        };
    });

    afterEach(() => {
        taskListsViewer().unmount();
    });

    describe(`When "taskLists.items" isnt empty`, () => {
        beforeEach(() => {
            props.taskLists = {
                items: [
                    mockValues.createList(),
                ],
            };
        });

        it(`renders a "TaskListsViewerItem" for each element in the list`, () => {
            expect(taskListsViewer().find(TaskListsViewerItem).length).toBe(taskListsViewer().props().taskLists.items.length);
        });
    });
});
