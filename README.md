*I will be building a minimalistic Log application using the awesome NodeJs framework,
HapiJs, developed by Walmart Labs.*

*With this app you will be able to take note of your progress,
by creating logs of your daily performance in whichever area you wish.*

*This app will start-off small and simple, allowing you to create new logs,
delete logs, view and update existing logs.*

**So please take into consideration that this is a work-in-progress!**

---

##To Do :

- [x] Design Layout
- [x] Implement RDD (Readme Driven Developement)
- [ ] Begin coding with tests (This is always best practice!)
- [ ] Define function do add person to database (2nd iteration)
- [x] Define function to add exercise to database
- [ ] Define function to add exercises per user to database (2nd iteration)
- [x] Define function to retrieve user's workouts by exercise and returns date, muscle group and sets
- [ ] Validation for exercises
- [ ] Validation for user (2nd iteration)
- [ ] Authentication (2nd iteration)
- [x] Choose Database (Couchbase)
- [x] Implement Database
- [ ] Define Views using Handlebars for response of successful post and retrieval from database
- [ ] Implement Views
- [ ] UI
- [ ] Test everything works
- [ ] Deploy App to Heroku


---

##Why Hapi?

####For the following reasons:
* It is easy to implement (although there are not many working examples yet);
* It allows for a large amount of concurrent connections without forsaking performance levels(Walmart launched it on *Black Friday*) http://en.wikipedia.org/wiki/Black_Friday_(shopping)
* Has great documentation https://github.com/spumko/hapi
* Allows object schema validation with Joi https://github.com/spumko/joi
* Easy to test with Lab https://github.com/spumko/lab

It could have been easier to use [express](http://expressjs.com/), mainly because there are a lot more examples to follow, but what would be the fun in that right?

---

##Which Database?

Because Hapi is so recent, my major challenge was to select a database.

- [ ] Apache CouchDb - http://couchdb.apache.org/
- [ ] CouchBase - http://www.couchbase.com/wiki/display/couchbase/Home
- [ ] MongoDb - http://www.mongodb.org/

Performance wise, there is no major issue with any of these databases. This is not intended to be a big app with thousands of users.

---

###CouchDb

So bearing that in mind I started with *CouchDb*, but found I had trouble with connecting to the dabase while using tha HapiJs framework. Like I said there aren't that many examples to follow.
The documentation also seems to be presented in a not too friendly fashion. You might find it to be fine, but not for me.
I also found that I had trouble using or finding frameworks available to connect to CouchDb.

* See *ChouchDb* Vs *CouchBase* (http://www.couchbase.com/couchbase-vs-couchdb)

####I dumped *ChouchDb* and tried *CouchBase*.

---

###CouchBase

My first warning, is that after you install *CouchBase* from the website(http://www.couchbase.com/), you should always install the 'Developer Preview' as show in this tutorial (https://github.com/nelsonic/time):

```
npm install couchbase@2.0.0-dp1 --save
```
>When you proceed with the setup in the Admin Web Console, I would suggest that you avoid setting your username as **Admin**. I ran in to an issue before where I could not sign-in to my Web Console after loggin out and had set username to Admin. I had to completely remove CouchBase form my Mac and re-install it and then set my username to something other than **Admin** and it is now working fine! I do not know if it there was some sort of conflict with a probable default username **Admin** or **Administrator**.

The documentation for *CouchBase* is easy to follow and there are many examples.
If you need an example reference using *couchBase* with *Hapi*, go to https://github.com/nelsonic/time

I ended up dumping *CouchBase* from my dependencies for no specific reason in particular other than learning MongoDb could be a major advantage at this time, for Mongo is currently one of the most popular databases in use.
But I might re-implement it.

For additional information on setting-up *ChouchBase* on a Mac, go to https://github.com/couchbaselabs/docs-ng/blob/master/content/couchbase-manual-2.0/installing-and-upgrading.markdown#mac-os-x-installation

Also see: http://docs.couchbase.com/couchbase-devguide-2.5/#introduction-to-couchbase

For understanding views : http://docs.couchbase.com/couchbase-devguide-2.5/#finding-data-with-views

Another simple tutorial using Node.js and Couchbase: http://tugdualgrall.blogspot.co.uk/2013/03/easy-application-development-with.html

For the Node.js Api, list of methods: http://www.couchbase.com/autodocs/couchbase-node-client-1.0.0-beta/Connection.html

For a tutorial using CouchBase, Node and Angular - https://www.youtube.com/watch?v=Ynr8E5Rf1aA

---

###MongoDb

The documentation for *MongoDb* is very clear and well organised.
There are lots of examples to follow.

http://www.mongodb.org/

*I found it tricky to use mongoose directly with Hapi.*

*Once a connection opens, a callback will be called. For brevity, let's assume that all following code is within this callback.*

http://mongoosejs.com/docs/index.html
```
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // yay!
});
```
*I have not yet found a solution to this.*

I seem to have found an alternative with the *mongoose-simpledb* module.

See this video to "learn" how to connect to *MongoDb* while using **Hapi.js**(The framework used in the video is **express**, but the usage of the connection instance is the same):
* https://www.youtube.com/watch?v=CIPbmPUKyMI

The module used in this video (*mongoose-simpledb*) can be found at: https://www.npmjs.org/package/mongoose-simpledb

## Steps

>These steps are based on the building of this application

- Start by researching which tools you will be using (frameworks, database, dependencies)

- Structure your project folder layout as best as possible based on what you want to accomplish.

- Use modularity for clearer coding practices.

- Create package.json for your project.

- Create a file that will contain your main server. Write your server logic.

- And test it!

- Create a file that will contain routing functionality and export it so that your server can require it.

- Test it!

- Write your mapping function for your database. This will define how your request to the database will output the data.

- In your router file manipulate the response from the database as to fit your requirements to expose to the end-user.

- Test it!

- Once you feel your server-side logic is complete, move on to the client-side functionality.

- Define the templates for your html files and templates that you will apply on the server side.

- Apply client-side Javascript. This project uses the jQuery library.

- Apply CSS.

- Test everything!

- Deploy first iteration to Heroku.

- Start work on second iteration!
