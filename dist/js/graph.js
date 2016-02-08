
var HEIGHT = 300;
var WIDTH = 500; 

// var base = 


var data1_url = 'http://myvillageshop.com/data.php'
var data2_url = 'http://myvillageshop.com/data2.php'

function get_data(url) {

	var ret = {x: [], y: []}

	var data = $.getJSON(url, function(data) {
		for (d of data) {
			ret.x.push(Date.parse(d.Last_Update));
			ret.y.push(parseInt(d.Vo));
		}
	});

	// console.log(ret)

	return ret

}

function calc_data_diff(data1, data2) {

	var ret = {x: [], y: []};

	len = Math.min(data1.x.length, data2.x.length);
	console.log(len);
	ret.x = data1.x.slice(0, len);

	for (var i=0; i < len; i++) {
		// console.log((data1.y[i]-data2.y[i])/2);
		ret.y.push((data1.y[i]-data2.y[i])/2);
	}

	// console.log(ret);
	return ret;

}

var data1 = get_data(data1_url)
data1.label = 'Inside'
var data2 = get_data(data2_url)
data2.label = 'Outside'

var data = [data1, data2]

setTimeout(function(){
    var xy_chart = d3_xy_chart()
	    .width(WIDTH)
	    .height(HEIGHT)
	    .xlabel("Time updated")
	    .ylabel("Volume") ;
	var svg = d3.select("#graph").append("svg")
	    .datum(data)
	    .call(xy_chart) ;

	var data_diff = calc_data_diff(data1, data2)
	data_diff.label = 'Difference'
	data_diffed = [data_diff]

	setTimeout(function() {
		console.log(data_diff);
		var xy_chart = d3_xy_chart()
		    .width(WIDTH)
		    .height(HEIGHT)
		    .xlabel("Time updated")
		    .ylabel("Volume") ;
		var svg = d3.select("#graph-diff").append("svg")
		    .datum(data_diffed)
		    .call(xy_chart) ;
	}, 2000);

	
}, 2000);


function d3_xy_chart() {
    
    function chart(selection) {
        selection.each(function(datasets) {

            var margin = {top: 20, right: 80, bottom: 30, left: 50}, 
                innerwidth = width - margin.left - margin.right,
                innerheight = height - margin.top - margin.bottom ;
            
            var x_scale = d3.scale.linear()
                .range([0, innerwidth])
                .domain([ d3.min(datasets, function(d) { return d3.min(d.x); }), 
                          d3.max(datasets, function(d) { return d3.max(d.x); }) ]) ;
            
            var y_scale = d3.scale.linear()
                .range([innerheight, 0])
                .domain([ d3.min(datasets, function(d) { return d3.min(d.y); }),
                          d3.max(datasets, function(d) { return d3.max(d.y); }) ]) ;

            var color_scale = d3.scale.category10()
                .domain(d3.range(datasets.length)) ;

            var x_axis = d3.svg.axis()
                .scale(x_scale)
                .orient("bottom")
                .ticks(16) ;



            var y_axis = d3.svg.axis()
                .scale(y_scale)
                .orient("left") ;

            var x_grid = d3.svg.axis()
                .scale(x_scale)
                .orient("bottom")
                .ticks(16)
                .tickSize(-innerheight, 1)
                .tickFormat("") ;

            var y_grid = d3.svg.axis()
                .scale(y_scale)
                .orient("left") 
                .tickSize(-innerwidth)
                .tickFormat("") ;

            var draw_line = d3.svg.line()
                .interpolate("basis")
                .x(function(d) { return x_scale(d[0]); })
                .y(function(d) { return y_scale(d[1]); }) ;

            var svg = d3.select(this)
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")") ;
            
            svg.append("g")
                .attr("class", "x grid")
                .attr("transform", "translate(0," + innerheight + ")")
                .call(x_grid) ;

            svg.append("g")
                .attr("class", "y grid")
                .call(y_grid) ;

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + innerheight + ")") 
                .call(x_axis)
                .append("text")
                .attr("dy", "-.71em")
                .attr("x", innerwidth)
                .style("text-anchor", "end")
                .text(xlabel) ;

            // x_axis.tickValues(d3.range(0, 16, 1));
            
            svg.append("g")
                .attr("class", "y axis")
                .call(y_axis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .style("text-anchor", "end")
                .text(ylabel) ;

            var data_lines = svg.selectAll(".d3_xy_chart_line")
                .data(datasets.map(function(d) {return d3.zip(d.x, d.y);}))
                .enter().append("g")
                .attr("class", "d3_xy_chart_line") ;
            
            data_lines.append("path")
                .attr("class", "line")
                .attr("d", function(d) {return draw_line(d); })
                .attr("stroke", function(_, i) {return color_scale(i);}) ;
            
            data_lines.append("text")
                .datum(function(d, i) { return {name: datasets[i].label, final: d[d.length-1]}; }) 
                .attr("transform", function(d) { 
                    return ( "translate(" + x_scale(d.final[0]) + "," + 
                             y_scale(d.final[1]) + ")" ) ; })
                .attr("x", 3)
                .attr("dy", ".35em")
                .attr("fill", function(_, i) { return color_scale(i); })
                .text(function(d) { return d.name; }) ;

        }) ;
    }

    chart.width = function(value) {
        if (!arguments.length) return width;
        width = value;
        return chart;
    };

    chart.height = function(value) {
        if (!arguments.length) return height;
        height = value;
        return chart;
    };

    chart.xlabel = function(value) {
        if(!arguments.length) return xlabel ;
        xlabel = value ;
        return chart ;
    } ;

    chart.ylabel = function(value) {
        if(!arguments.length) return ylabel ;
        ylabel = value ;
        return chart ;
    } ;

    return chart;
}
