window.addEventListener('DOMContentLoaded', function() {

    const showFlipBook = function(counter) {
        setTimeout(function() {
            if (document.querySelectorAll('[page]').length) {
                document.querySelector('.flipbook-wrapper').classList.remove('is-hidden');
                document.querySelector('.controls-container').classList.remove('is-hidden');
                document.querySelector('.angel').classList.remove('is-hidden');
                document.querySelector('.spotify-wrapper').classList.remove('is-hidden');
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
        setGlobalVariables();

        $("#flipbook").turn({
            width: window.qzine.clientWidth,
            height: window.qzine.flipBookHeight,
            page: page,
            autoCenter: true,
            duration: 600,
        });
        window.qzine.length = $("#flipbook").turn("pages");
        bindFlipBookEvents();
        //Set Flipbook Dimensions
        setFlipBookDimensions();
        showFlipBook(0);
    }
    const bindFlipBookEvents = function() {
        $("#flipbook").bind("turned", function(event, page, view) {
            currentPage = page;
        });

        $("#flipbook").bind("turning", function(event, page, view) {
            const controlsContainer = document.querySelector('.controls-container');
            // Hide/show first last controls
            if (view.includes(1)) {
                controlsContainer.classList.add('first');
                controlsContainer.classList.remove('last');
            } else if (view.includes(window.qzine.length)) {
                controlsContainer.classList.add('last');
                controlsContainer.classList.remove('first');
            } else {
                if (controlsContainer.classList.contains('first')) {
                    controlsContainer.classList.remove('first');
                } else if (controlsContainer.classList.contains('last')) {
                    controlsContainer.classList.remove('last');
                }
            }
            //Set Image Heights 
            setImageHeights();
            //Hide/show Spotify
            console.log(page);

            if (document.querySelector('.it-aint-no-big-thing') != null) {
                // Hack: This zine shows the playlists on page 6 and 30 instead. Instead of letting the normal logic
                // run, we override the per-zine logic here. Would be best to make this more scalable...
                if (page == '6' || page == '30') {
                    document.querySelector('.it-aint-no-big-thing .spotify-wrapper').style.opacity = 1;
                    document.querySelector('.it-aint-no-big-thing .spotify-wrapper').style.zIndex = 3;
                } else {
                    document.querySelector('.it-aint-no-big-thing .spotify-wrapper').style.opacity = 0;
                    document.querySelector('.it-aint-no-big-thing .spotify-wrapper').style.zIndex = -1;
                }
            } else {
                if (page == '2' || page == '3') {
                    document.querySelector('.spotify-wrapper').style.opacity = 1;
                    document.querySelector('.spotify-wrapper').style.zIndex = 3;
                } else {
                    document.querySelector('.spotify-wrapper').style.opacity = 0;
                    document.querySelector('.spotify-wrapper').style.zIndex = -1;
                }
            }

            if (page == '1' || page == window.qzine.length) {
                document.querySelector('.controls-container').style.width = window.qzine.singlePageWidth + 'px';
                document.querySelector('.controls-container').style.left = window.qzine.singlePageWidth/2 + 'px';
            } else {
                document.querySelector('.controls-container').style.width = '100%';
                document.querySelector('.controls-container').style.left = 0;
            }
        });
    }
    const bindMouseEvents = function () {
        root.addEventListener("mousemove", e => {
            document.querySelector('.angel').style.display = "block";
            if (e.pageX < window.qzine.singlePageWidth) {
                body.classList.remove('right');
                body.classList.add('left');
                root.style.setProperty('--mouse-x', e.clientX - 20 + "px");
                root.style.setProperty('--mouse-y', e.clientY - 43 + "px");
            } else {
                body.classList.remove('left');
                body.classList.add('right');
                root.style.setProperty('--mouse-x', e.clientX - 49 + "px");
                root.style.setProperty('--mouse-y', e.clientY - 40 + "px");
            }
        });
    }
    const setImageHeights = function() {
        document.querySelectorAll('.images-with-text img').forEach(function(img) {
            img.style.height = (window.qzine.flipBookHeight * .7) + 'px';
        })
        document.querySelectorAll('.top-aligned-video-wrapper').forEach(function(videoWrapper) {
            //Make sure iframe covers available space (70% of height of zine contianer) and maintains aspect ratio
            let iframe = videoWrapper.querySelector('iframe');
            let iframeHeight = iframe.getAttribute('height');
            let iframeWidth = iframe.getAttribute('width');
            let heightOfAreaToFill = window.qzine.flipBookHeight * .7;
            let widthOfAreaToFill = window.qzine.singlePageWidth;

            videoWrapper.style.height = heightOfAreaToFill + 'px';

            //Try full height, overflowed @ width first
            let heightRatio = heightOfAreaToFill/iframeHeight;
            let newWidth = iframeWidth * heightRatio;

            if (newWidth >= widthOfAreaToFill) {
                //Video fills height, overflows width
                iframe.style.height = heightOfAreaToFill + 'px';
                iframe.style.flex = '0 0 ' + newWidth + 'px';
            } else {
                //Video fills width, overflows height
                let widthRatio = widthOfAreaToFill/iframeWidth;
                let newHeight = iframeHeight * widthRatio;
                iframe.style.flex = '0 0 ' + widthOfAreaToFill + 'px';
                iframe.style.height = newHeight + 'px';
            }
        })
    }
    const setFlipBookDimensions = function() {
        var flipbook = document.querySelector('#flipbook');
        var spotifywrapper = document.querySelector('.spotify-wrapper');
        var spotifyiframe = document.querySelector('.spotify-wrapper iframe');
        var controls = document.querySelector('.controls');

        flipbook.style.height = window.qzine.flipBookHeight + 'px';
        flipbook.style.width = window.qzine.clientWidth + 'px';
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
        setImageHeights();
        controls.style.right = window.qzine.controlsOffset;
        spotifywrapper.style.left = (window.qzine.clientWidth / 4) + 'px';
        if (window.qzine.clientWidth < 500) {
            let angelTears = document.querySelector(".angel-tears");
            spotifywrapper.style.top = (window.qzine.flipBookHeight / 2) + ((angelTears.parentElement.offsetHeight/2) - 32 ) + 'px';
            var spotifyWidth = '80px';
            if (spotifyiframe) {
                spotifyiframe.style.width = spotifyWidth;
            }
        } else {
            spotifywrapper.style.top = (window.qzine.flipBookHeight / 2) + 'px';
            if (spotifyiframe) {
                spotifyiframe.style.width = '300px';
            }
        }
    }
    const onResizeHandler = function() {
        document.querySelector('.flipbook-wrapper').style.display = 'none';
        document.querySelector('.angel').style.display = 'none';
        document.querySelector('.controls-container').style.display = 'none';
        document.querySelector('.flipbook-wrapper').classList.add('is-hidden');
        document.querySelector('.controls-container').classList.add('is-hidden');
        document.querySelector('.spotify-wrapper').classList.add('is-hidden');
        document.querySelector('.angel').classList.add('is-hidden');
        //move mouse to the middle again to prevent weird reflow
        root.style.setProperty('--mouse-x', '65%');
        root.style.setProperty('--mouse-y', '20%');
        $("#flipbook").turn("destroy");
        document.querySelector('.flipbook-wrapper').innerHTML = flipBook;
        document.querySelector('.flipbook-wrapper').style.display = 'block';
        document.querySelector('.angel').style.display = 'block';
        document.querySelector('.controls-container').style.display = 'block';
    }
    const setGlobalVariables = function() {
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
    const body = document.querySelector('body');
    const root = document.documentElement;
    //Initialize FlipBook
    initFlipBook(currentPage);

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
    window.addEventListener('resize', function() {
        //Hide FlipBook
        onResizeHandler();
        initFlipBook(currentPage);
    });
})
