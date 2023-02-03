---
layout: post
author: Liz
headname: Notes
date: 2022-09-17
tag: [r, tutorial, cartography, nps]
permalink: /notes/cartography-part-two
title: cartography in R part two
excerpt_separator: <!--more-->
---

This is a continuation of my [previous post]({{site.url}}/notes/cartography-part-one){:target="_blank" rel="noopener noreferrer"} where I walked through how to download and modify shapefile data. I also showed how to shift Alaska and Hawaii so they are closer to the continental usa. 
<!--more-->

In this post, I'll go over how to use Leaflet to map the shapefile we made in the previous post. If you've come here from [part one]({{site.url}}/notes/cartography-part-one){:target="_blank" rel="noopener noreferrer"} of the series, you probably have the libraries and data loaded already. However, if you don't, be sure to load the libraries and shapefiles before moving to number two.

{% include cartography.html %}

### 1. load libraries
<hr>

{% highlight r linenos %}
    ## load libraries
    library("tidyverse")    # data manipulation & map creation
    library("sf")           # loads shapefile
    library("leaflet")      # creates the map
{% endhighlight %}

I am not going to explain in detail what each of these packages do because I already covered it in [part one]({{site.url}}/notes/cartography-part-one   ){:target="_blank" rel="noopener noreferrer"}.

### 2. load data
<hr>

{% highlight r linenos %}
    ## load data
    states <- read_sf("~/Documents/Github/nps/shapefiles/shifted/usa/usa.shp")
{% endhighlight %}

Be sure to change <code>~/Documents/Github/nps/shapefiles/shifted/usa/usa.shp</code> to reflect wherever you saved the shifted shapefile.

If your data processing and base map creation are in the same file, you can skip this line, and when you make the Leaflet call below, you'll use the name of the variable where the shape data is stored.

### 3. create the base map
<hr>

At its most basic, all Leaflet needs to create a map is a base map and data layers. The code below may look intimidating, but it's mostly style options. 

This is the map we're going to create. It's a simple grey map and each state darkens in color as you hover over it. I'll show the same map after each style option is added so you can see what effect it has.

{%
    include figure.html
    src="/assets/notes-images/nps/nps-12.jpg"
    caption="Final USA basemap"
%}

<div class = "boxed">
<i class="fa-regular fa-note-sticky fa-xl"></i> <i>Note:</i> I will give the entire codeblock first. I also include the individual line before describing what it does. I find this to be cleaner than including a bunch of comments in the code itself. If you want to copy and paste the code to your own file, you only need to copy the code block and not each individual line.
</div>

{% highlight r linenos %}
    ## create usa base map using leaflet()
    map <- leaflet() %>%
    addPolygons(data = states,
        smoothFactor = 0.2,
        fillColor = "#808080",
        fillOpacity = 0.5,
        stroke = TRUE,
        weight = 0.5,
        opacity = 0.5,
        color = "#808080",
        highlight = highlightOptions(
            weight = 0.5,
            color = "#000000",
            fillOpacity = 0.7,
            bringToFront = FALSE),
        group = "Base Map")
{% endhighlight %}

* line 2:

{% highlight r %}
2    map <- leaflet() %>% 
{% endhighlight %}

<code>leaflet()</code> initializes the map widget. I save it to a variable called map (<code>map <-</code>) so I can run other code in the file without recreating the map each time. When you want to see the map, you can type <code>map</code> (or whatever you want to name your map) in the terminal and hit enter. R will display the map in the viewer.

<center><i class="fa-solid fa-paw"></i> <i class="fa-solid fa-paw"></i> <i class="fa-solid fa-paw"></i></center>

* line 3:
{% highlight r %}
3    addPolygons(data = states,
{% endhighlight %}

<code>addPolygons()</code> adds a layer to the map widget. Leaflet has different layer options, including <code>addTiles</code> and <code>addMarkers</code> which do different things. You can read about them on the [leaflet website](https://rstudio.github.io/leaflet/){:target="_blank" rel="noopener noreferrer"}. Since we're using a previously created shapefile, we'll add the shapefile to the map using <code>addPolygons()</code>.

The first argument you need to specify after calling addPolygons is <code>data = [data-source]</code>. <code>[data-source]</code> is whatever variable your data is stored in. For me, it's called <code>states</code>. This is either the processed data from part I of this series or the saved shapefile loaded above under the section called *load data*.

When you run *only* the first two lines, Leaflet will use its default styling. The base color will be a light blue and the outlines of the states will be dark blue and fairly thick.

{%
    include figure.html
    src="/assets/notes-images/nps/nps-13.jpg"
    caption="USA map with default leaflet styling"
%}

You can leave the base map like this if you want, but all additional data will be added as a layer *on top* of this map which can become distracting very quickly. I prefer to make my base maps as basic and unobtrusive as possible so the data I add on top of the base map is more prominent.

<center><i class="fa-solid fa-paw"></i> <i class="fa-solid fa-paw"></i> <i class="fa-solid fa-paw"></i></center>

* line 4

{% highlight r %}
4    smoothFactor = 0.2,
{% endhighlight %}

<code>smoothFactor</code> controls how much the polygon shape should be smoothed at each zoom level. The lower the number the more accurate your shapes will be. A larger number, on the other hand, will lead to better performance, but can distort the shapes of known areas.

I keep the <code>smoothFactor</code> low because I want the United States to appear as a coherent land mass. The image below shows three different maps, each with a different smoothFactor to illustrate what this argument does. On the left, the map's <code>smoothFactor=0.2</code>, the center map's <code>smoothFactor=10</code>, and the right's <code>smoothFactor=100</code>.

{%
    include figure.html
    src="/assets/notes-images/nps/nps-14.jpg"
    caption="SmoothFactor = 0.2 (left), 10 (center), 100 (right)"
%}

As you can see, the higher the <code>smoothFactor</code> the less coherent the United States becomes.

<div class = "boxed">
<i class="fa-regular fa-note-sticky fa-xl"></i> <i>Note:</i> Leaflet - all map programs, really - don't know that continents, countries, states, or any other land mass is a coherent set. It reads the shape data and spits out a map without regard to where things "should" be. It doesn't know California goes on the left or that Alaska is part of the United States. It's important to keep this in mind because each state's shape is rendered individually when using <code>addPolygons()</code>.
</div>

<center><i class="fa-solid fa-paw"></i> <i class="fa-solid fa-paw"></i> <i class="fa-solid fa-paw"></i></center>

* lines 5-6:

{% highlight r %}
5    fillColor = "#808080",
6    fillOpacity = 0.5,
{% endhighlight %}

<code>fillColor</code> refers to what color is on the inside of the polygons. Since I want a minimal base map, I usually set this value to be some shade of grey. If you want a different color, you only need to replace <code>#808080</code> with the corresponding hex code for the color you want. [Here](https://htmlcolorcodes.com/color-picker){:target="_blank" rel="noopener noreferrer"} is a useful hex color picker. If you have a hex value and you want the same color in a different shade, [this](https://javisperez.github.io/tailwindcolorshades/#/){:target="_blank" rel="noopener noreferrer"} is a useful site.

<code>fillOpacity</code> determines how transparent the color inside the shape should be. I set mine to be <code>0.5</code> because I like the way it looks. The number can be between 0 and 1 with 1 being fully opaque and 0 being fully transparent. 

<center><i class="fa-solid fa-paw"></i> <i class="fa-solid fa-paw"></i> <i class="fa-solid fa-paw"></i></center>

* line 7-10:

{% highlight r %}
7    stroke = TRUE,
8    weight = 0.5,
9    opacity = 0.5,
10   color = "#808080",
{% endhighlight %}

The next four lines define the appearance of the shapes' outline. 

The <code>stroke</code> property can be set to either <code>TRUE</code> or <code>FALSE</code>. When true, Leaflet adds an outline around each polygon. When false, the polygons have no outline. In the image below, the map on the left has the default outlines and on the right <code>stroke = FALSE</code>.

{%
    include figure.html
    src="/assets/notes-images/nps/nps-15.jpg"
    caption="Default outlines on the left, no outline on the right"
%}

<code>weight = 0.5</code> sets the thickness of the outlines to be 0.5 pixels. This can be any value you want with higher numbers corresponding to thicker lines. Lower numbers correspond to thinner lines.

The <code>opacity</code> property operates in the same way as fill opacity above, but on the outlines. The number can be between 0 and 1. Lower numbers correspond to the lines being more transparent and 1 means fully opaque.

<code>color = "#808080"</code> sets the color of the outline. I typically set it to be the same color as the fill color.

If you want a static base map then lines 2-10 are all you need, as shown in the image below. I like to add some functionality to my base map so that the individual states become darker when they're hovered over. 

{%
    include figure.html
    src="/assets/notes-images/nps/nps-16.jpg"
    caption="static base map"
%}

Lines 11-15 define the map's behavior when the mouse hovers over the shape. Most of the options are the same as the ones used on the base polygon shapes, so I won't go into them with much detail.

<center><i class="fa-solid fa-paw"></i> <i class="fa-solid fa-paw"></i> <i class="fa-solid fa-paw"></i></center>

* line 11:

{% highlight r %}
11    highlight = highlightOptions()
{% endhighlight %}

<code>highlight = highlightOptions()</code> contains the mouseover specifications. The word before the equal sign has to be either <code>highlight</code> or <code>highlightOptions</code>. I am not sure why you have to declare *highlight* twice, but you do. 

<code>highlightOptions()</code> is the actual function call. 

<center><i class="fa-solid fa-paw"></i> <i class="fa-solid fa-paw"></i> <i class="fa-solid fa-paw"></i></center>

* lines 12-14

{% highlight r %}
12    weight = 0.5,
13    color = "#000000",
14    fillOpacity = 0.7,
{% endhighlight %}

<code>weight</code>, <code>color</code>, and <code>fillOpacity</code> all operate in the same way as before, but whatever values you specify here will only show up when the mouse hovers over. 

<center><i class="fa-solid fa-paw"></i> <i class="fa-solid fa-paw"></i> <i class="fa-solid fa-paw"></i></center>

* line 15
{% highlight r %}
15    bringToFront = FALSE),
{% endhighlight %}

<code>bringToFront</code> takes one of two values: <code>TRUE</code> or <code>FALSE</code>. It only really matters when you have multiple layers (like we will in later parts of this series). When <code>bringToFront = TRUE</code> hovering over the state will bring it to the front. When <code>bringToFront = FALSE</code> it will stay in the back. 

Since the base map has only one layer, this property doesn't affect anything.

<center><i class="fa-solid fa-paw"></i> <i class="fa-solid fa-paw"></i> <i class="fa-solid fa-paw"></i></center>

* line 16

{% highlight r %}
16    group = "Base Map")
{% endhighlight %}

<code>group = "Base Map")</code> lets you group multiple layers together. This argument will come in handy as we add more information to the map. The base map is the default layer and is always visible - though, when you use map tiles you can define multiple base layers. All other layers will be on top of the base layer. When using different groups, you can define functionality that allows users to turn off certain layers. 

### 4. conclusion
You've created your first base map! It's a boring flat, grey map, but it's the base we'll use when adding in the national and state park data. In [part III]({{site.url}}/notes/cartography-part-three){:target="_blank" rel="noopener noreferrer"} of this series we'll process and add in the National Parks.

<figure>
<iframe seamless src="/assets/notes-images/nps/maps/usa.html" width="100%" 
height="500"></iframe><figcaption>United States base map made with Leaflet</figcaption></figure>