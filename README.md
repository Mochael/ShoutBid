# ShoutBid

# Some instructions for setting up (i think only aidan is left):
* First have [Node.js](https://nodejs.org/) installed with its package manager [npm](https://www.npmjs.com/get-npm)

* Then, install the [MongoDB Community Server](https://www.mongodb.com/download-center#community) and set it up. Upon installation settings, install wherever you want. NOTE: you don't need to install MongoDB Compass but can if you want to. We will be using it later when we create a free cluster (512 MB max server when we are testing the final product).

* In your terminal, go to the mongodb directory you just installed. within the folder, run `cd bin` to go within bin folder and `net start mongodb` to start the service. It SHOULD have already started upon installation, but do this in case.

* Clone this repository to some directory. I'm assuming everyone knows how to use github, but if you don't, type in `git clone https://github.com/Mochael/ShoutBid` within your terminal to create a clone of the repository in whatever directory you were in.

* Change your current directory within the terminal by running `cd ShoutBid`. Then run `npm install` within the terminal to install dependencies correctly.

* ***also if you are installing a package for the project, PLEASE use the --save property so it can save as a dependency in your package file: `npm install --save packagename`***

* Now, you must go to our Google Drive under the folder "Mathakan Book". Inside, download the folder called `bs`. Save that within your `./public/` directory.

* You now have all the dependencies! yay, time to run the project. Run `npm start` while within the `ShoutBid` directory in your terminal to start the project. This will start the server and connect to MongoDB if the instructions were followed correctly. It will also say what port the project is being hosted on. Since we have it defaultly set to 3000, the website is hosted on `http://localhost:3000/`.

# Testing out if your database is set up correctly
* Within one window of your terminal, go to your MongoDB directory within the folder `bin`. Run the `mongo` command to access the MongoDB shell.

* Within another window of your terminal, start the project and open it on your web browser. Upon start, the message `Connected to MongoDB (shoutbid).` should have been logged into your terminal. If it throws an error, you have the [MongoDB Community Server](https://www.mongodb.com/download-center#community) incorrectly installed OR you have to run `net start mongodb` inside your MongoDB directory in the terminal to start the service.

* If the message is shown, go to the mongo shell and type `show dbs`. A database under the name `shoutbid` should have been created. Type `use shoutbid` to use that database for reference later on.

* Click the 'register' button on the top bar within the website and fill out the information appropriately.

* If it submits and you are taken back to the home page, type `show collections` within your mongo shell so it shows all collections made within your used database (in this case, `shoutbid`). It should return `users`

* Then type `db.users.find().pretty();` to display all entries within this collection in a pretty format. If your entry is there, congrats the database is set up correctly. If it is not, we can fix it later.
