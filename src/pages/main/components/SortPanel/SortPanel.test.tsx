import { SortingOptionsProperties } from 'shared/enums';
import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import toJson from 'enzyme-to-json';
import { useClickOutside } from 'shared/hooks';
import SortPanel from './SortPanel';

jest.mock('shared/hooks');

let shouldCallClickOusideFn = true;

(useClickOutside as jest.Mock).mockImplementation((_, fn) => {
  if (shouldCallClickOusideFn) {
    shouldCallClickOusideFn = false;
    fn();
  }
});

describe('SortPanel', () => {
  let wrapper: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

  const onChangeSortingDirection = jest.fn();
  const setSortingOption = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    wrapper = shallow(
      <SortPanel
        isDownDirection
        sortingOption={SortingOptionsProperties.DURATION}
        onChangeSortingDirection={onChangeSortingDirection}
        setSortingOption={setSortingOption}
      />,
    );
  });
  it('should match snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should show 'arrow-up' when isDownDirection equal false", () => {
    wrapper.setProps({
      isDownDirection: false,
    });
    expect(wrapper.exists('.sort-panel__arrow-up')).toBeTruthy();
  });

  it("should show sorting options ater click on 'sort-panel__title'", () => {
    wrapper.find('.sort-panel__title').simulate('click');
    expect(wrapper.exists('.sort-panel__option')).toBeTruthy();
  });

  it("should call onChangeSortingDirection when click on 'sort-panel__selected-option-wrapper'", () => {
    wrapper.find('.sort-panel__selected-option-wrapper').simulate('click');
    expect(onChangeSortingDirection).toHaveBeenCalled();
  });

  it("should call setSortingOption when click on 'sort-panel__option'", () => {
    wrapper.find('.sort-panel__title').simulate('click');
    wrapper.find('.sort-panel__option').first().simulate('click');
    expect(setSortingOption).toHaveBeenCalled();
  });
});
