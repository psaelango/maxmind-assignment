import axios from "axios";
import IpTableHeaders from "../data/IpTableHeaders.json";
import IpMapHeaders from "../data/IpMapHeaders.json";
import { getProperty } from "../utils/utils";
const { REACT_APP_SERVER_URL, REACT_APP_FIND_IPS_INFO_ENDPOINT } = process.env;

export const findIpAddressesInfoApi = async (value) => {
  try {
    const response = await axios.post(
      `${REACT_APP_SERVER_URL}/${REACT_APP_FIND_IPS_INFO_ENDPOINT}`,
      { ipAddresses: value }
    );
    const apiData = response.data.ipAddressesInfo;

    let formattedTableData = [];
    let formattedMapData = [];
    for (let i = 0; i < apiData.length; i++) {
      const data = apiData[i];

      let tableDataJson = {};
      for (let j = 0; j < IpTableHeaders.length; j++) {
        const elem = IpTableHeaders[j];
        const key = elem.value;
        tableDataJson[elem.Accessor] = getProperty(data, key);
      }
      // formattedTableData looks like below
      // {
      //   countryCode: apiData.country.isoCode,
      //   postalCode: apiData.postal.code,
      //   cityName: apiData.city.names.en,
      //   timeZone: apiData.location.timeZone,
      //   radius: apiData.location.accuracyRadius
      // }
      formattedTableData.push(tableDataJson);

      let mapDataJson = {};
      for (let j = 0; j < IpMapHeaders.length; j++) {
        const elem = IpMapHeaders[j];
        const key = elem.value;
        mapDataJson[elem.Accessor] = getProperty(data, key);
      }
      formattedMapData.push(mapDataJson);
    }
    return {
      formattedTableData,
      formattedMapData,
    };
  } catch (error) {
    console.log("findIpAddressesInfoApi Error = ", error);
  }
};
