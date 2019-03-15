import React from 'react';
import {
    shallow
} from 'enzyme';
import CreateNote from '../components/createNotes';
import '../setupTest'
/**
 * describe what we are testing
 **/
describe('Create Component', () => {
    /**
     * make our assertion and what we expect to happen 
     **/
    it('should render without throwing an error', () => {
        expect(shallow( < CreateNote / > ).exists()).toBe(true)
    })
    /**
     * within the CreateNote components describe function
     **/
    it('renders a title input', () => {
        expect(shallow( < CreateNote / > ).find('#title').length).toEqual(1)
    })
    /**
     * within the CreateNote components describe function
     **/
    describe('title input', () => {
        it('should respond to change event and change the state of the CreateNote Component', () => {
            const wrapper = shallow( < CreateNote / > );
            wrapper.find('#title')
            .simulate('change', {
                target: {
                    name: 'title',
                    value: 'fundoo'
                }
            });
            expect(wrapper.state('title')).toEqual('fundoo');
        })
    })
})