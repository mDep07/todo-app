export interface Theme {
    body: string,
    text: string,
    toggleBorder: string,
    background: string,
    cardBgColor: string,
    shadow: string;
}

export const lightTheme: Theme = {
    body: '#FFF',
    text: '#363537',
    toggleBorder: '#FFF',
    background: '#363537',
    cardBgColor: '#fafafa',
    shadow: '0 2px 3px #e6e6e6',
}
export const darkTheme: Theme = {
    body: '#141414',
    text: '#FAFAFA',
    toggleBorder: '#6B8096',
    background: '#999',
    cardBgColor: '#1b1b1b',
    shadow: '0 2px 3px #0a0a0a',
}