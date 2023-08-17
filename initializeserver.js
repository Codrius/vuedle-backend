function initializeServer(app, PORT) {
    app.listen(PORT, (error) => {
        if (error) { console.log(`Server unable to start: ${error}`); }
        else { console.log(`Server running on port ${PORT}`); }
    });
}

module.exports = initializeServer;