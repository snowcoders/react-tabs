import * as React from 'react';

import { Tabs, ITabsProps } from "./component";

import { expect } from 'chai';
import { shallow, configure } from "enzyme";

// Configure enzyme
import * as Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe("Tabs", () => {
    let defaultProps: ITabsProps;
    beforeEach(() => {
        defaultProps = {
            tabNameToHeaderMap: {},
            tabNameToContentMap: {}
        };
    });
    it("Render", () => {
        let wrapper = shallow(<Tabs {...defaultProps} />);
        expect(wrapper).to.have.length(1);
    });
});