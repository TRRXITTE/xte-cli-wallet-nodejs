export const empty = {
    closed: true,
    next(value) { },
    error(err) { throw err; },
    complete() { }
};
