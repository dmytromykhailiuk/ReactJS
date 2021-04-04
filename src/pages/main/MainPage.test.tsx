import { shallow } from "enzyme";
import React from "react";
import toJson from 'enzyme-to-json';
import MainPageView from "./MainPageView";
import { ModalTypes } from "shared/enums";
import { renderModal } from "shared/helpers";
import { MovieItemDetails, SearchPanel } from "./components";

describe("MainPageView", () => {
  it("should match snepshot", () => {
    const wrapper = shallow(
      <MainPageView
        movies={[{ id: 2 }] as any[]}
        movieBoard={{} as any}
        isSuccessAlert={true}
        modalInView={null}
        movieInOverview={null}
        movieInOverviewLoaded={false}
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
    expect(toJson(wrapper)).toMatchSnapshot();
  })

  it("should show modal", () => {
    const wrapper = shallow(
      <MainPageView
        movies={[{ id: 2 }] as any[]}
        movieBoard={{} as any}
        isSuccessAlert={true}
        modalInView={ModalTypes.DELETE}
        movieInOverview={null}
        movieInOverviewLoaded={false}
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
    expect(wrapper.exists(renderModal(ModalTypes.DELETE))).toBeTruthy();
  })

  it("should show MovieItemDetails component", () => {
    const wrapper = shallow(
      <MainPageView
        movies={[{ id: 2 }] as any[]}
        movieBoard={{} as any}
        isSuccessAlert={true}
        modalInView={null}
        movieInOverview={{} as any}
        movieInOverviewLoaded={true}
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
    expect(wrapper.exists(MovieItemDetails)).toBeTruthy();
  })

  it("should show SearchPanel component", () => {
    const wrapper = shallow(
      <MainPageView
        movies={[{ id: 2 }] as any[]}
        movieBoard={{} as any}
        isSuccessAlert={true}
        modalInView={null}
        movieInOverview={null}
        movieInOverviewLoaded={true}
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
    expect(wrapper.exists(SearchPanel)).toBeTruthy();
  })
});
