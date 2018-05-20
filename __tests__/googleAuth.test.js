/* eslint-env jest */

import { mount } from 'enzyme';
import React from 'react';

// Components involved in this test
import mockedGoogle from 'utils/mockedGoogle';
import GoogleAuth from 'components/googleAuth';

describe(`GoogleAuth`, () => {
    let mountedGoogleAuth;

    /**
     * Helper to mount component
     */
    const googleAuth = () => {
        if (!mountedGoogleAuth) {
            mountedGoogleAuth = mount(<GoogleAuth google={mockedGoogle} />);
        }
        return mountedGoogleAuth;
    };

    /**
     * Reset everything to perform a fair test
     */
    beforeEach(() => {
        mountedGoogleAuth = undefined;
    });

    afterEach(() => {
        googleAuth().unmount();
    });

    it(`always renders a button`, () => {
        const button = googleAuth().find(`button`);
        expect(button.length).toBe(1);
    });

    describe(`When button gets clicked`, () => {
        it(`asks for authorization`, () => {
            const button = googleAuth().find(`button`).first();
            expect(button).toBeDefined();
            button.simulate(`click`);
        });
    });
});
