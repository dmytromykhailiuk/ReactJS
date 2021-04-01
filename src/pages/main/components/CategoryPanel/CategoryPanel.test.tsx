import { shallow } from "enzyme";
import React from "react";
import { CategoryPanel } from "./";
import toJson from 'enzyme-to-json';
import { Categories } from "../../../../shared/enums";

describe("CategoryPanel", () => {
  it("should match first snepshot", () => {
    const wrapper = shallow(
      <CategoryPanel
        selectedCategory={Categories.ALL}
        onChangeCategory={() => {}}
      />
    )
    expect(toJson(wrapper)).toMatchSnapshot("first");
  })

  it("should call 'onChangeCategory' if was click on category", () => {
    const onChangeCategory = jest.fn();
    const wrapper = shallow(
      <CategoryPanel
        selectedCategory={Categories.ALL}
        onChangeCategory={onChangeCategory}
      />
    );
    wrapper.find("li").last().simulate("click");
    expect(onChangeCategory).toHaveBeenCalled();
  })

  it("should call 'onChangeCategory' with 'Categories.ALL' if was click on first 'li'", () => {
    const onChangeCategory = jest.fn();
    const wrapper = shallow(
      <CategoryPanel
        selectedCategory={Categories.ALL}
        onChangeCategory={onChangeCategory}
      />
    );
    wrapper.find("li").first().simulate("click");
    expect(onChangeCategory).toHaveBeenCalledWith(Categories.ALL);
  })
});