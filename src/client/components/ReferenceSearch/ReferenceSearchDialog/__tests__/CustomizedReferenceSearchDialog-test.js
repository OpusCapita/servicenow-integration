jest.autoMockOff();

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const Modal = require('react-bootstrap/lib/Modal');
const ReferenceSearchDialog = require('../ReferenceSearchDialog.react').default;
const I18nContainer = require('../../../../../test/I18nContainer.react').default;
const TestReferenceSearchDialogInputComponent = require(
  '../../../../../test/TestReferenceSearchDialogInputComponent.react'
).default;

describe('CustomizedReferenceSearchDialog', () => {
  let fields = [
      { name: 'test_field1', label: 'Test Field 1', inputComponent: TestReferenceSearchDialogInputComponent },
      { name: 'test_field2', label: 'Test Field 2' }
  ];

  let componentTree = TestUtils.renderIntoDocument(
      <I18nContainer>
        <ReferenceSearchDialog
          title="test"
          openDialog={true}
          referenceSearchAction={() => {}}
          onCloseDialog={() => {}}
          onSelect={() => {}}
          multiple={false}
          searchFields={fields}
          resultFields={fields}
          objectIdentifier="id"
        />
      </I18nContainer>
    );

  it('test is rendered', () => {
    expect(ReactDOM.findDOMNode(componentTree)).toBeDefined();
  });

  it('there is an active element on the page', () => {
    expect(document.activeElement).toBeDefined();
  });

  it('test search', () => {
    let referenceSearchAction = jest.fn();
    let componentTree = TestUtils.renderIntoDocument(
      <I18nContainer>
        <ReferenceSearchDialog
          title="test"
          openDialog={true}
          referenceSearchAction={referenceSearchAction}
          onCloseDialog={() => {}}
          onSelect={() => {}}
          multiple={false}
          searchFields={fields}
          resultFields={fields}
          objectIdentifier="id"
        />
      </I18nContainer>
    );
    const referenceSearchDialog =
      TestUtils.findRenderedComponentWithType(componentTree, ReferenceSearchDialog);
    const modalComponent =
      TestUtils.findRenderedComponentWithType(referenceSearchDialog, Modal);
    const manufacturerInput = ReactDOM.findDOMNode(modalComponent._modal).querySelector('#test_field1');
    TestUtils.Simulate.change(manufacturerInput, { target: { value: 'test1' } });
    expect(referenceSearchDialog.state.searchParams.test_field1).toBeDefined();
    expect(referenceSearchDialog.state.searchParams.test_field1).toBe('test1');
    const form = ReactDOM.findDOMNode(modalComponent._modal).querySelector('form');
    TestUtils.Simulate.submit(form);
    expect(referenceSearchAction.mock.calls.length).toBe(2);
    expect(referenceSearchAction.mock.calls[1][0].test_field1).toBe('test1');
  });
});
