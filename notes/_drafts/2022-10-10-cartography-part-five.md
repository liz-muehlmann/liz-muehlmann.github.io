---
layout: post
author: Liz
headname: Notes
date: 2022-10-04
tag: [r, tutorial, cartography, nps]
permalink: /notes/cartography-part-five
title: cartography in R part five
excerpt_separator: <!--more-->
---

Welcome to part five of my [cartography in R]({{site.url}}/pages/tag-forest.html/#cartography){:target="_blank" rel="noopener noreferrer"} series. In this post I'll return to the maps created in [part II]({{site.url}}/notes/cartography-part-two){:target="_blank" rel="noopener noreferrer"} and [part III]({{site.url}}/notes/cartography-part-three){:target="_blank" rel="noopener noreferrer"} to include a [Shiny](https://shiny.rstudio.com/){:target="_blank" rel="noopener noreferrer"} information box and popups linking to posts about my adventures in the National Parks.

<!--more-->

{% include cartography.html %}

### 1. load libraries
<hr>

Create a new file called <code>app.r</code> which we'll use to build in the Shiny functionality. Keep in mind Shiny requires the filename to be <code>app</code>.

<div class = "boxed">
<i class="fa-regular fa-note-sticky fa-xl"></i> <i>Note:</i> I will give the entire codeblock first. I also include the individual line before describing what it does. I find this to be cleaner than including a bunch of comments in the code itself. If you want to copy and paste the code to your own file, you only need to copy the code block and not each individual line.</div>

{% highlight r linenos %}
    library(tidyverse)      # useful data manipulation tools
    library(sf)             # read and write shapefiles
    library(tigris)         # downloading shapefiles for Method 1
    library(leaflet)        # map creation
    library(operator.tools) # not-in function
    library(shiny)          # interactivity
{% endhighlight %}

I am not going to explain in detail what the packages in lines 1-5 do because I already covered it in [part one]({{site.url}}/notes/cartography-part-one){:target="_blank" rel="noopener noreferrer"}. 

* Shiny is an R-Studio package, which let's "users interact with your data and your analysis" [(from the Shiny website)](https://shiny.rstudio.com/). The package let's you create interactive web apps in R. The web apps can be hosted as stand-alone pages or can be embedded elsewhere. And, according to the website, they can be modified and extended with CSS, HTML, and JavaScript. 

In a previous map I made I used labels to create a pop up which contained information about the number of newspapers in each county. In that map, I was only interested in showing the population and number of newspapers. 

{%
    include figure.html
    src="/assets/notes-images/nps/nps-35.jpg"
    caption="Map showing information pop ups"
%}

In this map, I wanted to find a way to move the data from the pop up to a separate section of the map. In doing so, I could display more information in less space and wouldn't have to deal with pop ups that collided into each other when National and State Parks were close together. 

I want to move a lot of the basic information about park name and its size to a box in the corner and only use the pop ups to display a small photo of the park that leads to a blog about my adventure in the park. 

### 2. load data
<hr>

{% highlight r linenos %}
    ## load data
    usa <- as_Spatial(read_sf("~/Documents/Github/nps/shapefiles/shifted/usa/usa.shp"))
    nps <- as_Spatial(read_sf("~/Documents/GitHub/nps/shapefiles/shifted/nps/nps.shp"))
{% endhighlight %}



Be sure to change <code>~/Documents/Github/nps/shapefiles/shifted/usa/usa.shp</code> and <code>~/Documents/GitHub/nps/shapefiles/shifted/nps/nps.shp</code> to reflect where you saved the shifted shapefiles.

### 3. the complete code
<hr>

The customization aspects of the map - using special colors, adding in Shiny functionality, etc - are all declared before Shiny is initialized. That creates some difficulty in how to best present the code. 

First, I'll give all the code then cover what's different in each section. If you're using the code we created in [part III]({{site.url}}/notes/cartography-part-three){:target="_blank" rel="noopener noreferrer"} be mindful of where the new lines appear so you can avoid any errors.


### 4. calculate park area
### 5. define national park colors
<hr>

I like to use different colors on my maps to indicate different things. In the map above, the warmer colors indicate less newspapers and the cooler colors indicate more newspapers with green being areas with the most newspapers. 

In this map, I want to use colors that reflect the land's designation types. I want the rivers to show up blue, the parks to be green, and other areas to be colored as I dictate. 

{% highlight r linenos %}
    nps_color <- colorFactor(c("#B2AC88", # national historical
                            "#F9F2CB", # international historical       
                            "#99941A", # military
                            "#006C5F", # park
                            "#568762", # preserves and rec areas
                            "#31B8E6", # lakes and rivers
                            "#899B7C", # trails
                            "#AFAC99"), nps$type) # other
{% endhighlight %}

Line 1 creates a variable which I'll use later in the leaflet call. It makes the leaflet call cleaner and less cluttered, though I imagine you could declare the colors directly in the <code>addPolygons()</code> call.

<code>colorFactor()</code> is part of the *Leaflet* package. It assigns colors to factors (categories) - here the factors are the types of National Public Lands. It takes several arguments which you can read about on the [R website](https://search.r-project.org/CRAN/refmans/leaflet/html/colorNumeric.html){:target="_blank" rel
="noopener noreferrer"}. 

The first argument is the *palette.* This can be one of the palettes built into [R Color Brewer](https://r-graph-gallery.com/38-rcolorbrewers-palettes.html ){:target="_blank" rel="noopener noreferrer"} or like here (the hex codes in lines 1-8), one that the user specifies. 

<div class = "boxed">
<i class="fa-regular fa-note-sticky fa-xl"></i>
<i>Note:</i>
    A helpful tool specifically for picking map colors <a href="https://colorbrewer2.org/#type=sequential&scheme=BuGn&n=3">Color Brewer 2</a>. I also use <a href="https://mycolor.space/">mycolor.space</a> to create palettes that I like.
</div>

<code>nps$type</code> is the *domain* of the data. It's the categories that R will map the colors to. <code>colorFactor</code> requires categorical data. 

If you're creating your own palette, the order you list the colors has to match the order of the domain. To easily check what order the domain is in run <code>levels(as.factor(nps$type))</code> in the terminal. This will return a list of values which you can use to map the colors. 

I include a comment of which colors will be mapped to which category so that I can easily change them if necessary.

{%
    include figure.html
    src="/assets/notes-images/nps/nps-36.jpg"
    caption="List of National Land Categories"
%}

### 6. create information box
<hr>

Shiny apps have three components:

1. A *User-Interface* app (<code>ui</code>) which controls the "layout and appearance" of the app. 
2. A server function which tells the computer how to create the app.
3. A call to the <code>shinyApp</code> function creates the Shiny objects using the first two components.




