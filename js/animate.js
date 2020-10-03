'use strict';

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

// ——————————————————————————————————————————————————
// TextScramble
// ——————————————————————————————————————————————————

let TextScramble = function () {
    function TextScramble(el) {
        _classCallCheck(this, TextScramble);

        el.forEach(elem => {
            this.el = elem;
            this.chars = '!<>-_\\/[]{}—=+*^?#________';
            this.update = this.update.bind(this);
        });

    }

    TextScramble.prototype.setText = function setText(newText) {
        let _this = this;

        let oldText = this.el.innerText;
        let length = Math.max(oldText.length, newText.length);
        let promise = new Promise(function (resolve) {
            return _this.resolve = resolve;
        });
        this.queue = [];
        for (let i = 0; i < length; i++) {
            let from = oldText[i] || '';
            let to = newText[i] || '';
            let start = Math.floor(Math.random() * 40);
            let end = start + Math.floor(Math.random() * 40);
            this.queue.push({
                from: from,
                to: to,
                start: start,
                end: end
            });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    };

    TextScramble.prototype.update = function update() {
        let output = '';
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let _queue$i = this.queue[i];
            let from = _queue$i.from;
            let to = _queue$i.to;
            let start = _queue$i.start;
            let end = _queue$i.end;
            let char = _queue$i.char;

            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += '<span class="dud">' + char + '</span>';
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    };

    TextScramble.prototype.randomChar = function randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    };

    return TextScramble;
}();

// ——————————————————————————————————————————————————
// Example
// ——————————————————————————————————————————————————

let phrases = ['JavaScript,', 'Docker', 'AWS & GoogleCloud', 'NodeJS TypeScript',
    'Angular 7', "I'm Andrii Loza", 'end']; 
// 'D3 Redux OOP GIT', 'Socket IO'

let el = document.querySelectorAll('.text');
let fx = new TextScramble(el);

let counter = 0;
let next = function next() {
    fx.setText(phrases[counter]).then(function () {
        let timer = setTimeout(next, 200);
        if (counter === phrases.length - 1) {
            clearTimeout(timer);
        }
    });
    counter = (counter + 1) % phrases.length;
};

next();
