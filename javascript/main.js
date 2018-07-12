(function() {

    if (!window.localStorage.getItem('markdown') || !window.localStorage.getItem('markdown').replace(/\s/g, '')) {
        window.localStorage.setItem('markdown', '# Your markdown _here_')
    } 

    const editor = CodeMirror(document.querySelector('.js-input'), {
        value: window.localStorage.getItem('markdown'),
        mode:  "javascript",
        lineWrapping: true,
        //lineNumbers: true,
        keyMap: 'vim',
        theme: 'the-matrix'
    });

    if (editor) {
        CodeMirror.Vim.map('kj', '<Esc>', 'insert') // to use kj as <Esc> also 

        hljs.initHighlightingOnLoad();

        if (window.localStorage.getItem('markdown')) {
            editor.value = window.localStorage.getItem('markdown');
            document.querySelector('.js-content').innerHTML = marked(window.localStorage.getItem('markdown'));
        }
        else {
            document.querySelector('.js-content').innerHTML = editor.getValue(); 
        }
        document.querySelector('.js-input').addEventListener('keyup', event => {
            const transformed = marked(editor.getValue());
            document.querySelector('.js-content').innerHTML = transformed;
            for (let i = 0; i < document.getElementsByTagName('code').length; i++) {
                hljs.highlightBlock(document.getElementsByTagName('code')[i]);
            }
            setTimeout(() => {
                if (editor.getCursor().line === editor.lineCount() -1) {
                    document.querySelector('.js-content').parentElement.parentElement.scrollTop = 1000000;
                }
                else {
                    document.querySelector('.js-content').parentElement.parentElement.scrollTop = editor.getCursor().line * 20;
                }
            }, 250)
            window.localStorage.setItem('markdown', editor.getValue());
        });
    }

    document.querySelector('.js-copy').addEventListener('click', event => {
        const textarea = document.createElement('textarea');
        textarea.innerHTML = window.localStorage.getItem('markdown');
        const successful = document.execCommand('copy'); 
        const textToCopy = document.querySelector('textarea');
        document.querySelector('.js-input').appendChild(textarea);
        textarea.focus();
        textarea.select();

        try {
            const successful = document.execCommand('copy'); 
        }
        catch (err) {
            alert('Copy not supported');
        }
        finally {
            document.querySelector('.js-input').removeChild(textarea);
        }
    });

    document.querySelector('.js-export').addEventListener('click', event => {
        window.open('about:blank', '_blank');
    });

})();
