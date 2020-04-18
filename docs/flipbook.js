window.addEventListener('DOMContentLoaded', function() {
    const flipBook = document.querySelector('.flipbook-wrapper').innerHTML;
    const initFlipBook = function(page) {
        const clientWidth = window.innerWidth;
        if (clientWidth < 500) {
            var clientHeight = window.innerHeight / 2;
            var spotifyWidth = '80px' 
            (spotifyWidth) ? document.querySelector('.dedication iframe').style.width = spotifyWidth : null;
        } else {
            var clientHeight = window.innerHeight;
        }
        if (page == '2' || page == '3') {
            document.querySelector('.spotify-wrapper').style.opacity = 1;
        } else {
            document.querySelector('.spotify-wrapper').style.opacity = 0;
        }
        $("#flipbook").turn({
            width: clientWidth,
            height: clientHeight,
            page: page,
            autoCenter: true,
        });
        bindFlipBookEvents();
    }
    const bindFlipBookEvents = function() {
        $("#flipbook").bind("turned", function(event, page, view) {
            currentPage = page;
            console.log(currentPage);
            setFlipBookDimensions();
            if (shouldLazyLoadAgain) {
                console.log('reinit')
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
    const setFlipBookDimensions = function() {
        const clientWidth = window.innerWidth;
        if (clientWidth < 500) {
            var clientHeight = window.innerHeight / 2;
            var controlsOffset = 0;
        } else if (clientWidth < 1000) {
            var controlsOffset = 0;
        } else {
            var clientHeight = window.innerHeight;
            var controlsOffset = '50px';
        }       
        const singlePageWidth = clientWidth / 2;

        document.querySelector('#flipbook').style.height = clientHeight + 'px';
        document.querySelector('#flipbook').style.width = clientWidth + 'px';
        document.querySelectorAll('#flipbook .page').forEach(function(page) {
            page.style.height = clientHeight + 'px';
            page.style.width = clientWidth;
        })
        document.querySelectorAll('.qzine-page').forEach(function(page) {
            page.style.height = clientHeight + 'px';
            page.style.width = singlePageWidth + 'px';
        })
        document.querySelectorAll('.video-embed iframe').forEach(function(embed) {
            embed.style.width = (singlePageWidth) + 'px';
        })
        document.querySelector('.controls').style.right = controlsOffset;
        document.querySelector('.spotify-wrapper').style.left = (clientWidth / 4) + 'px';
        document.querySelector('.spotify-wrapper').style.top = (clientHeight / 2) + 'px';
    }
    const reinitLazyLoading = function() {
        document.querySelectorAll('.lazyloaded').forEach(function(loaded) {
            loaded.classList.remove('lazyloaded');
            loaded.classList.add('lazyload');
        })
        lazySizes.init();
    }
    //Initialize FlipBook
    var currentPage = 1;
    var shouldLazyLoadAgain = false;
    initFlipBook(currentPage);
    //Set Flipbook Dimensions
    setFlipBookDimensions();
    //Bind Click Events
    $("#previous").click(function() {
        $("#flipbook").turn("previous");
        currentPage = currentPage-2;
    });
    
    $("#next").click(function() {
        $("#flipbook").turn("next");
        currentPage = currentPage+2;
    });

    //Bind Resize Events
    window.addEventListener('resize', function() {
        $("#flipbook").turn("destroy");
        document.querySelector('.flipbook-wrapper').innerHTML = flipBook;
        initFlipBook(currentPage);
        setFlipBookDimensions();
    })
})
