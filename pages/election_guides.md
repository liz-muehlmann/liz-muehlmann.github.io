---
title: Liz Muehlmann
layout: guides
headname: Election Guides
---
<h1>welcome</h1>
<hr class = "h-line">

Here you'll find several non-partisan ballot guides. I try to include as much information as possible without directly recreating the official voter guide. The information is sourced from the ballot guide, calmatters, ballotpedia, LA Times, voter’s edge, and Mercury News. I have included links to the campaign website or wherever most of the information came from.

I have done my best to keep my views out of it.

I started this to help my two aunts because they would ask me to simplify their ballots for them. Democracy relies on an informed and participatory citizenry, but it’s not always easy. This is meant to alleviate some of the burden. 

If you notice any errors, you feel like I’ve missed something, or you found this guide helpful feel free to send me an email [click the envelope at the bottom of the page] 

<h1>helpful resources</h1>
<hr class = "h-line">
1. Register to vote (Deadline May 23): <a href="https://registertovote.ca.gov/">https://registertovote.ca.gov/</a> 
2. Check your registration status: <a href="https://voterstatus.sos.ca.gov/">https://voterstatus.sos.ca.gov/</a>
3. Access the official voter guide: <a href="https://voterguide.sos.ca.gov/">https://voterguide.sos.ca.gov/</a> 
4. Early voting & ballot drop off locations: <a href="https://caearlyvoting.sos.ca.gov/">https://caearlyvoting.sos.ca.gov/</a>
5. Track your ballot: <a href="https://california.ballottrax.net/voter/">https://california.ballottrax.net/voter/</a>
6. If you are in the Los Angeles, San Bernardino, Orange County area and need help getting to your polling place I will either find you resources or help you get there. I also offer to go with you to vote (and I will bring my two large German Shepherds) if you feel unsafe going to vote alone.


<h1>ballot guides</h1>
<hr class = "h-line">

I have separated the guides into three geographic levels. 

1. **State** guides cover nominees, candidates, and issues that affect either the entire nation or the individual state. During Presidential elections, information about the presidential and vice presidential nominees and candidates will be included at the top of each state's file. 
<div class = "boxed">
<i class="fa-regular fa-note-sticky fa-xl"></i>
<i>Note:</i>
During presidential election years the <b>State</b> guides will also include information about the President and Vice Presidential Candidates or Nominees.
</div>
2. **County** covers candidates and issues that affect the individual counties. You will need to download the guide corresponding to whatever county you live in.
3. **Local** guides operate like the County guides and cover candidates and issues contained to one city or local area. I make these on request only. Feel free to email me if you want your city / location.


<div class = "boxed">
<i class="fa-regular fa-note-sticky fa-xl"></i>
<i>Note:</i>
Click on a link to download the PDF. <br> <br> organization: filename | last updated  
</div>




{% assign all_levels = site.data.guides | map: "level" | uniq %}
{% assign all_types = site.data.guides | map: "election_type" | uniq %}


<div class="row">
    <div class="col">
        <h3><center>primary</center></h3>
        <hr class = "h-line"> 
        {% for level in all_levels %}
            <h3 class = "guides">{{level}}</h3>
            {% if guide.type == type %} 
                {% for guide in site.data.guides %}
                    {% if level == guide.level and guide.election_type == "Primary" %}
                        <a href="{{site.url}}/assets/download/{{guide.download}}" target="_blank" rel="noopener noreferrer">
                        {{ guide.guide_name }}
                        </a> | <span class = "guides">{{guide.last_update}}</span><br>
                    {% endif %}
                {% endfor %}
            {% endif %}
        {% endfor %}
    </div>
    <div class="col">
        <h3><center>general</center></h3>
        <hr class = "h-line">
          {% if type == election_type %}
                {% for level in all_levels %}
                    <h3 class="guides">{{level}}</h3>
                    {% for guide in site.data.guides %}
                        {% if guide.level == level and guide.election_type == "General" %}
                            <a href="{{site.url}}/assets/download/{{guide.download}}" target="_blank" rel="noopener noreferrer">
                                {{ guide.guide_name }}
                            </a> | <span class = "guides">{{guide.last_update}}</span><br>
                        {% endif %}
                    {% endfor %}
                {% endfor %}
            {% endif %}
    </div>
</div>