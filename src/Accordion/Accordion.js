import React from 'react';
import PropTypes from 'prop-types';

import { st, classes } from './Accordion.st.css';
import AccordionItem from './AccordionItem';

class Accordion extends React.Component {
  static displayName = 'Accordion';

  static propTypes = {
    /** Applied as data-hook HTML attribute that can be used to create driver in testing */
    dataHook: PropTypes.string,

    /** allow multiple rows to be opened simultaneously */
    multiple: PropTypes.bool,

    /** Accordion skin color */
    skin: PropTypes.oneOf(['standard', 'light']),

    /** Hide Accordion shadow effect */
    hideShadow: PropTypes.bool,

    /** accordion items nodes */
    items: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.node,
        icon: PropTypes.node,
        children: PropTypes.node,
        expandLabel: PropTypes.node,
        collapseLabel: PropTypes.node,
        buttonType: PropTypes.oneOf(['textButton', 'button']),
      }),
    ),
  };

  static defaultProps = {
    items: [],
    multiple: false,
    skin: 'standard',
    hideShadow: false,
  };

  _findOpenIndexes = items =>
    items
      .map((item, index) => (item.open ? index : null))
      .filter(index => index !== null);

  constructor(props) {
    super(props);

    this.state = {
      openIndexes: this._findOpenIndexes(this.props.items),
    };
  }

  _compareOpenItems = (currentItems, prevItems) => {
    if (prevItems.length !== currentItems.length) {
      return false;
    }
    for (let i = 0; i < prevItems.length; i++) {
      if (prevItems[i].open !== currentItems[i].open) {
        return false;
      }
    }
    return true;
  };

  componentDidUpdate = prevProps => {
    if (!this._compareOpenItems(this.props.items, prevProps.items)) {
      this.setState({
        openIndexes: this._findOpenIndexes(this.props.items),
      });
    }
  };

  _toggle = index => () =>
    this.setState(({ openIndexes }) => ({
      openIndexes: openIndexes.includes(index)
        ? openIndexes.filter(i => i !== index)
        : this.props.multiple
        ? [...openIndexes, index]
        : [index],
    }));

  render() {
    const { openIndexes } = this.state;
    const { dataHook, items, skin, hideShadow } = this.props;

    return (
      <div data-hook={dataHook}>
        {items.map((item, index, allItems) => (
          <AccordionItem
            className={st(classes.item, {
              last: index === allItems.length - 1,
            })}
            key={index}
            onToggle={this._toggle(index)}
            {...item}
            open={openIndexes.includes(index)}
            skin={skin}
            hideShadow={hideShadow}
          />
        ))}
      </div>
    );
  }
}

export default Accordion;
