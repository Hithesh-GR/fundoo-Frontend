import React from 'react';
import {
    shallow,
    mount,
    render
} from 'enzyme';
import Registration from '../screens/registration';
import '../setupTest'
/**
 * describe what we are testing
 **/
describe('Registration Component', () => {
    /**
     * make our assertion and what we expect to happen 
     **/
    it('should render without throwing an error', () => {
        expect(shallow( < Registration / > )
                .exists())
            .toBe(true)
    })
    /**
     * within the Registration components describe function
     **/
    it('renders a firstName input', () => {
        expect(shallow( < Registration / > ).find('#firstName').length).toEqual(1)
    })
    it('renders a lastName input', () => {
        expect(shallow( < Registration / > ).find('#lastName').length).toEqual(1)
    })
    it('renders a email input', () => {
        expect(shallow( < Registration / > ).find('#email').length).toEqual(1)
    })
    it('renders a password input', () => {
        expect(shallow( < Registration / > ).find('#password').length).toEqual(1)
    })
    it('renders a confirm password input', () => {
        expect(shallow( < Registration / > ).find('#confirm').length).toEqual(1)
    })
    /**
     * within the Registration components describe function
     **/
    describe('firstName input', () => {
        it('should respond to change event and change the state of the Registration Component', () => {
            const wrapper = shallow( < Registration / > );
            wrapper.find('#firstName').simulate('change', {
                target: {
                    name: 'firstname',
                    value: 'hithu'
                }
            });
            expect(wrapper.state('firstName')).toEqual('hithu');
        })
    })
    describe('lastName input', () => {
        it('should respond to change event and change the state of the Registration Component', () => {
            const wrapper = shallow( < Registration / > );
            wrapper.find('#lastName').simulate('change', {
                target: {
                    name: 'lastname',
                    value: 'gowda'
                }
            });
            expect(wrapper.state('lastName')).toEqual('gowda');
        })
    })
    describe('Email input', () => {
        it('should respond to change event and change the state of the Registration Component', () => {
            const wrapper = shallow( < Registration / > );
            wrapper.find('#email').simulate('change', {
                target: {
                    name: 'email',
                    value: 'hithu@gmail.com'
                }
            });
            expect(wrapper.state('email')).toEqual('hithu@gmail.com');
        })
    })
    describe('Password input', () => {
        it('should respond to change event and change the state of the Registration Component', () => {
            const wrapper = shallow( < Registration / > );
            wrapper.find('#password')
                .simulate('change', {
                    target: {
                        name: 'password',
                        value: 'rockz'
                    }
                });
            expect(wrapper.state('password')).toEqual('rockz');
        })
    })
    describe('confirmPassword input', () => {
        it('should respond to change event and change the state of the Registration Component', () => {
            const wrapper = shallow( < Registration / > );
            wrapper.find('#confirm')
                .simulate('change', {
                    target: {
                        name: 'confirmPassword',
                        value: 'rockz'
                    }
                });
            expect(wrapper.state('confirm')).toEqual('rockz');
        })
    })
})