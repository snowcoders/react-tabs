# Deprecated

Very quickly I found that there are many ways to do tabs and that very few of them it's smart to combine both the tab selection and the content of the tabs into one component. It results in a very inflexible structure that requires a lot of css to be able to position things correctly. Instead having just css for the tabs itself vs coupling the tabs and the content is sufficient. To build out tabs, just use an array of html buttons with css applied.

In addition, hooking it up to react-router for deep links within a page can be troublesome.

[![npm (scoped)](https://img.shields.io/npm/v/@snowcoders/react-tabs.svg)](https://www.npmjs.com/package/@snowcoders/react-tabs)
[![CircleCI branch](https://img.shields.io/circleci/project/github/snowcoders/react-tabs.svg)](https://circleci.com/gh/snowcoders/react-tabs)

# Use it

`npm install --save @snowcoders/react-tabs save-prefix ~`

# Parent Library

This component is part of a larger components library, [react-ui-base](https://github.com/snowcoders/react-ui-base). The goal is to keep all the core logic and base css styles in a single location, that way building out new UI component libraries cheaper and faster (and less buggy).

We highly recommend visiting the react-ui-base repository to understand how to customize the css along with see examples.

You can also view all the components on our demo site https://snowcoders.github.io/react-ui-base/

# This component

This component has a single content view which can display different content at any time by selecting elements in a list above the view.
