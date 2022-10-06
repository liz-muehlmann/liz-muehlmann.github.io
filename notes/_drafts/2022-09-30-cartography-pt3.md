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

<h3>1. load libraries and data</h3>
<hr>

{% highlight r linenos %}
    ## load libraries
    library(tidyverse)      # data manipulation & map creation
    library(sf)             # loads shapefile
    library(operator.tools) # not in function
    library(tigris)         # use to shift Alaska & Hawaii
    library(leaflet)        # creates the map

    ## load usa shapefile
    states <- read_sf("~/Documents/Github/nps/shapefiles/shifted/usa/usa.shp")
{% endhighlight %}

I am not going to explain in detail what each line is doing here, because it's already available in part one.

In line 7 be sure to change <code>"~/Documents/Github/nps/shapefiles/shifted/usa/usa.shp"</code> to reflect wherever you saved the shifted shapefile. 

If your data processing and base map creation are in the same file, you can skip line 7 and use the variable name where the shape data is stored when you make the leaflet call below.

<h3>2. download national park boundaries</h3>
<hr>

The first step is to download the data from <a href="https://public-nps.opendata.arcgis.com/">https://public-nps.opendata.arcgis.com/</a>. Once you click on the link you'll see a bunch of icons that lead to different data that you can download. Click on the one for <i>boundaries</i>.

{%
    include figure.html
    src="/assets/notes-images/nps/nps-17.jpg"
    caption="NPS GIS website"
%}

I suggest taking some time and looking through the site and seeing the kinds of data that are available. For now, click on the <i>boundaries</i> icon. You'll be taken to a list of available National Park data. The second link should be <i>nps boundary</i> which is the one we're interested in. This will have all the data for the National Park boundaries, hiking trails, rest aries, and a ton of other data. 

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

<h3>3. process national park data</h3>
<hr>

{% highlight r linenos %}
    ## create territories list
    territories <- c("AS", "GU", "MP", "PR", "VI")

    ## load and process nps data
    nps <- read_sf("./shapefiles/original/nps/NPS_-_Land_Resources_Division_Boundary_and_Tract_Data_Service.shp")  %>% 
    select(STATE, UNIT_TYPE, PARKNAME, Shape__Are, geometry) %>% 
    filter(STATE %!in% territories) %>%  
    mutate(type = case_when(UNIT_TYPE == "International Historic Site" ~ "International Historic Site", 
                UNIT_TYPE == "National Battlefield Site" ~ "Military or Battlefield", 
                UNIT_TYPE == "National Military Park" ~ "Military or Battlefield", 
                UNIT_TYPE == "National Battlefield" ~ "Military or Battlefield",
                UNIT_TYPE == "National Historical Park" ~ "Historical Park, Site, Monument, or Memorial",
                UNIT_TYPE == "National Historic Site" ~ "Historical Park, Site, Monument, or Memorial",
                UNIT_TYPE == "National Historic Trail" ~ "Historical Park, Site, Monument, or Memorial",
                UNIT_TYPE == "National Memorial" ~ "Historical Park, Site, Monument, or Memorial",
                UNIT_TYPE == "National Monument" ~ "Historical Park, Site, Monument, or Memorial",
                UNIT_TYPE == "National Preserve" ~ "National Preserve, Reserve, or Recreation Area",
                UNIT_TYPE == "National Reserve" ~ "National Preserve, Reserve, or Recreation Area",
                UNIT_TYPE == "National Recreation Area" ~ "National Preserve, Reserve, or Recreation Area",
                UNIT_TYPE == "National River" ~ "National River, Lakeshore, or Seashore",
                UNIT_TYPE == "National Lakeshore" ~ "National River, Lakeshore, or Seashore",
                UNIT_TYPE == "National Wild & Scenic River" ~ "National River, Lakeshore, or Seashore",
                UNIT_TYPE == "National Seashore" ~ "National River, Lakeshore, or Seashore",
                UNIT_TYPE == "National Trails Syste" ~ "National Trail",
                UNIT_TYPE == "National Scenic Trail" ~ "National Trail",
                UNIT_TYPE == "National Park" ~ "National Park or Parkway",
                UNIT_TYPE == "Park" ~ "National Park or Parkway",
                UNIT_TYPE == "Parkway" ~ "National Park or Parkway",
                UNIT_TYPE == "Other Designation" ~ "Other")) %>% 
    mutate(visited = case_when(PARKNAME == "Joshua Tree" ~ "visited", 
                                PARKNAME == "Redwood" ~ "visited", 
                                PARKNAME == "Santa Monica Mountains" ~ "visited", 
                                PARKNAME == "Sequoia" ~ "visited", 
                                PARKNAME == "Kings Canyon" ~ "visited",
                                PARKNAME == "Lewis and Clark" ~ "visited",
                                PARKNAME == "Mount Rainier" ~ "visited",
                                TRUE ~ "not visited")) %>%  
    shift_geometry(preserve_area = FALSE, 
                    position = "below") %>% 
    sf::st_transform("+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs")
{% endhighlight %}

<i class="fa-regular fa-note-sticky fa-xl"></i> <i>Note:</i> I will give the entire codeblock first. I also include the individual line before describing what it does. I find this to be cleaner than including a bunch of comments in the code itself. If you want to copy and paste the code to your own file, you only need to copy the code block and not each individual line.

<li class="tab1">line 2:</li>
{% highlight r %}
    territories <- c("AS", "GU", "MP", "PR", "VI")
{% endhighlight %}

<div class = "tab0"><code>c()</code> is the combine function in R. In other languages it's called concatenate. It combines the values contained within the parentheses together into a vector. Here, I create a variable called <code>territories</code> that contains the postal abbreviations for the United States' minor outlying islands, Puerto Rico, American Samoa, and the Virgin Islands. We'll use this later (line 7) to filter for only the 50 states.</div>
<br>

<li class="tab1">line 5:</li>
{% highlight r %}
    nps <- read_sf("path/to/file/NPS_-_Land_Resources_Division_Boundary_and_Tract_Data_Service.shp")  %>% 
{% endhighlight %}

<div class = "tab0"> <code>nps <- read_sf("path/to/file.shp")</code> loads the data set to a variable called <code>nps</code> using the <code>read_sf()</code> function that is part of the <code>sf</code> package. You will need to change the file path so it reflects where you saved the data.</div>
<br>

<li class="tab1">line 6:</li>
{% highlight r %}
    select(STATE, UNIT_TYPE, PARKNAME, Shape__Are, geometry) %>%
{% endhighlight %}

<div class = "tab0"> <code>select()</code> is part of the tidyverse package. It allows us to select columns by their name. When doing data analysis or cartography larger data sets will take more computing power. Since a lot of the data isn't necessary for map making so I want to discard all the columns I don't need. 
<br><br>
Deciding which columns to keep will depend on the data you're using and what you want to map (or analyze). For my map I wanted to include a few things:
<ol><li>The state where the park is located</li>
<li>The park name</li>
<li>The park type</li>
<li>How big the park is</li></ol>

Finally, the last column <code>geometry</code> is required. It includes the geographic coordinates that Leaflet will use to map the park boundaries. 

<br><br>
You can choose which columns you want to keep by looking at the data. In R, use <code>View(nps)</code> to open the full table. R has a hard time opening large data sets, though. So if you want to look at everything at once I recommend going to the <a href="https://public-nps.opendata.arcgis.com/datasets/nps::nps-boundary-1/about">documentation</a>. On the right hand side there's an option to <i>View data table</i>. This will open the table. Most data sets have a PDF with a list and description of the variables which may also be useful.
<br><br>
Another way you can inspect the data is by looking at the column names. In the terminal, type in <code>data.frame(colnames(nps))</code> will return a list of the columns in the data set. This is helpful if the creator of the data used descriptive variable names. 
</div>
<br>

<li class="tab1">line 7:</li>
{% highlight r %}
    filter(STATE %!in% territories) %>%  
{% endhighlight %}

<div class = "tab0"><code>filter()</code> is also part of the tidyverse. It will filter in (or out, in this case) data that matches the condition included in the parentheses. For example, if I wanted only the parks in California, I would use <code>filter(STATE == "CA")</code>. This would return the 28 areas protected under the National Park Service. In line 7, I use the <code>%!in%</code> operator from the operator tools to tell R to keep every park that's <code>not in</code> the territories list we declared in line 2. </div>
<br>

<li class="tab1">lines 8-29:</li>
{% highlight r %}
    mutate(type = case_when(UNIT_TYPE == "International Historic Site" ~ "International Historic Site",
{% endhighlight %}

<div class = "tab0"><code>mutate()</code> is part of the tidyverse package. It is extremely versatile. You can create new variables or modify existing ones. 
<br><br>
The NPS data set has 23 different types of National Park lands [you can view all the types by running: <code>levels(as.factor(nps$UNIT_TYPE))</code>]. I wanted to combine certain park types together (battlefields and battlefield sites, for example).

<br><br>
To combine the different types, I used <code>mutate()</code> and <code>case_when()</code> from the tidyverse to create a new column in the data set and fill it in with the new, combined park types that I decided on. This is what lines 8-29 are doing. 
<br><br>

The call to <code>mutate()</code> in line 8 creates a new column called <code>type</code>. You can rename the original variables using the <code>rename()</code> function, but I wanted to keep the original data intact while also simplifying the types of parks.
<br><br>

<code>case_when</code> is technically a two-sided formula, but it's easier to think about it in three parts. First, <code>UNIT_TYPE</code> is the column where R should look to match the values. It will changed with different data sets. Here, I want to match the type of national park so I used UNIT_TYPE. I could also match STATE if I wanted to. 
<br><br>

Next, I'm looking for an exact match <code>==</code> to the first item after the double equal. It looks for anything with that value. In line 8, R looks for every case (or row) where the type of park is an <i>International Historic Site</i>. When it finds those cases, it will put <i>International Historic Site</i> in the <code>type</code> column I just created. I wanted to keep this park type, so it's just copying the original name over. But in line 9, the reduced park type, <code>Military or Battlefield</code> is after the tilde <code>~</code> and you'll see that I use it in lines, 9, 10, and 11 to combine three types of National Parks. 
<br><br>
Feel free to combine the data in any way that's useful to you or leave all 23 park types alone. The entire <code>mutate()</code> call can be removed without damaging the map. Just keep in mind that if you want to use different categories the format is <code>case_when(COLUMN_NAME == "original value" ~ "changed value")</code></div>
<br>
<li class="tab1">lines 30-37:</li>
{% highlight r %}
    mutate(visited = case_when(PARKNAME == "Joshua Tree" ~ "visited",
{% endhighlight %}

<div class = "tab0">Lines 30-37 use the same <code>mutate()</code> and <code>case_when</code> logic as above. Instead of reducing the number of park types, I use it to mark the different parks I've visited. Line 30 creates the new column, <code>visited</code>. I then use <code>case_when</code> to look for the names of the parks that I've been to and, if I have visited them it marks them visited (lines 30-36).
<br><br><div>

{% highlight r %}
    TRUE ~ "not visited")) %>% 
{% endhighlight %}

<div class = "tab0">Line 37 is essentially an else statement. It sets every park not expressly listed to <i>not visited</i></div>
<br><br>

<li class="tab1">lines 38-39:</li>
{% highlight r %}
    shift_geometry(preserve_area = FALSE, 
                    position = "below") %>%
{% endhighlight %}

<div class = "tab0">I covered lines 38-40 in part II of this series, so I won't spend too much time here. Lines 38-39 reduces Alaska's size and then shifts both Alaska and Hawaii so they're closer to the continental United States.</div>
<br><br>

<li class="tab1">line 40:</li>
{% highlight r %}
    sf::st_transform('+proj=longlat +datum=WGS84')
{% endhighlight %}

<div class = "tab0">The last line transform the data so it uses the WGS84 ellipsoid. Leaflet requires WGS84, so it's important to include this line after you've finished processing the data.</div>
<br>

<h3>4. add national parks to map</h3>
<hr>

{% highlight r linenos %}
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
        group = "Base Map") %>%  
    addPolygons(data = nps,
        smoothFactor = 0.2,                 
        fillColor = "#354f52",
        fillOpacity = 1,
        stroke = TRUE,
        weight = 1,     
        opacity = 0.5,                       
        color = "#354f52",             
        highlight = highlightOptions(
            weight = 3,
            color = "#fff",
            fillOpacity = 0.8,
            bringToFront = TRUE),
        group = "National Parks")  %>%
    addLayersControl(
        baseGroups = "Base Map",
        overlayGroups = "National Parks",
        options = layersControlOptions(collapsed = FALSE))
{% endhighlight %}

<li class="tab1">line 1:</li>
<div class = "tab0"><code>leaflet()</code> starts the leaflet widget. I save it to <code>map</code> so it doesn't create a map each time I have to run the code.</div>
<br><br>

<li class="tab1">lines 2-14:</li>
<div class = "tab0">Lines 1-12 create the base map. For a detailed breakdown of each line, refer back to <a href="https://liz-muehlmann.github.io/cartography-part-two">part two</a> of this series. </div>
<br><br>

<li class="tab1">line 15:</li>
{% highlight r  %}
    addPolygons(data = nps,
{% endhighlight %}

<div class = "tab0">Just like before, Leaflet uses the <code>addPolygon()</code> function to add new data to the map. You can use <code>addMarkers()</code> to add pin drops or <code>addCircles()</code> to display the information using circles. I wanted to outline the shape of the national parks so I am using the <code>addPolygons()</code> option. A more detailed description of this function can be found in part II of this series. 
<br><br>

The first argument is where the data is located. I saved the processed National Park data to a variable called <code>nps</code> which I will pass to the <code>addPolygons()</code> function using the format <code>data = nps</code>.</div>
<br><br>

<li class="tab1">line 16:</li>
{% highlight r %}
    smoothFactor = 0.2,
{% endhighlight %}

<div class = "tab0">The <code>smoothFactor</code> argument is how detailed the National Park boundaries should be drawn. The lower the number the more detailed the shape. I match with the detail level of the base map for consistency. </div>
<br><br>

<li class="tab1">lines 17-18:</li>
{% highlight r %}
    fillColor = "#354f52",
    fillOpacity = 1,
{% endhighlight %}

<div class = "tab0">Lines 17-18 define the National Park's color and transparency. In <a href="https://liz-muehlmann.github.io/notes/cartography-part-four">part IV</a> of the series I'll change this so that the <i>types</i> of public land are different colors. For now, every type of public land is a green color for simplicity.
<br><br>
Since the National Parks are overlaid on the base map, I set the opacity to be fully opaque (<code>opacity = 1</code>). You can set it to any number between 0 and 1, with 0 being transparent.</div>
<br><br>

<li class="tab1">lines 19-22:</li>
{% highlight r %}
    stroke = TRUE,
    weight = 1,     
    opacity = 0.5,                       
    color = "#354f52",
{% endhighlight %}

<div class = "tab0">The next four lines (19-22) define the outline for the National Parks. I detail what each of these arguments do in <a href="https://liz-muehlmann.github.io/cartography-part-two">part II</a> of this series. Briefly, I want an outline (<code>stroke = TRUE</code>) that's thicker than the outline used on the base map <code>weight = 1</code>. I don't like the way it looks with full opacity, so I drop it to be half-transparent (<code>opacity = 0.5</code>). Finally, it is the same color as the fill. When I change the fill color in part IV, the outline color will matter more than it does right now.</div>
<br><br>

<li class="tab1">lines 23-26:</li>
{% highlight r %}
    highlight = highlightOptions(
      weight = 3,
      color = "#fff",
      fillOpacity = 0.8,
{% endhighlight %}

<div class = "tab0">In lines 23-26 we define the National Park's behavior on mouseover. First, we have to initialize the <code>highlightOptions()</code> function. The function takes similar arguments as the <code>addPolygons()</code> function - both of which I go over in detail in part II of this series.
<br><br>

I want to keep the mouseover behavior noticeable and simple. To do so, I set the outline's thickness to be <code>weight = 3</code>. This will give the shape a nice border that differentiates it from the rest of the parks. 
<br><br>
<code>color = "#fff"</code> sets the color of the outline on mouseover only. So when inactive the outline color will match the fill color (<code>#354f52</code>), but on mouseover the outline color switches to white (#fff). 
<br><br>

<i class="fa-regular fa-note-sticky fa-xl"></i> <i>Note:</i> When the hex code repeats (like, white - #ffffff, black - #000000, or grey #808080) you only need to include the first three characters. 
<br><br>

To make the mouseover more noticeable, I reduce the fill opacity a little <code>fillOpacity=0.8</code> to make it slightly transparent. This is optional.</div>
<br><br>

<li class="tab1">lines 27:</li>
{% highlight r %}
    bringToFront = TRUE),
{% endhighlight %}

<div class = "tab0"><code>bringToFront</code> can either be <code>TRUE</code> or <code>FALSE</code>. If <code>TRUE</code>, leaflet will bring the polygon to the forefront on mouseover. This is useful later when we add in the state park because national and state parks tend to be close together. By bringing the shape to the front on mouseover, it's easier to tell whether the data is National or State level.
<br><br>
When <code>FALSE</code> the shape will remain static</div>
<br><br>

<li class="tab1">lines 28:</li>
{% highlight r %}
    group = "National Parks")  %>%
{% endhighlight %}

<div class = "tab0">Since Leaflet adds all new data on top of old layers, I think it's useful to group the layers together. In the next block of code we add in some layer functionality. For now, though, I want to add the National Parks to their own group so when I do add in layer control, I can hide the National Parks if I want to view only the base map or only the state parks.</div>
<br><br>
<li class="tab1">lines 29-32:</li>
{% highlight r %}
    addLayersControl(
        baseGroups = "Base Map",
        overlayGroups = "National Parks",
        options = layersControlOptions(collapsed = FALSE))
{% endhighlight %}

<div class = "tab0"><code>addLayersControl</code> defines how layers are displayed on the final map. The function takes three arguments.
<br><br>
First, we have to tell Leaflet which layer should be used as the base map: <code>baseGroups = "Base Map"</code>. The name in the quotations (here: <code>"Base Map"</code>) has to match the name given to the layer you set in the <code>addPolygon()</code> call. In line 14 I put the 50 states into a group called <code>"Base Map"</code>, but you can name it anything you like. Though, whatever you name it will be displayed on the final map. 
<br><br>
You can have more than one base map too. It's not super helpful here since I shifted Alaska and Hawaii, but when using map <a href="https://openmaptiles.org/styles/">tiles</a> there are many different base maps that you can use. You can add multiple types to the base map group and allow users to switch between different base maps. 
<br><br>
Next, we have to define the layers that are shown <i>on top</i> of the base group: <code>overlayGroups = "National Parks"</code>. Just like the base map, this is defined in the corresponding <code>addPolygons</code> call. Here, I called the layer that include the National Park shape data <code>National Parks</code> in line 28.
<br><br>
Finally, on the map I don't want the layers to be collapsed, so I set <code>options = layersControlOptions(collapsed = FALSE)</code>. When <code>TRUE</code> the map will display an icon in the top right that, when clicked, will show the available layers.

{%
    include figure.html
    src="/assets/notes-images/nps/nps-21.jpg"
    caption="Layers collapsed"
%}
</div>
<br><br>

<h3>6. conclusion</h3>
<hr>
Hey, look at that! You made a base map <i>and</i> you added some National Park data to it. You're a certified cartographer now! In the next <a href="https://liz-muehlmann.github.io/notes/cartography-part-four">post</a> we'll process the state park data and add that into the map. The last <a href="https://liz-muehlmann.github.io/notes/cartography-part-five">post</a> will add in <code>Shiny</code> functionality and add some labels.
<br><br>

<figure>
<iframe seamless src="/assets/notes-images/nps/maps/nps.html" width="100%" 
height="500"></iframe><figcaption>Map showing US National Parks</figcaption></figure>
