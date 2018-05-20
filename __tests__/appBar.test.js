/* eslint-env jest */

import { mount } from 'enzyme';
import React from 'react';

// Components involved in this test
import mockedGoogle from 'utils/mockedGoogle';
import AppBar from 'components/composition/appBar';

describe(`AppBar`, () => {
    let mountedAppBar;

    /**
     * Helper to mount component
     */
    const appBar = () => {
        if (!mountedAppBar) {
            mountedAppBar = mount(<AppBar google={mockedGoogle} />);
        }
        return mountedAppBar;
    };

    /**
     * Reset everything to perform a fair test
     */
    beforeEach(() => {
        mockedGoogle.setSignedIn(true);
        mountedAppBar = undefined;
    });

    afterEach(() => {
        appBar().unmount();
    });

    it(`always renders a button`, () => {
        const button = appBar().find(`button`);
        expect(button.length).toBe(1);
    });

    describe(`When button gets clicked`, () => {
        it(`request authorization revoke`, () => {
            const button = appBar().find(`button`).first();
            expect(button).toBeDefined();
            button.simulate(`click`);
        });
    });
});
