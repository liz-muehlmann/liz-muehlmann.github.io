---
layout: post
author: Liz
headname: Notes
date: 2022-09-17
tag: [github, tutorial, version control]
permalink: /notes/github-website
title: github website
excerpt_separator: <!--more-->
---

Building off my post about using <a href="https://liz-muehlmann.github.io/notes/git-github">Git & GitHub</a>, this post is about using the GitHub website to initialize repos and get URLs from existing repos to clone them. 

<!--more-->

<h2><u>Web Interface</u></h2>
Once you sign into <a href="https://github.com">GitHub</a> you're greeted with a page that looks like this:

![Github Home Screen](/assets/images/notes-images/using-github/using-github-1.jpeg){:class="img-fluid"}
<i>Note:</i> Clicking on an image will open it in a new tab.

On the left-hand side you'll see a list of your repos. Clicking on any of those links will take you to the repos main page. 

In the center are announcements and updates from repos you follow. 

On the right are your latest changes and a list of repos that might be interesting to you. 

<h2><u>Initializing a Repo</u></h2>
To initialize a repo using the website, you'll click on the green button on the left that says <i>new</i>. (I boxed it in red in the above photo).

When you click <i>new</i> you'll be asked to fill in some information:
<a href="/assets/images/notes-images/using-github/using-github-2.jpeg">
![Repo Options](/assets/images/notes-images/using-github/using-github-2.jpeg){:class="img-fluid"}</a>

<h5>1:</h5>
In the box that opens, you'll enter a repo name. This should be a descriptive, unique-to-you name for your repo. You can’t have two repos named “project.” Just choose something short and descriptive. Here, I named my repo using-git to store the information related to this post. 

<h5>2:</h5>
The second part of initializing a repo is to give it a description. As it says, this step is optional, but I suggest giving it a useful description. I like to add an overview of what the project is about and what still needs to be done. Update this in the repo image.

<h5>3:</h5>
Next, you can select whether you want the repo to be public or private. If you want people to see your work and your changes, choose public. If you’re working on data for a paper you want to publish or don’t want to share your code, select private. Most of my repos are private because they are projects I’m working on that I hope to publish. 

<h5>4:</h5>
The README file operates like the description, but in a file rather than just on GitHub. I basically add a README that gives more information including any citations, where to look for other resources, and any other information that’s useful but not vital to the repo.
 
<h5>5:</h5> 
A .gitignore file is a special file. It tells Git to ignore files and directories listed in the .gitignore document. You can tell git to always skip files with a certain extension. So if you want to share your data but not your R code you can select R from the .gitignore template and GitHub will skip any file with the .R extension. Check interpretation

<h5>6:</h5>
<a href="https://www.fastcompany.com/3014553/what-coders-should-know-about-copyright-licensing#:~:text=On%20GitHub%20the%20three%20main%20types%20of%20software%20licenses%20are%3A&text=It%20permits%20users%20to%20do,grants%20patent%20rights%20to%20users.">Fast Company</a> has a good write up on what the licenses mean. I usually initialize with no license because my repos are private. I know creative commons is useful if you’re okay with people having full access to your code and modifying it in anyway they want. 

<h5>7:</h5>
Finally, click Create Repository. Congrats! You now have a new project repo.

<h2><u>Cloning a Repo</u></h2>
Once you create a repo, you'll want to add it to your hard drive. You can do this with your own repo or one created by another person. The steps are the same. 

You'll navigate to the URL of the repo. This will always follow the same format:

https://github.com/[username]/[reponame]. For example, my election guide repo is found at <a href="https://github.com/liz-muehlmann/Election_Guides">https://github.com/liz-muehlmann/Election_Guides</a>.

![Github Home Screen](/assets/images/notes-images/using-github/using-github-10.jpeg){:class="img-fluid"}

To clone a repo to your hard drive you'll need the repo URL. Click on the green <i>code</i> button and copy the URL under HTTPS.

That's really all you need. 

<h2><u>Conclusion</u></h2>
Those are the two main reasons to use the GitHub Website. I suggest spending some time looking around at repos other people have created. There are a lot of cool projects where people share their code. You can gain a lot of additional functionality in programs by downloading and installing plugins created by other people. 

For example, Leaflet (the package I use for Cartography) has its own <a href="https://rstudio.github.io/leaflet/">website hosted through GitHub Pages</a> and its own <a href="https://github.com/rstudio/leaflet">GitHub repo</a> where you can fork the project or submit an issue.

GitHub is a powerful resource and it looks great on resumes as a skill. It looks more intimidating than it is, but you should definitely spend some time using version control. 

I have a guide here about using version control via <a href="https://liz-muehlmann.github.io/notes/git-github">command line</a> and <a href="https://liz-muehlmann.github.io/notes/github-desktop">via GitHub desktop</a>