window.addEventListener('DOMContentLoaded', function() {
    const flipBook = document.querySelector('.flipbook-wrapper').innerHTML;
    const initFlipBook = function(page) {
        setGlobalDimensions();

        $("#flipbook").turn({
            width: window.qzine.clientWidth,
            height: window.qzine.flipBookHeight,
            page: page,
            autoCenter: true,
        });
        bindFlipBookEvents();
        //Set Flipbook Dimensions
        setFlipBookDimensions(page);
    }
    const bindFlipBookEvents = function() {
        $("#flipbook").bind("turned", function(event, page, view) {
            currentPage = page;
            setFlipBookDimensions(currentPage);
            if (shouldLazyLoadAgain) {
                reinitLazyLoading();   
                shouldLazyLoadAgain = false;
            }
        });
    
        $("#flipbook").bind("turning", function(event, page, view) {
            if (page < currentPage) {
                shouldLazyLoadAgain = true;
            }
            if (page == '2' || page == '3') {
                document.querySelector('.spotify-wrapper').style.opacity = 1;
            } else {
                document.querySelector('.spotify-wrapper').style.opacity = 0;
            }
        });
    }
    const bindMouseEvents = function () {
        const body = document.querySelector('body');
        let root = document.documentElement;

        root.addEventListener("mousemove", e => {
        root.style.setProperty('--mouse-x', e.clientX + "px");
        root.style.setProperty('--mouse-y', e.clientY + "px");
            if (e.pageX < window.qzine.singlePageWidth) {
                body.classList.remove('right');
                body.classList.add('left');
            } else {
                body.classList.remove('left');
                body.classList.add('right');
            }
        });
    }
    const setFlipBookDimensions = function(page) {
        //Update global width variables
        setGlobalDimensions();

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
        if (page == '2' || page == '3') {
            document.querySelector('.spotify-wrapper').style.opacity = 1;
            document.querySelector('.spotify-wrapper').style.zIndex = 2;
        } else {
            document.querySelector('.spotify-wrapper').style.opacity = 0;
            document.querySelector('.spotify-wrapper').style.zIndex = -1;
        }
    }
    const reinitLazyLoading = function() {
        document.querySelectorAll('.lazyloaded').forEach(function(loaded) {
            loaded.classList.remove('lazyloaded');
            loaded.classList.add('lazyload');
        })
        lazySizes.init();
    }
    const setGlobalDimensions = function() {
        window.qzine = {};
        window.qzine.clientWidth = window.innerWidth;
            if (window.qzine.clientWidth < 500) {
                window.qzine.controlsOffset = 0;
                window.qzine.flipBookHeight = window.qzine.clientWidth * .54;
                var spotifyWidth = '80px';
                document.querySelector('.spotify-wrapper iframe').style.width = spotifyWidth;
            } else if (window.qzine.clientWidth < 1000) {
                window.qzine.controlsOffset = 0;
                window.qzine.flipBookHeight = window.qzine.clientWidth * .54;
            } else {
                window.qzine.controlsOffset = '50px';
                window.qzine.flipBookHeight = window.innerHeight;
            }
        window.qzine.singlePageWidth = window.qzine.clientWidth / 2;
    }

    ////////////////////////
    // DO STUFF
    ////////////////////////
    //Initialize FlipBook
    var currentPage = 1;
    var shouldLazyLoadAgain = false;
    initFlipBook(currentPage);

    //Bind Click Events
    $("#previous").click(function() {
        $("#flipbook").turn("previous");
        currentPage = currentPage-2;
    });
    
    $("#next").click(function() {
        $("#flipbook").turn("next");
        currentPage = currentPage+2;
    });

    //Bind Mouse Events
    bindMouseEvents();
    
    //Bind Resize Events
    window.addEventListener('resize', _.debounce(function() {
        //Destroy and restart flipbook
        $("#flipbook").turn("destroy");
        document.querySelector('.flipbook-wrapper').innerHTML = flipBook;
        initFlipBook(currentPage);
    }, 200));
})
