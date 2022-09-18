---
layout: post
author: Liz
headname: Notes
date: 2022-09-17
tag: [github, tutorial, version control]
permalink: /notes/git-github
title: git & github
excerpt_separator: <!--more-->
---

Arguably one of the best things you can do before starting a PhD is invest time in learning how to properly use version control. There are several options available, but I'm partial to <a href = "https://git-scm.com/downloads">Git</a> & <a href="https://desktop.github.com/">GitHub.</a> Even if you never touch a piece of code, version control is very helpful. Essentially, it allows you to track and manage changes. 

<!--more-->

I found a lot of information about Git & GitHub confusing. The documentation is written for software engineers and people that are immersed in writing code. I am not that person and a lot of the information isn't relevant to my situation. This guide is written specifically for PhDs. I doubt I am leveraging these tools' full functionality, but this is a good place to start if you've never heard of version control before.

<h2><u>Definitions:</u></h2>
<b>Repo/Repository:</b> These are like directories or folders on your computer. It’s where all the information about a project is stored. 

<b>Git:</b> is a version control system that allows you to track and revert changes incrementally. This means that as you make changes on a project, you can describe the changes, and save them. If you make a change that you don’t like or that broke something, you can revert to a previous version. Git also allows you create branches or forks which are helpful for trying out changes without affecting the main code.

<li class="tab1"><b>Branches:</b> These are like tree branches, it allows you to test out features and code without worrying about affecting the overall stability of your repo. The <i>main</i> branch (sometimes called <i>master</i>) is where you push all your final edits. Let’s say you want to try creating a map with an info box using Leaflet & Shiny. You may not want to mess up your entire leaflet map while you work with Shiny. Branching will allow you to safely work with Shiny and if you like the changes, you can merge the branch with <i>main</i>. If you don’t, you can continue working on the branch until you’re happy or discard it.</li>
<br>
<li class="tab1"><b>Forks:</b> are similar to branches but are mostly used for copying other people’s repos and making changes. Say you find a cool project repo, but you want to modify it for your own use. You would fork the repo. It would show up in your Git and you can make the changes you want without affecting the original repo. </li>
<br>
<b>GitHub:</b> is a cloud-based Git service. It allows you to access your Git repositories from anywhere. You can use Git without GitHub, but you can’t use GitHub without Git. 

I might use Git & GitHub interchangeably which drives software engineers bonkers.

<h2><u>Main Components of Version Control</u></h2>

1) Initialization <br>
2) Staging <br>
3) Committing <br>
4) Pushing <br>

During initialization you either start or clone a repository. Staging means you're ready to save changes, but not yet committed to them. Committing means to "permanently" add changes to your project. Pushing updates remote references to the files (i.e. saves them everywhere rather than just on your local machine). I go over these in more detail under <i>Important Commands</i>

<h2><u>Why Use Version Control?</u></h2>
Version control is important because projects never work in a linear format. Regardless of whether you're writing a paper or writing code, things change. Version control allows you to track those changes and keep notes on the logic behind why you did the things you did. 

If you're writing a paper, you might sometimes find yourself deleting paragraphs that you later need. With version control, you can save these paragraphs and revert to earlier writing if necessary.

With code, you can add or remove features without worrying about damaging existing, working code. I did not understand the full functionality of version control until I started working on cartography. A lot of cartography is trial and error (or at least it has been for me) and I got tired of having files named "Code_final" and "Code_final_final" or worse: "Really_final_version." Version control lets me branch off sections of my code, add or remove functionality, without damaging my main code.

<h2><u>Accessing Repositories</u></h2>
There are three main ways of using Git and Github: <br>
1) GitHub Website <br>
2) GitHub Desktop <br>
3) Command line <br>

Purists will tell you that you should always use the command line, others will tell you it doesn't matter. Honestly, I use all three ways based solely on whatever I'm feeling in the moment. I'm going to focus on command line usage because it will help illuminate what's happening behind the scenes when you use either the website or the Desktop app. 

You can find my walk through on using GitHub Desktop here and the GitHub website here. The information across all three is the same. My suggestion is to choose whichever one you're most comfortable with and ignore anyone who makes you feel bad because you prefer to use an app than command line. There's more important things to worry about.

<h2><u>Keeping Organized</u></h2>
Repos are just directories. If you're even mildly organized, you probably create a new folder on your hard drive for each project. If you don't, I highly recommend it because it does help keep things neat and orderly. When you use either Git or GitHub, your repos will be stored in their own folders. This can get unwieldy very quickly. I like to store all my repos in one folder located in My Documents on my hard drive. I just created a folder called <i>GitHub</i> and anytime I initialize or clone a repo, I make sure I do so from this folder. Here is what my GitHub folder looks like:

<a href="/assets/images/notes-images/using-github/using-github-11.jpg">
![Repo Options](/assets/images/notes-images/using-github/using-github-11.jpg){:class="img-fluid"}</a>

As you can see, it's located in the Documents folder on my PC. Each folder you see listed here is a repo in my GitHub. I only keep repos in my GitHub folder - that is I don't save anything else to this folder except initialized or cloned repos.

<h2><u>Consoles & Terminals</u></h2>
To use GitHub from command line you can either use the command prompt or powershell on Windows, terminal on Mac, or a console emulator like <a href="https://cmder.app/">cmdr</a> or <a href="https://cygwin.com/">cygwin</a>. When you download <a href="https://git-scm.com/downloads">Git</a> it will also install Git CMD which does the same thing as any other console or terminal app. They all operate in the same way and do the same things, so pick whichever makes you happy. 

Before getting into the important commands, the first thing you'll want to do is navigate to the folder you're keeping your repos in. For me it's the <i>GitHub</i> folder I created in my <i>Documents</i> above. There's two ways you can do this. <br>

1) Either right click in the folder and select <i>Git BASH here</i>. If you're on Windows 11 it will be under "see more options." Also, if you're on Windows, you can type <code>cmd</code> in the navigation bar and hit enter and it will open a command prompt in that folder. <br>
2) Or you can just open a console / terminal from the start menu or app folder and then navigate to where you are storing your repos using console. <br>

<pre>
 <code>
 cd Documents\GitHub
 </code>
</pre>

<code>cd</code> stands for change directory. It's followed by the path to the folder you want to open. <br> 

Your computer should allow tab complete. This just means you can start typing <i>Doc</i>, hit the tab key on your keyboard and it should autocomplete. Sometimes you'll need to go up a directory or two. Say, for example, I'm in the GitHub folder, but I want to go to the Documents folder using the command line. To do so, I would put

<pre>
 <code>
 cd ..
 </code>
</pre>

If I were to put only one dot:
<pre>
 <code>
 cd .\
 </code>
</pre>

I could navigate to another folder inside the <i>Documents</i> folder.

These are just helpful navigation options so you don't always have to put the entire path to a folder. 

Once you're in the folder where you want to keep the repo, you're ready to use Git for version control.

<h2><u>Important Commands</u></h2>
The Git documentation is full of commands, options, flags, and various other usage information. I'd say a solid 99% of it, I've never used. I'm only going to go over the commands I use on a daily basis because they're all you really need to use to get started. I'm going to cover what each term means, then add basic workflows at the end.

<i>Note:</i> Anything in [brackets] is where you would enter in information. You would omit the brackets. For example, <code>git init using-github</code> would initialize an new repo called <i>using-github</i>.

<li><code>git init [project-directory-name]</code>: You only need to initialize a repo once. Each repo in your GitHub has to have a unique-to-you name. That is, you can't have two repos named <i>Project</i> Good repo names are short and descriptive. If I were to initialize a Git for this project I would name it <i>using-github</i> because that is what this guide is about. </li>
<br>

<li><code> git clone [project-url]</code>: If you have previously initialized a repo (either on the website or through GitHub Desktop) and want to add it to your current hard drive you will need to clone (copy) it. This is useful if you use a desktop and a laptop. I often initialize repos on my desktop using <code>git init</code> and then clone them to my laptop using <code>git clone</code>. You can also use <code>git clone</code> to code repos created by other people. If you find a cool project on GitHub.com that you want to modify for your own use, you can clone it to your hard drive using <code>git clone</code>. The [project-url] can be found on the repo website. For example, if you wanted to clone my election guide repo, you would navigate to the repo's page <a href="https://github.com/liz-muehlmann/Election_Guides">here</a>. On the right hand side is a green button that says <i>Code</i>. You'd select it then copy the URL from the drop down. The URL you copied would go in place of <i>[project-url] above.</i></li>
<br>

After you initialize or clone a repo, you can work on your project. You would do work like any other time. Just navigate to the folder where your repo is located and create or modify any files you need to. When you're done working for the day, you're ready to stage and commit your changes.

There are four steps you'll always follow when working with a repo:
1) Adding
2) Staging
3) Committing
4) Pushing

<a href="https://www.youtube.com/watch?v=7hPX_SresUM">First you have to add a file, then stage it, commit it, and push it.</a>

<li><code>git add [filename or directory name]</code> You'll use git add to state individual files or directories. You just add the path to the file or directory after <code>git add</code> then hit enter. Once staged, you'll add a message, then commit.</li>
<li class = "tab1"><code>git add -A</code> will stage <i>all</i> modified files. The <code>-A</code> just means "all." </li>

<li><code>git commit -m "A useful message here"</code> before you can push your files, you have to commit them. Committing just records a change on the local hard drive. It's like taking a snapshot of a project in its current state. Messages are ways to track changes. It is mandatory that you explain what you changed. Here is a good guide on <a href="https://www.freecodecamp.org/news/how-to-write-better-git-commit-messages/">writing good commit messages.</a></li>

<li><code>git push origin [branch-name]</code> usually, <i>[branch-name]</i> will be <i>main</i>. Sometimes it will be a different branch. <i>Origin</i> is a way of referencing a specific repo. This way you don't have to constantly refer to its url. Pushing sends your commits to GitHub. You can then access those changes on the website or on another computer by pulling the changes to the machine. </li>

<li><code>git pull origin [branch name]</code> again, <i>[branch-name]</i> will usually be <i>main</i>. Pull brings changes you pushed to GitHub onto the local machine. Think of this as syncing changes. It's especially useful when using more than one computer.</li>
<li class ="tab1">If you do work from multiple computers, always be sure to pull changes before you start working in the repo. It prevents a lot of headaches.</li><br>

One of the best things about Git & GitHub is that it allows branching and forking. Branching is the most useful because it creates a temporary space for you to work without threatening the integrity of the main project. 

<li><code>checkout -b [branch-name]</code> will allow you to create and switch to a new branch</li>
<li class = "tab1"><code>git branch [branch-name]</code> is how you create a branch without switching to it. </li>
<li class = "tab1"><code>git checkout [branch-name]</code> allows you to switch to an existing branch. </li>

If you like what you did in a branch and want to merge it with main so that you can keep the updated version of the project you'll need to switch to the main branch and then merge.
<pre>
 <code>
 git checkout main
 git merge [branch-name]
 </code>
</pre>

<h2><u>Workflows</u></h2>
These are basic workflows that you can use.

Initializing a repo:
<pre>
    <code>
    git init [repo-name]
    // do the work you need to
    git add -A
    git commit -m "a useful message"
    git push origin main
    </code>
</pre>

Cloning an existing repo:
<pre>
    <code>
    git clone https://github.com/liz-muehlmann/Election_Guides.git
    // do the work you need to
    git add -A
    git commit -m "a useful message"
    git push origin main
    </code>
</pre>

Create a branch and merge it with main:
<pre>
    <code>
    git branch [branch-name]
    // work on the branch until you're happy
    git checkout main
    git merge [branch-name]

    </code>
</pre>

<h2><u>Conclusion</u></h2>
Those are really the only commands you need to know to use Git & GitHub. I can't stress enough how important version control is when programming - especially when working on cartography projects. One problem you'll inevitably run into is file size. GitHub will warn you if your file is over 50MB and it will reject your push if any of your files are over 100MB. 

There are two ways around GitHubs file limits which I go over in my post about <a href="https://liz-muehlmann.github.io/notes/dvc">DVC (Data Version Control)</a>. If you're only using Git & GitHub to version control your writing, you don't really need to worry about large file sizes. However, once you are working with datasets the file size limit gets in the way quickly. 

If you're uncomfortable with the command line, GitHub has a desktop application that you can use which is very user friendly. You can learn about <a href="https://liz-muehlmann.github.io/notes/github-desktop">GitHub Desktop</a> and the <a href="https://liz-muehlmann.github.io/notes/github-website">GitHub Website</a> through my other posts. 

