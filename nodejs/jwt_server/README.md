# jwt_server


Set up:

        1. create a file config.js from config.sample.js

        2. add needed information for mongodb(hash algo, mongodb uri)

Features:

        1. login by jwt 

        2. register + password hash(crypto)

        3. admin login permission : get user list

        4. no user interface


Implementation:

        express + jsonwebtoken + mongodb


API:

        {
                "username":"",
                "password":""
        }
        
        
        1. register: POST /api/auth/register

        2. login: POST /api/auth/login


        needed header info: x-access-token:token

        1. check user: GET /api/auth/check 

        2. check admin: POST /api/user/assign-admin/:username

        3. get user list: GET /api/user/list

