---
layout: default
title: Notes
headname: Notes
header:  Click on the links to read the latest updates
excerpt_separator: <!--more-->
---

<div class = "container justify-content-center">
  <div class="row">
    <div class= "col-1">
    </div>

  <div class="col-lg-auto">
      {% for post in site.posts %}

          <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
          <hr class = "h-line">
          {{ post.excerpt }}

          {% include readmore.html %}
      {% endfor %}

   </div>
  </div>

  <div class = "row">
    <div class= "col-1">
    </div>

<!-- See all tags button -->
    <div class = "col-8 d-flex">
        <hr class = "h-line">

      <a href = "/pages/tag-forest.html"><button type="button" class="btn">See all tags</button></a>
    </div>
  </div>

  <div class= "col-2">
  </div>

  <div class= "col-2">
  </div>

</div>
