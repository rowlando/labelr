import React from 'react';
import ampersandMixin from 'ampersand-react-mixin';

export default React.createClass({

  mixins: [ampersandMixin],

  displayName: 'Label',

  getInitialState () {
    const {name,color} = this.props.label;
    return { name: name, color:color };
  },

  propTypes: {
    label: React.PropTypes.object.isRequired
  },

  onCancelButtonClick (event) {
    event.preventDefault();
    const {label} = this.props;
    if (label.saved) {
      label.editing = false;
      this.setState(this.getInitialState());
    } else {
      label.collection.remove(label);
    }
  },

  onEditButtonClick (event) {
    event.preventDefault();
    this.props.label.editing = true;
  },

  onDeleteClick (event) {
    event.preventDefault();
    this.props.label.destroy({
      wait: true
    });
  },

  onChangeName (event) {
    this.setState({
      name: event.target.value
    });
  },

  onChangeColor (event) {
    this.setState({
      color: event.target.value.slice(1)
    });
  },

  onSubmit (event) {
    event.preventDefault();
    const {label} = this.props;
    if (label.saved) {
      label.update(this.state);
    } else {
      label.save(this.state);
    }
    label.editing = false;
  },

  render () {

    const {label} = this.props;
    const {name,color} = this.state;
    const cssColor = '#' + color;
    let content;

    if (label.editing) {
      content = (
        <form onSubmit={this.onSubmit} className='label-form'>

          <span className='label-color' style={{backgroundColor: cssColor}}>&nbsp;</span>
          <div className='form-inline'>
            <div className='form-element'>
              <label htmlFor='name'>name</label>
              <input value={name} onChange={this.onChangeName} name='name' className='form-input'/>
            </div>
          </div>
          <div className='form-inline'>
            <div className='form-element'>
              <label htmlFor='name'>color</label>
              <input value={cssColor} onChange={this.onChangeColor} name='color' className='form-input'/>
            </div>
          </div>
          <button type='submit' className='button'>Save</button>
          <button onClick={this.onCancelButtonClick} type='button' className='button button-unstyled'>cancel</button>
        </form>
      )
    } else {
      content = (
        <div className='label-view'>
          <span className='label-color' style={{backgroundColor: cssColor}}>&nbsp;</span>
          <span>{label.name}</span>
          <a href='#' onClick={this.onEditButtonClick}><span className='octicon octicon-pencil'></span></a>
          <a href='#' onClick={this.onDeleteClick}><span className='octicon octicon-x'></span></a>
        </div>
      )
    }

    return <div>{content}</div>;

  }

});
