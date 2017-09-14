jest.autoMockOff();

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const SupplierInput = require('../SupplierInput.react').default;
const I18nContainer = require('../../../../../test/I18nContainer.react').default;
const ReferenceSearchInput = require('../../ReferenceSearchInput/ReferenceSearchInput.react').default;

let serviceRegistry = function() {
  return {
    url: 'testUrl'
  }
};

describe('SupplierInput', () => {
  let componentTree;

  beforeEach(function() {
    componentTree = TestUtils.renderIntoDocument(
      <I18nContainer>
        <SupplierInput
          onChange={() => {}}
          onFocus={() => {}}
          onBlur={() => {}}
          value={{ supplierId: "testId", _objectLabel: "testLabel" }}
          serviceRegistry={serviceRegistry}
          multiple={false}
          disabled={false}
        />
      </I18nContainer>
    );
  });

  it('test is rendered rendered', () => {
    expect(ReactDOM.findDOMNode(componentTree)).toBeDefined();
  });

  it('test reference input props', () => {
    let configuredReferenceInput = TestUtils.findRenderedComponentWithType(componentTree, ReferenceSearchInput);
    expect(configuredReferenceInput.props.value).toEqual(
      {
        supplierId: 'testId',
        _objectLabel: 'testLabel'
      }
    );
    expect(configuredReferenceInput.props.searchFields[0].name).toBe('supplierId');
    expect(configuredReferenceInput.props.searchFields[1].name).toBe('supplierName');
    expect(configuredReferenceInput.props.searchFields[2].name).toBe('supplierGroup.name');
    expect(configuredReferenceInput.props.resultFields[0].name).toBe('supplierId');
    expect(configuredReferenceInput.props.resultFields[1].name).toBe('supplierName');
    expect(configuredReferenceInput.props.resultFields[2].name).toBe('supplierGroup.name');
    expect(configuredReferenceInput.props.multiple).toBeFalsy();
    expect(configuredReferenceInput.props.disabled).toBeFalsy();
  });

  it('test reference input statae', () => {
    let configuredReferenceInput = TestUtils.findRenderedComponentWithType(componentTree, ReferenceSearchInput);
    expect(configuredReferenceInput.state.value).toEqual({
      supplierId: 'testId',
      _objectLabel: 'testLabel'
    });
    expect(configuredReferenceInput.state.openDialog).toBeFalsy();
  });

  it('test invalid property type', () => {
    let errorMessage;
    try {
      TestUtils.renderIntoDocument(
        <I18nContainer>
          <SupplierInput
            onChange={() => {}}
            onFocus={() => {}}
            onBlur={() => {}}
            value={"invalidValue"}
            serviceRegistry={serviceRegistry}
            multiple={false}
            disabled={false}
          />
        </I18nContainer>
      );
    } catch (e) {
      errorMessage = e.message;
    }

    expect(errorMessage).toBeDefined();
    expect(errorMessage).
      toBe("Invalid reference search value: invalidValue. Only of 'object' and 'array' are supported.");
  });

  it('test single value validation', () => {
    let errorMessage;
    try {
      TestUtils.renderIntoDocument(
        <I18nContainer>
          <SupplierInput
            onChange={() => {}}
            onFocus={() => {}}
            onBlur={() => {}}
            value={[{ supplierId: "testId", _objectLabel: "testLabel" }]}
            serviceRegistry={serviceRegistry}
            multiple={false}
            disabled={false}
          />
        </I18nContainer>
      )
    } catch (e) {
      errorMessage = e.message;
    }

    expect(errorMessage).toBeDefined();
    expect(errorMessage).
      toBe("Invalid reference search value: [object Object]. Only of 'object' and 'array' are supported.");
  });

  it('test multiple value validation', () => {
    let errorMessage;
    try {
      TestUtils.renderIntoDocument(
        <I18nContainer>
          <SupplierInput
            onChange={() => {}}
            onFocus={() => {}}
            onBlur={() => {}}
            value={{ supplierId: "testId", _objectLabel: "testLabel" }}
            serviceRegistry={serviceRegistry}
            multiple={true}
            disabled={false}
          />
        </I18nContainer>
      );
    } catch (e) {
      errorMessage = e.message;
    }

    expect(errorMessage).toBeDefined();
    expect(errorMessage).
      toBe("Invalid reference search value: [object Object]. Only of 'object' and 'array' are supported.");
  });
});
