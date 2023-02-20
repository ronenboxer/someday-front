const labels = {
    Done: '$clr-jade',
    'Working on it': '$clr-orange',
    Stuck: '$clr-dark-red',
    Unattained: '$clr-dark-blue',
    _none: '$clr-explosive',
    High: '$clr-dark-indigo',
    Medium: '$clr-indigo',
    Low: '$clr-bright-blue',
    Critical: '$clr-blackish',
    Default: '$clr-explosive'
}

if (!localStorage.getItem('label')?.length) localStorage.setItem('label', JSON.stringify(labels))

export const labelTitles = JSON.parse(localStorage.getItem('label')) || labels
