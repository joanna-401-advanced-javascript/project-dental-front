import React from 'react';
// import { Provider } from 'react-redux';
// import renderer from 'react-test-renderer';
import Material from '../components/Material/Material';
// import createStore from '../store/create-store';

// const store = createStore();

describe.skip('<Material />', () => {
  it('is rendered at application start', () => {
    // const app = mount(<Provider store={store}><Material /></Provider>);
    const app = mount(<Material />);
    expect(app.state('material')).toBe(true);
    // expect(app.find('input').exists()).toBe(true);
    // expect(app.find('button').exists()).toBe(true);
  });

  // it('is incremented when up clicker is clicked', () => {
  //   const app = mount(<Material />);
  //   const upButton = app.find('.upClicker');
  //   upButton.simulate('click');
  //   expect(app.state('count')).toEqual(1);
  // });
  //
  // it('is decremented when up clicker is clicked', () => {
  //   const app = mount(<Material />);
  //   const downButton = app.find('.downClicker');
  //   downButton.simulate('click');
  //   downButton.simulate('click');
  //   expect(app.state('count')).toEqual(-2);
  // });

  // it('snapshot is rendered correctly', () => {
  //   const count = renderer
  //     .create(<Counter />)
  //     .toJSON();
  //   expect(count).toMatchSnapshot();
  // });
});
