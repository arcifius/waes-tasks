/* eslint-env jest */

import { mount } from 'enzyme';
import React from 'react';

// Components involved in this test
import withGoogle from 'components/hoc/withGoogle';
import mockedGoogle from 'utils/mockedGoogle';
import TaskManager from 'pages/index';
import GoogleAuth from 'components/googleAuth';
import Loading from 'components/loading';

describe(`withGoogle hoc`, () => {
    let mountedWrapper;

    /**
     * Helper to mount component
     */
    const wrapper = () => {
        if (!mountedWrapper) {
            const GoogleCheckedComponent = withGoogle(TaskManager, mockedGoogle);
            mountedWrapper = mount(<GoogleCheckedComponent />);
        }
        return mountedWrapper;
    };

    /**
     * Reset everything to perform a fair test
     */
    beforeEach(() => {
        mockedGoogle.setSignedIn(false);
        mountedWrapper = undefined;
    });

    afterEach(() => {
        wrapper().unmount();
    });

    it(`always renders a div`, () => {
        const divs = wrapper().find(`div`);
        expect(divs.length).toBeGreaterThan(0);
    });

    describe(`When google script isnt loaded yet`, () => {
        it(`should render a "Loading"`, () => {
            wrapper().setState({ googleIsReady: false });
            expect(wrapper().find(Loading).length).toBe(1);
        });
    });

    describe(`When google script is loaded`, () => {
        describe(`If the app is authorized`, () => {
            beforeEach(() => {
                mockedGoogle.setSignedIn(true);
            });

            it(`should render the wrapped component passing google as prop`, () => {
                expect(wrapper().children().length).toBe(1);
                const taskManager = wrapper().find(TaskManager);
                expect(taskManager.length).toBe(1);
                expect(taskManager.first().props().google).toBeDefined();
            });
        });

        describe(`If the app isnt authorized`, () => {
            beforeEach(() => {
                mockedGoogle.setSignedIn(false);
            });

            it(`should render a "GoogleAuth"`, () => {
                expect(wrapper().find(GoogleAuth).length).toBe(1);
            });
        });
    });
});
