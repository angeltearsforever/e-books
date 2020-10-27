# Angel Tears

## Description

E-zines for [Angel Tears](https://www.angeltearsforever.com/).

## Requirements

This site is built with [Hugo](https://gohugo.io/).

To install Hugo on macOS, run:

```
$ brew install hugo
```

## Building

After cloning this repository, to preview the zines, run:

```
$ hugo server
```

Next, open a browser at [localhost:1313](http://localhost:1313/).

To compile the site for deployment, run:

```
$ hugo -d docs
```

The `-d` option specifies the output directory to compile the static site to.

## Authoring

To create a new zine from the default template, run:

```
$ hugo new content/name-of-your-zine.html
```

The associated style sheet must be created at: `themes/blank/assets/name-of-your-zine.scss`.

To include this in the styles bundle, edit `themes/blank/assets/skins.scss` and add:

```
@import './name-of-your-zine.scss';
```

Finally, add a new link to the index in `themes/blank/layouts/index.html`:

```
<li><a href="/name-of-your-zine" class="hands">Name Of Your Zine</a></li>
```

## Deploying

The e-zines are hosted on Github Pages at the [following repository](https://github.com/angeltearsforever/e-books).

Note that deploying a new zine must occur on the master branch.

When you are done with your zine, build the site:

```
$ hugo -d docs
```

This will compile the site into the `docs/` folder.

Next, simply add, commit, and push per usual with Git.

```
$ git add docs/
$ git commit -m "Built new zine"
$ git push
```

Your zine should be viewable at the following base URL: [ezines.angeltearsforever.com](https://ezines.angeltearsforever.com/).

Note that due to Github Pages caching rules it may take a few minutes for HTML/CSS/JS changes to update.

Note that the `docs/CNAME` file in this repository controls DNS for Github Pages.
