/* eslint-env jest */

import { mount } from 'enzyme';
import React from 'react';

// Components involved in this test
import Index from 'pages/index';

// Google library
import google from 'utils/google';

jest.mock(`utils/google`);

describe(`Index`, () => {
    let mountedIndex;

    /**
     * Helper to mount component
     */
    const wrapper = () => {
        if (!mountedIndex) {
            mountedIndex = mount(<Index />);
        }
        return mountedIndex;
    };

    /**
     * Reset everything to perform a fair test
     */
    beforeEach(() => {
        google.setSignedIn(true);
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
