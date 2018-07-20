(function() {
    const md = `
# Hello, World.
------
First off *why* did I build this when their are so many other markdown editors out there?...
__Vim__ ftw that's why! And no other markdown editors out there have my must have vim keymapping \`imap kj <Esc>\`
now without further ado
Here is a list of the stuff you can do in markdown.

## First the easy stuff

* Lists!
* in bullet
* form

### Also...

1. numbered lists!
2. in numerical
3. form

#### And then there was this

1. Numerical bullets
    * with sub bullets

##### link all the things

[Links!](http://www.google.com) Links to all sorts of stuff

###### And finally

![Friendly, non-threatening image of a brown bear](https://media.giphy.com/media/c9ndlj2AUhaqk/giphy.gif)

But also don't forget...

\`\`\`\javascript
(function() {
    return Math.floor(Math.random() * 100);
})();
\`\`\`\

Also this

\`\`\`html
<!doctype html>
<html lang="en-us">
    <head>
        <title>My Website</title>
    </head>
    <body></body>
</html>
\`\`\`

And one of my personal favorites __tables__

Simple | Markdown | Table
--- | --- | ---
*looks* | \`pretty\` | **good**
    1 | 2 | 3

And so on so forth.

Happy writing in **VIM** mwahahaha!
    `;

    if (!window.localStorage.getItem('markdown') || !window.localStorage.getItem('markdown').replace(/\s/g, '')) {
        window.localStorage.setItem('markdown', md)
    } 

    const editor = CodeMirror(document.querySelector('.js-input'), {
        value: window.localStorage.getItem('markdown'),
        mode:  "javascript",
        lineWrapping: true,
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
            window.localStorage.setItem('markdown', editor.getValue());
        });

        document.querySelector('.CodeMirror-vscrollbar').addEventListener('scroll', event => {
            setTimeout(() => {
                if ( document.querySelector('.js-content').parentElement.parentElement.scrollHeight - editor.getScrollInfo().top <= 1000 ) {
                    document.querySelector('.js-content').parentElement.parentElement.scrollTop = 1000000;
                }
                else {
                    document.querySelector('.js-content').parentElement.parentElement.scrollTop = editor.getScrollInfo().top;
                }
            }, 250)
        });
    }

    document.querySelector('.js-copy').addEventListener('click', event => {
        const textarea = document.createElement('textarea');
        textarea.innerHTML = window.localStorage.getItem('markdown');
        const textToCopy = document.querySelector('textarea');
        document.querySelector('.js-input').appendChild(textarea);
        textarea.focus();
        textarea.select();

        try {
            document.execCommand('copy');
        }
        catch (err) {
            alert('Copy not supported');
        }
        finally {
            document.querySelector('.js-input').removeChild(textarea);
        }
    });

})();
