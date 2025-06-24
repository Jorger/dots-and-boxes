import { TStateLines } from "./interfaces";

export const boxes = {
  "0-0": {
    counter: 1,
    isComplete: false,
    isCommit: false,
    delay: 0,
  },
  "1-0": {
    counter: 1,
    isComplete: false,
    isCommit: false,
    delay: 0,
  },
  "2-0": {
    counter: 1,
    isComplete: false,
    isCommit: false,
    delay: 0,
  },
  "3-0": {
    counter: 2,
    isComplete: false,
    isCommit: false,
    delay: 0,
  },
  "4-0": {
    counter: 2,
    isComplete: false,
    isCommit: false,
    delay: 0,
  },
  "4-1": {
    counter: 1,
    isComplete: false,
    isCommit: false,
    delay: 0,
  },
  "4-2": {
    counter: 2,
    isComplete: false,
    isCommit: false,
    delay: 0,
  },
  "4-3": {
    counter: 1,
    isComplete: false,
    isCommit: false,
    delay: 0,
  },
  "4-4": {
    counter: 3,
    isComplete: false,
    isCommit: false,
    delay: 0,
  },
  "3-4": {
    counter: 2,
    isComplete: false,
    isCommit: false,
    delay: 0,
  },
  "3-3": {
    counter: 3,
    isComplete: false,
    isCommit: false,
    delay: 0,
  },
  "2-3": {
    counter: 1,
    isComplete: false,
    isCommit: false,
    delay: 0,
  },
  "3-2": {
    counter: 3,
    isComplete: false,
    isCommit: false,
    delay: 0,
  },
  "3-1": {
    counter: 3,
    isComplete: false,
    isCommit: false,
    delay: 0,
  },
  "2-1": {
    counter: 1,
    isComplete: false,
    isCommit: false,
    delay: 0,
  },
  "0-4": {
    counter: 3,
    isComplete: false,
    isCommit: false,
    delay: 0,
  },
  "0-3": {
    counter: 1,
    isComplete: false,
    isCommit: false,
    delay: 0,
  },
  "1-4": {
    counter: 1,
    isComplete: false,
    isCommit: false,
    delay: 0,
  },
};

export const lines: TStateLines = {
  HORIZONTAL: {
    "5-0": {
      state: "COMPLETED",
      color: "BLUE",
      isCommit: true,
      delay: 0,
    },
    "5-1": {
      state: "COMPLETED",
      color: "RED",
      isCommit: true,
      delay: 0,
    },
    "5-2": {
      state: "COMPLETED",
      color: "BLUE",
      isCommit: true,
      delay: 0,
    },
    "5-3": {
      state: "COMPLETED",
      color: "RED",
      isCommit: true,
      delay: 0,
    },
    "5-4": {
      state: "COMPLETED",
      color: "BLUE",
      isCommit: true,
      delay: 0,
    },
    "4-4": {
      state: "COMPLETED",
      color: "BLUE",
      isCommit: true,
      delay: 0,
    },
    "3-3": {
      state: "COMPLETED",
      color: "BLUE",
      isCommit: true,
      delay: 0,
    },
    "4-2": {
      state: "COMPLETED",
      color: "BLUE",
      isCommit: true,
      delay: 0,
    },
    "3-1": {
      state: "COMPLETED",
      color: "BLUE",
      isCommit: true,
      delay: 0,
    },
    "0-4": {
      state: "COMPLETED",
      color: "BLUE",
      isCommit: true,
      delay: 0,
    },
    "1-4": {
      state: "SELECTED",
      color: "BLUE",
      isCommit: false,
      delay: 0,
    },
  },
  VERTICAL: {
    "0-0": {
      state: "COMPLETED",
      color: "RED",
      isCommit: true,
      delay: 0,
    },
    "1-0": {
      state: "COMPLETED",
      color: "BLUE",
      isCommit: true,
      delay: 0,
    },
    "2-0": {
      state: "COMPLETED",
      color: "RED",
      isCommit: true,
      delay: 0,
    },
    "3-0": {
      state: "COMPLETED",
      color: "BLUE",
      isCommit: true,
      delay: 0,
    },
    "4-0": {
      state: "COMPLETED",
      color: "RED",
      isCommit: true,
      delay: 0,
    },
    "4-5": {
      state: "COMPLETED",
      color: "RED",
      isCommit: true,
      delay: 0,
    },
    "3-4": {
      state: "COMPLETED",
      color: "RED",
      isCommit: true,
      delay: 0,
    },
    "3-3": {
      state: "COMPLETED",
      color: "RED",
      isCommit: true,
      delay: 0,
    },
    "3-2": {
      state: "COMPLETED",
      color: "RED",
      isCommit: true,
      delay: 0,
    },
    "3-1": {
      state: "COMPLETED",
      color: "RED",
      isCommit: true,
      delay: 0,
    },
    "0-4": {
      state: "COMPLETED",
      color: "RED",
      isCommit: true,
      delay: 0,
    },
  },
};

export const TEST_DATA = {
  boxes,
  lines,
};
