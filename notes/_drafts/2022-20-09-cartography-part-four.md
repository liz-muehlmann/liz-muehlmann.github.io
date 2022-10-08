---
layout: post
author: Liz
headname: Notes
date: 2022-10-04
tag: [r, tutorial, cartography, nps]
permalink: /notes/cartography-part-four
title: cartography in R part four
excerpt_separator: <!--more-->
---

Welcome to part four of my [cartography in R]({{site.url}}/pages/tag-forest.html/#cartography){:target="_blank" rel="noopener noreferrer"} series. In this post, we'll download and process the state park data before adding it to the base map created in [part II]({{site.url}}/notes/cartography-part-two){:target="_blank" rel="noopener noreferrer"}.

<!--more-->

### project outline
<hr>

I had to break the tutorial into different parts because it became unwieldy. I list the component parts below. The annotated version of the code can be found in this project's repository in the folder called [r files](https://github.com/liz-muehlmann/nps){:target="_blank" rel="noopener noreferrer"}

[I. cartography in r part one]( {{site.url}}/notes/cartography-part-one ){:target="_blank" rel="noopener noreferrer"}  
* install packages  
* download usa shapefile  
* shift alaska and hawaii
* save shapefile  

[II. cartography in r part two]( {{site.url}}/notes/cartography-part-two ){:target="_blank" rel="noopener noreferrer"}  
* create usa base map  

[III. cartography in r part three]( {{site.url}}/notes/cartography-part-three){:target="_blank" rel="noopener noreferrer"}  
* download national park data
* process national park data
* shift alaska and hawaii national parks
* save shapefile
* add national parks to map

[IV. cartography in r part four [this post]]( {{site.url}}/notes/cartography-part-four ){:target="_blank" rel="noopener noreferrer"}  
* download state park data
* process state park data
* shift alaska and hawaii state parks
* save shapefile
* add state parks to map

[V. cartography in r part five]( {{site.url}}/notes/cartography-part-five ){:target="_blank" rel="noopener noreferrer"}  
* add in shiny functionality
* add markers to visited parks
* save and embed map

### 1. load libraries
<hr>

{% highlight r linenos %}
    ## load libraries
    library("tidyverse")        # data manipulation & map creation
    library("sf")               # loads shapefile
    library("leaflet")          # creates the map
    library("operator.tools")   # not-in function
{% endhighlight %}

I am not going to explain in detail what each of these packages do because I already covered it in [part one]({{site.url}}/notes/cartography-part-one){:target="_blank" rel="noopener noreferrer"}.

### 2. load data
<hr>

{% highlight r linenos %}
    ## load data
    usa <- read_sf("~/Documents/Github/nps/shapefiles/shifted/usa/usa.shp")
    nps <- read_sf("~/Documents/GitHub/nps/shapefiles/shifted/nps/nps.shp")
{% endhighlight %}

Be sure to change <code>~/Documents/Github/nps/shapefiles/shifted/usa/usa.shp</code> and <code>~/Documents/GitHub/nps/shapefiles/shifted/nps/nps.shp</code> to reflect where you saved the shifted shapefiles.

If your data processing and base map creation are in the same file, you can skip these lines. When you make the Leaflet call below, you'll use the name of the variable where the shape data is stored.

### 3. download state park data
<hr>

Unlike the National Park data, the state data is harder to come by. After quite a bit of searching I found the [PAD-US](https://www.usgs.gov/programs/gap-analysis-project/science/pad-us-data-overview){:target="_blank" rel="noopener noreferrer"} data created by the United States Geological Survey. The data they collect is *amazing*. It is a "national inventory of U.S. terrestrial and marine protected areas." 

When they say *national inventory*, they mean it. It includes a detailed accounting of nearly every piece of public land "preserved through legal or other effective means" in the United States. For my project, it's overkill and it will take some investigating to determine what information I want to keep and what to discard. 

The first step is to navigate to the [PAD-US](https://www.usgs.gov/programs/gap-analysis-project/science/pad-us-data-overview){:target="_blank" rel="noopener noreferrer"} website and download the data. On the PAD-US website, click *View Data Download*. 

{%
    include figure.html
    src="/assets/notes-images/nps/nps-23.jpg"
    caption="PAD-US download"
%}

On the next page, you can download the National PAD-US data, the data by Census region, and by state. Click on *National Geopackage*. Make sure you select the geopackage one rather than the geodatabase version. On the next page, you'll confirm you're not a robot before the download link appears. 

{%
    include figure.html
    src="/assets/notes-images/nps/nps-24.jpg"
    caption="National data download - PAD-US"
%}

When it downloads, unzip it somewhere on your hard drive. The zip folder contains 35 files, so I suggest you create a folder before unzipping it so they stay together. 

### 4. load state park data
<hr>

Since the geopackage is so large, R has a difficult time opening and displaying the data. There's a couple of ways to view the data that does not rely on R. First, is to load the geopackage layers. This doesn't load the complete data set. Instead, it just loads the layer names which we'll use in conjunction with the [documentation](https://www.usgs.gov/programs/gap-analysis-project/pad-us-data-manual#Table1){:target="_blank" rel="noopener noreferrer"} and the [PAD-US Viewer](https://maps.usgs.gov/padus/){:target="_blank" rel="noopener noreferrer"}.

{% highlight r linenos %}
    layers <- st_layers("./shapefiles/original/state parks/padus_national_gpkg/PADUS3_0Geopackage.gpkg")
{% endhighlight %}

I save the layer names to a variable called <code>layers</code> so I can load them whenever I want. You don't have to, the <code>st_layers()</code> function will return the list regardless of whether it's saved.

<code>st_layers()</code> does not load the data in its entirety. It's an easy way to see what layers are included in the geopackage. On the left is the name of the layer, then what kind of layer it is (Multi Polygon), how many features it contains, and what coordinate system it uses. 

{%
    include figure.html
    src="/assets/notes-images/nps/nps-25.jpg"
    caption="PAD-US Layer List"
%}

The PAD-US geopackage contains seven layers which contain different kinds of information. The type of map you want to create will determine which layer you will use. For my map I want the same information for the state parks as I have for the national parks. I want:
* the state where the park is located
* the park name
* the park type 
* and the park's size. 

I have to figure out which of the seven layers listed above includes this information. You can load each layer (using the <code>st_read()</code> code below), but this method usually causes R to crash because there's too much data for it to handle. 

Instead, I go to the [PAD-US Viewer](https://maps.usgs.gov/padus/){:target="_blank" rel="noopener noreferrer"} and search for a state park. I am going to choose the *Valley of Fire State Park* in Nevada because 1) I know it exists, 2) I have been there. You can choose any state park you've been to, or choose one from a list of parks by state on [Wikipedia](https://en.wikipedia.org/wiki/Lists_of_state_parks_by_U.S._state){:target="_blank" rel="noopener noreferrer"}.

{%
    include figure.html
    src="/assets/notes-images/nps/nps-26.jpg"
    caption="PAD-US Viewer"
%}

In the search bar on the left, type in *Valley of Fire* (1) and select it from under the *Official Place Names* (2) panel that appears after you start typing. The map will adjust to show the park and you can click *Done* (3).

{%
    include figure.html
    src="/assets/notes-images/nps/nps-27.jpg"
    caption="Search for Valley of Fire State Park"
%}

The default view on the PAD-US Viewer includes the first layer's information, *Fee Managers* in the viewer and *PADUS3_0Fee* in the geopackage. According to the documentation, most public land is "owned in fee" though some land is held in "long-term easements, leases, agreements" or by Congressional designation. The Fee Layer documents what type of land it is. 

I don't actually care whether it's in fee or easement, my interest is solely in whether the Park's polygon is visible when this layer is selected in the viewer. 

{%
    include figure.html
    src="/assets/notes-images/nps/nps-28.jpg"
    caption="Valley of Fire State Park Polygon"
%}

The purple-ish polygon on the map shows the geographic boundaries of the Valley of Fire State Park. Great. You can check whether other layers have the same information by checking or unchecking the box next to the layer name. As you can see below, if I uncheck the Fee Manager layer and select the *Federal Fee Managers (Authoritative Data)* layer the polygon for the *Valley of Fire* disappears. This is because it is not federal land - it's state land. Be careful when choosing the layers because not all of them contain the correct information. 

I am going to select the Fee Layer and load it into R using the following code.

{% highlight r linenos %}
    
{% endhighlight %}