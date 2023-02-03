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

Twitter is a great resource for engaging with the academic community. For example, I saw this Tweet by [PhD Genie](https://twitter.com/PhD_Genie){:target="_blank" rel="noopener noreferrer"} asking users to name one positive skill learned during their PhD. I love this question for a number of reasons. First, it helps PhDs reframe their experience so it's applicable outside of academia - which can help when applying to jobs. Second, it's really cool to see what skills other people have learned during their program.  
<!--more-->

{% 
    include figure.html 
    src="/assets/notes-images/nps/nps-1.jpg" 
    caption="PhD Genie Tweet"
%}  
  
I responded to the tweet because during my PhD I learned how to create maps in R. I started by recreating a map from the [University of North Carolina's Hussman School of Journalism's News Deserts](https://www.usnewsdeserts.com/"){:target="_blank" rel="noopener noreferrer"} project (below). Now, I am working on a personal project mapping the U.S. National and State parks.

{% 
    include figure.html 
    src="/assets/notes-images/nps/nps-2.png" 
    caption="Map of US newspapers by county"
%}

There was quite a bit of interest in how to do this, so in this [series of posts]( {{site.url}}/pages/tag-forest.html#cartography){:target="_blank" rel="noopener noreferrer"} I will document my process from start to finish.  
  
### a few notes
<hr>

First, I'm not an expert. I wanted to make a map, so I learned how. There may be easier ways and, if I learn how to do them, I'll write another post.  
  
Second, before starting, I **strongly** suggest setting up a [Github](https://github.com){:target="_blank" rel="noopener noreferrer"} and [DVC](https://dvc.org){:target="_blank" rel="noopener noreferrer"}. I wrote about how to use [GitHub]({{site.url}}/notes/git-github){:target="_blank" rel="noopener noreferrer"}, the [Github Website]({{site.url}}/notes/github-website){:target="_blank" rel="noopener noreferrer"}, and [Github Desktop]({{site.url}}/notes/github-desktop){:target="_blank" rel="noopener noreferrer"} in a different series of posts. You can use any of these methods to manage your repositories. I use all three based purely on whatever mood I'm in.  
  
If you do use Git or GitHub, then DVC (data version control) is mandatory. GitHub will warn you that your file is too large if it's over 50MB and reject your pushes if the files are over 100MB. The total repository size can't exceed 2GB if you're using the free version (which I am). 

DVC is useful because cartography files are <i>large</i>. They contain a lot of coordinates which increases with each location you try to map. DVC will store your data outside of GitHub but allows you to track changes with your data. It's super useful.

Third, there are several ways to make a map. R is capable of making static and interactive maps. Static maps are less computationally expensive and better for publication. Interactive maps are prettier and better for displaying on the web.

I make interactive maps with [Leaflet](https://rstudio.github.io/leaflet){:target="_blank" rel="noopener noreferrer"} and [Shiny](https://shiny.rstudio.com){:target="_blank" rel="noopener noreferrer"} because they offer a lot of functionality. The most common way is to use map tiles. Map tiles use data from sources like [Open Street Map](https://www.openstreetmap.org){:target="_blank" rel="noopener noreferrer"} and Maps to create map squares (tiles) with custom data on top. A list of available [map tiles](https://openmaptiles.org/styles/){:target="_blank" rel="noopener noreferrer"} can be found on the Open Street Maps website.


{%
    include figure.html
    src="/assets/notes-images/nps/nps-3.jpg"
    caption="Earthquakes near Australia, using map tiles"
%}

When I make static maps (like the US map pictured above), I use [ggplot](https://ggplot2.tidyverse.org/reference/ggplot.html){:target="_blank" rel="noopener noreferrer"}.

{% include cartography.html %}

### 1. install packages
<hr>
  
You only need to install the packages once. You can do so by running each line in the terminal. When you rerun the code later, you can skip right to loading the packages using <code>library("package-name")</code>  
  
<div class="boxed"><i class="fa-regular fa-note-sticky fa-xl"></i> <i>Note:</i> I will give the entire codeblock first. I also include the individual line before describing what it does. I find this to be cleaner than including a bunch of comments in the code itself. If you want to copy and paste the code to your own file, you only need to copy the code block and not each individual line. </div>  

{% highlight r linenos %}
    ## you only need to install the packages once

    install.packages("leaflet")        # interactive maps
    install.packages("shiny")          # added map functionality
    install.packages("tidyverse")      # data manipulation
    install.packages("tigris")         # cartographic boundaries
    install.packages("operator.tools") # for the not-in function
    install.packages("sf")             # read and write shapefiles
{% endhighlight %}

##### <u>package descriptions</u>  

{% highlight r %}
3    install.packages("leaflet")
{% endhighlight %}

* Leaflet is an open source mapping library used to create interactive maps. All leaflet maps have the same basic components:
    * A map widget (created by calling <code>leaflet()</code>)
    * Layers (or features) added using <code>addTiles()</code>, <code>addPolygons()</code>, or <code>addMarkers()</code>.
    <br>  
    Leaflet was originally written in [Javascript](https://leaflet.js){:target="_blank" rel="noopener noreferrer"} by "Volodymyr Agafonkin, a Ukrainian citizen living in Kyiv." With the Russian invasion of Ukraine, Volodymyr, his family, and the people he knows are being forced to flee. If you can, make a donation to [Come Back Alive](https://savelife.in.ua/en/){:target="_blank" rel="noopener noreferrer"} or to one of the charities listed at [Stand With Ukraine](https://stand-with-ukraine.ppa.ua){:target="_blank" rel="noopener noreferrer"}. If you think the invasion is justified, don't forget to [carry some seeds in your pocket](https://www.theguardian.com/world/video/2022/feb/25/ukrainian-woman-sunflower-seeds-russian-soldiers-video){:target="_blank" rel="noopener noreferrer"}  

{% highlight r%}
4    install.packages("shiny")
{% endhighlight %}

* Shiny is an R package that provides additional functionality. I am primarily using it to create an informative tool box so the map is not overwhelmed by using too many popups.

{% highlight r %}
5    install.packages("tidyverse")
{% endhighlight %}

* The Tidyverse is a collection of packages used for data manipulation and analysis. Its syntax is more intuitive than base R. Furthermore, you can chain (aka pipe) commands together.  

    For cartography, you don't need the whole Tidyverse. We'll mainly use <code>dplyr</code> and <code>ggplot</code>. You can install these packages individually instead of installing the whole tidyverse. Though, when we get to the national park database, we'll also need <code>purr</code> and <code>tidyr</code>.

{% highlight r %}
6    install.packages("tigris")
{% endhighlight %}

* Tigris is used to load Census data and shapefiles. You can download the same data from the [Census website](https://www.census.gov/geographies/mapping-files/time-series/geo/carto-boundary-file.html){:target="_blank" rel="noopener noreferrer"}, but it's nice that you can do it in R.

{% highlight r %}
7    install.packages("operator.tools")
{% endhighlight %}

* operator.tools is not required, but it's recommended. 

    For some unknown reason, base R has a <code>%in%</code> function but not a <code>not-in</code> function. Unfortunately, the United States is still an empire with its associated areas, islands, and pseudo-states. I only want to include the 50 states, so I needed a way to easily filter out the non-states. Operator tool's <code>%!in%</code> function is perfect for that. 

{% highlight r %}
8    install.packages("sf")
{% endhighlight %}

* sf is used to read and write the shapefiles necessary for cartography. 

### 2. load the packages
<hr>

To start, create and save a new file called <code>usa.r</code>. In it, we're going to download and modify the United States shape data that we'll use to create the base map in [part two]({{site.url}}/notes/cartography-part-two){:target="_blank" rel="noopener noreferrer"} of this series.  

At the beginning of each file, you have to load the necessary packages. In this file, the only packages we need to load are *tidyverse*, *sf*, and *tigris*. I also load *leaflet* to make sure the map renders correctly.  

{% highlight r linenos %}
    ## load libraries
    library("tidyverse")
    library("sf")
    library("tigris")
    library("leaflet")
{% endhighlight %}

### 3. download usa shapefile
<hr>

There's two ways to download the USA shape data. First, we can use the R package, *tigris*. Second, we can download it from the Census website.

<div class = "boxed"><i class="fa-regular fa-note-sticky fa-xl"></i> <i>Note:</i> I show two ways to download the shape data but you only have to choose one method.</div>

I prefer using *tigris* but I've been having some problems with it. Sometimes it ignores the Great Lakes and merges Michigan and Wisconsin into a Frankenstate (boxed in red below).

{%
    include figure.html
    src="/assets/notes-images/nps/nps-4.jpg"
    caption="Weird Frankenstate that merges Michigan and Wisconsin."
%}

##### <u>method 1: using tigris()</u>

<code>tigris()</code> downloads the TIGER/Shapefile data directly from the Census and includes a treasure trove of data. Some of the data includes land area, water area, state names, and geometry.  

Tigris can also download boundaries for counties, divisions, regions, tracts, blocks, congressional and school districts, and a whole host of other groupings. A complete list of available data can be found on the [packages' GitHub](https://github.com/walkerke/tigris){:target="_blank" rel="noopener noreferrer"}.

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

Here we create the <code>us_states</code> variable, save the geographic data to it, move Alaska and Hawaii so they're beneath the continental US, and save the shifted shapefile.  

<center><i class="fa-solid fa-paw"></i> <i class="fa-solid fa-paw"></i> <i class="fa-solid fa-paw"></i></center>

* line 2:

{% highlight r %}
2   us_states <- tigris::states(cb = FALSE, year = 2020)  %>%
{% endhighlight %}

R uses the <code><-</code> operator to define new variables. Here, we're naming our new variable <code>us_states</code>.  

In our <code>us_states</code> variable we're going to store data on the 50 states downloaded using <code>tigris</code>. Within (<code>::</code>) tigris, we're going to use the <code>states()</code> function.

The <code>states()</code> function allows you to pull state-level data from the Census. This function takes [several arguments](https://rdrr.io/cran/tigris/man/states.html){:target="_blank" rel="noopener noreferrer"}

The <code>cb</code> argument can either be <code>TRUE</code> or <code>FALSE</code>. If <code>cb = FALSE</code> tells Tigris() to download the most detailed shapefile. If <code>cb = TRUE</code> it will download a generalized (1:5000k) file. After a lot of trial and error, I found that using <code>cb = TRUE</code> prevents the Frankenstate from happening.

If the <code>year</code> argument is omitted it will download the shapefile for the default year (currently 2020). I set out of habit from when I work with county boundaries. When I work with county boundaries I have to set the year because their boundaries change more than states. 

Finally, the <code> %>% </code> operator is part of the Tidyverse. It basically tells R "Hey! I'm not done, keep going to the next line!"

<center><i class="fa-solid fa-paw"></i> <i class="fa-solid fa-paw"></i> <i class="fa-solid fa-paw"></i></center>

* line 3:

{% highlight r %}
3    filter(STATEFP < 57)  %>% 
{% endhighlight %}

<code>tigris::states()</code> downloads data for the 50 states and the United States' minor outlying islands, Puerto Rico, and its associated territories. Each state and territory is assigned a unique two-digit [Federal Information Processing Standard [FIPS]](https://www.nrcs.usda.gov/wps/portal/nrcs/detail/ca/home/?cid=nrcs143_013696){:target="_blank" rel="noopener noreferrer"} code.

They're mostly consecutive (Alaska is 01) but when they were conceived of in the 1970s a couple were reserved for the US territories (American Samoa was 03), but in the updated version the "reserved codes" were left out and the territories were assigned to new numbers (American Samoa is now 60). The important bit about this is that the last official state (Wyoming) has a FIPS of 56.

This line of code uses the <code>filter()</code> function on the <code>STATEFP</code> variable downloaded using Tigris(). All it says is keep any row that has a FIPS of less than 57. This will keep only the 50 states and exclude the United States' <s>empire</s> associated territories.

<center><i class="fa-solid fa-paw"></i> <i class="fa-solid fa-paw"></i> <i class="fa-solid fa-paw"></i></center>

* lines 4-5:

{% highlight r %}
4    shift_geometry(preserve_area = FALSE,
5                   position = "below")  %>%
{% endhighlight %}

The <code>shift_geometry()</code> is from the Tigris package. It takes two arguments <code>preserve_area</code> and <code>position</code>.

<div class = "boxed"><i class="fa-regular fa-note-sticky fa-xl"></i> <i>Note:</i> Strictly speaking, these two lines are not required. Delete them if you want Alaska and Hawaii to remain in their original locations.</div>

When <code>preserve_area = FALSE</code> tigris will shrink Alaska's size and increase Hawaii's so that they are comparable to the size of the other states. 

The <code>position</code> argument can either be <code>"below"</code> or <code>"outside"</code>. When it's <code>below</code>, both Alaska and Hawaii are moved to be below California. When it's <code>outside</code> then Alaska is moved to be near Washington and Hawaii is moved to be near California.

<center><i class="fa-solid fa-paw"></i> <i class="fa-solid fa-paw"></i> <i class="fa-solid fa-paw"></i></center>

Since I'm a born-theorist, I should warn you that messing with maps has inherent normative implications. The most common projection is Mercator which stretches the continents near the poles and squishes the ones near the equator.

{%
    include figure.html
    src="/assets/notes-images/nps/nps-6.jpg"
    caption="Mercator vs. Gall-Peters Projection"
%}

One of the competing projections is Gall-Peters which claims to be more accurate because it was - at the time it was created in the 1980s - the only "area-correct map." Though it has now been criticized for skewing the polar continents *and* the equatorial ones. The above photo shows you just how different the projects are from one another. 

The problem arises because we're trying to project a 3D object into 2D space. It's a classic case of even though we can, maybe we shouldn't. Computers can do these computations and change the projections to anything we want fairly easily. However, humans think and exist in metaphors. We assume bigger = better and up = good. When we project maps that puts the Northern Hemisphere as both upwards and larger than other parts of the world we are imbuing that projection with metaphorical meaning. 

I caution you to be careful when creating maps. Think through the implications of something as simple as making Alaska more visually appealing by distorting it to be of similar size as the other states.

If you want to read more about map projections [this is a good post](https://geoawesomeness.com/best-map-projection/#:~:text=Gall%2DPeters,supremacy%20over%20non%2Dwhite%20nations.){:target="_blank" rel="noopener noreferrer"}. If you want to read more about metaphors, I suggest [Metaphors We Live By](https://press.uchicago.edu/ucp/books/book/chicago/M/bo3637992.html){:target="_blank" rel="noopener noreferrer"} by George Lakoff and Mark Johnson.

<center><i class="fa-solid fa-paw"></i> <i class="fa-solid fa-paw"></i> <i class="fa-solid fa-paw"></i></center>

* line 6:

{% highlight r %}
6    sf::st_transform("+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs")
{% endhighlight %}

The <code>sf</code> package includes a function called <code>st_transform()</code> which will reproject the data for us. There are <i>a lot</i> of projects. You can read them at the [proj](https://proj.org/index.html){:target="_blank" rel="noopener noreferrer"} website.

Leaflet requires all boundaries use the World Geodetic Service 1984 (WGS84) coordinate system. While making maps I've come across two main coordinate systems: WGS84 and North American Datum (1983). WGS84 uses the WGS84 ellipsoid and NAD83 uses the Geodetic Reference System (GRS80). From what I've gathered, the differences are slight, but leaflet requires WGS and the Census uses NAD83. As a result, we have to reproject the the data in order to make our map.

The <code>st_transform</code> function takes four arguments, each preceded by a <code>+</code>. All four arguments are required to transform the data from NAD83 to WGS84.

Briefly, <code>+proj=longlat</code> tells R to use project the code into longitude and latitude [rather than, for example, transverse mercator (<code>tmerc</code>)]. 

<code>+ellps=WGS84</code> sets the ellipsoid to the WGS84 standard.

<code>+datum=WGS84</code> is a holdover from previous proj releases. It tells R to use the WGS84 data.

<code>+no_defs</code> is also a holdover.

Essentially, you need to include line 6 before you create the map, but after you do any data manipulation. It might throw some warnings which you can just ignore.

<center><i class="fa-solid fa-paw"></i> <i class="fa-solid fa-paw"></i> <i class="fa-solid fa-paw"></i></center>

* line 9

{% highlight r %}
9    st_write(us_states, "path/to/file/usa.shp")
{% endhighlight %}

In the last line, we save the data we manipulated in lines 2-6. Strictly speaking you don't have to save the shapefile. You can manipulate the data and then skip right to mapping the data. I caution against it because the files can get unreadable once you start using multiple data sets. I usually comment out line 9 after I save the file. That way I'm not saving and re-saving it whenever I need to run the code above it.

The <code>st_write()</code> function is part of the <code>sf</code> package and it takes two arguments. The first is the data set you want to save. Since I used <code>us_states</code> to save the data, it will be the first argument in the <code>st_write()</code> function call.

The second argument is the path to where you want the file saved and what name you want to give it. I named mine <code>usa</code>. It is mandatory that you add <code>.shp</code> to the end of the filepath so that R knows to save it as a shapefile.

Although it's called a shapefile, it's actually four files. I usually create a separate folder for each set of shapefiles and store that in one master folder called <i>shapefiles</i>. An example of my folder structure is below. I keep all of this in my GitHub repo and track changes using DVC.

{%
    include figure.html
    src="/assets/notes-images/nps/nps-11.jpg"
    caption="Example folder structure"
%}

On my <code>C://</code> drive is <code>My Documents</code>. In that folder I keep a <code>GitHub</code> folder that holds all my repos, including my <code>nps</code> one. Inside the <code>nps</code> folder I separate my shapefiles into their own folder. For this tutorial I am using original and shifted shapefiles, so I've also separated them into two separate folders to keep things neat. I also know I'm going to have multiple shapefiles (one for the USA, one for the National Parks, and a final one for the State Parks) so I created a folder for each set. In the <code>usa</code> folder I saved the shifted states shapefile.

Altogether, my line 9 would read:
{% highlight r %}
9    st_write(us_states, "~/Documents/GitHub/nps/shapefiles/shifted/usa/usa.shp")
{% endhighlight %}

Running that line will save the four necessary files that R needs to load the geographic data.

That's it for method 1 using <code>tigris</code>. The next section, method 2, shows how to load and transform a previously downloaded shapefile.  If you used method 1, feel free to leave this post and go directly to mapping the shapefile in [part II]({{site.url}}/notes/cartography-part-two){:target="_blank" rel="noopener noreferrer"} of this series.

<center><i class="fa-solid fa-paw"></i> <i class="fa-solid fa-paw"></i> <i class="fa-solid fa-paw"></i></center>

##### <u>method 2: using downloaded shapefiles</u>

In this section, I'll go through the process of downloading the shapefiles from the Census website. If you tried method 1 and tigris caused the weird Frankenstate, you can try using the data downloaded from the Census website. I don't know why it works, since tigris uses the same data, but it does.

Generally, though, finding and using shapefiles created by others is a great way to create cool maps. There are thousands of shapefiles available, many from [ArcGis' Open Data Website](https://hub.arcgis.com/maps/5f29b5fb39c74f5c99717da73c6c62cc){:target="_blank" rel="noopener noreferrer"}.

* step 1:  
On the [Census](https://www.census.gov){:target="_blank" rel="noopener noreferrer"} website, select the *Data & Maps* dropdown. In the dropdown, on the right-hand side you'll select *Mapping Files*.

{%
    include figure.html
    src="/assets/notes-images/nps/nps-7.jpg"
    caption="Census website dropdown."
%}

* step 2:  
From here, about halfway down on the page, there's a link called *TIGER Data Products Guide* which will take you to a complete list of the shapefiles available.

{%
    include figure.html
    src="/assets/notes-images/nps/nps-8.jpg"
    caption="TIGER Data Products Download Link"
%}

* step 3:  
There's a lot of downloads available on this page, but for now just click on *"Cartographic Boundaries Shapefiles."* Make sure you select the **shapefiles** one and not the Geodatabases or Geopackages link.

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

When you unzip the cb_2021_us_state_500k.zip, it will contain four files. You'll only ever work with the <code>.shp</code> file, but the other three are used in the background to display the data.

* step 4:

Once all the files are unzipped, we can load the <code>.shp</code> file into R.

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

* line 2:

This line is very similar to the one above. I changed the name of the variable to <code>usa</code> so I could keep both methods in the same R file (each R variable needs to be unique or it will be overwritten).

<code>read_sf</code> is part of the sf() package. It's used to load shapefiles into R. The path to the file is enclosed in quotation marks and parentheses. Simply navigate to wherever you unzipped the *cb_2021_us_state_500k* file and choose the file with the <code>.shp</code> extension.

### 4. conclusion
<hr>
Once the shapefiles are downloaded - either using tigris() or by loading the shapefiles from the Census website - you can create the base map. I'll tackle making the base map in [part II](https://liz-muehlmann.github.io/notes/cartography-part-two"> part II </a> of this series.){:target="_blank" rel="noopener noreferrer"} of this series.