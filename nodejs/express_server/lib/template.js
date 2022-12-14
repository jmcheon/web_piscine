module.exports = {
  html: (
    title,
    list,
    body,
    control,
    authStatusUI = '<a href="/auth/login">login</a> | <a href="/auth/register">register</a>'
  ) => {
    return `<!doctype html>
        <html>
            <head>
                <title>Express server - ${title}</title>
                <meta charset="utf-8">
            </head>
            <body>
                ${authStatusUI}
                <h1><a href="/">Express server</a></h1>
                ${list}
                ${control}
                ${body}
            </body>
        </html>`;
  },
  list: (fileList) => {
    let list = "<ul>";

    for (let i = 0; i < fileList.length; i++) {
      list += `<li><a href="/topic/${fileList[i].id}">${fileList[i].title}</a></li>`;
    }
    list += "</ul>";
    return list;
  },
};
