export default defineEventHandler((event) => {
  console.log(new Date().toTimeString() + ':' + getRequestURL(event));
});
