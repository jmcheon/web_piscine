module.exports = {
    html : (title, list, body, control) => {
        return (`<!doctype html>
        <html>
            <head>
                <title>Express server - ${title}</title>
                <meta charset="utf-8">
            </head>
            <body>
                <h1><a href="/">Express server</a></h1>
                ${list}
                ${control}
                ${body}
            </body>
        </html>`);
    },
    list : (fileList) => {
        let list = '<ul>';

        for (let i = 0; i < fileList.length; i++) {
            list += `<li><a href="/topic/${fileList[i]}">${fileList[i]}</a></li>`;
        }
        list += '</ul>';
        return (list);
    },
}