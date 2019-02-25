import React from 'react'

export default class InlineText extends React.Component {
  state = {
    txt: null,
    edit: false,
    areaScroll: '',
    initHeight: 0,
    totalHeight: 0
  }

  toggleState = () => {
    this.setState(
      state => ({ edit: !state.edit }),
      () => {
        this.state.edit && this.refs.textarea.focus()
      }
    )
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!this.state.initHeight && this.state.edit && this.refs.textarea) {
      this.setState({ initHeight: this.refs.textarea.clientHeight })
    }
  }

  handleOnChange = e => {
    const txt = e.nativeEvent.target.value

    console.log('scrollTop', this.refs.textarea.scrollTop)
    console.log('state', this.state.areaScroll)
    this.setState(state => ({
      txt,
      areaScroll:
        state.areaScroll < this.refs.textarea.scrollTop ||
        state.totalHeight < this.refs.textarea.clientHeight
          ? this.refs.textarea.scrollTop
          : state.areaScroll,
      totalHeight: parseInt(
        state.areaScroll < this.refs.textarea.scrollTop
          ? state.totalHeight + state.areaScroll
          : state.totalHeight
      )
    }))
  }

  render() {
    const { placeholder } = this.props
    console.log('state render', this.state)
    const clientHeight =
      (this.refs && this.refs.textarea && this.refs.textarea.clientHeight) || 0
    return !this.state.edit ? (
      <div onClick={() => this.toggleState()} className="inline-text-show">
        <span
          className={`underline ${
            !this.state.txt && placeholder ? 'holder-placeholder' : ''
          }`}
        >
          {this.state.txt ? this.state.txt : placeholder}
        </span>
      </div>
    ) : (
      <textarea
        style={{
          height: this.state.totalHeight || ''
        }}
        ref={'textarea'}
        placeholder={placeholder}
        // onBlur={this.toggleState}
        value={this.state.txt || ''}
        className={`inline-text ${this.state.edit ? 'editmode' : ''}`}
        onChange={this.handleOnChange}
      />
    )
  }
}
