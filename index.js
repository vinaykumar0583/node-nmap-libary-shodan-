const dbConnect = require("./mongodb");
var nmap = require("node-nmap");

//nmap.nmapLocation = "nmap";

var osandports = new nmap.OsAndPortScan("google.com");

osandports.on("complete", function (data) {
  console.log(JSON.stringify(data, null, 4));
  const insert = async () => {
    const db = await dbConnect();
    const result = await db.insertOne(data[0]);
    if (result.acknowledged) {
      console.log("data inserted");
    }else{
       console.log("data is not inserted");
  };
  insert();
});

osandports.on("error", function (error) {
  console.log(error);
});

osandports.startScan();
