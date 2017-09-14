'use strict';

let SHOW_HIDDEN = true;
const MAX_DEPTH = 9;

function _valueDeepSearch(input, value, prefix = '', depth = 0, isHidden = false) {
  if (input === value) {
    return [{
      prefix,
      isHidden,
      depth
    }];
  }

  if (
    depth === MAX_DEPTH ||
    typeof input !== 'object' ||
    input instanceof Date ||
    !input
  ) {
    return [];
  }

  if (Array.isArray(input)) {
    return input.reduce((rez, elem, index) => [
      ...rez,
      ..._valueDeepSearch(
        elem,
        value,
        prefix + '[' + index + ']',
        depth + 1,
        isHidden
      )
    ], []);
  }

  return Object.keys(input).
    reduce((rez, propName) => [
      ...rez,
      ..._valueDeepSearch(
        input[propName],
        value,
        prefix + '.' + propName,
        depth + 1,
        isHidden || propName.charAt(0) === '_'
      )
    ], []);
}

function _sortAndFilter(arr) {
  return arr.
    sort((a, b) => (a.isHidden === b.isHidden) ? (a.depth - b.depth) : (a.isHidden - b.isHidden)).
    filter(a => SHOW_HIDDEN || !a.isHidden).
    map(a => a.prefix);
}

function valueDeepSearch(input, value) {
  return _sortAndFilter(_valueDeepSearch(input, value));
}

function _propDeepSearch(input, value, prefix = '', depth = 0, isHidden = false) {
  if (
    depth === MAX_DEPTH ||
    typeof input !== 'object' ||
    input instanceof Date ||
    !input
  ) {
    return [];
  }


  if (Array.isArray(input)) {
    return input.reduce((rez, elem, index) => [
      ...rez,
      ..._propDeepSearch(
        elem,
        value,
        prefix + '[' + index + ']',
        depth + 1,
        isHidden
      )
    ], []);
  }


  return Object.keys(input).reduce((rez, propName) => [
    ...rez,
    ...(propName === value ?
    [{
      prefix,
      isHidden,
      depth
    }] :
    []
    ),
    ..._propDeepSearch(
      input[propName],
      value,
      prefix + '.' + propName,
      depth + 1,
      isHidden || propName.charAt(0) === '_'
    )
  ], []);
}

function propDeepSearch(input, value) {
  return _sortAndFilter(_propDeepSearch(input, value));
}

module.exports = {
  propDeepSearch,
  valueDeepSearch
}
