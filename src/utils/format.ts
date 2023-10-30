import moment from 'moment-timezone'

export const formatTime = (t: string | number) => moment(t).tz('America/New_York').format('LLL')
