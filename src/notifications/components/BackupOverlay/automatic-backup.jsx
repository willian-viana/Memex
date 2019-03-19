import React from 'react'
import PropTypes from 'prop-types'
import BackupOverlay from 'src/common-ui/components/BackupOverlay'

const AutomaticBackup = props => {
    return (
        <BackupOverlay
            header={props.header}
            message={`Backup your data automatically every 15 minutes. Worry-free.`}
            buttonText={props.buttonText}
            buttonUrl={props.buttonUrl}
            onAutomaticBackupSelect={props.onAutomaticBackupSelect}
            isAutomaticBackupEnabled={props.automaticBackup}
        >
            {props.children}
        </BackupOverlay>
    )
}

AutomaticBackup.propTypes = {
    buttonUrl: PropTypes.string,
    buttonText: PropTypes.string,
    onAutomaticBackupSelect: PropTypes.func,
    automaticBackup: PropTypes.bool,
    header: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
}

export default AutomaticBackup
