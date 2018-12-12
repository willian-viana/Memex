import React from 'react'
import { connect } from 'react-redux'

import { Checkbox } from '../../../common-ui/components'
import * as constants from '../constants'
import { browser } from 'webextension-polyfill-ts'
import { getLocalStorage, setLocalStorage } from 'src/util/storage'

import * as actions from '../actions'
import * as selectors from '../selectors'

const styles = require('./OnboardingChecklist.css')

export interface StateProps {
    onboardingStages: {
        annotationStage: string
    }
}

export interface DispatchProps {
    fetchOnboardingStages: () => void
}

export interface OwnProps {}

export type Props = StateProps & DispatchProps & OwnProps

class OnboardingChecklist extends React.Component<Props> {
    async componentDidMount() {
        await this.props.fetchOnboardingStages()
    }

    handleStepOne = async () => {
        if (this.props.onboardingStages.annotationStage === 'DONE') {
            return
        }

        const url = constants.ANNOTATION_DEMO_URL
        await setLocalStorage(
            constants.STORAGE_KEYS.onboardingDemo.step1,
            'highlight_text',
        )
        await browser.tabs.create({
            url,
        })
    }

    render() {
        const { annotationStage } = this.props.onboardingStages
        return (
            <React.Fragment>
                <p className={styles.title}>Let's get started</p>
                <p className={styles.subtext}>
                    Complete the steps & get 1 month of free auto-backups
                </p>
                <div className={styles.checklist}>
                    <Checkbox
                        isChecked={annotationStage === 'DONE'}
                        handleChange={() => null}
                        id="step1"
                    >
                        {' '}
                        <span
                            className={styles.checklistText}
                            onClick={this.handleStepOne}
                        >
                            Make your first web annotation{' '}
                        </span>
                    </Checkbox>
                </div>
                <div className={styles.checklist}>
                    <Checkbox
                        isChecked={false}
                        handleChange={() => null}
                        id="step2"
                    >
                        {' '}
                        <span className={styles.checklistText}>
                            Do your first power search{' '}
                        </span>
                    </Checkbox>
                </div>
                <div className={styles.checklist}>
                    <Checkbox
                        isChecked={false}
                        handleChange={() => null}
                        id="step3"
                    >
                        {' '}
                        <span className={styles.checklistText}>
                            Import from your existing bookmarks & history{' '}
                        </span>
                    </Checkbox>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    onboardingStages: selectors.onboardingStages(state),
})

const mapDispatchToPrpos = dispatch => ({
    fetchOnboardingStages: () => dispatch(actions.fetchOnboardingStages()),
})

export default connect(
    mapStateToProps,
    mapDispatchToPrpos,
)(OnboardingChecklist)