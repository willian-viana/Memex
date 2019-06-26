import React, { Component, DragEventHandler } from 'react'

import { Emoji, Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'

import cx from 'classnames'

const styles = require('./list-item.css')

export interface Props {
    listName: string
    isFiltered: boolean
    onEditButtonClick: React.MouseEventHandler<HTMLButtonElement>
    onCrossButtonClick: React.MouseEventHandler<HTMLButtonElement>
    onAddPageToList: (url: string, isSocialPost: boolean) => void
    onAddSubListToList: (subList: string) => void
    onListItemClick: () => void
    onChangeEmoji: (emoji: object) => void
}

interface State {
    emoji: string
    isMouseInside: boolean
    isDragInside: boolean
    isEmojiChanging: boolean
}

class PageList extends Component<Props, State> {
    private listItemRef: HTMLElement

    constructor(props) {
        super(props)
        this.state = {
            emoji: 'file_folder',
            isMouseInside: false,
            isDragInside: false,
            isEmojiChanging: false,
        }
    }

    componentDidMount() {
        this.attachEventListeners()
    }

    componentWillUnmount() {
        this.removeEventListeners()
    }

    private attachEventListeners() {
        this.listItemRef.addEventListener('mouseenter', this.handleMouseEnter)
        this.listItemRef.addEventListener('mouseleave', this.handleMouseLeave)
    }

    private removeEventListeners() {
        this.listItemRef.removeEventListener(
            'mouseenter',
            this.handleMouseEnter,
        )
        this.listItemRef.removeEventListener(
            'mouseleave',
            this.handleMouseLeave,
        )
    }

    private setListItemRef = (ref: HTMLElement) => {
        this.listItemRef = ref
    }

    get mainClass() {
        return cx(
            styles.pageList,
            {
                [styles.pageListDrag]: this.state.isDragInside,
            },
            {
                [styles.filtered]: this.props.isFiltered,
            },
        )
    }

    private handleMouseEnter = () => {
        this.setState(state => ({
            isMouseInside: true,
        }))
    }

    private handleMouseLeave = () => {
        this.setState(state => ({
            isMouseInside: false,
        }))
    }

    private handleDragOver = e => {
        e.preventDefault()
        this.setState(state => ({
            isDragInside: true,
        }))
    }

    private handleDragLeave = () => {
        this.setState(state => ({
            isDragInside: false,
        }))
    }

    private handleDragStart: DragEventHandler = e => {
        this.handleMouseLeave()
        e.dataTransfer.dropEffect = 'move'
        const listName = this.props.listName
        e.dataTransfer.setData('subList', listName)
    }

    private handleDrop: DragEventHandler = e => {
        e.preventDefault()
        this.handleDragLeave()
        // Gets subList of the dropped list item
        const subList = e.dataTransfer.getData('subList')
        const { url, isSocialPost } = JSON.parse(
            e.dataTransfer.getData('text/plain'),
        )
        if (url) {
            // this.props.resetUrlDragged()
            this.props.onAddPageToList(url, isSocialPost)
        } else {
            this.props.onAddSubListToList(subList)
        }
    }

    private addEmoji = emoji => {
        this.setState({
            emoji,
            isEmojiChanging: false,
        })
    }

    private onChangeEmoji = (emoji, event) => {
        event.stopPropagation()

        this.setState({
            isEmojiChanging: true,
        })
    }

    private handleEditBtnClick: React.MouseEventHandler<
        HTMLButtonElement
    > = e => {
        e.stopPropagation()

        this.props.onEditButtonClick(e)
    }

    private handleCrossBtnClick: React.MouseEventHandler<
        HTMLButtonElement
    > = e => {
        e.stopPropagation()
        this.props.onCrossButtonClick(e)
    }

    render() {
        const { emoji } = this.state

        return (
            <div
                ref={this.setListItemRef}
                className={this.mainClass}
                onClick={this.props.onListItemClick}
                onDragOver={this.handleDragOver}
                onDrop={this.handleDrop}
                title={this.props.listName}
                onDragEnter={this.handleDragOver}
                onDragLeave={this.handleDragLeave}
                onDragStart={this.handleDragStart}
                draggable
            >
                <div className={styles.pageTitle}>
                    <Emoji
                        emoji={emoji}
                        set="emojione"
                        size={24}
                        onClick={this.onChangeEmoji}
                    />
                    {this.state.isEmojiChanging && (
                        <Picker
                            style={{
                                position: 'absolute',
                                top: '15px',
                                right: '-140px',
                                zIndex: 9,
                            }}
                            onSelect={this.addEmoji}
                        />
                    )}
                    <div className={styles.listName}>{this.props.listName}</div>
                    <div className={styles.buttonContainer}>
                        {this.state.isMouseInside && (
                            <React.Fragment>
                                <button
                                    className={cx(
                                        styles.editButton,
                                        styles.button,
                                    )}
                                    onClick={this.handleEditBtnClick}
                                />
                                <button
                                    className={cx(
                                        styles.deleteButton,
                                        styles.button,
                                    )}
                                    onClick={this.handleCrossBtnClick}
                                />
                            </React.Fragment>
                        )}
                    </div>
                </div>
                {this.props.children}
            </div>
        )
    }
}

export default PageList
