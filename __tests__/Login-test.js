// __tests__/Login-test.js
import 'react-native';
import React from 'react';
import Login from '../src/components/Login/Login';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Login />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});