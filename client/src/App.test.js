import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {MemoryRouter} from 'react-router-dom';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';

import LandingPage from './components/landingPage/LandingPage';
import {App} from './App.js'; 
import Nav from './components/nav/Nav';
import Home from './components/home/Home';
import Filter from './components/filter/Filter'
import FilterResults from './components/filter/FilterResults'

configure({adapter: new Adapter()});

describe('App',() => {
    let store
    const middlewares = [];
    const mockStore = configureStore(middlewares);

    beforeEach(() => {
        store = mockStore([]);
    });

    describe('LandingPage ', () => {
        it('Debería renderizar en la ruta "/" ', () => {
            const wrapper = mount(
                <Provider store = {store}>
                    <MemoryRouter initialEntries={['/']}>
                        <App/>
                    </MemoryRouter>
                </Provider>
            );
            expect(wrapper.find(LandingPage)).toHaveLength(1);
        });

        it('Debería renderizar solo en la ruta "/" ', () => {
          const wrapper = mount(
              <Provider store = {store}>
                  <MemoryRouter initialEntries={['/home']}>
                      <App/>
                  </MemoryRouter>
              </Provider>
          );
          expect(wrapper.find(LandingPage)).toHaveLength(0);
      });
    })

    describe('Home', ()=> {
      it('El componente Home debe renderizar en la ruta /home', () => {
        const wrapper = mount(
          <Provider store = {store}>
              <MemoryRouter initialEntries={['/home']}>
                  <App/>
              </MemoryRouter>
          </Provider>
      );
      expect(wrapper.find(Home)).toHaveLength(1);
      })

      it('El componente Home puede renderizar en la ruta /home/page', () => {
        const wrapper = mount(
          <Provider store = {store}>
              <MemoryRouter initialEntries={['/home/1']}>
                  <App/>
              </MemoryRouter>
          </Provider>
      );
      expect(wrapper.find(Home)).toHaveLength(1);
      })
      it('El componente Home solo debe renderizar en la ruta /home o /home/page', () => {
        const wrapper = mount(
          <Provider store = {store}>
              <MemoryRouter initialEntries={['/']}>
                  <App/>
              </MemoryRouter>
          </Provider>
      );
      expect(wrapper.find(Home)).toHaveLength(0);
      })
    })

    describe("Nav",() =>{
      it("El componente Nav inicialmente no debe renderizarse en la ruta / ", () => {
        const wrapper = mount(
          <Provider store = {store}>
              <MemoryRouter initialEntries={['/']}>
                  <App/>
              </MemoryRouter>
          </Provider>
      );
      expect(wrapper.find(Nav)).toHaveLength(0); 
      });
      it("El componente Nav debe renderizarse en cualquier ruta ", () => {
        const wrapper = mount(
          <Provider store = {store}>
              <MemoryRouter initialEntries={['/home']}>
                  <App/>
              </MemoryRouter>
          </Provider>
      );
      expect(wrapper.find(Nav)).toHaveLength(1); 
      });
      it("El componente Nav debe renderizarse en cualquier ruta ", () => {
        const wrapper = mount(
          <Provider store = {store}>
              <MemoryRouter initialEntries={['/prueba']}>
                  <App/>
              </MemoryRouter>
          </Provider>
      );
      expect(wrapper.find(Nav)).toHaveLength(1); 
      });
    });

    describe("Filter", () => {
      it("El componente filterBar inicialmente no debe renderizarse en la ruta / ", () =>{
        const wrapper = mount(
          <Provider store = {store}>
              <MemoryRouter initialEntries={['/']}>
                  <App/>
              </MemoryRouter>
          </Provider>
      );
      expect(wrapper.find(Filter)).toHaveLength(0); 
      })
      it("El componente filterBar debe renderizar en cualquier otra ruta ", () => {
        const wrapper = mount(
          <Provider store = {store}>
              <MemoryRouter initialEntries={['/home']}>
                  <App/>
              </MemoryRouter>
          </Provider>
      );
      expect(wrapper.find(Filter)).toHaveLength(1); 
      })
      it("El componente filterResults debe renderizar en la ruta /filter-by-continent/:continent ", () => {
        const wrapper = mount(
          <Provider store = {store}>
              <MemoryRouter initialEntries={['/filter-by-continent/:Asia']}>
                  <App/>
              </MemoryRouter>
          </Provider>
      );
      expect(wrapper.find(FilterResults)).toHaveLength(1); 
      })
      it("El componente filterResults debe renderizar en la ruta /filter-by/activity ", () => {
        const wrapper = mount(
          <Provider store = {store}>
              <MemoryRouter initialEntries={['/filter-by/activity']}>
                  <App/>
              </MemoryRouter>
          </Provider>
      );
      expect(wrapper.find(FilterResults)).toHaveLength(1); 
      })
      it("El componente filterResults no debe renderizar en la ruta /filter-by ", () => {
        const wrapper = mount(
          <Provider store = {store}>
              <MemoryRouter initialEntries={['/filter-by']}>
                  <App/>
              </MemoryRouter>
          </Provider>
      );
      expect(wrapper.find(FilterResults)).toHaveLength(0); 
      })

    })

})
