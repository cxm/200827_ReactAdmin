import React, { Component } from 'react'
import './index.less'

export default class ButtonLink extends Component {
    render() {
        return (
            <button {...this.props} className="button-link">{this.props.children}</button>
        )
    }
}
