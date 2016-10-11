const defaultLimit = 10;
const defaultSkip = 0;
const defaultDate = new Date('2000-01-01T00:00:00.000Z');

function parseLimit(limitParam) {
  if (!limitParam) {
    return defaultLimit;
  }

  const parsedLimit = parseInt(limitParam, 10);
  if (parsedLimit > 100) {
    return 100;
  }

  if (parsedLimit <= 0) {
    return defaultLimit;
  }

  return parsedLimit;
}

function parseSince(sinceParam) {
  if (!sinceParam) {
    return defaultDate;
  }

  const parsedDate = new Date(sinceParam);
  if (isNaN(parsedDate.getTime())) {
    return defaultDate;
  }

  return parsedDate;
}

function parseSkip(skipParam) {
  if (!skipParam) {
    return defaultSkip;
  }

  const parsedSkip = parseInt(skipParam, 10);
  if (!parsedSkip || parsedSkip <= 0) {
    return defaultSkip;
  }

  return parsedSkip;
}

module.exports = {
  parseLimit,
  parseSince,
  parseSkip
};
