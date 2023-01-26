import React, { useState } from "react";
import axios from "axios";

function SearchBar(props) {
  const [inputVal, setInputVal] = useState("");
  const { onFormSubmit } = props;
  const IP_ADDRESS_LIST =
    "1.187.255.255, 49.183.155.255, 174.2.185.255	, 109.109.192.255, 41.80.81.194, 200.0.236.255, 101.36.97.255, 35.234.176.255, 185.57.160.255, 54.238.118.255, 185.121.177.255";

  const getMyIp = () => {
    setInputVal("");
    axios.get("https://api.ipify.org?format=json").then(function (response) {
      setInputVal(response.data.ip);
    });
  };

  return (
    <div className="flex justify-around w-full items-stretch">
      <div className="w-4/5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setInputVal("");
            onFormSubmit(inputVal);
          }}
        >
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div
              onClick={() => getMyIp()}
              className="absolute inset-y-0 left-0 flex items-center pl-3 cursor-pointer"
            >
              <svg height="22px" width="22px" viewBox="0 0 487.715 487.715">
                <g>
                  <g>
                    <path
                      style={{ fill: "#2563eb" }}
                      d="M208.295,444.942v42.773h73.157v-43.138c82.968-15.444,148.265-81.026,163.303-164.14h41.943
                  v-73.157h-41.943c-15.038-83.115-80.335-148.688-163.303-164.14V0h-73.157v42.773C124.359,57.526,58.119,123.489,42.96,207.279
                  H1.016v73.157H42.96C58.119,364.225,124.359,430.189,208.295,444.942z M243.857,96.527c81.237,0,147.33,66.093,147.33,147.33
                  s-66.093,147.33-147.33,147.33s-147.33-66.093-147.33-147.33S162.62,96.527,243.857,96.527z"
                    />
                  </g>
                </g>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search multiple IP's using comma operator ... 192.168.1.1, 192.168.255.255, etc.."
              required
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      <div className="flex-none self-end">
        <button
          onClick={() => setInputVal(IP_ADDRESS_LIST)}
          type="button"
          className="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 mr-2 mb-2"
        >
          <svg
            className="w-4 h-4 mr-2 -ml-1 text-[#626890]"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="ethereum"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path
              fill="currentColor"
              d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"
            ></path>
          </svg>
          Auto Fill IP Addresses
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
