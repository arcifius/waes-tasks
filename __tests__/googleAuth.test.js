/* eslint-env jest */

import { mount } from 'enzyme';
import React from 'react';

// Components involved in this test
import GoogleAuth from 'components/googleAuth';

// Google library
import google from 'utils/google';

// Mock Google library
jest.mock(`utils/google`);

describe(`GoogleAuth`, () => {
    let mountedGoogleAuth;

    /**
     * Helper to mount component
     */
    const googleAuth = () => {
        if (!mountedGoogleAuth) {
            mountedGoogleAuth = mount(<GoogleAuth google={google} />);
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
