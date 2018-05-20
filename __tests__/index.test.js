/* eslint-env jest */

import { mount } from 'enzyme';
import React from 'react';

// Components involved in this test
import mockedGoogle from 'utils/mockedGoogle';
import Index from 'pages/index';

describe(`Index`, () => {
    let mountedIndex;

    /**
     * Helper to mount component
     */
    const wrapper = () => {
        if (!mountedIndex) {
            mountedIndex = mount(<Index google={mockedGoogle} />);
        }
        return mountedIndex;
    };

    /**
     * Reset everything to perform a fair test
     */
    beforeEach(() => {
        mockedGoogle.setSignedIn(true);
        mountedIndex = undefined;
    });

    afterEach(() => {
        wrapper().unmount();
    });

    it(`always renders a div`, () => {
        const divs = wrapper().find(`div`);
        expect(divs.length).toBeGreaterThan(0);
    });
});
