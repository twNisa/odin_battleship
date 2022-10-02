class Ship{
  constructor(type, length){
    this.type = type;
    this.length = length;
    this.hits = [];
  }
  hit(pos){
    this.hits.push(pos);
  }
  isSunk(){
    return this.hits.length === this.length;
  }
}
export default Ship;