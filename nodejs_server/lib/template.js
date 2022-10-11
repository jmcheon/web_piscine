module.exports = {
    html : (title, list, body, control) => {
        return (`<!doctype html>
        <html>
            <head>
                <title>Node.js server - ${title}</title>
                <meta charset="utf-8">
            </head>
            <body>
                <h1><a href="/">Node.js server</a></h1>
                ${list}
                ${control}
                ${body}
            </body>
        </html>`);
    },
    list : (fileList) => {
        let list = '<ul>';

        for (let i = 0; i < fileList.length; i++) {
            list += `<li><a href="/?id=${fileList[i]}">${fileList[i]}</a></li>`;
        }
        list += '</ul>';
        return (list);
    },
}