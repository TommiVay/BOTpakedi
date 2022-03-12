import DiscordJS from "discord.js";
import mongoose from "mongoose";
import * as constants from "../utils/constants";

const addWinner = (entry: string): void => {
  if (!entry) {
    console.log("add winner no entry");
    return;
  }
};

const deleteIndex = (index: string): void => {
  if (!index) {
    console.log("deleteIndex no index");
    return;
  }
};

const pop = (): void => {
  console.log("pop");
};

const printWinners = (): void => {
  console.log("PRINT WINNERS");
};

const wheelchairHandler = (command: string): void => {
  console.log("command: " + command);
  const argumentString = command
    .slice(constants.WHEELCHAIR_PREFIX.length)
    .trim();

  // no arguments -> print winners
  if (!argumentString) {
    printWinners();
    return;
  }

  const args = argumentString.split(" ");
  const action = args[0];
  const parameter = args[1];

  // add entry
  if (constants.ADD_WINNER.toLocaleLowerCase() === action) {
    addWinner(parameter);
    return;
  }

  // delete entry by index
  if (constants.DELETE_INDEX.toLocaleLowerCase() === action) {
    deleteIndex(parameter);
    return;
  }

  if (constants.POP.toLocaleLowerCase() === action) {
    pop();
  }
};

export default wheelchairHandler;
