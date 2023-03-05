const svg = d3.select("#map-svg");
const width = svg.attr("width");
const height = svg.attr("height");
const margins = { top: 20, right: 20, bottom: 20, left: 20 };
const mapWidth = width - margins.left - margins.right;
const mapHeight = height - margins.top - margins.bottom;
const map = svg.append("g")
                .attr("transform", "translate(" + margins.left + ", " + margins.top + ")");

// load data files
const requestData = async function () {
const house_data = await d3.csv("zillow.csv");
console.log(house_data);
const pittsburgh = await d3.json("pittsburgh_neighborhoods.geo.json");

// draw map
let projection = d3.geoMercator().fitSize([mapWidth, mapHeight], pittsburgh);
let path = d3.geoPath().projection(projection);

map.selectAll("path.neighborhoods").data(pittsburgh.features)
.join("path")
.attr("class", "neighborhoods")
.attr("d", path)
.attr("fill", "gray")
.attr("stroke", "white");

// draw circles for houses
const price_colors = d3.schemeOranges[10];

house_data.forEach(d => {
    d.position = projection([d.Longitude, d.Latitude]);
    });

map.selectAll("circle").data(house_data)
.join("circle")
.attr("r", 3)
.attr("fill", "black")
.attr("cx", d => d.position[0])
.attr("cy", d => d.position[1]);


// You can choose which filter you prefer? 
// I think the checkbox is more intuitive, but the select is more compact.

// draw filters for property type
const type_filter_div = d3.select("#type-filter-div");
const type_filter = type_filter_div.append("select")
.attr("id", "type-filter");

const types = house_data.map(d => d['Property Type']);
const unique_types = [...new Set(types)];
console.log();
unique_types.forEach(d => {
type_filter.append("option")
    .attr("value", d)
    .text(d);
});

// draw checkboxes for property type
const type_checkboxes = type_filter_div.append("div")
.attr("id", "type-checkboxes");

unique_types.forEach(d => {
    type_checkboxes.append("input")
    .attr("type", "checkbox")
    .attr("value", d)
    .attr("id", d)
    .attr("name", "type-checkbox")
    .attr("checked", true);
type_checkboxes.append("label")
    .attr("for", d)
    .text(d);
    });




}

    requestData();

    
    