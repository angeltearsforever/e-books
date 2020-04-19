window.addEventListener('DOMContentLoaded', function() {

    const showFlipBook = function(counter) {
        setTimeout(function() {
            if (document.querySelectorAll('[page]').length) {
                document.querySelector('.flipbook-wrapper').classList.remove('is-hidden');
            } else if (counter > 9) {
                alert(':( God should\'ve spent a little more time on this page.')
                return;
            } else {
                showFlipBook(counter);
            }
            counter ++;
        }, 500);
    };

    const flipBook = document.querySelector('.flipbook-wrapper').innerHTML;

    const initFlipBook = function(page) {
        setGlobalDimensions();

        $("#flipbook").turn({
            width: window.qzine.clientWidth,
            height: window.qzine.flipBookHeight,
            page: page,
            autoCenter: true,
            duration: 1000,
        });
        bindFlipBookEvents();
        //Set Flipbook Dimensions
        setFlipBookDimensions();
    }
    const bindFlipBookEvents = function() {
        $("#flipbook").bind("turned", function(event, page, view) {
            currentPage = page;
            if (lazyLoadAllTheTimeNow) {
                console.log('lazyLoadAllTheTimeNow')
                setTimeout(function() {
                    if (direction == 'back') {
                        reinitLazyLoading(document.querySelector(`[page="${page}"] iframe.lazyloaded`))
                    } else {
                        reinitLazyLoading(document.querySelector(`[page="${page + 1}"] iframe.lazyloaded`))
                    }
                }, 10);
            }
        });

        const controls = document.querySelector('.controls');
        $("#flipbook").bind("turning", function(event, page, view) {
            if (page < currentPage) {
                //moving backwards
                // if page is 4 lazy load 2 and 3
                lazyLoadAllTheTimeNow = true;
                direction = "back";
            } else {
                direction = "forward";
            }

            // Hide/show first last controls
            if (view.length == 1) {
                if (page == 1) {
                    controls.classList.add('first');
                } else {
                    controls.classList.add('last');
                }
            } else {
                if (controls.classList.contains('first')) {
                    controls.classList.remove('first');
                } else {
                    controls.classList.remove('last');
                }
            }
            //Hide/show Spotify
            if (page == '2' || page == '3') {
                document.querySelector('.spotify-wrapper').style.opacity = 1;
                document.querySelector('.spotify-wrapper').style.zIndex = 3;
            } else {
                document.querySelector('.spotify-wrapper').style.opacity = 0;
                document.querySelector('.spotify-wrapper').style.zIndex = -1;
            }
        });
        $("#flipbook").bind("first", function(event) {
            controls.classList.add('first');
        });
        $("#flipbook").bind("last", function(event) {
            controls.classList.add('last');
        });
    }
    const bindMouseEvents = function () {
        const body = document.querySelector('body');
        let root = document.documentElement;

        root.addEventListener("mousemove", e => {
            if (e.pageX < window.qzine.singlePageWidth) {
                body.classList.remove('right');
                body.classList.add('left');
                root.style.setProperty('--mouse-x', e.clientX - 25 + "px");
                root.style.setProperty('--mouse-y', e.clientY - 45 + "px");
            } else {
                body.classList.remove('left');
                body.classList.add('right');
                root.style.setProperty('--mouse-x', e.clientX - 55 + "px");
                root.style.setProperty('--mouse-y', e.clientY - 45 + "px");
            }
        });
    }
    const setFlipBookDimensions = function() {
        document.querySelector('#flipbook').style.height = window.qzine.flipBookHeight + 'px';
        document.querySelector('#flipbook').style.width = window.qzine.clientWidth + 'px';
        let translateY = (window.innerHeight - window.qzine.flipBookHeight) / 2;
        document.querySelector('.angel-tears').style.transform ='translateY('+ translateY + 'px' + ')';
        document.querySelectorAll('#flipbook .page').forEach(function(page) {
            page.style.height = window.qzine.flipBookHeight + 'px';
            page.style.width = window.qzine.clientWidth;
        })
        document.querySelectorAll('.qzine-page').forEach(function(page) {
            page.style.height = window.qzine.flipBookHeight + 'px';
            page.style.width = window.qzine.singlePageWidth + 'px';
        })
        document.querySelectorAll('.video-embed iframe').forEach(function(embed) {
            embed.style.width = (window.qzine.singlePageWidth) + 'px';
        })
        document.querySelectorAll('.images-with-text img').forEach(function(img) {
            img.style.height = (window.qzine.flipBookHeight * .7) + 'px';
        })
        document.querySelector('.controls').style.right = window.qzine.controlsOffset;
        document.querySelector('.spotify-wrapper').style.left = (window.qzine.clientWidth / 4) + 'px';
        document.querySelector('.spotify-wrapper').style.top = (window.qzine.flipBookHeight / 2) + 'px';
        if (window.qzine.clientWidth < 500) {
            var spotifyWidth = '80px';
            document.querySelector('.spotify-wrapper iframe').style.width = spotifyWidth;
        } else {
            document.querySelector('.spotify-wrapper iframe').style.width = '300px';
        }
    }
    const reinitLazyLoading = function(image) {
        if (image) {
            image.classList.remove('lazyloaded');
            image.classList.add('lazyload');
        }
    }
    const setGlobalDimensions = function() {
        window.qzine = {};
        window.qzine.clientWidth = window.innerWidth;
            if (window.qzine.clientWidth < 500) {
                window.qzine.controlsOffset = 0;
                window.qzine.flipBookHeight = window.qzine.clientWidth * .54;
            } else if (window.qzine.clientWidth < 1000 && window.qzine.clientWidth > window.innerHeight) {
                //Hot Dog Style Phone or Tablet
                window.qzine.flipBookHeight = window.innerHeight;
            } else if (window.qzine.clientWidth < 1000) {
                //Hamburger style tablet or weird desktopbrowser
                window.qzine.controlsOffset = 0;
                window.qzine.flipBookHeight = window.qzine.clientWidth * .54;
            } else {
                //Desktop
                window.qzine.controlsOffset = '50px';
                window.qzine.flipBookHeight = window.innerHeight;
            }
        window.qzine.singlePageWidth = window.qzine.clientWidth / 2;
    }

    ////////////////////////
    // DO STUFF
    ////////////////////////
    //declare global variables
    var currentPage = 1;
    var lazyLoadAllTheTimeNow = false;
    var direction = 'forward';
    //Initialize FlipBook
    initFlipBook(currentPage);
    showFlipBook(0);

    //Bind Click Events
    $("#previous").mousedown(function(e) {
        $("#flipbook").turn("previous");
    });
    
    $("#next").mousedown(function(e) {
        $("#flipbook").turn("next");
    });

    //Bind Mouse Events
    bindMouseEvents();
    
    // Bind Resize Events
    window.addEventListener('resize', _.debounce(function() {
        //Destroy and restart flipbook
        $("#flipbook").turn("destroy");
        document.querySelector('.flipbook-wrapper').innerHTML = flipBook;
        initFlipBook(currentPage);
    }, 200));
})
