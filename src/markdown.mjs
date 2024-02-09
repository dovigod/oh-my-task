import { TASK_STATUS } from "./status.mjs";

export const emoji = {
  [TASK_STATUS.IDLE]: "❌",
  [TASK_STATUS.WORKING]: "💻",
  [TASK_STATUS.COMPLETE]: "✅",
};

export function isMarkdown(filename) {
  return RegExp(/^.*\.(md)$/).test(filename);
}

export function pipe(text, formatTypeList) {
  return formatTypeList.reduce((reformed, formatType) => {
    return format(reformed, formatType);
  }, text);
}

// basicly each types is same as tag names of html, execptions for those doesn't exist in html
export function format(text, type) {
  switch (type.toLowerCase()) {
    case "h1": {
      return _toH1(text);
    }
    case "h2": {
      return _toH2(text);
    }
    case "h3": {
      return _toH3(text);
    }
    case "h4": {
      return _toH4(text);
    }
    case "h5": {
      return _toH5(text);
    }
    case "h6": {
      return _toH6(text);
    }
    case "br": {
      return _lineBreak(text);
    }
    case "tab": {
      return _indent(text);
    }
    case "ol": {
      return _orderedList(text);
    }
    case "ul": {
      return _unorderedList(text);
    }
    case "s": {
      return _cancel(text);
    }
    case "b": {
      return _bold(text);
    }
    case "u": {
      return _underline(text);
    }
    case "blockquote": {
      return _blockquote(text);
    }

    case TASK_STATUS.IDLE: {
      return _status(text, type);
    }
    case TASK_STATUS.WORKING: {
      return _status(text, type);
    }
    case TASK_STATUS.COMPLETE: {
      return _status(text, type);
    }

    default: {
      return text;
    }
  }
}

function _toH1(text) {
  return `# ${text}`;
}

function _toH2(text) {
  return `## ${text}`;
}

function _toH3(text) {
  return `### ${text}`;
}

function _toH4(text) {
  return `#### ${text}`;
}

function _toH5(text) {
  return `##### ${text}`;
}

function _toH6(text) {
  return `###### ${text}`;
}

function _lineBreak(text) {
  return `${text}
  `;
}

function _orderedList(text) {
  return `1. ${text}`;
}

function _unorderedList(text) {
  return `- ${text}`;
}

function _blockquote(text) {
  return `> ${text}`;
}

function _indent(text) {
  return `   ${text}`;
}

function _cancel(text) {
  return `~~${text}~~`;
}

function _bold(text) {
  return `__${text}__`;
}

function _underline(text) {
  return `<U>${text}</U>`;
}

function _status(text, type) {
  return `${emoji[type]} ${text}`;
}
