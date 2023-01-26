require("dotenv").config();
const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Reader = require("@maxmind/geoip2-node").Reader;

const options = {};
const dbUrl = process.env.DB_URL;
const dbBuffer = fs.readFileSync(dbUrl, options);

const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/find-ip-addresses", (req, res) => {
  const { ipAddresses } = req.body;
  const reader = Reader.openBuffer(dbBuffer);
  let ipAddressesInfo = [];
  for (let i = 0; i < ipAddresses.length; i++) {
    const ip = ipAddresses[i];
    let ipDetails;
    try {
      ipDetails = reader.city(ip);
    } catch (error) {
      ipDetails = {
        traits: {
          ipAddress: ip,
        },
        invalidIp: true,
        errorMsg: error,
      };
    }
    ipAddressesInfo.push(ipDetails);
  }
  res.json({ ipAddressesInfo });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// https://download.maxmind.com/app/geoip_download?edition_id=GeoLite2-City&license_key=mrEKZFfj1XU35zdq&suffix=tar.gz
// Account ID
// 818007
// License key
// mrEKZFfj1XU35zdq
