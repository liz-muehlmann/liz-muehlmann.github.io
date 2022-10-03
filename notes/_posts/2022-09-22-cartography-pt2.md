---
layout: post
author: Liz
headname: Notes
date: 2022-09-22
tag: [r, tutorial, cartography, nps]
permalink: /notes/cartography-part-two
title: cartography in R part two
excerpt_separator: <!--more-->
---

This is a continuation of my previous <a href="/notes/_posts/2022-09-21-cartography-pt1.md">post</a> where I walked through downloading and modifying shape data. I also showed how to shift Alaska and Hawaii so they are closer to the continental United States.
<!--more-->

In this post, I'll go over how to use leaflet to map the shapefile we made in the previous post. If you've come here from <a href="https://liz-muehlmann.github.io/notes/cartography-part-one">part one</a> of the series, you most likely have the libraries and data loaded already. However, if you don't be sure to load the libraries and shapefiles before moving to number 2. 

<h3>project outline</h3>
<hr>
I had to break the tutorial into different parts because it became unwieldy. I list the component parts below. The annotated version of the code can be found in this project's repository in the folder called <a href="https://github.com/liz-muehlmann/nps">r files</a>.

<a href="https://liz-muehlmann.github.io/notes/cartography-part-one"><u>I. cartography in R part one</u></a>
<ul><li>Install packages</li>
<li> Process USA data</li>
<li> Shift Alaska and Hawaii</li>
<li> Save shapefile</li></ul>

<a href="https://liz-muehlmann.github.io/notes/cartography-part-two"><u>II. cartography in R part two [this post]</u></a>
<ul><li> Create USA base map</li></ul>

<a href="https://liz-muehlmann.github.io/notes/cartography-part-three"><u>III. cartography in R part three</u></a>
<ul><li>Process national and state park data</li>
<li>Add national and state park data to the base map</li></ul>

<a href="https://liz-muehlmann.github.io/notes/cartography-part-four"><u>IV. cartography in R part four</u></a>
<ul><li>Add in Shiny functionality</li>
<li>Save final map</li>
<li>Publish map</li></ul>

<h3>1. load the libraries</h3>
<hr>

{% highlight r linenos %}
    ## load libraries
    library("tidyverse")    # data manipulation & map creation
    library("sf")           # loads shapefile
    library("leaflet")      # creates the map

    ## load data
    states <- read_sf("~/Documents/Github/nps/shapefiles/shifted/usa/usa.shp")
{% endhighlight %}

I am not going to explain in detail what each line is doing here, because it's already available in part one.

In line 7 be sure to change <code>"~/Documents/Github/nps/shapefiles/shifted/usa/usa.shp"</code> to reflect wherever you saved the shifted shapefile. 

If your data processing and base map creation are in the same file, you can skip line 7 and use the variable name where the shape data is stored when you make the leaflet call below.

<h3>2. create the base map</h3>
<hr>
At its most basic, all Leaflet needs to create a map is a data source and either map tiles or polygons. The code below may look intimidating, but it's mostly style options. 

This is the map that we're going to create. It's a simple grey map and each state darkens in color as you hover over it. I'll show the same map as each style option is changed so you can see what they do.

{%
    include figure.html
    src="/assets/notes-images/nps/nps-12.jpg"
    caption="Final USA basemap"
%}

<i class="fa-regular fa-note-sticky fa-xl"></i> <i>Note:</i> I will give the entire codeblock first. I also include the individual line before describing what it does. I find this to be cleaner than including a bunch of comments in the code itself. If you want to copy and paste the code to your own file, you only need to copy the code block and not each individual line.

{% highlight r linenos %}
    ## create usa basemap using leaflet()
    map <- leaflet() %>%
    addPolygons(data = states,
        smoothFactor = 0.2,
        fillColor = "#808080",
        stroke = TRUE,
        weight = 0.5,
        opacity = 0.5,
        color = "#808080",
        highlightOptions = highlightOptions(
            weight = 0.5,
            color = "#000000",
            fillOpacity = 0.7,
            bringToFront = FALSE),
        group = "basemap")
{% endhighlight %}

<li class="tab1">line 2:</li>
{% highlight r %}
    map <- leaflet() %>% 
{% endhighlight %}

<div class="tab2"><code>leaflet()</code> initializes the map widget. I save it to a variable called map  (<code> map <-</code>) so I can run other code without recreating the map each time. When you want to see the map, you can type <code>map</code> (or whatever you want to name your map) in the terminal and hit enter. R will display the map in the viewer.</div>
<br>

<li class="tab1">line 3:</li>
{% highlight r %}
    addPolygons(data = states,
{% endhighlight %}

<div class="tab2"><code>addPolygons()</code> adds a layer to the map widget. Leaflet has different layer options, including <code>addTiles</code> and <code>addMarkers</code> which do different things. You can read about them on the <a href="https://rstudio.github.io/leaflet/">leaflet website</a>. Since we're using a previously created shapefile, we'll add the shapefile to the map using <code>addPolygons()</code>.
<br><br>

The first argument you need to specify after calling addPolygons is <code>data = [data-source]</code>. <code>[data-source]</code> is whatever variable your data is stored in. For me, it's called <code>states</code>. This is either the processed data from part I of this series or the saved shapefile loaded in the first code chunk above in line 7.</div>
<br>
When you run <i>only</i> the first two lines, Leaflet will use default styling. The base color will be a light blue and the outlines of the states will be dark blue and fairly thick. 

{%
    include figure.html
    src="/assets/notes-images/nps/nps-13.jpg"
    caption="USA map with default leaflet styling"
%}

You can leave the base map like this if you want, but all additional data will be added as a layer <i>on top</i> of this map which can become distracting very quickly. I prefer to make my base maps basic and unobtrusive as possible so the data I add on top of the base map is more prominent.

<li class="tab1">line 4:</li>
{% highlight r %}
    smoothFactor = 0.2,
{% endhighlight %}
<div class="tab2">The argument <code>smoothFactor = 0.2</code> is how much the polygon should be smoothed at each level.The lower the number the more accurate your shapes will be while a larger number means smoother rendering. I keep the <code>smoothFactor</code> low because I want the United States to appear as a coherent land mass.The image below shows three different maps, each with a different smoothFactor to illustrate what this argument does. On the left the map's <code>smoothFactor = 0.2</code>, the center map's <code>smoothFactor=10</code>, and the right's <code>smoothFactor=100</code>.</div> 
<br>

{%
    include figure.html
    src="/assets/notes-images/nps/nps-14.jpg"
    caption="SmoothFactor = 0.2 (left), 10 (center), 100 (right)"
%}

<div class ="tab2">As you can see, the higher the <code>smoothFactor</code> the less coherent the United States becomes. </div>
<br>

<i class="fa-regular fa-note-sticky fa-xl"></i> <i>Note:</i> Leaflet - all map programs, really - don't know that continents, countries, states, or any other land mass is a coherent set. It reads the shape data and spits out a map without regard to where things "should" be. It doesn't know California goes on the left or that Alaska is part of the United States. It's important to keep this in mind because each state's shape is rendered individually when using <code>addPolygons()</code>. 
<br>

<li class="tab1">line 5:</li>
{% highlight r %}
    fillColor = "#808080",
{% endhighlight %}

<div class="tab0"><code>fillColor</code> refers to what color is on the inside of the polygons. Since I want a minimal base map, I usually set this value to be some shade of grey. If you want a different color, you only need to replace <code>#808080</code> with the corresponding hex code to the color you want. <a href="https://htmlcolorcodes.com/color-picker/">Here</a> is a useful hex code picker. If you have a hex value and you want the same color in a different shade, <a href="https://javisperez.github.io/tailwindcolorshades/#/">this</a> is a useful site.</div>
<br>

<li class="tab1">line 6-9:</li>
{% highlight r %}
    stroke = TRUE,
    weight = 0.5,
    opacity = 0.5,
    color = "#808080",
{% endhighlight %}

<div class="tab0"><code>stroke</code>, <code>weight</code>, <code>opacity</code>, and <code>color</code> all refer to the boundary lines that outline each polygon. 
<br><br>

The <code>stroke</code> property can be set to either <code>TRUE</code> or <code>FALSE</code>. When true, Leaflet adds an outline around each polygon. When false, the polygons have no outline. In the image below, the map on the left has the default outlines and on the right <code>stroke = FALSE</code>.</div>

{%
    include figure.html
    src="/assets/notes-images/nps/nps-15.jpg"
    caption="Default outlines on the left, no outline on the right"
%}

<div class="tab0"><code>weight = 0.5</code> sets the thickness of the outlines to be 0.5 pixels. This can be any value you want with higher numbers corresponding to thicker lines. Lower numbers correspond to thinner lines.
<br><br>

The <code>opacity</code> property operates in the same way as fill opacity above, but on the outlines. The number can be between 0 and 1. Lower numbers correspond to the lines being more transparent and 1 means fully opaque.
<br><br>

<code>Color = "#808080"</code> sets the color of the outline. I typically set it to be the same color as the fill color.
</div>
<br>
If you want a static base map then lines 2-9 are all you need, as shown in the image below. I like to add some functionality to my base map so that the individual states become darker when they're hovered over. In <a href="liz-muehlmann.github.io/notes/cartography-part-three"> part III</a> of this series I use the base shapefile to include a popup that includes the state name.

{%
    include figure.html
    src="/assets/notes-images/nps/nps-16.jpg"
    caption="static base map"
%}

Lines 10-14 define the map's behavior when the mouse hovers over the shape. A lot of the options are the same as the ones used on the base polygon shapes, so I won't go into them with much detail. 

<li class="tab1">line 10:</li>
{% highlight r %}
    highlightOptions = highlightOptions()
{% endhighlight %}

<div class="tab0"><code>highlightOptions = highlightOptions()</code> I genuinely don't know why you have to declare <code>highlightOptions</code> twice, but you do. Just know that all the information about the map's behavior on mouseover needs to be included in the actual function call to <code>highlightOptions()</code> that comes <i>after</i> the equal sign. </div>
<br> 

<li class="tab1">lines 11-13:</li>
{% highlight r %}
    weight = 0.5,
    color = "#000000",
    fillOpacity = 0.7,
{% endhighlight %}

<div class="tab0"><code>weight</code>, <code>color</code>, and <code>fillOpacity</code> all operate in the same way as before, but the properties are only active on mouseover. 
<br><br>
<code>weight</code> defines what happens to the outline of the polygon.
<br><br>

<code>color</code> and <code>fillOpacity</code> determines what color and how opaque the polygon becomes on mouseover. </div>
<br>
<li class="tab1">line 14:</li>
{% highlight r %}
    bringToFront = FALSE),
{% endhighlight %}

<div class="tab0"><code>bringToFront</code> takes one of two values: <code>TRUE</code> or <code>FALSE</code>. It only really matters when you have multiple layers (like we will in later parts of this series). When <code>bringToFront = TRUE</code> hovering over the state will bring it to the front. When <code>bringToFront = FALSE</code> it will stay in the back. 
<br><br>

Since the base map only has one layer, there's nothing to bring the shape in front of.
</div>
<br>

<li class="tab1">line 15:</li>
{% highlight r %}
    group = "basemap")
{% endhighlight %}

<div class="tab0"><code>group = basemap</code> lets you group multiple layers together. This argument will come in handy as we add more information to the map, so I won't go into much detail here. Just know that without more layers, the <code>group=</code> argument is fairly useless.</div>

<h3> 3. Conclusion </h3>
<hr>
You've created your first base map! It's a boring map a flat, grey map, but it's our base and in <a href = "https:/liz-muehlmann.github.io/notes/cartography-part-three">part three</a> of this series we'll process and add in the National Parks.

<figure>
<iframe seamless src="/assets/notes-images/nps/maps/usa.html" width="100%" 
height="500"></iframe><figcaption>United States base map made with Leaflet</figcaption></figure>