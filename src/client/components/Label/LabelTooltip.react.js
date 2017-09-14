import React from 'react';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Popover from 'react-bootstrap/lib/Popover';
import './LabelTooltip.css';

export default class LabelTooltip extends React.Component {

  static propTypes = {
    label: React.PropTypes.string.isRequired,
    tooltip: React.PropTypes.string.isRequired
  };

  render() {
    const { label, tooltip } = this.props;

    const popover =
      (<Popover id="tooltipPopover"
        title={label}
      >
        {tooltip}
      </Popover>);

    const style = {
      cursor: 'pointer',
      position: 'absolute',
      top: '10px',
      right: '-10px',
      zIndex: '2',
      backgroundColor: '#fff'
    };

    return (
      <OverlayTrigger placement="top"
        trigger="click"
        rootClose={true}
        overlay={popover}
      >
        <i className="glyphicon glyphicon-info-sign text-muted"
          style={style}
        />
      </OverlayTrigger>
    );
  }
}
