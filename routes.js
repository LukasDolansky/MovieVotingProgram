var faker = require("faker");

var appRouter = function (app) {



  app.get("/", function (req, res) {
    res.status(200).send({ message: 'Welcome to our restful API' });
  });


  app.get("/test/:input", function (req, res) {
  
    var genre = req.params.input;
    
    const Catagories = [`Drama`,`Action`,`Spoopy`,`Romance`,`Adventure`,`Mystery`];
    //i know its only 6, but if 6 can work then 20 can work
    var j = -1;
    var i = 0;
    var l = 0;
    while(i<6){
      if(genre == Catagories[i]){// comparing input to catagories to see if legit input
        j = i;
      }
      i++;
    }
    if (j == -1){
      l=1;
      j=1;
    }
    let tings = Catagories[j];

    const stats = [[`1`,`2`,`3`,`4`],
                    [`5`,`6`,`7`,`8`],      //votes for the movies
                    [`9`,`10`,`9`,`8`],
                    [`7`,`6`,`5`,`4`],
                    [`3`,`2`,`1`,`2`],
                    [`3`,`4`,`5`,`6`],
                    ];
    const movies = [[`Squidward secret`,`The Tearful Sponge`,`Fallen Star`,`Pearls Peril`],
                    [`The Squiddening`,`Explosive Sponde the Prequel`,`The Ninja Star`,`A whale of a good time`],
                    [`Squid Ghost`,`Spngebobs Mansion`,`The Disapearing Star`,`Whale`],
                    [`50 shades of squid`, `A lovey dovey spongey`, `The shooting star`, `A squirrel goes nuts`],
                    ['The octi-tomb', `The pineapple crown`,`The golden stone`,` The secret of bikini bottom`],
                    ['The squids secret',`The sponges pickle`, `A wish upon a star`, `The disipearance of barnicle boy`]];
    
// The movies themselves ^^
    const myStats = [` `,` `,` `,` `];
    const myMovies = [` `,` `,` `,` `];//empty array for filling of relavent data
    
    i = 0;
    while(i<7){
      myStats[i] = stats[j][i]; //fills array with correct information
      myMovies[i] = movies[j][i];
      i++; 
    }
    if(l == 0){
    var data = ({
      Catagory : tings,
      First : myMovies[1]+','+myStats[1],
      Second : myMovies[2]+','+myStats[2],
      Third : myMovies[3]+','+myStats[3],//output
      Fourth : myMovies[0]+','+myStats[0]
    
    });
    res.status(200).send(data);
  }else {
    res.status(400).send({ message: 'not a genre fam' });// if you gave a genre or award that isnt in the array
  }
  });






//nonsense\/\/\/\/



app.post('/emoji/:id', (req,res) =>{
  const {id} = req.params;
  const {symbol} = req.body;////////////unfinished
  if (!symbol){
    res.status(418).send({message :'We need a symbol!'})
  }

  res.send({
    emoji: `your emoji with ${symbol} and ID of ${id}`
  })
})



  app.get("/user", function (req, res) {
    var data = ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      username: faker.internet.userName(),
      email: faker.internet.email()
    });
    res.status(200).send(data);
  });

 app.get("/users/:num", function (req, res) {
   var users = [];
   var num = req.params.num;

   if (isFinite(num) && num  > 0 ) {
     for (i = 0; i <= num-1; i++) {
       users.push({
           firstName: faker.name.firstName(),
           lastName: faker.name.lastName(),
           username: faker.internet.userName(),
           email: faker.internet.email()
        });
     }

     res.status(200).send(users);
    
   } else {
     res.status(400).send({ message: 'invalid number supplied' });
   }

 });
}

module.exports = appRouter;