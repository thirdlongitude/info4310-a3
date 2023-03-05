// create scatterplot with d3



function scatterPlot(checkbox, data, scatterWidth, scatterHeight, chartArea) {
    // filter data based on property type
    let selectedProperties = []
    for (let i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked) {
            selectedProperties.push(checkbox[i].value)
        }
    }

    let filtered_data = data.filter(d => selectedProperties.includes(d['Property Type']));
    filtered_data = filtered_data.filter(d => d['Bedrooms'] != "NaN");

    // create scales
    // xScale: Sale Amount
    const saleExtent = d3.extent(filtered_data, d => d['Sale Amount']);
    const xScale = d3.scaleLinear().domain([0,8]).range([0, scatterWidth]);
    
    // yScale: Bedroom Count
    const bedroomExtent = d3.extent(filtered_data, d => d['Bedrooms']);
    const yScale = d3.scaleLog().domain([38464,1800000]).range([scatterHeight, 0]);

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
    chartArea.selectAll("circle")
        .data(filtered_data)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d['Bedrooms']))
        .attr("cy", d => yScale(d['Sale Amount']))
        .attr("r", 2)
        .attr("fill", "purple")
        .attr("opacity", 0.5);
}