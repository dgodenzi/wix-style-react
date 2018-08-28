import React from 'react';
import WixComponent from '../../BaseComponents/WixComponent';
import DragLayer from './DragLayer';
import PropTypes from 'prop-types';
import {DragSource as _DragSource, DropTarget as _DropTarget} from 'react-dnd';
import {dragCoordinates} from './DragUtils';
import {getEmptyImage} from 'react-dnd-html5-backend';
import noop from 'lodash/noop';

const ItemTypes = {
  DRAGGABLE: 'Draggable'
};

const source = {
  beginDrag: ({id, index}) => ({id, index}),
  endDrag: ({id, onMove, index}) => onMove({id, from: index}),
  isDragging: ({id}, monitor) => id === monitor.getItem().id
};

@_DragSource(ItemTypes.DRAGGABLE, source, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
}))
export class DraggableSource extends React.Component {
  componentDidMount() {
    const {connectDragPreview} = this.props;

    connectDragPreview && connectDragPreview(getEmptyImage());
  }

  _renderDraggableItem() {
    const {isDragging, connectDragSource, withHandle, render, id, ...props} = this.props;

    return withHandle ?
      render({
        isPlaceholder: isDragging, id, connectHandle: handle => connectDragSource(handle), ...props
      }) :
      connectDragSource(render({
        isPlaceholder: isDragging, id, connectHandle: noop, ...props
      }));
  }

  _renderPreviewItem() {
    const {render, id, ...props} = this.props;
    return (
      <DragLayer
        renderPreview={() => render({isPreview: true, connectHandle: noop, id, ...props})}
        id={id}
        draggedType={ItemTypes.DRAGGABLE}
        />
    );
  }

  render() {
    const {connectDragSource} = this.props;
    return connectDragSource ? (
      <div>
        {this._renderDraggableItem()}
        {this._renderPreviewItem()}
      </div>
    ) : null;
  }
}

DraggableSource.propTypes = {
  isDragging: PropTypes.bool,
  connectDragSource: PropTypes.func,
  connectDragPreview: PropTypes.func,
  render: PropTypes.func,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  withHandle: PropTypes.bool
};

const target = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    if (!component || hoverIndex === dragIndex) {
      return;
    }

    const {hoverClientY, hoverMiddleY} = dragCoordinates({monitor, component});

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    props.onHover(dragIndex, hoverIndex);
    monitor.getItem().index = hoverIndex;
  }
};

@_DropTarget(ItemTypes.DRAGGABLE, target, connect => ({
  connectDropTarget: connect.dropTarget()
}))
export class Draggable extends WixComponent {
  render() {
    const {connectDropTarget, ...props} = this.props;
    return connectDropTarget ?
      connectDropTarget(
        <div>
          <DraggableSource {...props}/>
        </div>
      ) :
      null;
  }
}

Draggable.propTypes = {
  /** callback when item was dropped in a new location */
  onMove: PropTypes.func,
  /** callback when item is hovered*/
  onHover: PropTypes.func,
  /** a function to render each item in the list */
  render: PropTypes.func.isRequired,
  /** decide whether to render a handle using `connectHandle` (see below) */
  withHandle: PropTypes.bool
};

export default Draggable;
