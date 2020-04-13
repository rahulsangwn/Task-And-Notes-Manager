const sequelize = require('sequelize');

const db = new sequelize({
    dialect: 'sqlite',
    storage: __dirname + '/data.db'
});

const Tasks = db.define('Task', {
    Id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Title: {
        type: sequelize.STRING(50),
        allowNull: false
    },
    Description: {
        type: sequelize.STRING(500)
    },
    DueDate: {
        type: sequelize.DATE,
        allowNull: false
    },
    Priority: {
        type: sequelize.STRING(10),
        defaultValue: "Medium"
    },
    State: {
        type: sequelize.STRING(10),
        defaultValue: "Incomplete"
    }
    //timestamps: false
});

const Notes = db.define('Note', {
    NotesId: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Body: {
        type: sequelize.STRING(1000),
        allowNull: false
    },
    TaskId: {
        type: sequelize.INTEGER
    }
})

const Seed2 = async function Note() {
    await db.sync()
    await Notes.create({
        Body: "Purchase full creame milk",
        TaskId: 1
    })
}

const Seed = async function Task() {
    //await db.sync({alter: true}) // pass alter: true after changes
    await db.sync()
    await Tasks.create({
        Title: "Puchase Milk",
        Description: "Go to market and bring some milk",
        DueDate: "05/01/2021",
        Status: "Incomplete",
        Priority: "Low"
    })
    await Tasks.create({
        Title: "Lucifer Watching",
        Description: "Watch the TV show Lucifer",
        DueDate: "05/06/2020",
        Status: "Incomplete",
        Priority: "Medium"
    })
}

db.authenticate() // Just check for db connection
    .then(() => {
        console.log("Connected to database...")
    })
    .catch((error) => {
        console.error("Unable to connect to database: ", error)
    })

    //Seed()  // For data initializiation in database

module.exports = {
    db, Tasks, Notes
}

