import Ship from "./Ship";

describe("ship functions testing", ()=>{
  let testCarrier;
  let testDestroyer;

  beforeEach(()=>{
    testCarrier = new Ship("Carrier", 4 )
    testDestroyer = new Ship("Destroyer", 3)
  })

  test("hit ship 3", ()=>{
    testCarrier.hit([3,2]);
    expect(testCarrier.hits).toEqual([[3,2]])
  })

  test("hit ship 3 4", ()=>{
    testCarrier.hit(3);
    testCarrier.hit(4);
    expect(testCarrier.hits).toEqual([3, 4])
  })

  test("testing sunk false", ()=>{
    expect(testCarrier.isSunk()).toBe(false);
  })

  test("testing sunk true", ()=>{
    testDestroyer.hit(10)
    testDestroyer.hit(12)
    testDestroyer.hit(11)
    expect(testDestroyer.isSunk()).toBe(true);
  })
})