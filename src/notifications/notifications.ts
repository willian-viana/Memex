// Use these keys in case of action buttons, import the keys in the storage-keys-notif module
import * as actionTypes from './action-types'

import { NotifDefinition } from './types'

/** Time when create the notif, get the current unix time (Date.now()) - Important, the notif insertation in db depends on it */
const releaseTime: number = 1559735977587

/* Example Notification:
{
        id: 'direct_links_inital_notification',
        search: {
            title: 'New Feature: Memex.Link',
            message:
                'Test Message',
            buttons: [
                {
                    action: {
                        type: actionTypes.OPEN_URL,
                        url: 'https://worldbrain.io',
                        context: 'new-tab',
                    },
                    label: 'Learn More',
                },
            ],
        },
        system: {
            title: 'New Feature: Memex.Link',
            message:
                'Test Message',
            buttons: [
                {
                    action: {
                        type: actionTypes.OPEN_URL,
                        url: 'https://worldbrain.io',
                        context: 'new-tab',
                    },
                    label: 'Learn More',
                },
            ],
        },
        overview: {
            title: 'New Feature: Memex.Link',
            message:
                'Test Message',
            buttons: [
                {
                    action: {
                        type: actionTypes.OPEN_URL,
                        url: 'https://worldbrain.io',
                        context: 'new-tab',
                    },
                    label: 'Learn More',
                },
            ],
        },
    },
*/

const UPDATE_NOTIFS: NotifDefinition[] = [
    {
        id: 'twitter_integration-05.06.2019',
        search: {
            title: '🐦 New Feature: Archive, search & add notes to Tweets',
            message:
                'Save any tweet with one click to your Memex, and add tags, collections, notes or stars',
            buttons: [
                {
                    action: {
                        type: actionTypes.OPEN_URL,
                        url:
                            'https://www.notion.so/worldbrain/01ab6888f7ae4eb8815f09a8911990d8',
                        context: 'new-tab',
                    },
                    label: 'Find out more',
                },
            ],
        },
        overview: {
            title: '🐦 New Feature: Archive, search & add notes to Tweets',
            message:
                'Save any tweet with one click to your Memex, and add tags, collections, notes or stars',
            buttons: [
                {
                    action: {
                        type: actionTypes.OPEN_URL,
                        url:
                            'https://www.notion.so/worldbrain/01ab6888f7ae4eb8815f09a8911990d8',
                        context: 'new-tab',
                    },
                    label: 'Find out more',
                },
            ],
        },
    },
]

interface EventNotifsDict {
    [name: string]: NotifDefinition
}

const EVENT_NOTIFS: EventNotifsDict = {
    db_error: {
        id: 'db_error',
        overview: {
            title: 'Database errors encountered.',
            message:
                'Your memex may be functioning unexpectedly due to issues with your database. It may be low on space.',
        },
    },
    quota_warning: {
        id: 'quota_warning',
        system: {
            title: '⚠️ Low storage space',
            message: 'Data might be deleted. Click to backup & free up space.',
            buttons: [
                {
                    action: {
                        type: actionTypes.OPEN_URL,
                        url: '/options.html#/overview?showInbox=true',
                        context: 'self',
                    },
                    label: 'Learn more',
                },
            ],
        },
        overview: {
            title:
                "⚠️ You're almost out of storage space. Your browser may delete Memex data",
            message:
                'Due to the browsers policy to evict local storage when space gets low it might happen that your Memex data gets deleted. Free up disk space and make sure to backup your data for the worst case',
            buttons: [
                {
                    action: {
                        type: actionTypes.OPEN_URL,
                        url: '/options.html#/backup',
                        context: 'self',
                    },
                    label: 'Backup Now',
                },
            ],
        },
        search: {
            title:
                "⚠️ You're almost out of storage space. Your browser may delete Memex data",
            message:
                'Due to the browsers policy to evict local storage on low disc space it might happen that your Memex data gets deleted. Free up disk space and make sure to backup your data for the worst case',
            buttons: [
                {
                    action: {
                        type: actionTypes.OPEN_URL,
                        url:
                            'https://www.notion.so/worldbrain/2318f14ceeb741d6b7aa6c0ff00cb607',
                        context: 'new-tab',
                    },
                    label: 'Find out more',
                },
            ],
        },
    },
    backup_error: {
        id: 'backup_error',
        system: {
            title: 'Error backing up data.',
            message: 'Please check your internet connectivity',
            buttons: [
                {
                    action: {
                        type: actionTypes.OPEN_URL,
                        url: '/options.html#/overview?showInbox=true',
                        context: 'self',
                    },
                    label: 'Backup Now',
                },
            ],
        },
        overview: {
            title: 'Backup Error due to poor internet connectivity.',
            message: `Please make sure that you have an internet connection
                for a successful backup.`,
            buttons: [
                {
                    action: {
                        type: actionTypes.OPEN_URL,
                        url: '/options.html#/backup',
                        context: 'self',
                    },
                    label: 'Retry',
                },
            ],
        },
    },
    drive_size_empty: {
        id: 'drive_size_empty',
        system: {
            title: 'Drive Size',
            message: 'There seems to be no space in your Google Drive',
            buttons: [
                {
                    action: {
                        type: actionTypes.OPEN_URL,
                        url: '/options.html#/overview?showInbox=true',
                    },
                    label: 'Retry',
                },
            ],
        },
        overview: {
            title: 'No Drive Size Available',
            message: `There is no space available in your Google Drive.
                Please clear some space in your drive to be able to successfully
                backup your future data.`,
            buttons: [
                {
                    action: {
                        type: actionTypes.OPEN_URL,
                        url: 'https://drive.google.com',
                    },
                    label: 'Go to Google Drive',
                },
            ],
        },
    },
    auto_backup_expired: {
        id: 'auto_backup_expired',
        system: {
            title: 'Auto Backup',
            message: 'Your Auto Backup subscription has expired.',
            buttons: [
                {
                    action: {
                        type: actionTypes.OPEN_URL,
                        url: 'https://worldbrain.io/pricing',
                        context: 'self',
                    },
                    label: 'Renew Subscription',
                },
            ],
        },
        overview: {
            title: 'Auto Backup Subscription',
            message: `Your Auto Backup subscription has expired. If you want to
                renew your subscription click on the button below.`,
            buttons: [
                {
                    action: {
                        type: actionTypes.OPEN_URL,
                        url: 'https://worldbrain.io/pricing',
                        context: 'self',
                    },
                    label: 'Renew Subscription',
                },
            ],
        },
    },
}

export { releaseTime, EVENT_NOTIFS, UPDATE_NOTIFS }
