---
layout: post
author: Liz
headname: Notes
date: 2022-09-17
tag: [r, tutorial, cartography, nps]
permalink: /notes/cartography-part-one
title: cartography in R part one
excerpt_separator: <!--more-->
---
Twitter is a great resource for engaging with the academic community. For example, I saw this Tweet by <a href="https://twitter.com/PhD_Genie">@PhD_Genie</a> asking users to name one positive skill learned during their PhD. I love this question for a number of reasons. First, it helps PhDs reframe their experience so it's applicable outside of academia - which can help when applying to jobs. Second, it's really cool to see what skills other people have learned during their program. 

<!--more-->
{% 
    include figure.html 
    src="/assets/notes-images/nps/nps-1.jpg" 
    caption="PhD Genie Tweet"
%}

I responded to the tweet because during my PhD I learned how to create maps in R. I started by recreating a map from the <a href="https://www.usnewsdeserts.com/">University of North Carolina's Hussman School of Journalism's News Deserts</a> project (below). Now, I am working on a personal project mapping the U.S. National and State parks. 

{% 
    include figure.html 
    src="/assets/notes-images/nps/nps-2.png" 
    caption="Map of US newspapers by county"
%}

There was quite a bit of interest in how to do this, so in this <a href="{{site.url}}/pages/tag-forest.html#cartography">series of posts</a> I will document my process from start to finish.

<h3>a few notes</h3>
<hr>
First, I'm not an expert. I wanted to make a map, so I learned how. There may be easier ways and, if I learn how to do them, I'll write another post.

Second, before starting, I <b>strongly</b> suggest setting up <a href="https://github.com">GitHub</a> and <a href="https://dvc.org">DVC</a>. I wrote about how to use <a href="https://liz-muehlmann.github.io/notes/git-github">GitHub</a>, the <a href="https://liz-muehlmann.github.io/notes/github-website">GitHub Website</a>, and <a href="https://liz-muehlmann.github.io/notes/github-desktop">GitHub Desktop</a>. You can use any of these methods to manage your repositories. I use all three just based on whatever mood I'm in. 

If you do use Git or GitHub, then DVC (data version control) is mandatory. GitHub will warn you that your file is too large if it's over 50MB and reject your pushes if the files are over 100MB. The total repository size can't exceed 2GB if you're using the free version (which I am). DVC is useful because cartography files are <i>large</i>. They contain a lot of coordinates which increases with each location you try to map. DVC will store your data outside of GitHub but allows you to track changes with your data. It's super useful.

Third, there are several ways to make a map. R is capable of making interactive maps and static maps. Static maps are less computationally expensive and better for publication. Interactive maps are prettier and better for displaying on the web.

I make interactive maps with <a href="https://rstudio.github.io/leaflet/">Leaflet</a> and <a href="https://shiny.rstudio.com/">Shiny</a> because they offer a lot of functionality. The most common way is to use map tiles. Map tiles use data from sources like <a href="https://www.openstreetmap.org/">Open Street Map</a> and Google Maps to create map squares (tiles) that users can put data over. A list of available <a href="https://openmaptiles.org/styles/">map tiles</a> is available on the Open Street Maps website. 

{%
    include figure.html
    src="/assets/notes-images/nps/nps-3.jpg"
    caption="Earthquakes near Australia, using map tiles"
%}

When I want to make static maps (like the one pictured above) I use <a href="https://ggplot2.tidyverse.org/reference/ggplot.html">ggplot</a>.  

This guide is how to make an interactive map using <code>leaflet()</code> and <code>shiny()</code>.

<h3>project outline</h3>
<hr>
I had to break the tutorial into different parts because it became unwieldy. I list the component parts below. The annotated version of the code can be found in this project's repository in the folder called <a href="https://github.com/liz-muehlmann/nps">r files</a>.

<a href="https://liz-muehlmann.github.io/notes/cartography-part-one"><u>I. cartography in R part one [this post]</u></a>
<ul><li>Install packages</li>
<li> Process USA data</li>
<li> Shift Alaska and Hawaii</li>
<li> Save shapefile</li></ul>

<a href="https://liz-muehlmann.github.io/notes/cartography-part-two"><u>II. cartography in R part two</u></a>
<ul><li> Create USA base map</li>

<a href="https://liz-muehlmann.github.io/notes/cartography-part-three"><u>III. cartography in R part three</u></a>
<ul><li>Process national and state park data</li>
<li>Add national and state park data to the base map</li></ul>

<a href="https://liz-muehlmann.github.io/notes/cartography-part-four"><u>IV. cartography in R part four</u></a>
<ul><li>Add in Shiny functionality</li>
<li>Save final map</li>
<li>Publish map</li></ul>

<h3>1. getting started</h3>
<hr>

With that, we can get started by creating the shapefile we'll use to create the United States base map. The first thing to do is to open a new R file and save it as <code>usa.r</code>.

<i class="fa-regular fa-note-sticky fa-xl"></i> <i>Note:</i> I will give the entire codeblock first. I also include the individual line before describing what it does. I find this to be cleaner than including a bunch of comments in the code itself. If you want to copy and paste the code to your own file, you only need to copy the code block and not each individual line. 

<h3>2. install packages</h3>
<hr>

You only need to install the packages once. When you rerun the code later, you only need to load them using <code>library("package-name")</code>
<br>
{% highlight r linenos %}
    ## you only need to install the packages once

    install.packages("leaflet")        # interactive maps
    install.packages("shiny")          # added map functionality
    install.packages("tidyverse")      # data manipulation
    install.packages("tigris")         # cartographic boundaries
    install.packages("operator.tools") # for the not-in function
    install.packages("sf")             # read and write shapefiles
{% endhighlight %}

<h5><u>package descriptions</u></h5>

{% highlight r%}
    install.packages("leaflet")
{% endhighlight %}

<li class="tab1"><code>leaflet()</code> is an open-source mapping library used to create interactive maps. All leaflet maps have the same basic components:</li>

<ol class="tab2"><li> A map widget (created by calling <code>leaflet()</code>)</li>
<li>Layers (features) using <code>addTiles()</code>, <code>addPolygons()</code>, or <code>addMarkers()</code></li></ol>

<div class="tab1">Leaflet was originally written in <a href="https://leafletjs.com/">Javascript</a> by "Volodymyr Agafonkin, a Ukrainian citizen living in Kyiv." With the Russian invasion of Ukraine, Volodymyr, his family, and the people he knows are being forced to flee. If you can, make a donation to <a href="https://savelife.in.ua/en/">Come Back Alive</a> or to one of the charities listed at <a href="https://stand-with-ukraine.ppa.ua">Stand With Ukraine</a>. If you think the invasion is justified, don't forget to <a href="https://www.theguardian.com/world/video/2022/feb/25/ukrainian-woman-sunflower-seeds-russian-soldiers-video">carry some seeds in your pocket.</a></div>
<br>

{% highlight r%}
    install.packages("shiny")
{% endhighlight %}

<li class="tab1"><code>Shiny()</code> is an R package that provides additional functionality. I am primarily using it to create an informative tool box so the map isn't overwhelmed by using too many popups.</li>
<br>

{% highlight r %}
    install.packages("tidyverse")
{% endhighlight %}

<li class="tab1">The <code>tidyverse()</code> is a collection of packages used for data manipulation and analysis. Its syntax is more intuitive than base R and it allows users to chain (aka pipe) commands together. </li><br>
<div class="tab1">For cartography, you don't need the whole Tidyverse. We'll mainly use <code>dplyr</code> and <code>ggplot</code>. You can install these packages individually instead of installing the whole tidyverse. Though, when we get to the national park database, we'll also need <code>purr</code> and <code>tidyr</code>.</div>
<br>

{% highlight r %}
    install.packages("tigris")
{% endhighlight %}

<li class="tab1"><code>tigris()</code> is used to load Census data and shapefiles. You can download the same data from the <a href="https://www.census.gov/geographies/mapping-files/time-series/geo/carto-boundary-file.html">Census website</a>, but it's nice that you can do it in R. </li>
<br>

{% highlight r %}
    install.packages("operator.tools")
{% endhighlight %}
<li class="tab1"><code>operator.tools</code> isn't essential, but it is recommended.</li>
<br>

<div class="tab1">For whatever unknown reason, base R has an <code>%in%</code> function but not a <code>[not-in]</code> function. When working with the US, which is still an empire, there are associated areas that aren't part of the 50 states. Instead of creating a variable containing all 50 state abbreviations, it's easier to create one that holds the abbreviations for the territories then tell R to keep all the states <code>%!in%</code> the territories list.</div>
<br>

<li class = "tab1"><code>sf()</code> reads and writes the shapefiles necessary for cartography.</li>
<br>
<h3>3. Load the Packages</h3>
<hr>
In your <usa.r> file, you'll need to load the necessary packages. For the base map shapefile, we only need to load <code>tidyverse()</code>, <code>sf()</code>, and <code>tigris()</code>. I also load <code>leaflet()</code> to make sure the map renders correctly. I'll explain why that's important below.

{% highlight r linenos %}
    ## load libraries
    library("tidyverse")
    library("sf")
    library("tigris")
    library("leaflet")
{% endhighlight %}


When you open the file for the first time, you'll have to load the libraries.

<h3> 4. Download Cartographic Boundaries </h3>
<hr>

There's two ways to download the necessary files. First, is by using the <code>tigris()</code> package. Second, by loading a previously downloaded shapefile. 

<i class="fa-regular fa-note-sticky fa-xl"></i> <i>Note:</i> I show two methods, but you only need to do one. You can either download the data using tigris() or via the Census.

While I prefer using <code>tigris()</code> I've been having some problems with it. Sometimes it ignores the Great Lakes and merges Michigan and Wisconsin into a weird Frankenstate (boxed in red below).

{%
    include figure.html
    src="/assets/notes-images/nps/nps-4.jpg"
    caption="Weird Frankenstate that merges Michigan and Wisconsin."
%}

<h5><u>method 1: using Tigris()</u></h5>
<code>Tigris()</code> downloads the TIGER/Shapefile data directly from the Census and includes a treasure trove of data. Some of the data includes land area, water area, geometry, and state names. 

Tigris can also download boundaries for counties, divisions, regions, tracts, blocks, congressional districts, school districts, and a whole host of other groupings. A complete list of available data can be found on the <a href="https://github.com/walkerke/tigris">packages' GitHub.</a>

{% highlight r linenos %}
    ## download state data using tigris()
    us_states <- tigris::states(cb = FALSE, year = 2020)  %>% 
        filter(STATEFP < 57)  %>% 
        shift_geometry(preserve_area = FALSE,
                       position = "below")  %>% 
        sf::st_transform("+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs")
    
    ## save the shifted shapefile
    st_write(us_states, "path/to/file/usa.shp")
{% endhighlight %}

In this chunk we create the <code>us_states</code> variable, save the geographic data to it, and move Hawaii and Alaska to be beneath the continental US.

I will go through each line of this block below. 

<li>line 2:</li>
{% highlight r %}
    us_states <- tigris::states(cb = FALSE, year = 2020)  %>% 
{% endhighlight %}

<div class = "tab0">R uses the <code> <- </code> operator to define new variables. Here, we're naming our new variable <code> us_states</code>. 
<br>
<br>
In our <code>us_states</code> variable we're going to store data on the 50 states downloaded using <code>tigris</code>. Within (<code>::</code>) tigris, we're going to use the <code>states()</code> function. 
<br>
<br>
The <code>states()</code> function allows you to pull state-level data from the Census. This function takes  <a href="https://rdrr.io/cran/tigris/man/states.html">several arguments</a>.
<br><br>

The <code>cb</code> argument can either be <code>TRUE</code> or <code>FALSE</code>. If <code>cb = FALSE</code> tells Tigris() to download the most detailed shapefile. If <code>cb = TRUE</code> it will download a generalized (1:5000k) file. After a lot of trial and error, I found that using <code>cb = TRUE</code> prevents the Frankenstate from happening.
<br><br>

If the <code>year</code> argument is omitted it will download the shapefile for the default year (currently 2020). I set out of habit from when I work with county boundaries. When I work with county boundaries I have to set the year because their boundaries change more than states. 
<br><br>

Finally, the <code> %>% </code> operator is part of the Tidyverse. It basically tells R "Hey! I'm not done, keep going to the next line!"</div> 
<br>

<li>line 3:</li>
{% highlight r %}
    filter(STATEFP < 57)  %>% 
{% endhighlight %}

<div class = "tab0"><code>tigris::states()</code> downloads data for the 50 states and the United States' minor outlying islands, Puerto Rico, and its associated territories. Each state and territory is assigned a unique two-digit <a href="https://www.nrcs.usda.gov/wps/portal/nrcs/detail/ca/home/?cid=nrcs143_013696">Federal Information Processing Standard [FIPS]</a> code. 
<br><br>

They're mostly consecutive (Alaska is 01) but when they were conceived of in the 1970s a couple were reserved for the US territories (American Samoa was 03), but in the updated version the "reserved codes" were left out and the territories were assigned to new numbers (American Samoa is now 60). The important bit about this is that the last official state (Wyoming) has a FIPS of 56. 
<br><br>

This line of code uses the <code>filter()</code> function on the <code>STATEFP</code> variable downloaded using Tigris(). All it says is keep any row that has a FIPS of less than 57. This will keep only the 50 states and exclude the United States' <s>empire</s> associated territories.</div>
<br>

<li>lines 4-5:</li>
{% highlight r %}
    shift_geometry(preserve_area = FALSE,
                   position = "below")  %>%
{% endhighlight %}

<div class = "tab0">The <code>shift_geometry()</code> is from the Tigris package. It moves Alaska and Hawaii either below the US or next to it. Strictly speaking, these lines are not necessary. It takes two arguments <code>preserve_area</code> and <code>position</code>.
<br><br>

<code>preserve_area</code> can either be <code>TRUE</code> or <code>FALSE</code>. When <code>preserve_area = TRUE</code> then Alaska and Hawaii will maintain their respective sizes. For this project, I'm not using a map tile so my map will only show the data included in the downloaded shapefile. However, since the other countries won't be shown on my map, preserving Alaska's area makes the map look weird. </div>

{%
    include figure.html
    src="/assets/notes-images/nps/nps-5.jpg"
    caption="Alaska and Hawaii with preserved areas"
%}

<div class = "tab0"> When <code>preserve_area = FALSE</code> tigris will shrink Alaska's size and increase Hawaii's so that they are comparable to the size of the other states. 

The <code>position</code> argument can either be <code>"below"</code> or <code>"outside"</code>. When it's <code>below</code>, both Alaska and Hawaii are moved to be below California. When it's <code>outside</code> then Alaska is moved to be near Washington and Hawaii is moved to be near California.</div>
<br>
Since I'm a born-theorist, I should warn you that messing with maps has inherent normative implications. The most common projection is Mercator which stretches the continents near the poles and squishes the ones near the equator.

{%
    include figure.html
    src="/assets/notes-images/nps/nps-6.jpg"
    caption="Mercator vs. Gall-Peters Projection"
%}

One of the competing projections is Gall-Peters which claims to be more accurate because it was - at the time it was created in the 1980s - the only "area-correct map. Though it has now been criticized for skewing the polar continents <i>and</i> the equatorial ones. The above photo shows you just how different the projects are from one another. 

The problem arises because we're trying to project a 3D object into 2D space. It's a classic case of even though we can, maybe we shouldn't. Computers can do these computations and change the projections to anything we want fairly easily. However, humans think and exist in metaphors. We assume bigger = better and up = good. When we project maps that puts the Northern Hemisphere as both upwards and larger than other parts of the world we are imbuing that projection with metaphorical meaning. 

I caution you to be careful when creating maps. Think through the implications of something as simple as making Alaska more visually appealing by distorting it to be a similar size as the rest of the states. 

If you want to read more about map projections <a href="https://geoawesomeness.com/best-map-projection/#:~:text=Gall%2DPeters,supremacy%20over%20non%2Dwhite%20nations.">this is a good post.</a> If you want to read more about metaphors I suggest <a href="https://press.uchicago.edu/ucp/books/book/chicago/M/bo3637992.html"><i>Metaphors We Live By</i></a> by George Lakoff and Mark Johnson.

<li>line 6:</li>
{% highlight r %}
    sf::st_transform("+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs")
{% endhighlight %}

<div class = "tab0">
The <code>sf</code> package includes a function called <code>st_transform()</code> which will reproject the data for us. There are <i>a lot</i> of projects. You can read them at the <a href="https://proj.org/index.html">proj</a> website. <br><br>

Leaflet requires all boundaries use the World Geodetic Service 1984 (WGS84) coordinate system. While making maps I've come across two main coordinate systems: WGS84 and North American Datum (1983). WGS84 uses the WGS84 ellipsoid and NAD83 uses the Geodetic Reference System (GRS80). From what I've gathered, the differences are slight, but leaflet requires WGS and the Census uses NAD83. As a result, we have to reproject the the data in order to make our map.
<br><br>

The <code>st_transform</code> function takes four arguments, each preceded by a <code>+</code>. All four arguments are required to transform the data from NAD83 to WGS84.
<br><br>

Briefly, <code>+proj=longlat</code> tells R to use project the code into longitude and latitude [rather than, for example, transverse mercator (<code>tmerc</code>)]. 
<br><br> 

<code>+ellps=WGS84</code> sets the ellipsoid to the WGS84 standard</code>
<br><br>

<code>+datum=WGS84</code> is a holdover from previous proj releases. It tells R to use the WGS84 data.
<br><br>

<code>+no_defs</code> is also a holdover.
<br><br>

Essentially, you need to include line 6 before you create the map, but after you do any data manipulation. It might throw some warnings which you can just ignore.
</div>
<br>
<li>line 9:</li>
{% highlight r %}
    st_write(us_states, "path/to/file/usa.shp")
{% endhighlight %}

<div class = "tab0">In the last line, we save the data we manipulated in lines 2-6. Strictly speaking you don't have to save the shapefile. You can manipulate the data and then skip right to mapping the data. I caution against it because the files can get unreadable once you start using multiple data sets. I usually comment out line 9 after I save the file. That way I'm not saving and re-saving it whenever I need to run the code above it.
<br><br>
The <code>st_write()</code> function is part of the <code>sf</code> package and it takes two arguments. The first is the data set you want to save. Since I used <code>us_states</code> to save the data, it will be the first argument in the <code>st_write()</code> function call. 
<br><br>
The second argument is the path to where you want the file saved and what name you want to give it. I named mine <code>usa</code>. It is mandatory that you add <code>.shp</code> to the end of the filepath so that R knows to save it as a shapefile.
<br><br>
Although it's called a shapefile, it's actually four files. I usually create a separate folder for each set of shapefiles and store that in one master folder called <i>shapefiles</i>. An example of my folder structure is below. I keep all of this in my GitHub repo and track changes using DVC</div>

{%
    include figure.html
    src="/assets/notes-images/nps/nps-11.jpg"
    caption="Example folder structure"
%}

<div class = "tab0">
On my <code>C://</code> drive is <code>My Documents</code>. In that folder I keep a <code>GitHub</code> folder that holds all my repos, including my <code>nps</code> one. Inside the <code>nps</code> folder I separate my shapefiles into their own folder. For this tutorial I am using original and shifted shapefiles, so I've also separated them into two separate folders to keep things neat. I also know I'm going to have multiple shapefiles (one for the USA, one for the National Parks, and a final for the State Parks) so I created a folder for each set. In the <code>usa</code> folder I saved the shifted states shapefile.
<br><br>
Altogether, my line 9 would read:</div>

{% highlight r %}
    st_write(us_states, "../Documents/GitHub/nps/shapefiles/shifted/usa/usa.shp")
{% endhighlight %}

<div class = "tab0">Running that line will save the four necessary files that R needs to load the geographic data.</div>
<br>

That's it for method 1 using <code>tigris</code>. The next section, method 2, shows how to load and transform a previously downloaded shapefile.  If you used method 1, feel free to leave this post and go directly to mapping the shapefile <a href="https://liz-muehlmann.github.io/notes/cartography-part-two">in part II of this series</a>. 

<h5><u>method 2: Using Downloaded Shapefiles</u></h5>
In this section, I'll go through the process of downloading the shapefiles from the Census website. If you tried method 1 and tigris() resulted in the weird Frankenstate, you can try using the data downloaded from the Census website. I don't know why it works, since tigris uses the same data, but it does. 
<br><br>
Generally, though, finding and using shapefiles created by others is a great way to create cool maps. There are thousands of shapefiles available, many from <a href="https://hub.arcgis.com/maps/5f29b5fb39c74f5c99717da73c6c62cc">ArcGIS' Open Data website</a>.  

<li>step 1:</li>
On the <a href="https://www.census.gov">Census</a> website, select the <i>Data & Maps</i> dropdown. In the dropdown, on the right-hand side you'll select <i>Mapping Files</i>.

{%
    include figure.html
    src="/assets/notes-images/nps/nps-7.jpg"
    caption="Census website dropdown."
%}

<li>step 2:</li>
From here, about halfway down on the page, there's a link called <i>TIGER Data Products Guide"</i> which will take you to a complete list of the shapefiles available.

{%
    include figure.html
    src="/assets/notes-images/nps/nps-8.jpg"
    caption="TIGER Data Products Download Link"
%}

<li>step 3:</li>
There's a lot of downloads available on this page, but for now just click on <i>"Cartographic Boundaries Shapefiles."</i> Make sure you select the <b>shapefiles</b> one and not the Geodatabases or Geopackages link.

{%
    include figure.html
    src="/assets/notes-images/nps/nps-9.jpg"
    caption="Cartographic Boundaries Shapefiles"
%}

Save the file wherever you want, but I prefer to keep it within the "original" shapefiles folder in a sub-folder called "zips." Once it downloads, unzip it - again, anywhere is fine. It will download <i>all</i> 30 Census shapefiles. We're only going to use the one called "cb_2021_us_state_500k.zip". The rest you can delete, if you want.

{%
    include figure.html
    src="/assets/notes-images/nps/nps-10.jpg"
    caption="cb_2021_us_state_500k folder"
%}

When you unzip the file, it will contain four files. You need all four in order to create the base map and they need to be kept in the same location on your hard drive. However, we only need to load the file with the <code>.shp</code> extension. The others are loaded behind the scenes by R.

<li>step 4:</li>
Once all the files are unzipped we can load them into R. 

{% highlight r linenos %}
    ## load a previously downloaded shapefile
    usa <- read_sf("shapefiles/original/usa/states/cb_2021_us_state_500k.shp") %>%
        filter(STATEFP < 57) %>%
        shift_geometry(preserve_area = FALSE,
            position = "below") %>%
        sf::st_transform("+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs")

    ## save the shifted shapefile
    st_write(usa, "path/to/file/usa.shp")
{% endhighlight %}

Everything except line 2 is the same as in method 1. I won't go over lines 3-9 here, because all the information is above.

<li class = "tab1">line 2:</li>
<div class = "tab1">This line is very similar to the one above. I changed the name of the variable to <code>usa</code> so I could keep both methods in the same R file (each R variable needs to be unique or it will be overwritten.
<br><br>
<code>read_sf</code> is part of the sf() package. It's used to load shapefiles into R. The path to the file is enclosed in quotation marks and parentheses. Simply navigate to wherever you unzipped the <i>cb_2021_us_state_500k</i> file and choose the file with the <code>.shp</code> extension.</div>
<br>
<h3> 5. Conclusion </h3>
<hr>

Once the shapefiles are downloaded - either using tigris() or by loading the shapefiles from the Census website - you can create the base map. I'll tackle making the base map in <a href="https://liz-muehlmann.github.io/notes/cartography-part-two"> part II </a> of this series.