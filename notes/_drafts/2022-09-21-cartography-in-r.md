---
layout: post
author: Liz
headname: Notes
date: 2022-09-17
tag: [r, tutorial, cartography, nps]
permalink: /notes/cartography-in-r
title: cartography in R
excerpt_separator: <!--more-->
---

Twitter is a great resource for engaging with the academic community. For example, I saw this Tweet by <a href="https://twitter.com/PhD_Genie">@PhD_Genie</a> asking users to name one positive skill learned during the PhD. I love this question for a number of reasons. First, it helps PhDs reframe their experience which can help when applying to alt-ac jobs. Second, it is really cool to share and learn about what other people have learned during their program

<!--more-->
![PhD Genie: Name one (positive) skill that you have gained/developed during your PhD](/assets/images/notes-images/nps/nps-1.jpg){:class="img-fluid"}

I responded to the Tweet because during my PhD I learned how to create maps in R. I re-created this map from the <a href="https://www.usnewsdeserts.com/">University of North Carolina's Hussman School of Journalism's News Deserts</a> project (below) and I am working on a personal project mapping the U.S. National and State Parks. There was quite a bit of interest in how to make maps, so in this post I will show you my process from start to finish. 

![Map showing the Number of Newspapers per US County](/assets/images/notes-images/nps/nps-2.png){:class="img-fluid"}

First, I'm not an expert. I wanted to make a map, so I learned how. There may be easier ways and if I learn how to do them, I'll write another post. 

Second, before starting I <b>strongly</b> suggest setting up <a href="https://github.com">GitHub</a> and <a href="https://dvc.org">DVC</a>. I wrote about how to use <a href="https://liz-muehlmann.github.io/notes/git-github">GitHub here</a>, <a href="https://liz-muehlmann.github.io/notes/github-website">using the GitHub Website</a>, and using <a href="https://liz-muehlmann.github.io/notes/github-desktop">GitHub Desktop</a>. You can use any of these methods to manage your repositories. I use all three just based on whatever mood I'm in. If you do use Git or GitHub, then DVC (data version control) is mandatory. GitHub will warn you that your file is too large if it's over 50MB and reject your pushes if the files are over 100MB. The total repository size can't exceed 2GB if you're using the free version (which I am). DVC is useful because cartography files are <i>large</i> because they contain lots of coordinates. DVC will store your data outside of GitHub but allows you to track changes to your data. It's super useful. My repo for this project is <a href="https://github.com/liz-muehlmann/nps">here.</a>

Third, this guide is how to make an interactive map using <a href="https://rstudio.github.io/leaflet/">Leaflet and <a href="https://shiny.rstudio.com/">Shiny</a>. You can also make static maps (like the one pictured above) using <a href="https://ggplot2.tidyverse.org/reference/ggplot.html">ggplot</a>. Static maps are less computationally expensive and better for publication. Interactive maps are prettier and better for displaying on the web. 

<h2>Project Outline</h2>
<ol>1. Install Packages</ol>
<ol>2. Download Shape Files</ol>
<ol>3. Shift Alaska & Hawaii</ol>
<ol>4. Create USA Base Map</ol>
<ol>5. Map National Parks</ol>
<ol>6. Map State Parks</ol>
<ol>7. Add in Shiny Functionality</ol>
<ol>8. Save Map</ol>

<h4>1. Install Packages</h4>
The first step is to install the necessary packages. 

{% highlight r linenos %}
    install.packages("leaflet")
    install.packages("shiny")
    install.packages("tidyverse")
    install.packages("tigris")
{% endhighlight %}

