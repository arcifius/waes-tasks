/* eslint-env jest */

import { shallow } from 'enzyme';
import React from 'react';

// Components involved in this test
import CreateListForm from 'components/composition/forms/createListForm';

import mockValues from 'utils/mockValues';

describe(`CreateListForm`, () => {
    const onSubmit = jest.fn();

    test(`_handleSubmit should call onSubmit with the correct argument`, () => {
        const createListForm = shallow(<CreateListForm onSubmit={onSubmit} />);
        createListForm.instance()._handleSubmit(mockValues.event());
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit).toHaveBeenCalledWith({
            title: ``,
        });
    });

    test(`_inputChange should change title state`, () => {
        const createListForm = shallow(<CreateListForm onSubmit={onSubmit} />);
        createListForm.instance()._inputChange(mockValues.event({ target: { value: `zxcxzq` } }));
        expect(createListForm.state().title).toBe(`zxcxzq`);
    });
});
