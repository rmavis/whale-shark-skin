function Whalesharkskin(args) {

    function init(args) {
        return makeSquares(getGridStyles(args));
    }

    function getGridStyles(conf) {
        var cols = makeArgMaker(conf.cols, makeNumberRandomizer, makeIdentity(20))();
        var size = Math.ceil(window.screen.width / cols);
        var rows = Math.ceil(window.screen.height / cols);
        var line = makeArgMaker(conf.line, makeIdentity, makeIdentity('hsl(0, 0%, 50%)'));
        var boxColor = makeArgMaker(conf.boxColor, makeColorRandomizer, makeIdentity('hsl(0, 0%, 100%)'));
        var dotColor = makeArgMaker(conf.dotColor, makeColorRandomizer, makeIdentity('hsl(0, 0%, 0%)'));
        var dotSize = makeArgMaker(conf.dotSize, makePercentRandomizer, makeIdentity(50));
        return {
            cols: cols,
            rows: rows,
            size: size,
            line: line,
            boxColor: boxColor,
            dotColor: dotColor,
            dotSize: dotSize,
        };
    }

    function makeSquares(conf) {
        var wrap = makeWrap();
        for (var o = 0; o < conf.rows; o++) {
            var row = makeRow();
            for (var i = 0; i < conf.cols; i++) {
                row.appendChild(makeSquare(conf));
            }
            wrap.appendChild(row);
        }
        return wrap;
    }

    function makeWrap() {
        return makeElement(
            'div',
            {
                style: {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                    margin: '0',
                    padding: '0',
                    minWidth: '100%',
                    minHeight: '100%',
                    fontSize: '0',
                },
            },
            null
        );
    }

    function makeRow() {
        return makeElement(
            'div',
            {
                style: {
                    display: 'block',
                    position: 'relative',
                    minWidth: '100%',
                    fontSize: 0,
                    whiteSpace: 'nowrap',
                },
            },
            null
        );
    }

    function makeSquare(conf) {
        var dot_size = conf.dotSize(conf.size);
        return makeElement(
            'div',
            {
                style: {
                    display: 'inline-block',
                    position: 'relative',
                    width: conf.size + 'px',
                    height: conf.size + 'px',
                    backgroundColor: conf.boxColor(),
                    border: '1px solid ' + conf.line(),
                    overflow: 'visible',
                },
            },
            makeElement(
                'div',
                {
                    style: {
                        display: 'block',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        height: 0,
                        width: 0,
                        border: (dot_size / 2) + 'px solid ' + conf.dotColor(),
                        borderRadius: (dot_size / 2) + 'px',
                        zIndex: 1,
                    },
                }
            )
        );
    }

    function makeElement(tag, attrs, child) {
        var elem = document.createElement(tag);
        for (var attr in attrs) {
            if (attrs.hasOwnProperty(attr)) {
                for (var prop in attrs[attr]) {
                    if (attrs[attr].hasOwnProperty(prop)) {
                        elem[attr][prop] = attrs[attr][prop];
                    }
                }
            }
        }
        if (child) {
            elem.appendChild(child);
        }
        return elem;
    }

    function makeColorRandomizer(x) {
        return function () {
            return 'hsl('+
                getRandomInt(x[0][0], x[0][1])+','+
                getRandomInt(x[1][0], x[1][1])+'%,'+
                getRandomInt(x[2][0], x[2][1])+'%)';
        }
    }

    function makeNumberRandomizer(x) {
        return function () {
            return getRandomInt(x[0], x[1]);
        }
    }

    function makePercentRandomizer(x) {
        return function (n) {
            return ((n / 100) * getRandomInt(x[0], x[1]));
        };
    }

    function makeIdentity(x) {
        return function () {
            return x;
        };
    }

    function makeArgMaker(arg, maker, alt) {
        if (arg instanceof Array) {
            return maker(arg);
        }
        else if ((typeof arg == 'string') ||
                 (typeof arg == 'number'))
            return makeIdentity(arg);
        else {
            return alt;
        }
    }


    // via https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    // Will need to return an element containing the image.
    return init((args || {}));
}
