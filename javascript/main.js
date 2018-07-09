(function() {

    if (!window.localStorage.getItem('markdown') || !window.localStorage.getItem('markdown').replace(/\s/g, '')) {
        window.localStorage.setItem('markdown', '# Your markdown _here_')
    } 

    const myCodeMirror = CodeMirror(document.querySelector('.js-input'), {
        value: window.localStorage.getItem('markdown'),
        mode:  "javascript",
        lineWrapping: true,
        //lineNumbers: true,
        keyMap: 'vim',
        theme: 'the-matrix'

    });

    if (myCodeMirror) {
        CodeMirror.Vim.map('kj', '<Esc>', 'insert') // to use kj as <Esc> also 

        hljs.initHighlightingOnLoad();

        if (window.localStorage.getItem('markdown')) {
            myCodeMirror.value = window.localStorage.getItem('markdown');
            document.querySelector('.js-content').innerHTML = marked(window.localStorage.getItem('markdown'));
        }
        else {
            document.querySelector('.js-content').innerHTML = myCodeMirror.getValue(); 
        }
        document.querySelector('.CodeMirror').addEventListener('keyup', event => {
            const transformed = marked(myCodeMirror.getValue());
            document.querySelector('.js-content').innerHTML = transformed;
            for (let i = 0; i < document.getElementsByTagName('code').length; i++) {
                hljs.highlightBlock(document.getElementsByTagName('code')[i]);
            }
            setTimeout(() => {
                document.querySelector('.js-content').parentElement.parentElement.scrollTop = 10000000;
            }, 250)
            window.localStorage.setItem('markdown', myCodeMirror.getValue());
        });
    }

})();
