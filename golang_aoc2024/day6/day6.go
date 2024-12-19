package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

// ReplaceAt replaces a part of the string at a specific index with a replacement string.
func ReplaceAt(str string, index int, replacement string) string {
	if index < 0 || index > len(str)-1 {
		return str
	}
	return str[:index] + replacement + str[index+len(replacement):]
}

// Movements defines directions in a 2D grid: [dx, dy]
var movements = [][]int{
	{-1, 0}, // Up
	{0, 1},  // Right
	{1, 0},  // Down
	{0, -1}, // Left
}

var currDir int = 0

// MovementsLen stores the length of the movements array
var movementsLen = len(movements)

// Symbol constants
const symbol1 = "^"
const symbol2 = "."

// ParseInput splits a raw input string by newlines into a slice of strings.
func ParseInput(rawInput string) []string {
	return strings.Split(rawInput, "\n")
}

// nextPos calculates the next position in the matrix.
func nextPos(matrix [][]string, currPos Position, currDir int, movements [][]int, colsLen int, rowsLen int) *State {

	r, c := movements[currDir%movementsLen][0], movements[currDir%movementsLen][1]

	// Check boundaries
	if currPos.row+r == rowsLen || currPos.row+r == -1 || currPos.col+c == -1 || currPos.col+c == colsLen {
		return nil
	}

	// Check if the next cell is not "."
	if matrix[currPos.row+r][currPos.col+c] != "." {
		return nextPos(matrix, currPos, currDir+1, movements, colsLen, rowsLen)
	}

	return &State{
		currPos: Position{row: currPos.row + r, col: currPos.col + c},
		currDir: currDir,
	}
}

// merge combines values into a single string.
func merge(args ...interface{}) string {
	var result string
	for _, arg := range args {
		result = result + fmt.Sprintf("%v,", arg)
	}
	return result
}

// isMatrixALoop checks if the path in the matrix forms a loop.
func isMatrixALoop(matrix [][]string, startingPosition Position, currDir int, movements [][]int, colsLen int, rowsLen int) (bool, map[string]struct{}) {
	uniquePos := make(map[string]struct{})
	// queue := []State{{currPos: startingPosition, currDir: currDir}}
	var currState = State{currPos: startingPosition, currDir: currDir}
	posSet := make(map[string]struct{})
	var keep = true
	for keep {
		keep = false
		// el := queue[len(queue)-1]
		// queue = queue[:len(queue)-1]

		uniquePositionID := merge(currState.currPos.row, currState.currPos.col, currState.currDir%movementsLen)
		if _, exists := uniquePos[uniquePositionID]; exists {
			return true, nil
		}
		uniquePos[uniquePositionID] = struct{}{}

		posSet[merge(currState.currPos.row, currState.currPos.col)] = struct{}{}
		if nextCoordinates := nextPos(matrix, currState.currPos, currState.currDir, movements, colsLen, rowsLen); nextCoordinates != nil {
			// queue = append(queue, )
			keep = true
			currState = *nextCoordinates
		}
	}
	return false, posSet
}

// findSymbolReplaceIt locates a symbol in the matrix and replaces it.
func findSymbolReplaceIt(matrix []string, symbol1, symbol2 string) (Position, []string) {
	startingPosition := Position{row: 0, col: 0}
	updatedMatrix := make([]string, len(matrix))

	for i, row := range matrix {
		col := strings.Index(row, symbol1)
		if col != -1 {
			startingPosition = Position{row: i, col: col}
			updatedMatrix[i] = ReplaceAt(row, col, symbol2)
		} else {
			updatedMatrix[i] = row
		}
	}
	return startingPosition, updatedMatrix
}

// Position represents a position in the matrix.
type Position struct {
	row, col int
}

// State represents the state of traversal.
type State struct {
	currPos Position
	currDir int
}

// Utility function to convert a 1D string slice to a 2D matrix (slice of slices of strings)
func to2DMatrix(input []string) [][]string {
	matrix := make([][]string, len(input))
	for i, row := range input {
		matrix[i] = make([]string, len(row))
		for j, char := range row {
			matrix[i][j] = string(char)
		}
	}
	return matrix
}

// part1 processes the input and returns the size of the visited positions set.
func part1(rawInput string) int {

	// Parse the input into a matrix of strings
	input := ParseInput(rawInput)

	// Find the starting position and update the matrix
	startingPosition, updatedMatrix := findSymbolReplaceIt(input, symbol1, symbol2)
	var dMatrix = to2DMatrix(updatedMatrix)
	colsLen := len(dMatrix[0])
	rowsLen := len(dMatrix)
	// Check for loops and get the visited positions
	_, posSet := isMatrixALoop(dMatrix, startingPosition, currDir, movements, colsLen, rowsLen)

	// Return the size of the set of visited positions
	return len(posSet)
}

// part2 processes the input and returns the count of positions forming loops.
func part2(rawInput string) int {
	// Parse the input into a matrix
	input := ParseInput(rawInput)

	// Find the starting position and update the matrix
	startingPosition, updatedMatrix := findSymbolReplaceIt(input, symbol1, symbol2)
	var dMatrix = to2DMatrix(updatedMatrix)
	colsLen := len(dMatrix[0])
	rowsLen := len(dMatrix)
	// Check for loops and get the set of visited positions
	_, posSet := isMatrixALoop(dMatrix, startingPosition, currDir, movements, colsLen, rowsLen)

	// Remove the starting position from the set
	delete(posSet, merge(startingPosition.row, startingPosition.col))

	// Initialize a set to track positions that form loops
	countPos := make(map[string]struct{})

	// Check each position in posSet
	for pos := range posSet {
		coords := strings.Split(pos, ",")
		r, _ := strconv.Atoi(coords[0])
		c, _ := strconv.Atoi(coords[1])

		// Create a new matrix with the position marked as "O"
		newMatrix := make([][]string, len(updatedMatrix))
		for i, row := range updatedMatrix {
			newMatrix[i] = append([]string(nil), strings.Split(row, "")...)
			if i == r {
				newMatrix[i][c] = "O"
			}
		}

		// Check if marking this position causes a loop
		isLoop, _ := isMatrixALoop(newMatrix, startingPosition, currDir, movements, colsLen, rowsLen)
		if isLoop {
			countPos[pos] = struct{}{}
		}
	}

	// Return the size of countPos
	return len(countPos)
}

func main() {
	// Leggere il contenuto del file
	data, err := os.ReadFile("input.txt")
	if err != nil {
		fmt.Println("Errore durante la lettura del file:", err)
		return
	}
	var input = string(data)
	fmt.Println("result part1", part1(input))
	fmt.Println("result part2", part2(input))
}
