const lastMember = () => {
  Array.prototype.last = function () {
    return this[this.length - 1];
  };
};

export const loadExtensions = () => {
  lastMember();
};
