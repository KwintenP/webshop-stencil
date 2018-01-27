interface Test {
  test: () => {}
}
declare var Context: any;
console.log('triggered');
Context.test = (function() {
  function test() {

  }
  return {
    test
  } as Test;
})();
