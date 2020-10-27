# Angel Tears

E-zines for [Angel Tears](https://www.angeltearsforever.com/).

## Building

To preview the zines, run:

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

TODO: How to create a new zine.

## Deploying

The e-zines are hosted on Github Pages at the [following repository](https://github.com/angeltearsforever/e-books).

To deploy a new zine, first, ensure you and your zine are on the `master` branch.

```
$ git checkout master
```

Next, when you are done with your zine, build the site:

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

Note that the `CNAME` file in this repository controls DNS for Github Pages.
