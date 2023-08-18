const cors = require('cors');

// Allow my locally hosted front end to make post requests to my API
function setCors(app) {
    const corsOptions = {
        origin: true,
        methods: "POST",
        credentials: true
    }
    app.use(cors(corsOptions))
}

module.exports = setCors;