import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from 'mongoose';
import { TestRoutes } from "./routes/user_routes";
import { CommonRoutes } from "./routes/common_routes";
import { AsesorRotes } from "./routes/asesor_routes";
import controller from './controller/Controller'


require('dotenv').config({path: 'variables.env'});
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');

declare module "express-session" {
   interface Session {
     user: String;
     //loggedIn:Boolean;
   }
 }

class App {

   public app: express.Application;
   private test_routes: TestRoutes = new TestRoutes();
   private common_routes: CommonRoutes = new CommonRoutes();
   private asesor_routes: AsesorRotes = new AsesorRotes();

   constructor() {
      this.app = express();
      //this.app.use(express.static(path.resolve(__dirname+'../../view')));
      this.app.use(express.static(path.resolve(__dirname+'../..')));
      this.app.use(express.static(path.resolve(__dirname+'../../lib/view')));
      this.app.use(express.static(path.resolve(__dirname+'../../lib/view/HTML')));
      this.app.use(cookieParser());
      this.app.use(session({
         key: 'user_sid',
         secret: 'somerandonstuffs',
         resave: false,
         saveUninitialized: false,
         cookie: {
             expires: 600000
         }
     }));
      this.app.engine('html', require('ejs').renderFile);
      this.config();
      this.mongoSetup();
      this.test_routes.route(this.app);
      this.common_routes.route(this.app);
      this.asesor_routes.route(this.app);
   }

   private config(): void {
      // support application/json type post data
      this.app.use(express.json());
      //support application/x-www-form-urlencoded post data
      this.app.use(bodyParser.urlencoded({ extended: false }));
   }

   private mongoSetup(): void {
      console.log("DB_URL: "+process.env.DB_URL);
      mongoose.connect("mongodb+srv://root:root@cluster0.batrc.mongodb.net/organization?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
      .then(db => console.log('db connected')).catch(err => console.log(err)); //useFindAndModify: false
   }

}
export default new App().app;