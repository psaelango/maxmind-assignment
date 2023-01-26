import React, { useState } from "react";

import "./App.css";
import TitleBar from "./components/TitleBar";
import Table from "./components/Table/Table";
import SearchBar from "./components/SearchBar";
import { findIpAddressesInfoApi } from "./api/IpAddressApi";
import IpTableHeaders from "./data/IpTableHeaders.json";
import IpCoordinatesMap from "./components/Map/IpCoordinatesMap";

function App() {
  const [tableData, setTableData] = useState([]);
  const [mapData, setMapData] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  const getIPinfo = async (ipAddresses) => {
    const trimmedIpAddresses = ipAddresses.replace(/\s/g, "");
    let ipAddressesList = trimmedIpAddresses.split(",");
    setLoadingData(true);
    const { formattedTableData = [], formattedMapData = [] } =
      await findIpAddressesInfoApi(ipAddressesList);
    setLoadingData(false);
    setTableData(formattedTableData);
    setMapData(formattedMapData);
  };

  return (
    <React.StrictMode>
      <div className="App">
        <div className="App-header">
          <TitleBar />
        </div>
        <div className="App-body">
          <SearchBar onFormSubmit={getIPinfo} dataLoading={loadingData} />
          <div className="App-data">
            <Table tableData={tableData} tableHeaders={IpTableHeaders} />
            <IpCoordinatesMap ipAddressesInfo={mapData} />
          </div>
        </div>
      </div>
    </React.StrictMode>
  );
}

export default App;
