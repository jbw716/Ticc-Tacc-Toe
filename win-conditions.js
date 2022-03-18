import LineCases from "./line-cases.js";
import LineDirections from "./line-directions.js";

console.log(LineDirections.Horizontal);
const winConditions = [
    {
        lineCase: LineCases.Top,
        criteria: [0, 1, 2],
        direction: LineDirections.Horizontal
    },
    {
        lineCase: LineCases.Horizontal,
        criteria: [3, 4, 5],
        direction: LineDirections.Horizontal
    },
    {
        lineCase: LineCases.Bottom,
        criteria: [6, 7, 8],
        direction: LineDirections.Horizontal
    },
    {
        lineCase: LineCases.Left,
        criteria: [0, 3, 6],
        direction: LineDirections.Vertical
    },
    {
        lineCase: LineCases.Vertical,
        criteria: [1, 4, 7],
        direction: LineDirections.Vertical
    },
    {
        lineCase: LineCases.Right,
        criteria: [2, 5, 8],
        direction: LineDirections.Vertical
    },
    {
        lineCase: LineCases.DiagonalLToR,
        criteria: [0, 4, 8],
        direction: LineDirections.Diagonal
    },
    {
        lineCase: LineCases.DiagonalRToL,
        criteria: [2, 4, 6],
        direction: LineDirections.Diagonal
    }
];

export default winConditions;
