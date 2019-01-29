app.get("/detect/lineup/2", async (req: Request, res: Response) => {
  const vision = require("@google-cloud/vision");
  const client = new vision.ImageAnnotatorClient({
    keyFilename: "./creds/FantasyDownFinal-calebfoster.json"
  });
  const players = require("./import-to-firestore2.json");

  const fileName = __dirname + "/../public/images/lineup22.jpg";
  client
    .textDetection(fileName)
    .then(async (results: any) => {
      const detections = results[0].textAnnotations;
      const texts: object[] = [];
      detections.forEach((text: any) => {
        //console.log(text);
        const description = text.description;
        const lines = description.split("\n");
        texts.push(...lines);
      });
      var last = [];
      var searchField = "firstInitial";
      for (var t = 0; t < 503; t++) {
        var searchVal = texts[t];
        for (var i = 0; i < players.names.length; i++) {
          if (players.names[i][searchField] == searchVal) {
            //console.log(texts[t] + " : This player :" + t);
            last.push(players.names[i]);
          }
        }
      }

      var firstInitialNameArray = [];
      var lastNameArray = [];
      var positionArray = [];

      var previousString = [];
      var lastLast = [];
      var searchFieldLast = "last";
      for (var t = 0; t < 503; t++) {
        //Iguodala, Ilyasova, Ingles, Ingram, Irving, Isaac, Iwundi
        if (texts[t] == "lguodala") {
          texts[t] = "Iguodala";
        }
        if (texts[t] == "Russel") {
          texts[t] = "Russell";
        }
        if (texts[t] == "llyasova") {
          texts[t] = "Ilyasova";
        }
        if (texts[t] == "lngles") {
          texts[t] = "Ingles";
        }
        if (texts[t] == "lngram") {
          texts[t] = "Ingram";
        }
        if (texts[t] == "lrving") {
          texts[t] = "Irving";
        }
        if (texts[t] == "lsaac") {
          texts[t] = "Isaac";
        }
        if (texts[t] == "lwundi") {
          texts[t] = "Iwundi";
        }
        if (texts[t] == "Bal") {
          texts[t] = "Ball";
        }
        if (texts[t] == "lbaka") {
          texts[t] = "Ibaka";
        }
        if (texts[t] == "Jacksorn") {
          texts[t] = "Jackson";
        }
        if (texts[t] == "DeRozar") {
          texts[t] = "DeRozan";
        }
        if (
          (texts[t] == "Hernan") |
          (texts[t] == "Hernang") |
          (texts[t] == "Hernangó") |
          (texts[t] == "Hernangóm") |
          (texts[t] == "Hernangóme") |
          (texts[t] == "Hernangómes") |
          (texts[t] == "Hernango") |
          (texts[t] == "Hernangom") |
          (texts[t] == "Hernangome")
        ) {
          texts[t] = "Hernangomez";
        }
        if (
          (texts[t] == "McCon") |
          (texts[t] == "McConn") |
          (texts[t] == "McConne") |
          (texts[t] == "McConnel")
        ) {
          texts[t] = "McConnell";
        }
        if (
          (texts[t] == "Antetok") |
          (texts[t] == "Antetoko") |
          (texts[t] == "Antetokou") |
          (texts[t] == "Antetokoun") |
          (texts[t] == "Antetokounm") |
          (texts[t] == "Antetokounmp")
        ) {
          texts[t] = "Antetokounmpo";
        }
        if (texts[t] == "JO") {
          texts[t] = "CAPT";
        }

        var salaryArray = [];
        // if (typeof texts[t] !== "undefined") {
        //   if (texts[t].substring(0, 1) == "$" && texts[t].length == 1) {
        //     salaryArray.push(texts[t + 1]);
        //     //console.log("$" + salaryArray);
        //   } else if (texts[t].length > 1 && texts[t].substring(0, 1) == "$") {
        //     salaryArray.push(texts[t]);
        //     //console.log(salaryArray);
        //   }
        // }
        var searchValLast = texts[t];

        for (var i = 0; i < players.names.length; i++) {
          if (players.names[i][searchFieldLast] == searchValLast) {
            //    console.log(texts[t] + " : This player : " + t);
            positionArray.push(t - 2);
            firstInitialNameArray.push(t - 1);
            lastNameArray.push(t);

            previousString.push(
              texts[t - 2] + " " + texts[t - 1] + " " + texts[t]
            );
            lastLast.push(players.names[i]);
          }
        }
      }

      var finalPlayerList = [];

      function eliminateDuplicates(arr) {
        var i,
          len = arr.length,
          out = [],
          obj = {};

        for (i = 0; i < len; i++) {
          obj[arr[i]] = 0;
        }
        for (i in obj) {
          out.push(i);
        }
        return out;
      }

      var finalFirstNameIndex = eliminateDuplicates(firstInitialNameArray);
      var finalLastNameIndex = eliminateDuplicates(lastNameArray);
      var finalPositionIndex = eliminateDuplicates(positionArray);

      var finalFirstNameStrings = [];
      var finalLastNameStrings = [];
      var finalPositionStrings = [];
      //var finalSalaryArray = [eliminateDuplicates(salaryArray)];
      var fuckYeah = [];

      for (var x = 0; x < finalFirstNameIndex.length; x++) {
        finalFirstNameStrings.push(texts[finalFirstNameIndex[x]]);
        finalLastNameStrings.push(texts[finalLastNameIndex[x]]);
        finalPositionStrings.push(texts[finalPositionIndex[x]]);

        fuckYeah.push(
          // finalSalaryArray[x] +
          //   " " +
          // finalPositionStrings[x] +
          //   " " +
          finalFirstNameStrings[x] + " " + finalLastNameStrings[x]
        );
      }
      //res.send(lastLast.diff(last));
      res.send(fuckYeah); //fuckYeah
    })
    .catch((err: any) => {
      console.error("ERROR:", err);
    });
});
