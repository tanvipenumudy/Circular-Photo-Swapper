"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
console.clear();
gsap.registerPlugin(MotionPathPlugin);
var App = function () {
    var _a = React.useState(0), opened = _a[0], setOpened = _a[1];
    var _b = React.useState(0), inPlace = _b[0], setInPlace = _b[1];
    var _c = React.useState(false), disabled = _c[0], setDisabled = _c[1];
    var images = [
        { title: 'Mini canine', url: 'https://images.unsplash.com/photo-1583551536442-0fc55ac443f6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600&h=600&fit=min&ixid=eyJhcHBfaWQiOjE0NTg5fQ' },
        { title: 'Wheely tent', url: 'https://images.unsplash.com/photo-1583797227225-4233106c5a2a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600&h=600&fit=min&ixid=eyJhcHBfaWQiOjE0NTg5fQ' },
        { title: 'Red food things', url: 'https://images.unsplash.com/photo-1561626450-730502dba332?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600&h=600&fit=min&ixid=eyJhcHBfaWQiOjE0NTg5fQ' },
        { title: 'Sand boat', url: 'https://images.unsplash.com/photo-1585221454166-ce690e60465f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600&h=600&fit=min&ixid=eyJhcHBfaWQiOjE0NTg5fQ' },
        { title: 'Animal Crossing box', url: 'https://images.unsplash.com/photo-1585427795543-33cf23ea2853?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600&h=600&fit=min&ixid=eyJhcHBfaWQiOjE0NTg5fQ' },
        { title: 'Horse tornado', url: 'https://images.unsplash.com/photo-1507160874687-6fe86a78b22e?ixlib?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600&h=600&fit=min&ixid=eyJhcHBfaWQiOjE0NTg5fQ' },
    ];
    var onClick = function (index) { if (!disabled)
        setOpened(index); };
    var onInPlace = function (index) { return setInPlace(index); };
    var next = function () {
        var nextIndex = opened + 1;
        if (nextIndex >= images.length)
            nextIndex = 0;
        onClick(nextIndex);
    };
    React.useEffect(function () { return setDisabled(true); }, [opened]);
    React.useEffect(function () { return setDisabled(false); }, [inPlace]);
    // React.useEffect(() => {
    // 	if(CodePen && CodePen.isThumbnail)
    // 	{
    // 		setTimeout(() => next(), 100)
    // 	}
    // }, [])
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "container shadow" },
            images.map(function (image, i) { return React.createElement("div", { key: image.url, className: "image", style: { zIndex: inPlace === i ? i : images.length + 1 } },
                React.createElement(Image, { total: images.length, id: i, url: image.url, title: image.title, open: opened === i, inPlace: inPlace === i, onInPlace: onInPlace })); }),
            React.createElement("div", { className: "tabs" },
                React.createElement(Tabs, { className: "tabs", images: images, onSelect: onClick }))),
        React.createElement("button", { className: "button next shadow", onClick: next },
            React.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
                " ",
                React.createElement("path", { d: "M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" }),
                " "))));
};
var Image = function (_a) {
    var url = _a.url, title = _a.title, open = _a.open, inPlace = _a.inPlace, id = _a.id, onInPlace = _a.onInPlace, total = _a.total;
    var _b = React.useState(true), firstLoad = _b[0], loaded = _b[1];
    var clip = React.useRef(null);
    var border = React.useRef(null);
    var gap = 10;
    var circle = 7;
    var defaults = { transformOrigin: 'center center' };
    var duration = 0.5;
    var width = 400;
    var height = 400;
    var scale = 700;
    var bigSize = (circle * scale);
    var overlap = 0;
    var getPosSmall = function () { return ({ x: (width / 2) - ((total * ((circle * 2) + gap) - gap) / 2) + (id * ((circle * 2) + gap)), y: height - 30, scale: 1 }); };
    var getPosSmallAbove = function () { return ({ x: (width / 2) - ((total * ((circle * 2) + gap) - gap) / 2) + (id * ((circle * 2) + gap)), y: height / 2, scale: 1 }); };
    var getPosSmallBelow = function () { return ({ x: width * 0.5, y: height - 30, scale: 1 }); };
    var getPosCenter = function () { return ({ x: width / 2, y: height / 2, scale: 7 }); };
    var getPosEnd = function () { return ({ x: width / 2 - bigSize + overlap, y: height / 2, scale: scale }); };
    var getPosStart = function () { return ({ x: width / 2 + bigSize - overlap, y: height / 2, scale: scale }); };
    var onStateChange = function () {
        loaded(false);
        if (border.current) {
            gsap.set(border.current, __assign(__assign({}, defaults), getPosSmall()));
            console.log(border.current);
        }
        if (clip.current) {
            var flipDuration = firstLoad ? 0 : duration;
            var upDuration = firstLoad ? 0 : 0.6;
            var bounceDuration = firstLoad ? 0.01 : 1;
            var delay = firstLoad ? 0 : flipDuration + upDuration;
            if (open) {
                gsap.fromTo(".letters_" + id, { rotation: 'random(-180, 180)', x: "random(" + width * 0.7 + ", " + width * 0.9 + ")", y: "random(" + height * 0.4 + ", " + height * 0.6 + ")", opacity: 1 }, { ease: 'power3.Out', delay: "random(" + (upDuration + 0.2) + ", " + (upDuration + 0.6) + ")", duration: flipDuration * 1.5, opacity: 1, rotation: 0, motionPath: [{ x: width * 0.1, y: height * 0.5 }, { x: 40, y: 60 }] });
                gsap.timeline()
                    .set(clip.current, __assign(__assign({}, defaults), getPosSmall()))
                    .to(clip.current, __assign(__assign(__assign({}, defaults), getPosCenter()), { duration: upDuration, ease: 'power3.inOut' }))
                    .to(clip.current, __assign(__assign(__assign({}, defaults), getPosEnd()), { duration: flipDuration, ease: 'power4.in', onComplete: function () { return onInPlace(id); } }));
            }
            else {
                gsap.timeline()
                    .fromTo(".letters_" + id, { x: 40, y: 60, rotation: 0 }, { delay: 0.7, duration: duration * 2, x: "random(" + width * 0.24 + ", " + (width - 100) + ")", y: "random(" + 20 + ", " + height / 2 + ")", opacity: 0.75, rotation: 'random(-90, 90)', ease: 'Power3.Out' });
                // .to(`.letters_${id}`, {duration: 0.3, ease: 'power2.in', opacity: 0, x: width / 2, y: height / 2})
                gsap.timeline({ overwrite: true })
                    .set(clip.current, __assign(__assign({}, defaults), getPosStart()))
                    .to(clip.current, __assign(__assign(__assign({}, defaults), getPosCenter()), { delay: delay, duration: flipDuration, ease: 'power4.out' }))
                    .to(clip.current, __assign(__assign({}, defaults), { motionPath: [getPosSmallAbove(), getPosSmall()], duration: bounceDuration, ease: 'bounce.out' }));
            }
        }
    };
    React.useEffect(onStateChange, [open, clip]);
    return (React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink", viewBox: "0 0 " + width + " " + height, preserveAspectRatio: "xMidYMid slice" },
        React.createElement("defs", null,
            React.createElement("clipPath", { id: id + "_circleClip" },
                React.createElement("circle", { class: "clip", cx: "0", cy: "0", r: circle, ref: clip })),
            React.createElement("clipPath", { id: id + "_squareClip" },
                React.createElement("rect", { class: "clip", width: width, height: height }))),
        React.createElement("g", { clipPath: "url(#" + (id + (inPlace ? '_squareClip' : '_circleClip')) + ")" },
            React.createElement("image", { width: width, height: height, xlinkHref: url }),
            React.createElement("g", { transform: "translate(0 0)" }, title.split('').map(function (letter, i) { return React.createElement("text", { className: 'letters_' + id, x: 16 * i, y: 0 }, letter); })))));
};
var Tabs = function (_a) {
    var images = _a.images, onSelect = _a.onSelect;
    var gap = 10;
    var circle = 7;
    var defaults = { transformOrigin: 'center center' };
    var width = 400;
    var height = 400;
    var getPosX = function (i) { return (width / 2) - ((images.length * ((circle * 2) + gap) - gap) / 2) + (i * ((circle * 2) + gap)); };
    var getPosY = function (i) { return height - 30; };
    return (React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink", viewBox: "0 0 " + width + " " + height, preserveAspectRatio: "xMidYMid slice" }, (!images ? [] : images).map(function (image, i) { return React.createElement("circle", { onClick: function () { return onSelect(i); }, className: "border", cx: getPosX(i), cy: getPosY(i), r: circle + 2 }); })));
};
ReactDOM.render(React.createElement(App, null), document.getElementById('app'));