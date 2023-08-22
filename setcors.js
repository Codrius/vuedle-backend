const cors = require('cors');

// Allow cross domain requests
function setCors(app) {
    const corsOptions = {
        origin: true,
        methods: "POST",
        credentials: true
    }
    app.use(cors(corsOptions))
}

module.exports = setCors;