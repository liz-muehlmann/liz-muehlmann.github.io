---
layout: post
author: Liz
headname: Notes
date: 2022-09-17
tag: [github, tutorial, version control]
permalink: /notes/github-desktop
title: github desktop
excerpt_separator: <!--more-->
---

This is part of my tutorial series on <a href="https://liz-muehlmann.github.io/notes/git-github">using Git</a> and <a href="https://liz-muehlmann.github.io/notes/github-website"> GitHub</a>. In particular, this guide is about using GitHub's desktop app for creating and managing repos. You can download the app <a href="https://desktop.github.com/">here.</a>. 
<!--more-->

Honestly, the desktop app is the easiest way to do version control. Sure, it's another app you have to have on your hard drive and something new you have to use, but it's well designed and intuitive. I find myself using it more and more.

<h2><u>GitHub Desktop</u></h2>
If you have no open folders, you'll see this page when you open GitHub Desktop.

<a href="/assets/images/notes-images/using-github/using-github-3.jpeg">
![Repo Options](/assets/images/notes-images/using-github/using-github-3.jpeg){:class="img-fluid"}</a>
<i>Note:</i> Clicking on an image will open it in a new tab.

<h5>1:</h5>
From the File menu you can either create a new repository or clone an existing repository. If you created a repo on the website and want to pull it to your hard drive, choose clone. If you need to create a brand-new repo then you’d use <i>New repository…</i>

<h5>2:</h5>
You'd use number 2 if the repo has already been created (by you or someone else) and you want to download it to your hard drive. 

<li class="tab1"><i>2A:</i> You can either copy (clone) a repo you created or someone else created by navigating to the repo on GitHub. From the green button that says <i>Code</i> then copy the url under HTTPS.</li>

<a href="/assets/images/notes-images/using-github/using-github-10.jpeg">
![Repo Options](/assets/images/notes-images/using-github/using-github-10.jpeg){:class="img-fluid"}</a>

You'll then drop that link into the URL tab of the GitHub Desktop prompt
<a href="/assets/images/notes-images/using-github/using-github-6.jpeg">
![Repo Options](/assets/images/notes-images/using-github/using-github-6.jpeg){:class="img-fluid"}</a>

<h5>3:</h5>
Number 3 is the same as if you select <i>File:</i> and select <i>Create New Repo</i>. 

<h5>4:</h5>
You would use the <i>Add an existing repository from your hard drive</i> option if you had already created a repo on your hard drive (either previously cloned it or initialized it using the command line) and want to open it in GitHub Desktop.

<h5>5:</h5>
If you have repos available, you can also click on them on the right. 

Once the repo is cloned to wherever you want it stored it will now be accessible on GitHub, in GitHub Desktop, and directly from your file explorer. 

<h2><u>Workflow</u></h2>
One of the benefits of the desktop app is that it's inclusive. You don't have to remember commands, all you have to do is open GitHub desktop before and after you work on your project.

Before you start working on your project, you should pull any changes. This is less important if you're only using one computer when working on the project and you're the only one that's making changes to the repo.

<h5>Before working</h5>

![Github Home Screen](/assets/images/notes-images/using-github/using-github-18.jpg){:class="img-fluid"}

To pull changes, just click on <i>repository</i> and select pull.

<h5>After working</h5>
When you're done doing work on your project, just open GitHub Desktop, enter a commit message, and hit "commit to main."

![Github commit](/assets/images/notes-images/using-github/using-github-19.jpg){:class="img-fluid"}

On the left hand side you'll see a list of files you modified. All the files selected are ones you'll be committing. If you don't want to commit a file, just deselect it. 

At the bottom of the left hand panel you'll see two boxes:<br>
1) Summary (required)<br>
2) Description<br>

The summary is mandatory. It's a brief message about what changes were made. The description is optional and is a place where you can include more details about whatever changes you made.

Next, you'll click the button at the bottom that says "commit to main" or "commit to master."

Finally, you'll want to push the changes. On the top bar, GitHub Desktop has a box that tells you the current actions you can do. It will either say <i>Fetch Origin</i> (the same as pull) and <i>Push Origin</i>. 

![Github Home Screen](/assets/images/notes-images/using-github/using-github-20.jpg){:class="img-fluid"}

<h2><u>Conclusion:</u></h2>
That's it! GitHub Desktop is very easy to use. It allows you to version control your projects and keep track of any changes that you've made. Whether you use the Desktop version, <a href="https://liz-muehlmann.github.io/notes/github-website"> the website,</a> or <a href="https://liz-muehlmann.github.io/notes/git-github">command line</a> I implore you to start using version control. It saves eons of time. 




