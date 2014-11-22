/// <reference path="../typings/mocha/mocha.d.ts" />
import chai = require("chai");
import Component = require("../src/component");
import createClass = require("../src/create_class");
import React = require("react");

var assert = chai.assert;

interface FactoryProps {
    name: string;
    callback?: () => void;
}

interface FactoryState {
}

class FactoryTest extends Component<FactoryProps, FactoryState> {
    greeting: string = "Greetings, ";

    render() {
        return React.DOM.h1(null, this.greeting, this.props.name);
    }
}

class ComponentWillMountTest extends FactoryTest {
    componentWillMount() {
        this.props.callback();
    }
}

class InheritanceTest extends FactoryTest {
}

describe("createFactory", () => {
    var clazz: React.ReactComponentFactory<FactoryProps>;
    var factory: React.ReactComponentFactory<FactoryProps>;
    var descriptor: React.ReactComponentElement<FactoryProps>;
    var name = "test";

    beforeEach(() => {
        clazz = createClass(FactoryTest);
        factory = React.createFactory(clazz);
        descriptor = factory({
            name: name
        });
    });

    it("should produce a valid descriptor", () => {
        assert.isTrue(React.isValidElement(descriptor));
        assert.equal(descriptor.props.name, name);
    });

    it("should keep class properties", () => {
        assert.equal(React.renderToStaticMarkup(factory({
            name: "Asana"
        })), "<h1>Greetings, Asana</h1>");
    });

    it("should keep componentWillMount code", () => {
        var willMountClazz = createClass(ComponentWillMountTest);
        var willMountFactory = React.createFactory(willMountClazz);
        var wasCalled = false;
        assert.equal(React.renderToStaticMarkup(willMountFactory({
            name: "Asana",
            callback: () => {
                wasCalled = true;
            }
        })), "<h1>Greetings, Asana</h1>");
        assert.isTrue(wasCalled);
    });

    it("should keep inherited methods and props", () => {
        var inheritedClazz = createClass(InheritanceTest);
        var inheritedFactory = React.createFactory(inheritedClazz);
        assert.equal(React.renderToStaticMarkup(inheritedFactory({
            name: "Asana"
        })), "<h1>Greetings, Asana</h1>");
    });
});
