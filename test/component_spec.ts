/// <reference path="../typings/mocha/mocha.d.ts" />
import chai = require("chai");
import TypedReact = require("../src/index");

var assert = chai.assert;

describe("Component", () => {
    var component: TypedReact.Component<any, any>;

    beforeEach(() => {
        component = new TypedReact.Component<any, any>();
    });

    it("should not have refs", () => {
        assert.isUndefined(component.refs);
    });

    it("should not have props", () => {
        assert.isUndefined(component.props);
    });

    it("should not have state", () => {
        assert.isUndefined(component.state);
    });

    var testNotImplemented = (methodName: string, fn: () => void): void => {
        it("should throw for " + methodName, () => {
            assert.throws(fn, TypedReact.NotImplementedError, methodName + " should be implemented by React");
        });
    };

    testNotImplemented("getDomNode", () => {
        component.getDOMNode();
    });

    testNotImplemented("setState", () => {
        component.setState(null);
    });

    testNotImplemented("replaceState", () => {
        component.replaceState(null);
    });

    testNotImplemented("forceUpdate", () => {
        component.forceUpdate();
    });

    testNotImplemented("isMounted", () => {
        component.isMounted();
    });

    testNotImplemented("setProps", () => {
        component.setProps(null);
    });

    testNotImplemented("replaceProps", () => {
        component.replaceProps(null);
    });

    it("should return null from render", () => {
        assert.isNull(component.render());
    });
});
