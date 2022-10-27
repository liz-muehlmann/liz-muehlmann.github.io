---
title: Tag-Forest
headname: Tag Forest
layout: default
---
<div class="container justify-content-center">
  <div class="row">
    <div class="col-2"></div>
    <div class="col-8">

      {%- comment -%} set tags_max to 0 {%- endcomment -%}
      {% assign tags_max = 0 %}

      {%- comment -%} if the number of tags is mode than 0, set it to that number {%- endcomment -%}
      {% for tag in site.tags %}
        {% if tag[1].size > tags_max %}
          {% assign tags_max = tag[1].size %}
        {% endif %}
      {% endfor %}

      {%- comment -%} create an empty array and tag count {%- endcomment -%}
      {% assign tag_names_array = "" %}
      {% assign tag_counts = "" %}
      {% assign first_array_element = true %}

      {%- comment -%} loop through tag names and assign them to appropriate tag_name {%- endcomment -%}
      {% for i in (1..tags_max) reversed %}
        {% assign tag_names = "" %}
        {% assign first_tag = true %}
        {% for tag in site.tags %}
          {% if tag[1].size == i %}
            {% if first_tag %}
              {% assign first_tag = false %}
            {% else %}
              {% assign tag_names = tag_names | append: "," %}
            {% endif %}
            {% assign tag_names = tag_names | append: tag[0] %}
          {% endif %}
        {% endfor %}

        {%- comment -%} if tag name is empty, append the tag names to the array and increment {%- endcomment -%}
        {% if tag_names != "" %}
          {% assign tag_names = tag_names | split: "," | sort | join: "," %}
          {% if first_array_element %}
            {% assign first_array_element = false %}
          {% else %}
            {% assign tag_names_array = tag_names_array | append: "|" %}
            {% assign tag_counts = tag_counts | append: "|" %}
          {% endif %}
          {% assign tag_names_array = tag_names_array | append: tag_names %}
          {% assign tag_counts = tag_counts | append: i %}
        {% endif %}
      {% endfor %}
      {% assign tag_names_array = tag_names_array | split: "|" %}

      {%- comment -%} create two arrays [shown on website] {%- endcomment -%}
      {% assign tag_counts = tag_counts | split: "|" %}
      <ul class="taxonomy-index">
        {% for tag_names in tag_names_array %}
          {% assign tag_names_list = tag_names | split: "," %}
          {% assign tag_count = tag_counts[forloop.index0] %}
          {% for tag_name in tag_names_list %}
            <li>
              <a href="#{{ tag_name | slugify }}">
                <strong>{{ tag_name }}</strong>
                <span class="taxonomy-count">{{ tag_count }}</span>
              </a>
            </li>
          {% endfor %}
        {% endfor %}
      </ul>
      {%- comment -%} all-posts button {%- endcomment -%}
      <br><a href="/pages/notes.html">
        <button type="button" class="btn btn-outline-success">Back to all posts</button></a>
    </div>
  </div>

  <div class="row">
    <div class="col-2"></div>

    <div class="col-8">
      <hr class="h-line">
      {% for tag_names in tag_names_array %}
        {% assign tag_names_list = tag_names | split: "," %}
        {% for tag_name in tag_names_list %}
          <section id="{{ tag_name | slugify | downcase }}" class="taxonomy-section">
            <h2>{{ tag_name }}</h2>
            {% for tag in site.tags %}
              {% if tag[0] == tag_name %}
                <div>
                  <ul class = "taxonomy-list">
                    <li>
                      {% for post in tag[1] %}
                          <h5 class = "post-title"><strong><a href="{{ post.url }}">{{ post.title }}</a></strong></h5>
                      {% endfor %}
                    </li>
                  </ul>
                </div>
              {% endif %}
            {% endfor %}
          </section>
        {% endfor %}
      {% endfor %}

      <hr class="h-line">
      {%- comment -%} all-posts button {%- endcomment -%}
      <a href="/pages/notes.html">
        <button type="button" class="btn">Back to all posts</button>
      </a>
    </div>
  </div>

  <div class="col-2"></div>

</div>
