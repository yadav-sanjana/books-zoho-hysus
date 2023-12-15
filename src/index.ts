import app from "../server";
import router from "./routes/routes";

const port = 3004

app.listen(port, () => {
    console.log('Server is up on port '+ port);
});


app.use('/api', router)
