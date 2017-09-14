jest.autoMockOff();

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const Modal = require('react-bootstrap/lib/Modal');
import SortableColumn from '../../SortableColumn';
import PaginationPanel from '../../PaginationPanel';
const ReferenceSearchDialog = require('../ReferenceSearchDialog.react').default;
const I18nContainer = require('../../../../../test/I18nContainer.react').default;

describe('ReferenceSearchDialog', () => {
  it('should focus first input field when dialog open', () => {
    let fields = [
      { name: 'manufacturerId', label: 'Mfg ID' },
      { name: 'name', label: 'Name' }
    ];
    let componentTree = TestUtils.renderIntoDocument(
      <I18nContainer>
        <ReferenceSearchDialog
          title="test"
          openDialog={false}
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

    it('no active element on the page', () => {
      expect(document.activeElement).toBeUndefined();
    });

    componentTree = TestUtils.renderIntoDocument(
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
    // don't work in test
    // expect(document.activeElement.id).toEqual('manufacturerId');
  });

  it('test search', () => {
    let fields = [
      { name: 'manufacturerId', label: 'Mfg ID' },
      { name: 'name', label: 'Name' }
    ];
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
    const manufacturerInput = ReactDOM.findDOMNode(modalComponent._modal).querySelector('#manufacturerId');
    const nameInput = ReactDOM.findDOMNode(modalComponent._modal).querySelector('#name');
    TestUtils.Simulate.change(manufacturerInput, { target: { value: 'manufacturerParam' } });
    TestUtils.Simulate.change(nameInput, { target: { value: 'nameParam' } });
    expect(referenceSearchDialog.state.searchParams.manufacturerId).toBeDefined();
    expect(referenceSearchDialog.state.searchParams.manufacturerId).toBe('manufacturerParam');
    expect(referenceSearchDialog.state.searchParams.name).toBeDefined();
    expect(referenceSearchDialog.state.searchParams.name).toBe('nameParam');
    const form = ReactDOM.findDOMNode(modalComponent._modal).querySelector('form');
    TestUtils.Simulate.submit(form);
    expect(referenceSearchAction.mock.calls.length).toBe(2);
    expect(referenceSearchAction.mock.calls[1][0].manufacturerId).toBe('manufacturerParam');
    expect(referenceSearchAction.mock.calls[1][0].name).toBe('nameParam');
    TestUtils.Simulate.change(manufacturerInput, { target: { value: '' } });
    TestUtils.Simulate.change(nameInput, { target: { value: '' } });
    TestUtils.Simulate.submit(form);
    expect(referenceSearchAction.mock.calls.length).toBe(3);
    expect(referenceSearchAction.mock.calls[2][0].manufacturerId).toBeUndefined();
    expect(referenceSearchAction.mock.calls[2][0].name).toBeUndefined();
  });

  it('test input rendering count', () => {
    let fields = [
      { name: 'manufacturerId', label: 'Mfg ID' },
      { name: 'supplierId', label: 'Spl ID' },
      { name: 'name', label: 'Name' }
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
    const referenceSearchDialog =
      TestUtils.findRenderedComponentWithType(componentTree, ReferenceSearchDialog);
    const modalComponent =
      TestUtils.findRenderedComponentWithType(referenceSearchDialog, Modal);
    const searchInputs = ReactDOM.findDOMNode(modalComponent._modal).querySelectorAll('input');
    expect(searchInputs.length).toBe(3);
  });

  it('test select single value', () => {
    let fields = [
      { name: 'manufacturerId', label: 'Mfg ID' },
      { name: 'supplierId', label: 'Spl ID' },
      { name: 'name', label: 'Name' }
    ];
    let onSelect = jest.fn();
    let onCloseDialog = jest.fn();
    let componentTree = TestUtils.renderIntoDocument(
      <I18nContainer>
        <ReferenceSearchDialog
          title="test"
          openDialog={true}
          referenceSearchAction={(params, callback) => {
            callback({ items: [{ id: '100' }, { id: '200' }] })
          }}
          onCloseDialog={onCloseDialog}
          onSelect={onSelect}
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
    const manufacturerValue = ReactDOM.findDOMNode(modalComponent._modal).querySelectorAll('a')[2];
    TestUtils.Simulate.click(manufacturerValue);
    expect(onSelect.mock.calls.length).toBe(1);
    expect(onSelect.mock.calls[0][0][0].id).toBe('100');
    expect(onCloseDialog.mock.calls.length).toBe(1);
  });

  it('test check multiple values', () => {
    let fields = [
      { name: 'manufacturerId', label: 'Mfg ID' },
      { name: 'supplierId', label: 'Spl ID' },
      { name: 'name', label: 'Name' }
    ];
    let componentTree = TestUtils.renderIntoDocument(
      <I18nContainer>
        <ReferenceSearchDialog
          title="test"
          openDialog={true}
          referenceSearchAction={(params, callback) => {
            callback({ items: [{ id: '100' }, { id: '200' }, { id: '300' }] })
          }}
          onCloseDialog={() => {}}
          onSelect={() => {}}
          multiple={true}
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
    const checkboxes = ReactDOM.findDOMNode(modalComponent._modal).querySelectorAll('input[type="checkbox"]');
    TestUtils.Simulate.change(checkboxes[1], { "target": { "checked": true } });
    expect(referenceSearchDialog.state.selectedItems.length).toBe(1);
    expect(referenceSearchDialog.state.selectedItems[0].id).toBe('100');
    TestUtils.Simulate.change(checkboxes[2], { "target": { "checked": true } });
    expect(referenceSearchDialog.state.selectedItems.length).toBe(2);
    expect(referenceSearchDialog.state.selectedItems[1].id).toBe('200');
    TestUtils.Simulate.change(checkboxes[2], { "target": { "checked": false } });
    expect(referenceSearchDialog.state.selectedItems.length).toBe(1);
    expect(referenceSearchDialog.state.selectedItems[0].id).toBe('100');
    TestUtils.Simulate.change(checkboxes[0], { "target": { "checked": true } });
    expect(referenceSearchDialog.state.selectedItems.length).toBe(fields.length);
    expect(referenceSearchDialog.state.selectedAll).toBeTruthy();
    expect(referenceSearchDialog.state.selectedItems[2].id).toBe('300');
    TestUtils.Simulate.change(checkboxes[0], { "target": { "checked": false } });
    expect(referenceSearchDialog.state.selectedItems.length).toBe(0);
    expect(referenceSearchDialog.state.selectedAll).toBeFalsy();
  });

  it('test select multiple values', () => {
    let fields = [
      { name: 'manufacturerId', label: 'Mfg ID' },
      { name: 'supplierId', label: 'Spl ID' },
      { name: 'name', label: 'Name' }
    ];
    let onSelect = jest.fn();
    let onCloseDialog = jest.fn();
    let componentTree = TestUtils.renderIntoDocument(
      <I18nContainer>
        <ReferenceSearchDialog
          title="test"
          openDialog={true}
          referenceSearchAction={(params, callback) => {
            callback({ items: [{ id: '100' }, { id: '200' }, { id: '300' }] })
          }}
          onCloseDialog={onCloseDialog}
          onSelect={onSelect}
          multiple={true}
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
    const selectAllCheckbox = ReactDOM.findDOMNode(modalComponent._modal).querySelectorAll('input[type="checkbox"]')[0];
    TestUtils.Simulate.change(selectAllCheckbox, { "target": { "checked": true } });
    expect(referenceSearchDialog.state.selectedItems.length).toBe(3);
    expect(referenceSearchDialog.state.selectedAll).toBeTruthy();
    const selectButton = ReactDOM.findDOMNode(modalComponent._modal).querySelector('p button.btn-primary');
    TestUtils.Simulate.click(selectButton);
    expect(onSelect.mock.calls.length).toBe(1);
    expect(onSelect.mock.calls[0][0].length).toBe(3);
    expect(onSelect.mock.calls[0][0][0].id).toBe('100');
    expect(onSelect.mock.calls[0][0][1].id).toBe('200');
    expect(onSelect.mock.calls[0][0][2].id).toBe('300');
    expect(onCloseDialog.mock.calls.length).toBe(1);
  });

  it('test select multiple values with none is checked', () => {
    let fields = [
      { name: 'manufacturerId', label: 'Mfg ID' },
      { name: 'supplierId', label: 'Spl ID' },
      { name: 'name', label: 'Name' }
    ];
    let onSelect = jest.fn();
    let onCloseDialog = jest.fn();
    let componentTree = TestUtils.renderIntoDocument(
      <I18nContainer>
        <ReferenceSearchDialog
          title="test"
          openDialog={true}
          referenceSearchAction={(params, callback) => {
            callback({ items: [{ id: '100' }, { id: '200' }, { id: '300' }] })
          }}
          onCloseDialog={onCloseDialog}
          onSelect={onSelect}
          multiple={true}
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
    const selectButton = ReactDOM.findDOMNode(modalComponent._modal).querySelector('p button.btn-primary');
    TestUtils.Simulate.click(selectButton);
    expect(onSelect.mock.calls.length).toBe(0);
    expect(onCloseDialog.mock.calls.length).toBe(0);
  });

  it('test rendering with all hidden fields', () => {
    let fields = [
      { name: 'manufacturerId', label: 'Mfg ID', hidden: true },
      { name: 'supplierId', label: 'Spl ID', hidden: true },
      { name: 'name', label: 'Name', hidden: true }
    ];
    let componentTree = TestUtils.renderIntoDocument(
      <I18nContainer>
        <ReferenceSearchDialog
          title="test"
          openDialog={true}
          referenceSearchAction={(params, callback) => {
            callback({ items: [{ id: '100' }, { id: '200' }, { id: '300' }] })
          }}
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
    expect(referenceSearchDialog).toBeDefined();
    const modalComponent =
      TestUtils.findRenderedComponentWithType(referenceSearchDialog, Modal);
    const valueReferences = ReactDOM.findDOMNode(modalComponent._modal).querySelectorAll('a');
    expect(valueReferences.length).toBe(0);
  });

  it('test on paginate change', () => {
    let fields = [
      { name: 'manufacturerId', label: 'Mfg ID' },
      { name: 'supplierId', label: 'Spl ID' },
      { name: 'name', label: 'Name' }
    ];
    let items = [];
    for (let id = 1; id <= 10; id++) {
      items.push({ id })
    }
    let referenceSearchAction = jest.fn((params, callback) => {
      callback({
        items,
        count: 15
      })
    });
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
    expect(referenceSearchDialog).toBeDefined();
    const modalComponent =
      TestUtils.findRenderedComponentWithType(referenceSearchDialog, Modal);
    const paginationPanel =
      TestUtils.findRenderedComponentWithType(modalComponent._modal, PaginationPanel);
    expect(referenceSearchAction.mock.calls.length).toBe(1);
    expect(referenceSearchAction.mock.calls[0][0].offset).toBe(0);
    paginationPanel.onSelect({}, { eventKey: 2 });
    expect(referenceSearchAction.mock.calls.length).toBe(2);
    expect(referenceSearchAction.mock.calls[1][0].offset).toBe(10);
  });

  it('test on column sort', () => {
    let fields = [
      { name: 'manufacturerId', label: 'Mfg ID', sortable: true },
      { name: 'supplierId', label: 'Spl ID', rowValueLabel: { className: 'a', getValue: () => 'b' } },
      { name: 'name', label: 'Name' }
    ];
    let items = [];
    for (let id = 1; id <= 10; id++) {
      items.push({ id })
    }
    let referenceSearchAction = jest.fn((params, callback) => {
      callback({
        items,
        count: 15
      })
    });
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
    expect(referenceSearchDialog).toBeDefined();
    const modalComponent =
      TestUtils.findRenderedComponentWithType(referenceSearchDialog, Modal);
    const sortableColumn =
      TestUtils.findRenderedComponentWithType(modalComponent._modal, SortableColumn);
    expect(referenceSearchAction.mock.calls.length).toBe(1);
    sortableColumn.onSort({ preventDefault: () => {} });
    expect(referenceSearchAction.mock.calls.length).toBe(2);
    expect(referenceSearchAction.mock.calls[1][0].sort).toBe('manufacturerId');
    expect(referenceSearchAction.mock.calls[1][0].order).toBe('asc');
    sortableColumn.onSort({ preventDefault: () => {} });
    expect(referenceSearchAction.mock.calls.length).toBe(3);
    expect(referenceSearchAction.mock.calls[2][0].sort).toBe('manufacturerId');
    expect(referenceSearchAction.mock.calls[2][0].order).toBe('desc');
  });

  it('test with modalSpecificProps props', () => {
    let fields = [
      { name: 'manufacturerId', label: 'Mfg ID' },
      { name: 'supplierId', label: 'Spl ID' },
      { name: 'name', label: 'Name' }
    ];
    let onEnter = jest.fn();
    let onHide = jest.fn();
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
          modalSpecificProps={{
            onEnter,
            onHide
          }}
        />
      </I18nContainer>
    );
    expect(onEnter.mock.calls.length).toBe(1);
    const referenceSearchDialog =
      TestUtils.findRenderedComponentWithType(componentTree, ReferenceSearchDialog);
    expect(referenceSearchDialog).toBeDefined();
    const modalComponent =
      TestUtils.findRenderedComponentWithType(referenceSearchDialog, Modal);
    const closeDialogButton = ReactDOM.findDOMNode(modalComponent._modal).querySelector('button.close');
    TestUtils.Simulate.click(closeDialogButton);
    expect(onHide.mock.calls.length).toBe(1);
  });
});
