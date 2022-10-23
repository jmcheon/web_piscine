const express = require('express');
const router = express.Router();
const fs = require('fs');
const sanitizeHtml = require('sanitize-html');
const path = require('path');
const template = require('../lib/template.js');
const auth = require('../lib/auth');


router.get('/create', (request, response) => {
    if (!auth.isOwner(request, response)) {
        response.redirect('/');
        return false;
    }
    title = 'Web - create';
    let list = template.list(request.list);
    let html = template.html(title, list, 
        `<form action="/topic/create_process" method="post">
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
        auth.statusUI(request, response));
    response.send(html);
})

router.post('/create_process', (request, response) => {
    if (!auth.isOwner(request, response)) {
        response.redirect('/');
        return false;
    }
    let post = request.body;
    let title = post.title;
    let description = post.description;
    const filteredId = path.parse(title).base;
    fs.writeFile(`data/${filteredId}`, description, 'utf-8', (err) => {
        response.redirect(`/topic/${title}`);
    })
})

router.get('/update/:pageId', (request, response) => {
    const filteredId = path.parse(request.params.pageId).base;
    fs.readFile(`data/${filteredId}`, 'utf-8', (error, data) => {
        let title = request.params.pageId;
        let list = template.list(request.list);
        let html = template.html(title, list, 
            `<form action="/topic/update_process" method="post">
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
            auth.statusUI(request, response));
        response.send(html);
    })
})

router.post('/update_process', (request, response) => {
    if (!auth.isOwner(request, response)) {
        response.redirect('/');
        return false;
    }
    let post = request.body;
    let id = post.id;
    let title = post.title;
    let description = post.description;
    const filteredOldId = path.parse(id).base;
    const filteredNewId = path.parse(title).base;
    fs.rename(`data/${filteredOldId}`, `data/${filteredNewId}`, (err) => {
        fs.writeFile(`data/${title}`, description, 'utf-8', (err) => {
            response.redirect(`/topic/${title}`);
        })
    })
})

router.post('/delete_process', (request, response) => {
    if (!auth.isOwner(request, response)) {
        response.redirect('/');
        return false;
    }
    let post = request.body;
    let id = post.id;
    const filteredId = path.parse(id).base;
    fs.unlink(`data/${filteredId}`, (err) => {
        response.redirect('/');
    })
})

router.get('/:pageId', (request, response, next) => {
    let list = template.list(request.list);
    const filteredId = path.parse(request.params.pageId).base;
    fs.readFile(`data/${filteredId}`, 'utf-8', (error, data) => {
        if (error) {
            next(error);
        } else {
            const sanitizedTitle = sanitizeHtml(request.params.pageId);
            const sanitizedData = sanitizeHtml(data);
            let html = template.html(sanitizedTitle, list, 
                `
                <h2>${sanitizedTitle}</h2>
                <p>${sanitizedData}</p>
                `,
                `
                <a href="/topic/create">create</a> 
                <a href="/topic/update/${sanitizedTitle}">update</a> 
                <form action="/topic/delete_process" method="post">
                    <input type="hidden" name="id" value="${sanitizedTitle}"/>
                    <input type="submit" value="delete"/>
                </form>
                `,
                auth.statusUI(request, response));
            response.send(html);
        }
    })
})

module.exports = router;