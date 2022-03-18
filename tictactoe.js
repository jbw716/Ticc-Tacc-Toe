import LineCases from "./line-cases.js";
import LineDirections from "./line-directions.js";
import winConditions from "./win-conditions.js";

const spaces = [
    // Row 1
    {
        index: null,
        symbol: null,
        el: null
    },
    {
        index: null,
        symbol: null,
        el: null
    },
    {
        index: null,
        symbol: null,
        el: null
    },
    //Row 2
    {
        index: null,
        symbol: null,
        el: null
    },
    {
        index: null,
        symbol: null,
        el: null
    },
    {
        index: null,
        symbol: null,
        el: null
    },
    // Row 3
    {
        index: null,
        symbol: null,
        el: null
    },
    {
        index: null,
        symbol: null,
        el: null
    },
    {
        index: null,
        symbol: null,
        el: null
    }
];

spaces.forEach((val, index) => {
    val.index = index;
});

init();

var container;

function init() {
    container = document.querySelector("div.container");
    container.style.width = container.offsetHeight;
    spaces.forEach(space => {
        space.el = document.createElement('div');
        space.el.classList.add('space');
        container.appendChild(space.el);
    });
    registerEventListeners();
}

function registerEventListeners() {
    spaces.forEach(space => {
        space.el.addEventListener('click', () => fillSpace(space, 'x'));
        space.el.addEventListener('contextmenu', event => {
            event.preventDefault();
            fillSpace(space, 'o');
            return false;
        });
        space.el.addEventListener('dblclick', () => clearSpace(space));
    });
    window.addEventListener('resize', () => {
        container.style.width = container.offsetHeight;
        spaces.forEach(space => {
            const icon = space.el.querySelector('i.icon');
            if (icon) {
                sizeIcon(icon);
            }
        });
    });
}

function sizeIcon(icon) {
    icon.style.fontSize = icon.parentElement.offsetWidth + 'px';
}

function clearSpace(space) {
    var child = space.el.lastElementChild;
    while (child) {
        space.el.removeChild(child);
        child = space.el.lastElementChild;
    }
    space.symbol = null;
    checkForWinner();
}

function fillSpace(space, val) {
    clearSpace(space);
    space.symbol = val;
    const icon = document.createElement('i');
    icon.classList.add('fa-' + val, 'fa-solid', 'icon');
    space.el.appendChild(icon);
    sizeIcon(icon);
    console.log(checkForWinner() + ' wins!');
}

function clearWinnerLines() {
    const winnerLines = container.querySelectorAll('span.line');
    winnerLines.forEach(line => {
        container.removeChild(line);
    });
}

function checkForWinner() {
    const xspaces = [];
    const ospaces = [];
    spaces.forEach(space => {
        if (space.symbol === 'x') {
            xspaces.push(space.index);
        }
        if (space.symbol === 'o') {
            ospaces.push(space.index);
        }
    });

    clearWinnerLines();
    const xwin = calcWin(xspaces);
    const owin = calcWin(ospaces);
    if (xwin && owin) {
        return 'xo';
    }
    if (calcWin(xspaces)) {
        return 'x';
    }
    if (calcWin(ospaces)) {
        return 'o';
    }
}

function calcWin(spacesToCheck) {
    let anyWinner = false;
    for (const condition of winConditions) {
        const won = condition.criteria.every(val => spacesToCheck.includes(val));
        if (won) {
            const winnerLine = document.createElement('span');
            winnerLine.classList.add('line')
            switch (condition.direction) {
                case LineDirections.Horizontal:
                    winnerLine.style.width = container.clientWidth - 10;
                    break;
                case LineDirections.Vertical:
                    winnerLine.style.width = container.clientHeight - 10;
                    break;
                case LineDirections.Diagonal:
                    winnerLine.style.width = Math.sqrt(2) * container.clientWidth - 10;
                    break;
            }

            if (condition.direction === LineDirections.Vertical) {
                winnerLine.style.transform = 'translate(-50%, -50%) rotate(90deg)';
            }
            else if (condition.direction === LineDirections.Diagonal) {
                if (condition.lineCase === LineCases.DiagonalLToR) {
                    winnerLine.style.transform = winnerLine.style.transform + 'translate(-50%, -50%) rotate(45deg)';
                }
                else if (condition.lineCase === LineCases.DiagonalRToL) {
                    winnerLine.style.transform = winnerLine.style.transform + 'translate(-50%, -50%) rotate(-45deg)';
                }
            }
            else {
                winnerLine.style.transform = 'translate(-50%, -50%)';
            }

            switch (condition.lineCase) {
                case LineCases.Top:
                    winnerLine.style.top = '25%';
                    winnerLine.style.left = '50%';
                    break;
                case LineCases.Bottom:
                    winnerLine.style.top = '75%';
                    winnerLine.style.left = '50%';
                    break;
                case LineCases.Left:
                    winnerLine.style.top = '50%';
                    winnerLine.style.left = '25%';
                    break;
                case LineCases.Right:
                    winnerLine.style.top = '50%';
                    winnerLine.style.left = '75%';
                    break;
                case LineCases.Vertical:
                case LineCases.Horizontal:
                case LineCases.DiagonalLToR:
                case LineCases.DiagonalRToL:
                    winnerLine.style.top = '50%';
                    winnerLine.style.left = '50%';
                    break;
            };

            container.appendChild(winnerLine);
            anyWinner = true;
        }
    }
    return anyWinner;
}