module.exports = class Curso {
  constructor(obj) {
    this.id = obj.id ? obj.id : undefined;
    this.name = obj.name ? obj.name : undefined;
  };
}