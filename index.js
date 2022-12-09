const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()


const port = process.env.PORT || 5000
// introproject
// UBdvWOE7fvz1Go35
app.use(cors())
app.use(express.json())

const uri = "mongodb+srv://introproject:UBdvWOE7fvz1Go35@cluster0.kacpjvt.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {

        const userCollection = client.db("database").collection("alldata");
        // const user = {
        //     name: 'sohel',
        //     email: 'sohel@email.com'
        // }
        // const result = await userCollection.insertOne(user);
        // console.log(result);






        app.get('/users', async (req, res) => {
            const query = {}
            const curson = userCollection.find(query)
            const users = await curson.toArray()
            res.send(users)
        })

        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await userCollection.findOne(query)
            res.send(result);

        })

        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log(user);
            const result = await userCollection.insertOne(user)
            console.log(result);
            res.send(result)
        })

        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            console.log('tying to deletdd', id);
            const result = await userCollection.deleteOne(query)
            console.log(result)
            res.send(result)

        })
    }
    finally {

    }
}
run().catch(error => console.log(error))


// app.get('/users', (req, res) => {
// res.send('users:')
// })


app.get('/', (req, res) => {
    res.send('this is server site')
})
app.listen(port, () => {
    console.log(`This is terminal running in port${port}`);
})