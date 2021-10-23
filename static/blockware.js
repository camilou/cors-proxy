dayjs.extend(window.dayjs_plugin_relativeTime);

const apiKey = "1zYBMPxqxbY1m4WSjxRDqytmID9",
  laevitasApiKey = "fcb93a47-0fa4-43fa-afc4-c5d1313e0b91",
  today = dayjs().unix(),
  yesterday = dayjs().subtract(1, "day").unix(),
  lastThreeDays = dayjs().subtract(3, "day").unix(),
  lastWeek = dayjs().subtract(1, "week").unix(),
  lastMonth = dayjs().subtract(1, "month").unix(),
  //DATES FOR LAEVITAS
  todayFormatted = dayjs().format("YYYY-MM-DD"),
  lastWeekFormatted = dayjs().subtract(1, "week").format("YYYY-MM-DD");

//CORS ANYWHERE SOLUTION
(function () {
  var cors_api_host = "proxy-lime.vercel.app";
  var cors_api_url = "https://" + cors_api_host + "/api?url=";
  var slice = [].slice;
  var origin = window.location.protocol + "//" + window.location.host;
  var open = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function () {
    var args = slice.call(arguments);
    var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
    if (
      targetOrigin &&
      targetOrigin[0].toLowerCase() !== origin &&
      targetOrigin[1] !== cors_api_host
    ) {
      args[1] = cors_api_url + encodeURIComponent(args[1]);
    }
    return open.apply(this, args);
  };
})();

async function toggleVisualization(type) {
  const isHashRateVisible =
    document.getElementById("hash-rate-checkbox").checked;
  switch (type) {
    case "week":
      document.getElementById("week").className =
        "chart-visualization-button chart-visualization-button__active";
      document.getElementById("day").className = "chart-visualization-button";
      document.getElementById("hour").className = "chart-visualization-button";
      document.getElementById("immediate").className =
        "chart-visualization-button";
      await formatMainGraph(lastMonth, isHashRateVisible);
      break;
    case "day":
      document.getElementById("week").className = "chart-visualization-button";
      document.getElementById("day").className =
        "chart-visualization-button chart-visualization-button__active";
      document.getElementById("hour").className = "chart-visualization-button";
      document.getElementById("immediate").className =
        "chart-visualization-button";
      await formatMainGraph(lastWeek, isHashRateVisible);
      break;
    case "hour":
      document.getElementById("week").className = "chart-visualization-button";
      document.getElementById("day").className = "chart-visualization-button";
      document.getElementById("hour").className =
        "chart-visualization-button chart-visualization-button__active";
      document.getElementById("immediate").className =
        "chart-visualization-button";
      await formatMainGraph(lastThreeDays, isHashRateVisible);
      break;
    case "immediate":
      document.getElementById("week").className = "chart-visualization-button";
      document.getElementById("day").className = "chart-visualization-button";
      document.getElementById("hour").className = "chart-visualization-button";
      document.getElementById("immediate").className =
        "chart-visualization-button chart-visualization-button__active";
      await formatMainGraph(yesterday, isHashRateVisible);
      break;
  }
}

async function toggleHashRateCheckbox() {
  const checkboxInitialState =
      document.getElementById("hash-rate-checkbox").checked,
    startingPoint = document.getElementsByClassName(
      "chart-visualization-button__active"
    )[0].id;

  if (checkboxInitialState) {
    document.getElementById("hash-rate-checkbox").checked = false;
    chart1.updateOptions({
      chart: {
        width: "100%",
        height: 450,
        type: "candlestick",
        animations: {
          enabled: false,
        },
        dynamicAnimation: {
          enabled: false,
        },
      },
      noData: {
        text: "Loading...",
      },
      xaxis: {
        type: "datetime",
        labels: {
          show: true,
          rotate: -45,
          rotateAlways: false,
          hideOverlappingLabels: true,
          showDuplicates: false,
          trim: false,
          minHeight: undefined,
          maxHeight: 120,
          style: {
            colors: "#e2e2e2",
            fontSize: "12px",
            fontFamily: "Roboto Condensed, sans-serif",
            fontWeight: 400,
            cssClass: "apexcharts-xaxis-label",
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      legend: {
        show: false,
      },
      yaxis: {
        seriesName: "BTC Price",
        tooltip: {
          custom: [
            function ({ seriesIndex, dataPointIndex, w }) {
              var o = w.globals.seriesCandleO[seriesIndex][dataPointIndex];
              var h = w.globals.seriesCandleH[seriesIndex][dataPointIndex];
              var l = w.globals.seriesCandleL[seriesIndex][dataPointIndex];
              var c = w.globals.seriesCandleC[seriesIndex][dataPointIndex];
              return "";
            },
          ],
        },
        opposite: true,
        decimalsInFloat: 0,
        labels: {
          formatter: function (val, index) {
            return val.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            });
          },
          show: true,
          align: "left",
          minWidth: 0,
          maxWidth: 80,
          style: {
            colors: "#e2e2e2",
            fontSize: "12px",
            fontFamily: "Roboto Condensed, sans-serif",
            fontWeight: 400,
            cssClass: "apexcharts-yaxis-label",
          },
        },
      },
      grid: {
        borderColor: "#54ab5711",
        position: "back",
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
    });
    await toggleVisualization(startingPoint);
  } else {
    document.getElementById("hash-rate-checkbox").checked = true;
    chart1.updateOptions({
      chart: {
        width: "100%",
        height: 450,
        type: "line",
        animations: {
          enabled: false,
        },
        dynamicAnimation: {
          enabled: false,
        },
      },
      noData: {
        text: "Loading...",
      },
      xaxis: {
        type: "datetime",
        labels: {
          show: true,
          rotate: -45,
          rotateAlways: false,
          hideOverlappingLabels: true,
          showDuplicates: false,
          trim: false,
          minHeight: undefined,
          maxHeight: 120,
          style: {
            colors: "#e2e2e2",
            fontSize: "12px",
            fontFamily: "Roboto Condensed, sans-serif",
            fontWeight: 400,
            cssClass: "apexcharts-xaxis-label",
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      legend: {
        show: false,
      },
      colors: ["#e2e2e2", "#e2e2e2"],
      noData: {
        text: "Loading...",
      },
      yaxis: [
        {
          seriesName: "Hash Rate",
          opposite: false,
          decimalsInFloat: 0,
          labels: {
            formatter: function (val, index) {
              return Number.parseInt(val).toExponential(3);
            },
            show: true,
            align: "right",
            minWidth: 0,
            maxWidth: 80,
            style: {
              colors: "#e2e2e2",
              fontSize: "12px",
              fontFamily: "Roboto Condensed, sans-serif",
              fontWeight: 400,
              cssClass: "apexcharts-yaxis-label",
            },
          },
        },
        {
          seriesName: "BTC Price",
          tooltip: {
            custom: [
              function ({ seriesIndex, dataPointIndex, w }) {
                var o = w.globals.seriesCandleO[seriesIndex][dataPointIndex];
                var h = w.globals.seriesCandleH[seriesIndex][dataPointIndex];
                var l = w.globals.seriesCandleL[seriesIndex][dataPointIndex];
                var c = w.globals.seriesCandleC[seriesIndex][dataPointIndex];
                return "";
              },
            ],
          },
          opposite: true,
          decimalsInFloat: 0,
          labels: {
            formatter: function (val, index) {
              return val.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              });
            },
            show: true,
            align: "left",
            minWidth: 0,
            maxWidth: 80,
            style: {
              colors: "#e2e2e2",
              fontSize: "12px",
              fontFamily: "Roboto Condensed, sans-serif",
              fontWeight: 400,
              cssClass: "apexcharts-yaxis-label",
            },
          },
        },
      ],
      grid: {
        borderColor: "#54ab5711",
        position: "back",
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
    });
    await toggleVisualization(startingPoint);
  }
}

async function getBTCHashRateData(startingPoint) {
  let data = undefined;
  await axios
    .get("https://api.glassnode.com/v1/metrics/mining/hash_rate_mean", {
      params: {
        api_key: apiKey,
        a: "BTC",
        s: startingPoint,
        i: "24h",
        timestamp_format: "humanized",
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((res) => {
      data = res.data;
    })
    .catch((error) => {
      console.error(error);
    });
  return data;
}

async function getBTCPrice(startingPoint) {
  let data = undefined;
  await axios
    .get("https://api.glassnode.com/v1/metrics/market/price_usd_ohlc", {
      params: {
        api_key: apiKey,
        a: "BTC",
        s: startingPoint,
        i: "1h",
        timestamp_format: "humanized",
      },
    })
    .then((res) => {
      data = res.data;
    })
    .catch((error) => {
      console.error(error);
    });
  return data;
}

async function getPerpetualFundingsRate() {
  let data = undefined;
  await axios
    .get(
      "https://gateway.laevitas.ch/futures/market/perpetual_funding/btc/binance",
      {
        params: {
          start: new Date(Date.now() - 604800000),
          end: new Date(),
        },
      }
    )
    .then((res) => {
      data = res.data;
    })
    .catch((error) => {
      console.error(error);
    });

  return data;
}

async function getFuturesOpenInterest() {
  let data = undefined;
  const today = new Date();
  await axios
    .get("https://gateway.laevitas.ch/futures/total_oi/btc", {
      params: {
        start: new Date(Date.now() - 604800000),
        end: new Date(),
      },
    })
    .then((res) => {
      data = res.data;
    })
    .catch((error) => {
      console.error(error);
    });

  return data;
}

async function getBTCHashRateData(startingPoint) {
  let data = undefined;
  await axios
    .get("https://api.glassnode.com/v1/metrics/mining/hash_rate_mean", {
      params: {
        api_key: apiKey,
        a: "BTC",
        s: startingPoint,
        i: "24h",
        timestamp_format: "humanized",
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((res) => {
      data = res.data;
    })
    .catch((error) => {
      console.error(error);
    });
  return data;
}

async function getDifficultyLatest(startingPoint) {
  let data = undefined;
  await axios
    .get("https://api.glassnode.com/v1/metrics/mining/difficulty_latest", {
      params: {
        api_key: apiKey,
        a: "BTC",
        s: startingPoint,
        u: today,
        i: "24h",
        timestamp_format: "humanized",
      },
    })
    .then((res) => {
      data = res.data;
    })
    .catch((error) => {
      console.error(error);
    });
  return data;
}

async function getBTCTransactionRate(startingPoint) {
  let data = undefined;
  await axios
    .get("https://api.glassnode.com/v1/metrics/transactions/rate", {
      params: {
        api_key: apiKey,
        a: "BTC",
        s: startingPoint,
        i: "24h",
        timestamp_format: "humanized",
      },
    })
    .then((res) => {
      data = res.data;
    })
    .catch((error) => {
      console.error(error);
    });
  return data;
}

async function getBTCTransactionCount(startingPoint) {
  let data = undefined;
  await axios
    .get("https://api.glassnode.com/v1/metrics/transactions/count", {
      params: {
        api_key: apiKey,
        a: "BTC",
        s: startingPoint,
        i: "24h",
        timestamp_format: "humanized",
      },
    })
    .then((res) => {
      data = res.data;
    })
    .catch((error) => {
      console.error(error);
    });
  return data;
}

async function getBTCMeanTransactionSize(startingPoint) {
  let data = undefined;
  await axios
    .get("https://api.glassnode.com/v1/metrics/transactions/size_mean", {
      params: {
        api_key: apiKey,
        a: "BTC",
        s: startingPoint,
        i: "24h",
        timestamp_format: "humanized",
      },
    })
    .then((res) => {
      data = res.data;
    })
    .catch((error) => {
      console.error(error);
    });
  return data;
}

async function getBTCTransferVolumeData(startingPoint) {
  let data = undefined;
  await axios
    .get(
      "https://api.glassnode.com/v1/metrics/transactions/transfers_volume_sum",
      {
        params: {
          api_key: apiKey,
          a: "BTC",
          s: startingPoint,
          i: "24h",
          c: "USD",
          timestamp_format: "humanized",
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
    .then((res) => {
      data = res.data;
    })
    .catch((error) => {
      console.error(error);
    });
  return data;
}

async function getBTCActiveAddressesData(startingPoint) {
  let data = undefined;
  await axios
    .get("https://api.glassnode.com/v1/metrics/addresses/active_count", {
      params: {
        api_key: apiKey,
        a: "BTC",
        s: startingPoint,
        i: "24h",
        timestamp_format: "humanized",
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((res) => {
      data = res.data;
    })
    .catch((error) => {
      console.error(error);
    });
  return data;
}

async function getGoogleSearchTrends() {
  let data;
  let today = dayjs(new Date()).format("YYYY-MM-DD");
  let lastYear = dayjs(new Date()).subtract(1, "year").format("YYYY-MM-DD");
  //TODO: replace dates in time with lastyear + today
  await axios
    .get(
      `https://trends.google.com/trends/api/widgetdata/multiline?req={"time":"2020-10-21+2021-10-21","resolution":"WEEK","locale":"en-US","comparisonItem":[{"geo":{"country":"US"},"complexKeywordsRestriction":{"keyword":[{"type":"BROAD","value":"bitcoin"}]}}],"requestOptions":{"property":"","backend":"IZG","category":0}}&token=APP6_UEAAAAAYXMx_tNRxoi5i5ZkDGlfGkAsI3ZbXozm&tz=300`
    )
    .then((response) => {
      data = JSON.parse(response.data.slice(6)).default.timelineData;
    })
    .catch(function (error) {
      console.log(error);
    });
  return data;
}

async function getDSG10() {
  const response = await axios.post(
    "https://fred.stlouisfed.org/graph/api/series/?obs=true&sid=DGS10",
    {
      seriesObjects: [
        {
          series_objects: {
            a: {
              series_id: "DGS10",
              min_valid_start_date: "2021-10-21",
              max_valid_start_date: null,
              min_obs_start_date: "2021-10-01",
              max_obs_start_date: "2021-10-20",
              last_updated: "2021-10-21 15:18:06-05",
            },
          },
          chart_key: "8dd6e23ac3810dccab53eed89529bbe8",
        },
      ],
    }
  );
  // year 2015 since pos 14.000
  return response.data.observations[0].slice(14000);
}

async function getM2() {
  const response = await axios.post(
    "https://fred.stlouisfed.org/graph/api/series/?obs=true&sid=M2SL",
    {
      seriesObjects: [
        {
          series_objects: {
            a: {
              series_id: "M2SL",
              min_valid_start_date: "2021-10-21",
              max_valid_start_date: null,
              min_obs_start_date: "2021-10-01",
              max_obs_start_date: "2021-10-20",
              last_updated: "2021-10-21 15:18:06-05",
            },
          },
          chart_key: "25999d44c2c21c43038827a935a31e9c",
        },
      ],
    }
  );
  // year 2015 since pos 14.000
  return response.data.observations[0].slice(-7);
}

async function formatMainGraph(startingPoint, isHashRateVisible) {
  chart1.updateSeries([]);
  let hashRateData, hashRateGraphData, btcPriceData, btcPriceGraphData;
  if (isHashRateVisible) {
    hashRateData = await getBTCHashRateData(startingPoint);
    hashRateGraphData = hashRateData.map((object) => {
      return {
        x: new Date(object.t),
        y: object.v,
      };
    });
  }
  btcPriceData = await getBTCPrice(startingPoint);
  btcPriceGraphData = btcPriceData.map((object) => {
    return {
      x: new Date(object.t),
      y: [object.o.o, object.o.h, object.o.l, object.o.c],
    };
  });

  if (isHashRateVisible) {
    chart1.updateSeries([
      {
        name: "Hash Rate",
        type: "line",
        data: hashRateGraphData,
      },
      {
        name: "BTC Price",
        type: "candlestick",
        data: btcPriceGraphData,
      },
    ]);
  } else {
    chart1.updateSeries([
      {
        name: "BTC Price",
        type: "candlestick",
        data: btcPriceGraphData,
      },
    ]);
  }
}

async function formatChart2() {
  charts2.updateSeries([]);
  const perpetualFundingData = await getPerpetualFundingsRate();
  const perpetualFundingGraphDataBTCUSD_PERP = perpetualFundingData.map(
    (object) => {
      return {
        x: new Date(object.date),
        y: object.data[0].funding,
      };
    }
  );
  const perpetualFundingGraphDataBTCUSDT = perpetualFundingData.map(
    (object) => {
      return {
        x: new Date(object.date),
        y: object.data[1].funding,
      };
    }
  );

  charts2.updateSeries([
    {
      name: "BTCUSD PERP",
      type: "line",
      data: perpetualFundingGraphDataBTCUSD_PERP,
    },
    {
      name: "BTCUSDT",
      type: "line",
      data: perpetualFundingGraphDataBTCUSDT,
    },
  ]);
}

function initGraph2Selector() {
  const selector = document.querySelector(".stats-item-select");

  selector.addEventListener("change", async (event) => {
    const legend1 = document.querySelector("#graph2-first-legend");
    const legend2 = document.querySelector("#graph2-second-legend");
    charts2.updateSeries([]);
    if (event.target.value == "funding_rate") {
      const perpetualFundingData = await getPerpetualFundingsRate();
      const perpetualFundingGraphDataBTCUSD_PERP = perpetualFundingData.map(
        (object) => {
          return {
            x: new Date(object.date),
            y: object.data[0].funding,
          };
        }
      );
      const perpetualFundingGraphDataBTCUSDT = perpetualFundingData.map(
        (object) => {
          return {
            x: new Date(object.date),
            y: object.data[1].funding,
          };
        }
      );
      charts2.updateSeries([
        {
          name: "BTCUSD PERP",
          type: "line",
          data: perpetualFundingGraphDataBTCUSD_PERP,
        },
        {
          name: "BTCUSDT",
          type: "line",
          data: perpetualFundingGraphDataBTCUSDT,
        },
      ]);
      legend1.innerHTML = "BTCUSD PERP";
      legend2.innerHTML = "BTCUSDT";
    } else {
      const futuresOpenInterestData = await getFuturesOpenInterest();
      const futuresOpenInterestGraphDataBinance = futuresOpenInterestData.map(
        (object) => {
          return {
            x: new Date(object.date),
            y: object.future.BINANCE,
          };
        }
      );
      const futuresOpenInterestGraphDataKraken = futuresOpenInterestData.map(
        (object) => {
          return {
            x: new Date(object.date),
            y: object.future.KRAKEN,
          };
        }
      );
      charts2.updateSeries([
        {
          name: "BINANCE",
          type: "line",
          data: futuresOpenInterestGraphDataBinance,
        },
        {
          name: "KRAKEN",
          type: "line",
          data: futuresOpenInterestGraphDataKraken,
        },
      ]);
      legend1.innerHTML = "BINANCE";
      legend2.innerHTML = "KRAKEN";
    }
  });

  selector.addEventListener("mousedown", (event) => {
    if (window.innerWidth >= 420) {
      event.preventDefault();

      const select = selector.children[0];
      const dropDown = document.createElement("ul");
      dropDown.className = "stats-item-select-options";

      [...select.children].forEach((option) => {
        const dropDownOption = document.createElement("li");
        dropDownOption.textContent = option.textContent;

        dropDownOption.addEventListener("mousedown", (event) => {
          event.stopPropagation();
          select.value = option.value;
          selector.value = option.value;
          select.dispatchEvent(new Event("change"));
          selector.dispatchEvent(new Event("change"));
          dropDown.remove();
        });

        dropDown.appendChild(dropDownOption);
      });

      selector.appendChild(dropDown);

      document.addEventListener("click", (event) => {
        if (!selector.contains(event.target)) {
          dropDown.remove();
        }
      });
    }
  });
}

async function formatChart3() {
  charts3.updateSeries([]);
  let dgs10Data, dgs10GraphData;

  dgs10Data = await getDSG10();
  dgs10GraphData = dgs10Data.map((object) => {
    return {
      x: object[0],
      y: object[1],
    };
  });

  charts3.updateSeries([
    {
      name: "DSG10",
      type: "line",
      data: dgs10GraphData,
    },
  ]);
}

async function formatChart4(startingPoint) {
  charts4.updateSeries([]);
  let activeAddressesData,
    activeAddressesGraphData,
    transferVolumeData,
    transferVolumeGraphData;

  activeAddressesData = await getBTCActiveAddressesData(startingPoint);
  transferVolumeData = await getBTCTransferVolumeData(startingPoint);
  activeAddressesGraphData = activeAddressesData.map((object) => {
    return {
      x: new Date(object.t),
      y: object.v,
    };
  });
  transferVolumeGraphData = transferVolumeData.map((object) => {
    return {
      x: new Date(object.t),
      y: object.v,
    };
  });

  charts4.updateSeries([
    {
      name: "Active Addresses",
      type: "line",
      data: activeAddressesGraphData,
    },
    {
      name: "Transfer Volume",
      type: "line",
      data: transferVolumeGraphData,
    },
  ]);
}

async function formatChart5(startingPoint) {
  charts5.updateSeries([]);
  let hashRateData, hashRateGraphData, difficultyData, difficultyGraphData;
  hashRateData = await getBTCHashRateData(startingPoint);
  difficultyData = await getDifficultyLatest(startingPoint);
  hashRateGraphData = hashRateData.map((object) => {
    return {
      x: new Date(object.t),
      y: object.v,
    };
  });
  difficultyGraphData = difficultyData.map((object) => {
    return {
      x: new Date(object.t),
      y: object.v,
    };
  });
  charts5.updateSeries([
    {
      name: "Hash Rate",
      type: "line",
      data: hashRateGraphData,
    },
    {
      name: "Difficulty",
      type: "line",
      data: difficultyGraphData,
    },
  ]);
}

async function formatChart6() {
  charts6.updateSeries([]);
  let gTrendsData, gTrendsGraphData, twitterFollowers;
  gTrendsData = await getGoogleSearchTrends();
  gTrendsGraphData = gTrendsData.map((object) => {
    return {
      x: new Date(object.formattedAxisTime),
      y: object.value[0],
    };
  });
  charts6.updateSeries([
    {
      name: "Google search trends",
      type: "line",
      data: gTrendsGraphData,
    },
  ]);
}

async function perpetualFundingTickerFetch() {
  let data = undefined;
  const options = {
    method: "GET",
    url: "https://gateway.laevitas.ch/analytics/futures/perpetual_funding/btc",
    headers: {
      apikey: laevitasApiKey,
    },
  };

  await axios
    .request(options)
    .then(function (response) {
      data = response.data;
    })
    .catch(function (error) {
      console.error(error);
    });
  return data;
}

async function futuresOpenInterestTickerFetch() {
  let data = undefined;
  const options = {
    method: "GET",
    url: "https://gateway.laevitas.ch/futures/total_oi/btc",
    params: {
      start: todayFormatted,
      end: todayFormatted,
    },
    headers: {
      apikey: laevitasApiKey,
    },
  };

  await axios
    .request(options)
    .then(function (response) {
      data = response.data[response.data.length - 1].future;
      console.log("data", data);
    })
    .catch(function (error) {
      console.error(error);
    });
  return data;
}

async function mainTickerFetch() {
  let data = undefined;

  const options = {
    method: "GET",
    url: "https://yh-finance.p.rapidapi.com/market/v2/get-quotes",
    params: { region: "US", symbols: "GOOG,TSLA,AAPL,NFLX,MSFT" },
    headers: {
      "x-rapidapi-host": "yh-finance.p.rapidapi.com",
      "x-rapidapi-key": "797b2bb95amshd2dea3326abfd92p1deaccjsn103f15f1a2ee",
    },
  };

  await axios
    .request(options)
    .then(function (response) {
      data = formatMainTickerData(response.data.quoteResponse.result);
    })
    .catch(function (error) {
      console.error(error);
    });
  return data;
}

function formatMainTickerData(data) {
  return data.map((item) => {
    return {
      name: item.longName,
      price: item.regularMarketPrice,
      change: item.regularMarketChange,
      changePercent: item.regularMarketChangePercent,
    };
  });
}

async function generateTickerItems() {
  const data = await mainTickerFetch();
  const markup = `
  <ul class="menu-items">
    ${data
      .map(
        (item) =>
          `<li class="item-description">
          ${item.name} ${item.price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })} 
      <span class="${item.change > 0 ? "positive-item" : "negative-item"}">
      ${item.change.toFixed(2)}<span> | </span>
      ${item.changePercent.toFixed(2)}% 
       <i class="fa ${
         item.change > 0 ? "fa-arrow-up" : "fa-arrow-down"
       }" aria-hidden="true"></i>
</span>
    </li>`
      )
      .join("")}
    </ul>
    <ul class="menu-items2">
    ${data
      .map(
        (item) =>
          `<li class="item-description">
          ${item.name} ${item.price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })} 
      <span class="${item.change > 0 ? "positive-item" : "negative-item"}">
      ${item.change.toFixed(2)}<span> | </span>
      ${item.changePercent.toFixed(2)}% 
        <i class="fa ${
          item.change > 0 ? "fa-arrow-up" : "fa-arrow-down"
        }" aria-hidden="true"></i>
</span>
    </li>`
      )
      .join("")}
    </ul>
    `;

  document.getElementById("ticker").innerHTML = markup;
}

async function generateSecondSectionTickers() {
  await generatePerpetualFundingTickerItems();
  await generateFuturesOITickerItems();
  await generateMY10TickerItems();
  await generateTransactionRateTickerItems();
  await generateActiveAddressesTickerItems();
  await generateTransferVolumeTickerItems();
  await generateMeanTransactionSizeTickerItems();
  await generateM2TickerItems();
  await generateGoogleSearchesTickerItems();
  await generateHashRateTickerItems();
  await generateDifficultyTickerItems();
}

async function generatePerpetualFundingTickerItems() {
  const data = await perpetualFundingTickerFetch();
  const markup = data
    .map(
      (item) =>
        `<li class="second-section-item-description">
          ${item.symbol}: ${item.funding.toFixed(4)}
        </li>`
    )
    .join("");

  document.getElementById("perpetual_funding").innerHTML = markup;
}

async function generateMY10TickerItems() {
  const fetch = await getDSG10();
  const data = fetch.slice(-7).reverse();
  const options = { year: "numeric", month: "short", day: "numeric" };

  const markup = data
    .map(
      (item) => `<li class="second-section-item-description">
          DGS10 ${new Date(item[0]).toLocaleString("en-US", options)}: ${
        item[1]
      }
        </li>`
    )
    .join("");

  document.getElementById("macro_10Y_rates").innerHTML = markup;
}

async function generateM2TickerItems() {
  const fetch = await getM2();
  const data = fetch.reverse();
  const options = { year: "numeric", month: "short" };

  const markup = data
    .map(
      (item) => `<li class="second-section-item-description">
          M2SL ${new Date(item[0]).toLocaleString("en-US", options)}: ${item[1]}
        </li>`
    )
    .join("");

  document.getElementById("macro_M2_supply").innerHTML = markup;
}

async function generateGoogleSearchesTickerItems() {
  const fetch = await getGoogleSearchTrends();
  const data = fetch.slice(-7).reverse();
  const options = { year: "numeric", day: "numeric", month: "short" };

  const markup = data
    .map(
      (item) => `<li class="second-section-item-description">
          Searches ${new Date(item.formattedAxisTime).toLocaleString(
            "en-US",
            options
          )}: ${item.value[0]}
        </li>`
    )
    .join("");

  document.getElementById("retail_google_searches").innerHTML = markup;
}

async function generateFuturesOITickerItems() {
  const fetch = await futuresOpenInterestTickerFetch();
  const data = Object.entries(fetch)
    .map(([key, value]) => ({ key, value }))
    .filter((item) => !item.key.includes("notional"));
  const markup = data
    .map(
      (item) =>
        `<li class="second-section-item-description">
          ${item.key}: ${item.value}
        </li>`
    )
    .join("");

  document.getElementById("futures_open_interest").innerHTML = markup;
}

async function generateTransactionRateTickerItems() {
  const transactionRateData = await getBTCTransactionRate(lastWeek);
  const transactionCountData = await getBTCTransactionCount(lastWeek);

  const data = transactionRateData.map((item, index) => {
    if ((item.t = transactionCountData[index].t)) {
      return {
        t: item.t,
        r: item.v,
        c: transactionCountData[index].v,
      };
    }
  });

  const markup = data
    .slice(0)
    .reverse()
    .map(
      (item) =>
        `<li class="second-section-item-description">
          ${dayjs(item.t).format("MMM D")}: Rate:${item.r.toFixed(4)} Count:${
          item.c
        } 
        </li>`
    )
    .join("");

  document.getElementById("transaction_rate").innerHTML = markup;
}

async function generateActiveAddressesTickerItems() {
  const data = await getBTCActiveAddressesData(lastWeek);
  const markup = data
    .slice(0)
    .reverse()
    .map(
      (item) =>
        `<li class="second-section-item-description">
          ${dayjs(item.t).format("MMM D")}: ${item.v}
        </li>`
    )
    .join("");

  document.getElementById("active_addresses").innerHTML = markup;
}

async function generateTransferVolumeTickerItems() {
  const data = await getBTCTransferVolumeData(lastWeek);
  const markup = data
    .slice(0)
    .reverse()
    .map(
      (item) =>
        `<li class="second-section-item-description">
          ${dayjs(item.t).format("MMM D")}: ${item.v.toFixed(4)}
        </li>`
    )
    .join("");

  document.getElementById("transfer_volume").innerHTML = markup;
}

async function generateHashRateTickerItems() {
  const data = await getBTCHashRateData(lastWeek);
  const markup = data
    .slice(0)
    .reverse()
    .map(
      (item) =>
        `<li class="second-section-item-description">
          ${dayjs(item.t).format("MMM D")}: ${item.v}
        </li>`
    )
    .join("");

  document.getElementById("hash_rate_ticker").innerHTML = markup;
}

async function generateDifficultyTickerItems() {
  const data = await getDifficultyLatest(lastWeek);
  const markup = data
    .slice(0)
    .reverse()
    .map(
      (item) =>
        `<li class="second-section-item-description">
          ${dayjs(item.t).format("MMM D")}: ${item.v.toExponential(4)}
        </li>`
    )
    .join("");

  document.getElementById("difficulty_ticker").innerHTML = markup;
}

async function generateMeanTransactionSizeTickerItems() {
  const data = await getBTCMeanTransactionSize(lastWeek);
  const markup = data
    .slice(0)
    .reverse()
    .map(
      (item) =>
        `<li class="second-section-item-description">
          ${dayjs(item.t).format("MMM D")}: ${item.v.toFixed(4)}
        </li>`
    )
    .join("");

  document.getElementById("mean_transaction_size").innerHTML = markup;
}

async function fetchRecommendedSection() {
  let data = undefined;

  const options = {
    method: "GET",
    url: "https://www.blockwareintelligence.com/api/v1/archive",
    params: { sort: "new", limit: 12 },
  };

  await axios
    .request(options)
    .then(function (response) {
      data = response.data;
    })
    .catch(function (error) {
      console.error(error);
    });
  return data;
}

async function init() {
  generateTickerItems();
  generateSecondSectionTickers();
  generateRecommendedSectionItems();
  formatMainGraph(lastMonth, false);
  formatChart2();
  formatChart3();
  formatChart4(lastMonth);
  formatChart5(lastMonth);
  formatChart6(lastWeek);
  generateNewsContentItems();
  initGraph2Selector();
}

async function fetchNewsContentItems() {
  let data = undefined;

  const options = {
    method: "GET",
    url: "https://api.twitter.com/2/users/935357529290432514/tweets?max_results=6&tweet.fields=author_id,created_at,source",
    headers: {
      Authorization:
        "Bearer AAAAAAAAAAAAAAAAAAAAAHrqUwEAAAAAEbajqwQSx5oGCY%2BhfR%2B6PsoSdF8%3Dg0ef5bSg44KZewXryYJwSsBndLjunr2wGNwkAodtmhoYmHP88F",
    },
  };

  await axios
    .request(options)
    .then(function (response) {
      data = response.data.data;
    })
    .catch(function (error) {
      console.error(error);
    });
  return data;
}

function getAgoTime(date) {
  const currentDate = new Date(date);
  const seconds = Math.floor((new Date() - currentDate) / 1000);
  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
}

async function generateNewsContentItems() {
  const data = await fetchNewsContentItems();
  const newsMarkup = ` ${data
    .map(
      (item, index) =>
        `<article class="news-items">
                ${index % 2 == 0 ? '<div class="border-news">' : ""}
                  <div class="news-item-header">
                    <span class="news-item-title">@BTC</span>
                    <span class="news-item-yesterday">${getAgoTime(
                      item.created_at
                    )}</span>
                  </div>
                  <div class="news-item-container">
                    <p class="news-item-text">
                      ${item.text}
                    </p>
                    <i class="fa fa-twitter" aria-hidden="true"></i
                    ><a href="https://twitter.com/BlockwareTeam/status/${
                      item.id
                    }"><span class="news-item-link">View in Twitter</span></a>
                  </div>
                </div>
              </article>`
    )
    .join(" ")}`;

  document.getElementById("news-content").innerHTML = newsMarkup;
}

async function generateRecommendedSectionItems() {
  const data = await fetchRecommendedSection();
  const headline = data[0];
  const headlineMarkup = `
  <h3 class="recommended-content-title">
    ${headline.title}
  </h3>
  <span class="recommended-content-subtitle">By ${headline.publishedBylines[0].name}</span>
  <p class="recommended-content-subtitle">
    ${headline.truncated_body_text}
  </p>
  <a href="${headline.canonical_url}" class="read-more">Read more</a>`;

  const carouselMarkup = ` ${data
    .slice(1)
    .map(
      (item) =>
        `<div class="carousel-item" onclick=window.location.replace("${
          item.canonical_url
        }")>
          <img class="video-slider" src="${item.cover_image}" />
          <div class="video-header">
            <h2 class="video-title">${item.publishedBylines[0].name}</h2>
            <h2 class="video-time">${dayjs(item.post_date).fromNow()}</h2>
          </div>
          <span class="video-description"
            >${item.title}</span
          >
        </div>`
    )
    .join(" ")}`;

  document.getElementById("headline-container").innerHTML = headlineMarkup;
  document.getElementById("carousel-container").innerHTML = carouselMarkup;
}

var chart1Options = {
  series: [],
  chart: {
    width: "100%",
    height: 450,
    type: "candlestick",
    animations: {
      enabled: false,
    },
    dynamicAnimation: {
      enabled: false,
    },
  },
  noData: {
    text: "Loading...",
  },
  xaxis: {
    type: "datetime",
    labels: {
      show: true,
      rotate: -45,
      rotateAlways: false,
      hideOverlappingLabels: true,
      showDuplicates: false,
      trim: false,
      minHeight: undefined,
      maxHeight: 120,
      style: {
        colors: "#e2e2e2",
        fontSize: "12px",
        fontFamily: "Roboto Condensed, sans-serif",
        fontWeight: 400,
        cssClass: "apexcharts-xaxis-label",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  legend: {
    show: false,
  },
  yaxis: {
    seriesName: "BTC Price",
    tooltip: {
      custom: [
        function ({ seriesIndex, dataPointIndex, w }) {
          var o = w.globals.seriesCandleO[seriesIndex][dataPointIndex];
          var h = w.globals.seriesCandleH[seriesIndex][dataPointIndex];
          var l = w.globals.seriesCandleL[seriesIndex][dataPointIndex];
          var c = w.globals.seriesCandleC[seriesIndex][dataPointIndex];
          return "";
        },
      ],
    },
    opposite: true,
    decimalsInFloat: 0,
    labels: {
      formatter: function (val, index) {
        return val.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });
      },
      show: true,
      align: "left",
      minWidth: 0,
      maxWidth: 80,
      style: {
        colors: "#e2e2e2",
        fontSize: "12px",
        fontFamily: "Roboto Condensed, sans-serif",
        fontWeight: 400,
        cssClass: "apexcharts-yaxis-label",
      },
    },
  },
  grid: {
    borderColor: "#54ab5711",
    position: "back",
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: false,
      },
    },
  },
};

var chart1 = new ApexCharts(document.querySelector("#chart1"), chart1Options);
chart1.render();

function getGraphOptions(dateFormat) {
  let twoLinesGraphOptions;
  let date = {
    DDMMYYYY: "dd/MMM/yyyy",
    DDMM: "dd MMM",
  };
  twoLinesGraphOptions = {
    series: [],
    colors: ["#25b9b2", "#247BA0"],
    chart: {
      height: "100px",
      width: "100%",
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    noData: {
      text: "Loading...",
    },
    legend: {
      show: false,
    },
    tooltip: {
      x: {
        show: true,
        format: date[dateFormat] || "dd MMM",
        formatter: undefined,
      },
      style: {
        fontSize: "10px",
        fontFamily: "Roboto Condensed",
      },
      fixed: {
        enabled: true,
        position: "bottomLeft",
        offsetY: 80,
        offsetX: 20,
      },
      theme: "dark",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [2, 2],
      curve: "straight",
    },
    grid: {
      borderColor: "#54ab5711",
      position: "back",
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    xaxis: {
      type: "datetime",
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: false,
      },
      opposite: false,
      tooltip: {
        enabled: false,
      },
      labels: {
        show: false,
      },
    },
    yaxis: [
      {
        show: false,
      },
      {
        axisBorder: {
          show: true,
          borderColor: "#485a54",
        },
        labels: {
          show: false,
        },
      },
    ],
  };
  return twoLinesGraphOptions;
}

var chart2Options = getGraphOptions("DDMM");

var charts2 = new ApexCharts(document.querySelector("#charts2"), chart2Options);
charts2.render();

var chart3Options = getGraphOptions("DDMMYYYY");

var charts3 = new ApexCharts(document.querySelector("#charts3"), chart3Options);
charts3.render();

var chart4Options = getGraphOptions("DDMM");

var charts4 = new ApexCharts(document.querySelector("#charts4"), chart4Options);
charts4.render();

var chart5Options = getGraphOptions("DDMM");

var charts5 = new ApexCharts(document.querySelector("#charts5"), chart5Options);
charts5.render();

var chart6Options = getGraphOptions("DDMMYYYY");

var charts6 = new ApexCharts(document.querySelector("#charts6"), chart6Options);
charts6.render();

var chart7Options = getGraphOptions("DDMM");

var charts7 = new ApexCharts(document.querySelector("#charts7"), chart7Options);
charts7.render();

async function susbscribeEmail() {
  var email = document.getElementById("email").value;
  if (validateEmail(email)) {
    window.location.replace(
      `https://www.blockwareintelligence.com/welcome?email=${email}`
    );
  }
}

function validateEmail(elementValue) {
  var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(elementValue);
}
