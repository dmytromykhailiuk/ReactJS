import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import toJson from 'enzyme-to-json';
import MainPageView from "./MainPageView";
import { ModalTypes } from "shared/enums";
import { renderModal } from "shared/helpers";

describe("MainPageView", () => {
  let wrapper: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

  beforeEach(() => {
    wrapper = shallow(
      <MainPageView
        movies={[{ id: 2 }] as any[]}
        movieBoard={{} as any}
        isSuccessAlert={true}
        modalInView={null}
        hasMovieInOverview={false}
        selectedMovie={null}
        alertMessage={"alertMessage"}
        onEditMovie={() => {}}
        onDeleteMovie={() => {}}
        setSearchingValue={() => {}}
        navigateToSearchPage={() => {}}
        onCloseWithSaving={() => {}}
        onCloseModal={() => {}}
        onCreateMovie={() => {}}
        navigateToMainPage={() => {}}
      />
    )
  })

  it("should match snepshot", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  })

  it("should show modal", () => {
    wrapper.setProps({ modalInView: ModalTypes.DELETE })
    expect(wrapper.exists(renderModal(ModalTypes.DELETE))).toBeTruthy();
  })
});
