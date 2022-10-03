---
layout: post
author: Liz
headname: Notes
date: 2022-09-30
tag: [r, tutorial, cartography, nps]
permalink: /notes/cartography-part-three
title: cartography in R part three
excerpt_separator: <!--more-->
---

This is part three of my <a href="https://liz-muehlmann.github.io/pages/tag-forest.html/#cartography">cartography in R</a> series. The links to <a href="https://liz-muehlmann.github.io/notes/cartography-part-one">part one</a> and <a href="https://liz-muehlmann.github.io/notes/cartography-part-two">part two</a> are here. 

In this post, we'll process the National Park data before adding it to the base map created in <a href="https://liz-muehlmann.github.io/notes/cartography-part-two">part two</a>. I'll also add in pop up markers with images from the National Parks I've visited that link to the blog post where I've written about my adventures there.
<!--more-->

<i class="fa-regular fa-note-sticky fa-xl"></i> <i>Note:</i> I know that my posts are verbose. I am sorry that I am not more concise but one of the biggest problems I have with code documentation is that it assumes you already know what you're doing. I'm writing these for absolute beginners that want to know what each part of the code does. If you want more concise explanations, I suggest looking at the annotated <a href="https://github.com/liz-muehlmann/nps">r files</a> in this project's GitHub.

<h3>project outline</h3>
<hr>
I had to break the tutorial into different parts because it became unwieldy. I list the component parts below. The annotated version of the code can be found in this project's repository in the folder called <a href="https://github.com/liz-muehlmann/nps">r files</a>.

<a href="https://liz-muehlmann.github.io/notes/cartography-part-one"><u>I. cartography in R part one</u></a>
<ul><li>Install packages</li>
<li> Process USA data</li>
<li> Shift Alaska and Hawaii</li>
<li> Save shapefile</li></ul>

<a href="https://liz-muehlmann.github.io/notes/cartography-part-two"><u>II. cartography in R part two</u></a>
<ul><li> Create USA base map</li></ul>

<a href="https://liz-muehlmann.github.io/notes/cartography-part-three"><u>III. cartography in R part three [this post]</u></a>
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

{% highlight r linenos %}
    ## create usa basemap using leaflet()
    map <- leaflet() %>%                        # initialize the map widget
    addPolygons(data = states,                  # add state polygons
        smoothFactor = 0.2,                     # lower number means more detail
        fillColor = "#808080",                  # internal shape color
        stroke = TRUE,                          # add outlines
        weight = 0.5,                           # outline width
        opacity = 0.5,                          # outline opacity
        color = "#808080",                      # outline color    
        highlightOptions = highlightOptions(    # define hover parameters
            weight = 0.5,                       # outline width [hover]
            color = "#000000",                  # internal shape color [hover]
            fillOpacity = 0.7,                  # internal fill opacity [hover]
            bringToFront = FALSE),              # keep base map in back
        group = "basemap")                      # add to group
{% endhighlight %}

A detailed description of each of these lines can be found in part II of this series. Basic comments have been added for easy reference. The National and State Park data will be added on top of the base map as additional layers. 

<h3>3. download national park boundaries</h3>
<hr>

The first step is to download the data from <a href="https://public-nps.opendata.arcgis.com/">https://public-nps.opendata.arcgis.com/</a>. Once you click on the link you'll see a bunch of icons that lead to data different data that you can download. Click on the one for <i>boundaries</i>.

{%
    include figure.html
    src="/assets/notes-images/nps/nps-17.jpg"
    caption="NPS GIS website"
%}

I suggest taking some time to and looking through the site and seeing the kinds of data that are available. For now, after you click on <i>boundaries</i> the next page will have a list of all the data sets you can download. The second link should be <i>nps boundary</i> which is the one we're interested in. This will have all the data for the National Park boundaries, hiking trails, rest aries, and a ton of other data. 

{%
    include figure.html
    src="/assets/notes-images/nps/nps-18.jpg"
    caption="NPS download page"
%}

Once you click on the <i>nps boundary</i> link, it will take you to a map and another download link.

{%
    include figure.html
    src="/assets/notes-images/nps/nps-19.jpg"
    caption="NPS map and download link"
%}

From here, you'll have a few options of what format you want the data in. We want the shapefile version. 

{%
    include figure.html
    src="/assets/notes-images/nps/nps-20.jpg"
    caption="download nps shapefile"
%}

Save it somewhere on your hard drive that you'll remember and then unzip the file.

<h3>4. process national park data</h3>
<hr>

<h3>5. create national park labels</h3>
<hr>

<h3>6. add national parks to map</h3>
<hr>

<h3>7. conclusion</h3>
<hr>
<i class="fa-regular fa-note-sticky fa-xl"></i> <i>Note:</i> I will give the entire codeblock first. I also include the individual line before describing what it does. I find this to be cleaner than including a bunch of comments in the code itself. If you want to copy and paste the code to your own file, you only need to copy the code block and not each individual line.

