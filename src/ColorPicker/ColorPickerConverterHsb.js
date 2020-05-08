import React from 'react';
import PropTypes from 'prop-types';

import WixComponent from '../BaseComponents/WixComponent';
import Input from '../Input';

import { st, classes } from './ColorPickerConverter.st.css';
import ColorPickerConverterViewer from './ColorPickerConverterViewer';
import { safeColor, getHsbOrEmpty } from './utils';

export default class ColorPickerConverterHsb extends WixComponent {
  static propTypes = {
    current: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onAdd: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = getHsbOrEmpty(props.current);
  }

  isInputsEmpty() {
    const { h, s, l } = this.state;
    return [h, s, l].every(value => value === '');
  }

  render() {
    return (
      <div className={st(classes.root)}>
        <div className={classes.distribute}>
          <Input
            size="small"
            value={this.state.h}
            onChange={e => this.change('h', e)}
            placeholder={'H'}
            className={classes.distributedItem}
          />
          <Input
            size="small"
            value={this.state.s}
            onChange={e => this.change('s', e)}
            placeholder={'S'}
            className={classes.distributedItem}
          />
          <Input
            size="small"
            value={this.state.l}
            onChange={e => this.change('l', e)}
            placeholder={'B'}
            className={classes.distributedItem}
          />
        </div>
        <ColorPickerConverterViewer
          {...this.props}
          color={this.props.current}
        />
      </div>
    );
  }

  UNSAFE_componentWillReceiveProps(props) {
    this.setState(getHsbOrEmpty(props.current));
  }

  change(part, { target: { value } }) {
    this.setState({ [part]: value }, () => {
      const { h, s, l } = this.state;
      const isMissingData = [h, s, l].some(_value => _value === '');
      const _color = safeColor(
        isMissingData && this.props.allowEmpty ? '' : this.state,
        this.props.allowEmpty,
      );
      if (!isMissingData || this.isInputsEmpty()) {
        this.props.onChange(_color);
      }
    });
  }
}
