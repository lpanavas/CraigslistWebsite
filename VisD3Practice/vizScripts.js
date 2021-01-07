let clients = [{ name: "Client0" }];
let count = 1;

const changeTop = () => {
  clients.push({ name: "Client" + count });
  count += 1;
  showClients(clients);
};

const changeMain = () => {
  clients = clients.slice(0, -1);
  count -= 1;
  showClients(clients);
};

const showClients = (data) => {
  let max = d3.max(data, (d) => d.Weight);
  console.log(data);
  let scaleWeight = d3.scaleLinear().range([0, 100]).domain([0, max]);
  let yScale = d3.scaleLinear().range([0, 100]).domain([max, 0]);
  let positionScale = d3
    .scaleBand()
    .range([0, 200])
    .domain(data.map((d) => d.Name))
    .padding(0.1);

  d3.selectAll("#middle")
    .selectAll("p")
    .data(data)
    .join(function (enter) {
      return (
        enter
          .append("p")
          .text((d) => d.Name + " " + scaleWeight(d.Weight))
          // .style("width", String(100) + "px")
          .style("width", (d) => scaleWeight(d.Weight))
          .style("border", "solid 1px black")
      );
    });
  d3.select("#body").append("circle").attr("r", 5).attr("fill", "blue");

  d3.select("#body")
    .selectAll("rect")
    .data(data)

    .join((enter) => {
      return enter
        .append("rect")
        .attr("name", (d) => d.Name)
        .attr("weight", (d) => d.Weight)
        .attr("height", (d) => scaleWeight(d.Weight))
        .attr("width", positionScale.bandwidth())
        .attr("x", (d) => positionScale(d.Name))
        .attr("fill", "blue")
        .attr("transform", "translate(200,200) scale (1, -1)");
    });

  d3.select("#body")
    .selectAll("rect")
    .on("click", function (d) {
      d3.select(this).attr("fill", "red");
      d3.select("#middle")
        .append("p")
        .text(this.getAttribute("name") + " " + this.getAttribute("weight"));
    });
  d3.select("#people").on("mousemove", (event) => {
    // let x = d3.event.dx;
    console.log(event.x);
  });

  let xAxis = d3.axisBottom(positionScale);
  d3.select("#xAxis").call(xAxis).attr("transform", "translate(200,200)");
  let yAxis = d3
    .axisLeft(yScale)
    .ticks("4")
    .tickFormat((d) => d + " lb");
  d3.select("#yAxis").call(yAxis).attr("transform", "translate(200,100)");
};
// showClients(clients);

var dataObj = null;
d3.csv("./data.csv").then(function (data) {
  showClients(data);
});

var kilos = 0.45;
var meters = 0.0254;

const calcBMI = (data) => {
  let heights = data.map((data) => {
    return data.Height * kilos;
  });

  let weights = data.map((data) => {
    return Math.pow(data.Weight * meters, 2);
  });
};

const showPeople = () => {
  let sum = dataObj.reduce((prev, curr) => {
    return prev + parseInt(curr.Weight);
  }, 0);
  let d3sum = d3.sum(dataObj, (d) => {
    return d.Weight;
  });
  let d3height = d3.mean(dataObj, (d) => {
    return d.Height;
  });

  let extent = d3.extent(dataObj, (d) => {
    return d.Height;
  });
};

// <----------------- Line chart ----------------------->
let data = null;
var timeParser = d3.timeParse("%Y-%m-%d");
d3.csv("./w3.csv").then((d) => (data = d));

const makeLine = () => {
  lineArea = d3.select("#lines");
  let allElements = lineArea.selectAll("path");
  allElements.remove();

  data = data.map((d) => ({
    date: new Date(d.date),
    price: +d.price,
  }));

  let maxHeight = d3.max(data, (d) => d.price);

  let yScale = d3.scaleLinear().range([0, 100]).domain([maxHeight, 0]);
  let timeExtent = d3.extent(data, (d) => {
    return d.date;
  });

  let xScale = d3.scaleTime().range([0, 400]).domain(timeExtent);
  let yAxis = d3.axisLeft(yScale);
  let xAxis = d3.axisBottom(xScale).ticks(12).tickFormat(d3.timeFormat("%b"));

  lineArea.append("g").call(xAxis).attr("transform", "translate(30,200)");
  lineArea.append("g").call(yAxis).attr("transform", "translate(30,100)");
  let line = d3
    .line()
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.price))
    .defined((d) => !!d.price);
  const path = lineArea
    .append("path")
    .datum(data)
    .attr("class", "line")
    .attr("d", line)

    .attr("transform", "translate(30,100)");

  const pathLength = path.node().getTotalLength();
  const transitionPath = d3.transition().ease(d3.easeSin).duration(2500);
  path
    .attr("stroke-dashoffset", pathLength)
    .attr("stroke-dasharray", pathLength)
    .transition(transitionPath)
    .attr("stroke-dashoffset", 0);
};

// < ------------------------ Pie Charts -------------------------->

d3.csv("./pie.csv").then((d) => createPie(d));

const createPie = (pieData) => {
  pieData = pieData.map((d) => ({
    country: d.country,
    sales: +d.sales,
  }));
  let width = 500;
  let height = 500;
  let margin = 50;
  var color = d3
    .scaleOrdinal()
    .domain(pieData.map((d) => d.country))
    .range(d3.schemePastel1);
  let arcRegion = d3.select("#arcs");
  arcRegion
    .attr("width", width)
    .attr("height", height)
    .attr("style", "border: solid 1px black");

  var radius = Math.min(width, height) / 2 - margin;

  let pieAngle = d3.pie().value((d) => {
    return d.sales;
  });

  let arc = d3
    .arc()
    .innerRadius(radius / 2)
    .outerRadius(radius);

  let radiusLength = radius + margin;
  arcRegion
    .selectAll(".arc")

    .data(pieAngle(pieData))
    .enter()
    .append("g")

    .append("path")
    .attr("d", arc)
    .attr("fill", function (d) {
      return color(d.data.country);
    })
    .attr("stroke", "black")
    .style("stroke-width", "2px")
    .style("opacity", 0.7)
    .attr("transform", "translate(" + radiusLength + "," + radiusLength + ")");
};
// <---------------- geographic map ------------------>
Promise.all([
  d3.csv("./dataset.csv"),
  d3.json(
    "https://raw.githubusercontent.com/python-visualization/folium/master/examples/data/world-countries.json"
  ),
  d3.csv("./additionalMarks.csv"),
]).then((d) => {
  makeCountries(d);
  // drawGraticule();
  enableRotation(d);
});

const config = {
  speed: 0.005,
  verticalTilt: -30,
  horizontalTilt: 0,
};
let bodyHeight = 750;
let bodyWidth = 1000;
let margin = 50;
const center = [bodyWidth / 2, bodyHeight / 6];
let geoSvg = d3
  .select("#geo")
  .append("svg")
  .attr("width", bodyWidth)
  .attr("height", bodyHeight)
  .attr("style", "border: solid 1px black");
const markerGroup = geoSvg.append("g");
const projection = d3.geoOrthographic();
const initialScale = projection.scale();
const path = d3.geoPath().projection(projection);

const makeCountries = async (dataEvery) => {
  let data = dataEvery[0];

  let worldData = dataEvery[1];

  let dataSources = {};
  for (let c of data) {
    let country = c.Country;
    dataSources[country] = +c.Magnitude;
  }

  worldData.features = worldData.features.map((d) => {
    let country = d.properties.name;
    let magnitude = dataSources[country];
    d.properties.magnitude = magnitude;
    return d;
  });

  let maxEarthquake = d3.max(data, (d) => {
    return d.Magnitude;
  });

  let cScale = d3
    .scaleLinear()
    .domain([0, maxEarthquake])
    .range(["white", "red"]);

  geoSvg
    .selectAll(".segment")
    // .data(topojson.feature(worldData, worldData.objects.countries).features)
    .data(worldData.features)
    .enter()
    .append("path")
    .attr("class", "segment")
    .attr("d", path)
    .style("stroke", "#888")
    .style("stroke-width", "1px")
    .attr("transform", "translate(0," + bodyHeight / 6 + ")")
    .attr("fill", (d) =>
      d.properties.magnitude ? cScale(d.properties.magnitude) : cScale(0)
    );
  drawMarkers(dataEvery);
};

function enableRotation(d) {
  d3.timer(function (elapsed) {
    projection.rotate([
      config.speed * elapsed,
      config.verticalTilt,
      config.horizontalTilt,
    ]);
    geoSvg.selectAll("path").attr("d", path);
    drawMarkers(d);
  });
}

function drawGraticule() {
  const graticule = d3.geoGraticule().step([10, 10]);

  geoSvg
    .append("path")
    .datum(graticule)
    .attr("class", "graticule")
    .attr("d", path)
    .style("fill", "white")
    .style("stroke", "#ccc")
    .style("opacity", ".2")
    .attr("transform", "translate(0," + bodyHeight / 6 + ")");
}
const drawMarkers = (dataEvery) => {
  let cScale = d3.scaleLinear().domain([0, 9.4]).range(["white", "black"]);
  let locations = dataEvery[2];
  const markers = markerGroup.selectAll("circle").data(locations);
  markers

    .enter()
    .append("circle")
    .merge(markers)
    .attr("cx", (d) => projection([d.Longitude, d.Latitude])[0])
    .attr("cy", (d) => projection([d.Longitude, d.Latitude])[1])
    .attr("fill", (d) => {
      const coordinate = [d.Longitude, d.Latitude];
      gdistance = d3.geoDistance(coordinate, projection.invert(center));
      return gdistance > 1 ? "none" : "steelblue";
    })
    .attr("r", 1.5)
    .attr("opacity", 0.3)
    // .style("fill", "steelblue")
    .attr("transform", "translate(0," + bodyHeight / 6 + ")");
  markerGroup.each(function () {
    this.parentNode.appendChild(this);
  });
};

// <----------------Network---------->

d3.json("./networkdata.json").then((d) => {
  createElements(d);
});

const createElements = (data) => {
  let height = 750;
  let width = 750;

  var result = data.links.reduce(function (result, d) {
    let currentData = result[d.source] || {
      id: d.source,
      count: 0,
    };
    currentData.count += 1;
    result[d.source] = currentData;
    return result;
  }, {});

  result = Object.keys(result).map((key) => result[key]);
  let dataNodes = data.nodes.map((item, i) =>
    Object.assign({}, item, result[i])
  );
  data.nodes = dataNodes;

  maxCircle = d3.max(data.nodes, (d) => d.count);
  console.log(maxCircle);
  console.log(data);
  circleScale = d3.scaleLinear().range([5, 15]).domain([0, maxCircle]);
  // .domain(data.nodes.map((d) => d.count));

  var svg = d3
    .select("#network")
    .append("svg")
    .attr("height", height)
    .attr("width", width)
    .attr("style", "border: solid 1px black");

  var node = svg
    .append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(data.nodes)
    .enter()
    .append("circle")
    .attr("r", (d) => {
      return d.count ? circleScale(d.count) : circleScale(0);
    })

    .attr("fill", "red");
  node.append("title").text((d) => d.id);

  var link = svg
    .append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(data.links)
    .enter()
    .append("line")
    .attr("stroke", "black");
  createNetwork(node, link, data);
};

const createNetwork = (node, link, data) => {
  let height = 750;
  let width = 750;
  simulation = d3
    .forceSimulation(data.nodes)
    .force(
      "link",
      d3
        .forceLink()
        .id((d) => d.id)
        .links(data.links)
    )
    .force("charge", d3.forceManyBody().strength(-1000))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .on("tick", tick);

  function tick() {
    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

    node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
  }
};
