import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { MemoryRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import { render, screen } from '@testing-library/react';
import App from './App';
import LandingPage from "./components/LandingPage/LandingPage"
import AddDog from './components/AddDog/AddDog';



configure({adapter: new Adapter()});

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
describe('App', () => {
  let store
  const middlewares = []
  const mockStore = configureStore(middlewares);

  beforeEach(() => {
    store = mockStore([]);
  });

  describe('El componente Landing Page debe renderizar en la primer ruta "/".', () => {
    it('Should render in route "/dogs/add"', () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/dogs/add"]}>
            <App />
          </MemoryRouter>
        </Provider>
      );
     
      expect(wrapper.find(AddDog)).toHaveLength(1);
    });
    // it('Debería renderizarse en la ruta "/"', () => {
    //   const wrapper = mount(
    //       <Provider store={store}>
    //         <MemoryRouter initialEntries={[ '/' ]}>
    //           <App />
    //         </MemoryRouter>
    //       </Provider>
    //   );
    //     expect(wrapper.find(LandingPage)).toHaveLength(0);
    // });
  //   it('Debería renderizarse en la ruta "/otraRuta"', () => {
  //     const wrapper = mount(
  //         <Provider store={store}>
  //           <MemoryRouter initialEntries={[ '/otraRuta' ]}>
  //             <App />
  //           </MemoryRouter>
  //         </Provider>
  //     );
  //       expect(wrapper.find(Nav)).toHaveLength(1);
  //   });
  // });

  // it('El componente Home debe renderizar en la ruta / (Sólo en la ruta "/")', () => {
  //   const wrapper = mount(
  //       <Provider store={store}>
  //         <MemoryRouter initialEntries={[ '/' ]}>
  //           <App />
  //         </MemoryRouter>
  //       </Provider>
  //   );

  //     expect(wrapper.find(Home)).toHaveLength(1);
  //     expect(wrapper.find(Nav)).toHaveLength(1);
  //     expect(wrapper.find(AddTodo)).toHaveLength(0);
  // });

  // it('El componente AddTodo debe renderizar en la ruta /add - este test no pasará si Otro componente (que no sea Nav) se renderiza en esta ruta.', () => {
  //   const container = mount(
  //       <Provider store={store}>
  //         <MemoryRouter initialEntries={[  '/add' ]}>
  //           <App />
  //         </MemoryRouter>
  //       </Provider>
  //   );
  //   expect(container.find(Nav)).toHaveLength(1);
  //   expect(container.find(Home)).toHaveLength(0);
  //   expect(container.find(AddTodo)).toHaveLength(1);
  // });
  })
 
});