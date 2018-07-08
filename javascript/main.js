(function() {
    
    const myCodeMirror = CodeMirror(document.querySelector('.book-col--40'), {
        value: window.localStorage.getItem('data'),
        mode:  "javascript",
        //lineNumbers: true,
        keyMap: 'vim'

    });

    console.log(myCodeMirror.getValue() )

    CodeMirror.Vim.map('kj', '<Esc>', 'insert') // comment out if you want to use normal <Esc> key to exit insert mode

    if (myCodeMirror) {
        hljs.initHighlightingOnLoad();
        if (window.localStorage.getItem('data')) {
            myCodeMirror.value = window.localStorage.getItem('data');
            document.querySelector('.js-content').innerHTML = marked(window.localStorage.getItem('data'));
        }
        else {
            document.querySelector('.js-content').innerHTML = myCodeMirror.getValue(); 
        }
        document.querySelector('.CodeMirror-code').addEventListener('keyup', event => {
            const val = event.target.value;
            const transformed = marked(val);
            document.querySelector('.js-content').innerHTML = transformed;
            for (let i = 0; i < document.getElementsByTagName('code').length; i++) {
                hljs.highlightBlock(document.getElementsByTagName('code')[i]);
            }
            setTimeout(() => {
                document.querySelector('.js-content').parentElement.scrollTop = 10000000;
            }, 250)
            window.localStorage.setItem('data', val);
        });
    }

    // const vim = new VIM();

    // vim.attach_to(document.querySelector('.js-input'));
    // document.querySelector('.CodeMirror-code').focus();


})();
