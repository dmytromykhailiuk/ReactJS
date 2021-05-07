import { mount, shallow, ReactWrapper } from 'enzyme';
import React from 'react';
import toJson from 'enzyme-to-json';
import { movies } from 'mocks/movies.mock';
import { Formik } from 'formik';
import { MovieFormValues } from 'shared/enums';
import { Provider } from 'react-redux';
import { store, ModalsAction } from 'store';
import MovieForm from './MovieForm';

function delay(): Promise<void> {
  return new Promise((r) => setTimeout(r, 1000));
}

describe('MovieForm', () => {
  let wrapper: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

  beforeEach(() => {
    jest.clearAllMocks();

    wrapper = mount(
      <Provider store={store}>
        <MovieForm onSubmitForm={() => {}} />
      </Provider>,
    );
  });

  it('should match snepshot', () => {
    const wrapper = shallow(<MovieForm onSubmitForm={() => {}} movie={movies[0]} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should call 'onSubmitForm' when submit", () => {
    const onSubmitForm = jest.fn();
    const wrapper = shallow(<MovieForm onSubmitForm={onSubmitForm} movie={movies[0]} />);
    wrapper.find(Formik).simulate('submit');
    expect(onSubmitForm).toHaveBeenCalled();
  });

  it('should reset form', async () => {
    const input = wrapper.find("input[name='title']");

    input.simulate('change', {
      persist: () => {},
      target: {
        name: 'title',
        value: 'title',
      },
    });

    wrapper.find('button').first().simulate('click');

    await delay();

    expect((input.getDOMNode() as any).value).toEqual('');
  });

  it('should show input with id when movie has id', () => {
    wrapper = mount(
      <Provider store={store}>
        <MovieForm onSubmitForm={() => {}} movie={movies[0]} />
      </Provider>,
    );

    expect(wrapper.exists("input[name='id']")).toBeTruthy();
  });

  it('should show error in MovieFormValues.TITLE field', async () => {
    const inputTitle = wrapper.find(`input[name='${MovieFormValues.TITLE}']`);

    inputTitle.simulate('focus').simulate('blur', {
      persist: () => {},
      target: {
        name: MovieFormValues.TITLE,
        value: '',
      },
    });

    await delay();

    expect((inputTitle.getDOMNode().nextSibling as HTMLElement).textContent).toBeTruthy();
  });

  it('should show error in MovieFormValues.RELEASE_DATE field', async () => {
    const inputTitle = wrapper.find(`input[name='${MovieFormValues.RELEASE_DATE}']`);

    inputTitle.simulate('focus').simulate('blur', {
      persist: () => {},
      target: {
        name: MovieFormValues.RELEASE_DATE,
        value: '',
      },
    });

    await delay();

    expect((inputTitle.getDOMNode().nextSibling as HTMLElement).textContent).toBeTruthy();
  });

  it('should show error in MovieFormValues.MOVIE_URL field', async () => {
    const inputTitle = wrapper.find(`input[name='${MovieFormValues.MOVIE_URL}']`);

    inputTitle.simulate('focus').simulate('blur', {
      persist: () => {},
      target: {
        name: MovieFormValues.MOVIE_URL,
        value: '',
      },
    });

    await delay();

    expect((inputTitle.getDOMNode().nextSibling as HTMLElement).textContent).toBeTruthy();
  });

  it('should show error in MovieFormValues.OVERVIEW field', async () => {
    const inputTitle = wrapper.find(`input[name='${MovieFormValues.OVERVIEW}']`);

    inputTitle.simulate('focus').simulate('blur', {
      persist: () => {},
      target: {
        name: MovieFormValues.OVERVIEW,
        value: '',
      },
    });

    await delay();

    expect((inputTitle.getDOMNode().nextSibling as HTMLElement).textContent).toBeTruthy();
  });

  it('should show error in MovieFormValues.RATING field', async () => {
    const inputTitle = wrapper.find(`input[name='${MovieFormValues.RATING}']`);

    inputTitle
      .simulate('focus')
      .simulate('change', {
        persist: () => {},
        target: {
          name: MovieFormValues.RATING,
          value: -20,
        },
      })
      .simulate('blur', {
        persist: () => {},
        target: {
          name: MovieFormValues.RATING,
          value: -20,
        },
      });

    await delay();

    expect((inputTitle.getDOMNode().nextSibling as HTMLElement).textContent).toBeTruthy();
  });

  it('should show error in MovieFormValues.RUNTIME field', async () => {
    const inputTitle = wrapper.find(`input[name='${MovieFormValues.RUNTIME}']`);

    inputTitle.simulate('focus').simulate('blur', {
      persist: () => {},
      target: {
        name: MovieFormValues.RUNTIME,
        value: -20,
      },
    });

    await delay();

    expect((inputTitle.getDOMNode().nextSibling as HTMLElement).textContent).toBeTruthy();
  });

  it('should show error when error in store', async () => {
    const newStore = { ...store };

    wrapper = mount(
      <Provider store={newStore}>
        <MovieForm onSubmitForm={() => {}} movie={movies[0]} />
      </Provider>,
    );

    const inputTitle = wrapper.find("input[name='title']");
    const inputGanres = wrapper.find('.interface');

    inputTitle.simulate('change', {
      persist: () => {},
      target: {
        name: 'title',
        value: 'title',
      },
    });

    wrapper.find(Formik).simulate('submit');

    await delay();

    newStore.dispatch(ModalsAction.setErrorMessagesAction(['"genres" field is invalid']));

    await delay();

    expect((inputGanres.getDOMNode().nextSibling as HTMLElement).textContent).toEqual('field is invalid');
  });
});
