// create scatterplot with d3
const svg2 = d3.select("#scatterplot")
const width2 = svg2.attr("width");
const height2 = svg2.attr("height");
const margins2 = { top: 50, right: 50, bottom: 20, left: 60 };
const scatterWidth = width2 - margins2.left - margins2.right;
const scatterHeight = height2 - margins2.top - margins2.bottom;

let chartArea = svg2.append("g")
    .attr("transform", "translate(" + margins2.left + ", " + margins2.top + ")");


// load data files
const scatterPlot = async function (checkbox) {
    d3.csv("zillow.csv").then(function (data) {
        console.log(data);
        // filter data that property type is single family

        let selectedProperties = []
        for (let i = 0; i < checkbox.length; i++) {
            if (checkbox[i].checked) {
                selectedProperties.push(checkbox[i].value)
            }
        }

        let filtered_data = data.filter(d => selectedProperties.includes(d['Property Type']));
        filtered_data = filtered_data.filter(d => d['Bedrooms'] != "NaN");
        console.log(filtered_data);

        // create scales
        // xScale: Sale Amount
        const saleExtent = d3.extent(filtered_data, d => d['Sale Amount']);
        const xScale = d3.scaleLinear().domain([0,8]).range([0, scatterWidth]);
        console.log(saleExtent);
        
        // yScale: Bedroom Count
        const bedroomExtent = d3.extent(filtered_data, d => d['Bedrooms']);
        const yScale = d3.scaleLog().domain([38464,1800000]).range([scatterHeight, 0]);
        console.log(bedroomExtent);

        // create axes
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);
        
        // draw axes
        chartArea.append("g")
            .attr("transform", "translate(0, " + scatterHeight + ")")
            .call(xAxis);
        chartArea.append("g")
            .call(yAxis);
        
        // draw circles
        filtered_data.forEach(function (d) {

            chartArea.append("circle")
                .attr("cx", xScale(d['Bedrooms']))
                .attr("cy", yScale(d['Sale Amount']))
                .attr("r", 2)
                .attr("fill", "purple")
                .attr("opacity", 0.5);

        });
    });
}




