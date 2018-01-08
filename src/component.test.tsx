import * as React from "react";

import { Tabs, ITabsProps } from "./component";

import { expect } from "chai";
import { spy } from "sinon";
import { mount, shallow, configure } from "enzyme";

// Configure enzyme
import * as Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("Tabs", () => {
    let defaultProps: ITabsProps;
    beforeEach(() => {
        defaultProps = {
            tabs: []
        };
    });
    describe("Render", () => {
        it("Render Empty", () => {
            defaultProps.tabs = [];

            let wrapper = shallow(<Tabs {...defaultProps} />);
            expect(wrapper).to.have.length(1);
        });

        it("Render with one tabs", () => {
            defaultProps.tabs = [{
                header: <span>Header</span>,
                content: <span>Content</span>
            }];

            let wrapper = mount(<Tabs {...defaultProps} />);
            expect(wrapper).to.have.length(1);

            // Make sure the header is correct
            expect(wrapper.find(".tab-item").length).to.equal(1);
            expect(wrapper.find(".tab-item").text()).to.equal("Header");

            // Make sure the content is correct
            expect(wrapper.find(".content").length).to.equal(1);
            expect(wrapper.find(".content").text()).to.equal("Content");
        });

        it("Render with two tabs", () => {
            defaultProps.tabs = [{
                header: <span>Header 1</span>,
                content: <span>Content 1</span>
            }, {
                header: <span>Header 2</span>,
                content: <span>Content 2</span>
            }];

            let wrapper = mount(<Tabs {...defaultProps} />);
            expect(wrapper).to.have.length(1);

            // Make sure the header is correct
            expect(wrapper.find(".tab-item").length).to.equal(2);
            expect(wrapper.find(".tab-item").at(0).text()).to.equal("Header 1");
            expect(wrapper.find(".tab-item").at(1).text()).to.equal("Header 2");

            // Make sure the content is correct
            expect(wrapper.find(".content").length).to.equal(2);
            expect(wrapper.find(".content").at(0).text()).to.equal("Content 1");
            expect(wrapper.find(".content").at(1).text()).to.equal("Content 2");
        });
    });

    describe("Setting tab", () => {
        it("Default tab index", () => {
            defaultProps.tabs = [{
                header: <span>Header 1</span>,
                content: <span>Content 1</span>
            }, {
                header: <span>Header 2</span>,
                content: <span>Content 2</span>
            }];
            defaultProps.defaultTabIndex = 1;

            let wrapper = mount(<Tabs {...defaultProps} />);
            expect(wrapper).to.have.length(1);

            // Make sure the header is correct
            expect(wrapper.find(".tab-item").length).to.equal(2);
            expect(wrapper.find(".tab-item").at(0).hasClass("selected")).to.be.false;
            expect(wrapper.find(".tab-item").at(1).hasClass("selected")).to.be.true;

            // Make sure the content is correct
            expect(wrapper.find(".content").at(1).hasClass("visible")).to.be.true;

            // Click on the first tab
            wrapper.find(".tab-button").at(0).simulate("click");
            expect(wrapper.find(".tab-item").at(0).hasClass("selected")).to.be.true;
            expect(wrapper.find(".tab-item").at(1).hasClass("selected")).to.be.false;
        });

        it("Tab index", () => {
            defaultProps.tabs = [{
                header: <span>Header 1</span>,
                content: <span>Content 1</span>
            }, {
                header: <span>Header 2</span>,
                content: <span>Content 2</span>
            }];
            defaultProps.tabIndex = 1;

            let wrapper = mount(<Tabs {...defaultProps} />);
            expect(wrapper).to.have.length(1);

            // Make sure the header is correct
            expect(wrapper.find(".tab-item").length).to.equal(2);
            expect(wrapper.find(".tab-item").at(0).hasClass("selected")).to.be.false;
            expect(wrapper.find(".tab-item").at(1).hasClass("selected")).to.be.true;

            // Make sure the content is correct
            expect(wrapper.find(".content").at(1).hasClass("visible")).to.be.true;

            // Click on the first tab - Since this is controlled, it shouldn't change
            wrapper.find(".tab-button").at(0).simulate("click");
            expect(wrapper.find(".tab-item").at(0).hasClass("selected")).to.be.false;
            expect(wrapper.find(".tab-item").at(1).hasClass("selected")).to.be.true;
        });
    });

    describe("onTabChange", () => {
        it("Clicking tab fires onTabChange", () => {
            defaultProps.tabs = [{
                header: <span>Header 1</span>,
                content: <span>Content 1</span>
            }, {
                header: <span>Header 2</span>,
                content: <span>Content 2</span>
            }];
            defaultProps.tabIndex = 1;
            defaultProps.onTabChange = () => { };
            let onTabChangeSpy = spy(defaultProps, "onTabChange");

            let wrapper = mount(<Tabs {...defaultProps} />);
            expect(wrapper).to.have.length(1);

            // Make sure the header is correct
            expect(wrapper.find(".tab-item").length).to.equal(2);
            expect(wrapper.find(".tab-item").at(0).hasClass("selected")).to.be.false;
            expect(wrapper.find(".tab-item").at(1).hasClass("selected")).to.be.true;

            // Make sure the content is correct
            expect(wrapper.find(".content").at(1).hasClass("visible")).to.be.true;

            // Click on the first tab - Since this is controlled, it shouldn't change
            wrapper.find(".tab-button").at(0).simulate("click");
            expect(wrapper.find(".tab-item").at(0).hasClass("selected")).to.be.false;
            expect(wrapper.find(".tab-item").at(1).hasClass("selected")).to.be.true;

            expect(onTabChangeSpy.calledOnce, "calledOnce").to.be.true;
            expect(onTabChangeSpy.calledWith(0), "calledWith").to.be.true;
        });
        it("No error if changing tab index by prop", () => {
            defaultProps.tabIndex = 0;
            let wrapper = shallow(<Tabs {...defaultProps} />);
            expect(() => {
                wrapper.setProps({
                    tabIndex: 1
                });
            }).not.to.throw();
        });
    });

    describe("Prop errors", () => {
        it("Error if provided both defaultTabIndex and tabIndex", () => {
            defaultProps.defaultTabIndex = 0;
            defaultProps.tabIndex = 0;
            expect(() => {
                let wrapper = shallow(<Tabs {...defaultProps} />);
            }).to.throw();
        });
        it("Error if switching from uncontrolled to controlled", () => {
            defaultProps.defaultTabIndex = 0;
            let wrapper = shallow(<Tabs {...defaultProps} />);
            expect(() => {
                wrapper.setProps({
                    defaultTabIndex: null,
                    tabIndex: 1
                });
            }).to.throw();
        });
        it("Error if switching from controlled to uncontrolled", () => {
            defaultProps.tabIndex = 0;
            let wrapper = shallow(<Tabs {...defaultProps} />);
            expect(() => {
                wrapper.setProps({
                    tabIndex: null,
                    defaultTabIndex: 1
                });
            }).to.throw();
        });
    });
});