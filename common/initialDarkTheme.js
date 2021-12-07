// to be added right after <body> tag

if (eval(localStorage.getItem('isDarkTheme'))) { // if dark theme
    document.getElementsByTagName('body')[0].classList.add('dark');
}