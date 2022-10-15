const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const path = require('path');
const sanitizeHtml = require('sanitize-html');
const template = require('./lib/template.js');
const cookie = require('cookie');
// const { report } = require('process');

const authIsOwner = (request, response) => {
    let isOwner = false;
    let cookies = {};
    if (request.headers.cookie) {
        cookies = cookie.parse(request.headers.cookie);
    }
    if (cookies.email === 'hello@gmail.com' && cookies.password === '1234abcd') {
        isOwner = true;
    }
    return (isOwner);
}

const authStatusUI = (request, response) => {
    let authStatusUI = '<a href="/login">login</a>';
    if (authIsOwner(request, response)) {
        authStatusUI = '<a href="/logout_process">logout</a>';
    }
    return (authStatusUI);
}

const app = http.createServer((request, response) => {
    const _url = request.url;
    const queryData = url.parse(_url, true).query;
    const pathName = url.parse(_url, true).pathname;
    let title = queryData.id;
  
    if(pathName == '/') {
        if (queryData.id === undefined) {
            fs.readdir('./data', (error, fileList) => {
                title = 'Welcome';
                let data = 'HTML, CSS and JavaScript';
                let list = template.list(fileList);
                let html = template.html(title, list, 
                    `<h2>${title}</h2><p>${data}</p>`,
                    `<a href="/create">create</a>`,
                    authStatusUI(request, response));
                response.writeHead(200);
                response.end(html);
            })
        } else {
            fs.readdir('./data', (error, fileList) => {
                let list = template.list(fileList);
                const filteredId = path.parse(title).base;
                fs.readFile(`data/${filteredId}`, 'utf-8', (error, data) => {
                    const sanitizedTitle = sanitizeHtml(title);
                    const sanitizedData = sanitizeHtml(data);
                    let html = template.html(sanitizedTitle, list, 
                        `<h2>${sanitizedTitle}</h2><p>${sanitizedData}</p>`,
                        `<a href="/create">create</a> 
                        <a href="/update?id=${sanitizedTitle}">update</a> 
                        <form action="delete_process" method="post">
                            <input type="hidden" name="id" value="${sanitizedTitle}"/>
                            <input type="submit" value="delete"/>
                        </form>`,
                        authStatusUI(request, response));
                    response.writeHead(200);
                    response.end(html);
                })
            })
        }     
    } else if (pathName === '/create') {
        if (authIsOwner(request, response) === false) {
            response.end('login required');
            return false;
        }
        fs.readdir('./data', (error, fileList) => {
            title = 'Web - create';
            let list = template.list(fileList);
            let html = template.html(title, list, 
                `<form action="/create_process" method="post">
                    <p>
                        <input name="title" type="text" placeholder="title"/>
                    </p>
                    <p>
                        <textarea name="description" placeholder="description"></textarea>
                    </p>
                    <p>
                        <input type="submit" />
                    </p>
                </form>
                `, ``,
                authStatusUI(request, response));
            response.writeHead(200);
            response.end(html);
        })
    } else if (pathName === '/create_process') {
        if (authIsOwner(request, response) === false) {
            response.end('login required');
            return false;
        }
        let body = '';

        request.on('data', (data) => {
            body += data;
        }).on('end', () => {
            let post = qs.parse(body);
            let title = post.title;
            let description = post.description;
            const filteredId = path.parse(title).base;
            fs.writeFile(`data/${filteredId}`, description, 'utf-8', (err) => {
                response.writeHead(302, {Location : `/?id=${title}`});
                response.end();
            })
        })
    } else if (pathName === '/update') {
        if (authIsOwner(request, response) === false) {
            response.end('login required');
            return false;
        }
        fs.readdir('./data', (error, fileList) => {
            const filteredId = path.parse(title).base;
            fs.readFile(`data/${filteredId}`, 'utf-8', (error, data) => {
                let list = template.list(fileList);
                let html = template.html(title, list, 
                    `<form action="/update_process" method="post">
                        <input type="hidden" name="id" value="${title}"/>
                        <p>
                            <input name="title" type="text" placeholder="title" value="${title}"/>
                        </p>
                        <p>
                            <textarea name="description" placeholder="description">${data}</textarea>
                        </p>
                        <p>
                            <input type="submit" />
                        </p>
                    </form>
                    `, ``,
                    authStatusUI(request, response));
                response.writeHead(200);
                response.end(html);
            })
        })
    } else if (pathName === '/update_process') {
        if (authIsOwner(request, response) === false) {
            response.end('login required');
            return false;
        }
        let body = '';

        request.on('data', (data) => {
            body += data;
        }).on('end', () => {
            let post = qs.parse(body);
            let id = post.id;
            let title = post.title;
            let description = post.description;
            const filteredOldId = path.parse(id).base;
            const filteredNewId = path.parse(title).base;
            fs.rename(`data/${filteredOldId}`, `data/${filteredNewId}`, (err) => {
                fs.writeFile(`data/${title}`, description, 'utf-8', (err) => {
                    response.writeHead(302, {Location : `/?id=${title}`});
                    response.end();
                })
            })
        })
    } else if (pathName === '/delete_process') {
        if (authIsOwner(request, response) === false) {
            response.end('login required');
            return false;
        }
        let body = '';

        request.on('data', (data) => {
            body += data;
        }).on('end', () => {
            let post = qs.parse(body);
            let id = post.id;
            const filteredId = path.parse(id).base;
            fs.unlink(`data/${filteredId}`, (err) => {
                response.writeHead(302, {Location : `/`});
                response.end();
            })
        })
    } else if (pathName === '/login') {
        if (queryData.id === undefined) {
            fs.readdir('./data', (error, fileList) => {
                let list = template.list(fileList);
                let html = template.html(title, list, 
                    `
                    <form action="/login_process" method="post">
                        <p><input type="text" name="email" placeholder="email"/></p>
                        <p><input type="password" name="password" placeholder="password"/></p>
                        <p><input type="submit"/></p>
                    </form>
                    `,
                    `<a href="/create">create</a>`);
                response.writeHead(200);
                response.end(html);
            })
        }
    } else if (pathName === '/login_process') {
        let body = '';

        request.on('data', (data) => {
            body += data;
        }).on('end', () => {
            let post = qs.parse(body);
            if (post.email === 'hello@gmail.com' && post.password === '1234abcd') {
                response.writeHead(302, 
                    {
                        'Set-Cookie':[
                            `email=${post.email}`,
                            `password=${post.password}`
                        ],
                        Location : `/`
                    });
                response.end(); 
            }
            else {
                response.end('who?')
            }
              
        })
    } else if (pathName === '/logout_process') {
        if (authIsOwner(request, response) === false) {
            response.end('login required');
            return false;
        }
        let body = '';

        request.on('data', (data) => {
            body += data;
        }).on('end', () => {
            let post = qs.parse(body);
            
            response.writeHead(302, 
                {
                    'Set-Cookie':[
                        `email=; Max-Age=0`,
                        `password=; Max-Age=0`
                    ],
                    Location : `/`
                });
            response.end();               
        })
    } else {
        response.writeHead(404);
        response.end('Not found');
    }
});
app.listen(3000);