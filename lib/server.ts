import app from "./app";

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;
//console.log(__dirname);

app.listen(Number(port), host, () => {
   console.log('Express server listening on port ' + port);
});

app.listen()