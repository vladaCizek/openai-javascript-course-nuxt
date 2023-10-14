export default function (url) {
  const urlParams = new URLSearchParams(new URL(url).search);
  return urlParams.get("v");
}
