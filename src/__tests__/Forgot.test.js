import React from 'react';
import {
    shallow,
    mount,
    render
} from 'enzyme';
import ForgotPassword from '../screens/forgotPassword';
import setup from '../setupTest'
/**
 * describe what we are testing
 **/
describe('ForgotPassword Component', () => {
    /**
     * make our assertion and what we expect to happen 
     **/
    it('should render without throwing an error', () => {
        expect(shallow( < ForgotPassword / > ).exists()).toBe(true)
    })
    /**
     * within the ForgotPassword components describe function
     **/
    it('renders a email input', () => {
        expect(shallow( < ForgotPassword / > ).find('#email').length).toEqual(1)
    })
    /**
     * within the ForgotPassword components describe function
     **/
    describe('Email input', () => {
        it('should respond to change event and change the state of the ForgotPassword Component', () => {
            const wrapper = shallow( < ForgotPassword / > );
            wrapper.find('#email').simulate('change', {
                target: {
                    name: 'email',
                    value: 'hithu@gmail.com'
                }
            });
            expect(wrapper.state('email')).toEqual('hithu@gmail.com');
        })
    })
})