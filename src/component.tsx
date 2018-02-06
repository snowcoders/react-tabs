import * as React from "react";

import { UnstyledButton } from "@snowcoders/react-unstyled-button";

import * as classnames from "classnames";

export interface ITabsProps {
    className?: string;
    isBaseStylesDisabled?: boolean;

    tabs: { header: JSX.Element, content: JSX.Element }[];

    defaultTabIndex?: number;
    tabIndex?: number;

    onTabChange?: (tabIndex: number) => void;
}

export interface ITabsState {
    selectedTabIndex: number;
}

export class Tabs extends React.Component<ITabsProps, ITabsState> {
    constructor(props: ITabsProps) {
        super(props);

        this.validateOldProps();

        this.state = {
            selectedTabIndex: this.props.defaultTabIndex || this.props.tabIndex || 0
        }
    }

    componentDidUpdate(oldProps: ITabsProps) {
        this.validateOldProps(oldProps);
    }

    render() {
        let { isBaseStylesDisabled, className } = this.props;
        className = classnames({ "sci-react-tabs": isBaseStylesDisabled !== true }, className);

        return (
            <div className={className}>
                {this.renderTabs()}
                <div className="contents">
                    {this.props.tabs.map((value, index) => {
                        let className = classnames("content", { "visible": index === this.state.selectedTabIndex });
                        return (<div key={index} className={className}>{value.content}</div>);
                    })}
                </div>
            </ div>
        );
    }

    private renderTabs() {
        let tabs = [];
        for (let tabIndex = 0; tabIndex < this.props.tabs.length; tabIndex++) {
            let tab = this.props.tabs[tabIndex];
            let className = classnames("tab-item", { "selected": tabIndex === this.state.selectedTabIndex });
            tabs.push(<li className={className} key={tabIndex}><UnstyledButton className="tab-button" onClick={this.getOnTabClick(tabIndex)}>{tab.header}</UnstyledButton></li>);
        }

        return (<ul className="tabs">{tabs}</ul>);
    }

    private getOnTabClick(tabIndex: number) {
        return () => {
            let propCallback = () => {
                if (this.props.onTabChange != null) {
                    this.props.onTabChange(tabIndex);
                }
            };

            if (this.props.tabIndex == null) {
                // Uncontrolled components maintain their own state
                this.setState({
                    selectedTabIndex: tabIndex
                }, () => {
                    propCallback();
                });
            }
            else {
                // Controlled components have their state maintained
                propCallback();
            }
        };
    }

    private validateOldProps(oldProps?: ITabsProps) {
        if (this.props.defaultTabIndex != null &&
            this.props.tabIndex != null) {
            throw new Error("@snowcoders/react-tabs - component can either be controled (props.tabIndex) or uncontroled (props.defaultTabIndex) but not both");
        }
        if (oldProps != null) {
            if (oldProps.defaultTabIndex != null && this.props.defaultTabIndex == null ||
                oldProps.tabIndex != null && this.props.tabIndex == null) {
                throw new Error("@snowcoders/react-tabs - component cannot switch between uncontrolled and controlled component after mounting");
            }
        }
    }
}