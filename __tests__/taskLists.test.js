/* eslint-env jest */

import { mount } from 'enzyme';
import React from 'react';
import mockValues from 'utils/mockValues';

// Components involved in this test
import mockedGoogle from 'utils/mockedGoogle';
import TaskLists from 'components/composition/taskLists';
import TaskListsItem from 'components/composition/lists/taskListsItem';


describe(`TaskLists`, () => {
    let mountedTaskLists;
    let props;

    /**
     * Helper to mount component
     */
    const taskLists = () => {
        if (!mountedTaskLists) {
            mountedTaskLists = mount(<TaskLists {...props} />);
        }
        return mountedTaskLists;
    };

    /**
     * Reset everything to perform a fair test
     */
    beforeEach(() => {
        mountedTaskLists = undefined;
        props = {
            title: undefined,
            google: mockedGoogle,
            taskLists: { items: [] },
        };
    });

    afterEach(() => {
        taskLists().unmount();
    });

    describe(`When "title" is defined`, () => {
        beforeEach(() => {
            props.title = `Some title`;
        });

        it(`renders a h1`, () => {
            expect(taskLists().find(`h1`).length).toBe(1);
        });
    });

    describe(`When "title" is undefined`, () => {
        it(`does not render a h1`, () => {
            expect(taskLists().find(`h1`).length).toBe(0);
        });
    });

    describe(`When "taskLists.items" isnt empty`, () => {
        beforeEach(() => {
            props.taskLists = {
                items: [
                    mockValues.createList(),
                    mockValues.createList(),
                ],
            };
        });

        it(`renders a "TaskListsItem" for each element in the list`, () => {
            expect(taskLists().find(TaskListsItem).length).toBe(taskLists().props().taskLists.items.length);
        });
    });
});
