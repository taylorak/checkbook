# Checkbook

A vulnerable web app for demonstrating poor coding habits. Do not expose this to the web.

## Dependencies

Install the following before moving on to Installation.

- [Node.js](http://nodejs.org/)
- [SQLite](https://www.sqlite.org/)

## Installation

Download the [zip file](https://github.com/taylorak/checkbook/archive/master.zip) or clone the repository and change into the project directory.
```
$ git clone https://github.com/taylorak/checkbook.git
Cloning into 'checkbook'...
remote: Counting objects: 29, done.
remote: Compressing objects: 100% (23/23), done.
remote: Total 29 (delta 1), reused 29 (delta 1)
Unpacking objects: 100% (29/29), done.
Checking connectivity... done.
$ cd checkbook
```  

Install all the modules used by project by using `npm install`  

Create the database that will hold all the user and checkbook information. There should already be a script in the db/ directory that will do the work for you. Run it by executing this command:
```
$ cd db
$ sqlite3 sqlite.db < create.db
```

From the root of the project directory run `./bin/www`, this will start the web server listening on port 3000 of localhost.

