okay, here's the structure for backend
backend/
│
├── authorization/
│   └── authControl.js
│
├── configs/
│   └── dbconfig.js
│
├── middleware/
│   └── authToken.js
│
├── models/
│   └── user.js
│
├── .env
├── app.js
├── package.json
├── package-lock.json
└── readmebk.MD
okay, so the authtoken.js contains the JWT stuff, generating new tokens for login request and also making them unique
the dbconfig.js => for the mongodb, where the server which is communicating the database from the server of db connected to the backend's app server, and thus, giving access to it
authControl is that stuff where you need to make auth. bearer  header in the postman and then, copy-paste the token , to unlock the profile
user.js = > containing schemna
.env => all the secret stuff
app.js=> the main executor
