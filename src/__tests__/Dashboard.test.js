import React from 'react';
import {
  shallow
} from 'enzyme';
import CreateNote from '../screens/dashBoard';
import '../setupTest'
/**
 * describe what we are testing
 **/
describe('Dashboard Component', () => {
  /**
   * make our assertion and what we expect to happen 
   **/
  it('should render without throwing an error', () => {
    expect(shallow( < CreateNote / > ).exists()).toBe(true)
  w})
  /**
   * within the Dashboard components describe function
   **/
  it('renders a title input', () => {
    expect(shallow( < CreateNote / > ).find('#title').length).toEqual(1)
  })
  it('renders a description input', () => {
    expect(shallow( < CreateNote / > ).find('#description').length).toEqual(1)
  })
  /**
   * within the Dashboard components describe function
   **/
  describe('title input', () => {
    it('should respond to change event and change the state of the Dashboard Component', () => {
      const wrapper = shallow( < CreateNote / > );
      wrapper.find('#title').simulate('change', {
        target: {
          name: 'title',
          value: 'hithu@gmail.com'
        }
      });
      expect(wrapper.state('title')).toEqual('hithu@gmail.com');
    })
  })
  describe('description input', () => {
    it('should respond to change event and change the state of the Dashboard Component', () => {
      const wrapper = shallow( < CreateNote / > );
      wrapper.find('#description')
        .simulate('change', {
          target: {
            name: 'description',
            value: 'rockz'
          }
        });
      expect(wrapper.state('description')).toEqual('rockz');
    })
  })
})