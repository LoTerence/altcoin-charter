/* @function delay: waits 'ms' number of milliseconds before proceeding */
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// Usage:
/* 
const yourFunction = async () => {
  await delay(5000);
  console.log("Waited 5s");
};
*/

export default delay;
