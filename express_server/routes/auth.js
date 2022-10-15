const express = require('express');
const router = express.Router();
const fs = require('fs');
const sanitizeHtml = require('sanitize-html');
const path = require('path');
const template = require('../lib/template.js');
const session = require('express-session');

const authData = {
    email:'hello@gmail.com',
    password:'1234abcd',
    nickname:'hello',
}

router.get('/login', (request, response) => {
    title = 'Web - login';
    let list = template.list(request.list);
    let html = template.html(title, list, 
        `<form action="/auth/login_process" method="post">
            <p>
                <input name="email" type="text" placeholder="email"/>
            </p>
            <p>
                <input name="password" type="password" placeholder="password"/>
            </p>
            <p>
                <input type="submit" value="login"/>
            </p>
        </form>
        `, ``);
    response.send(html);
})

router.post('/login_process', (request, response) => {
    let post = request.body;
    let email = post.email;
    let password = post.password;
    console.log(email, password)

    if (email === authData.email && password === authData.password) {
        request.session.is_logined = true;
        request.session.nickname = authData.nickname;
        request.session.save(() => {
            response.redirect(`/`);
        })
    } else {
        response.send('who')
    }
})

router.get('/logout', (request, response) => {
    request.session.destroy((error) => {
        response.redirect('/');
    })
})

module.exports = router;