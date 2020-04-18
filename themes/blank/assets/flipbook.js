window.addEventListener('DOMContentLoaded', function() {
    const clientHeight = window.innerHeight;
    const clientWidth = window.innerWidth;

    const setFlipBookDimensions = function() {
        const clientHeight = window.innerHeight;
        const clientWidth = window.innerWidth;
        const margin = '10';
        const doublemargin = '20';
        const singlePageWidth = clientWidth /2;
        document.querySelector('#flipbook').style.height = clientHeight;
        document.querySelector('#flipbook').style.width = clientWidth;
        document.querySelector('#flipbook .page').style.height = clientHeight;
        document.querySelector('#flipbook .page').style.width = clientWidth;
        document.querySelector('.video-embed').style.width = singlePageWidth;
        document.querySelector('.video-embed').style.height = clientHeight;
        document.querySelector('.qzine-page').style.width = singlePageWidth;
        document.querySelector('.qzine-page').style.height = clientHeight;
        document.querySelector('.video-embed iframe').style.height = clientHeight;
        document.querySelector('.video-embed iframe').style.width = singlePageWidth;
        
    }
    //Initialize FlipBook
    $("#flipbook").turn({
        width: clientWidth,
        height: clientHeight,
        autoCenter: true,
    });
    //Set Flipbook Dimensions
    setFlipBookDimensions();
    //Bind Click Events
    $("#previous").click(function() {
        $("#flipbook").turn("previous");
    });
    
    $("#next").click(function() {
        $("#flipbook").turn("next");
    });

    //Bind Resize Events
    window.addEventListener('onresize', function() {
        setFlipBookDimensions();
    })
})
