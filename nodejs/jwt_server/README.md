# jwt_server 

Functionalities:

	1. login by jwt 

	2. register + password hash(crypto)

	3. admin login permission : get user list

	4. no interface, access by postman


Implementation:

	express + jsonwebtoken + mongodb


API:
	/api/auth/register

	/api/auth/login

	/api/auth/check

	/api/user/assign-admin/:username

	/api/user/list
