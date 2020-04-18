window.addEventListener('DOMContentLoaded', function() {
    const flipBook = document.querySelector('.flipbook-wrapper').innerHTML;
    const initFlipBook = function(page) {
        console.log('initFlipBook');
        var spotifyWidth = '80px';
        (spotifyWidth) ? document.querySelector('.dedication iframe').style.width = spotifyWidth : null;
        const clientWidth = window.innerWidth;
        if (clientWidth < 500) {
            var clientHeight = window.innerHeight / 2;
        } else {
            var clientHeight = window.innerHeight;
        }
        $("#flipbook").turn({
            width: clientWidth,
            height: clientHeight,
            page: page,
            autoCenter: true,
        });
    }
    const setFlipBookDimensions = function() {
        console.log('setFlipBookDimensions')
        const clientWidth = window.innerWidth;
        if (clientWidth < 500) {
            var clientHeight = window.innerHeight / 2;
            var controlsOffset = 0;
        } else if (clientWidth < 1000) {
            var controlsOffset = 0;
            var videoWidth = 300;
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
            embed.style.height = (clientHeight * 1.2) + 'px';
            embed.style.width = videoWidth + 'px';
        })
        document.querySelector('.controls').style.right = controlsOffset;
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
    initFlipBook(currentPage);
    $("#flipbook").bind("turned", function(event, page, view) {
        console.log('turned')
        setFlipBookDimensions();
        if (page < currentPage) {
            reinitLazyLoading();
        }
        currentPage = page;
    });

    //Set Flipbook Dimensions
    setFlipBookDimensions();
    //Bind Click Events
    $("#previous").click(function() {
        console.log('previous')
        $("#flipbook").turn("previous");
        currentPage--;
        reinitLazyLoading();
    });
    
    $("#next").click(function() {
        console.log('next')
        $("#flipbook").turn("next");
        currentPage++;
    });

    //Bind Resize Events
    window.addEventListener('resize', function() {
        console.log('onresize')
        $("#flipbook").turn("destroy");
        document.querySelector('.flipbook-wrapper').innerHTML = flipBook;
        initFlipBook(currentPage);
        setFlipBookDimensions();
    })
})
