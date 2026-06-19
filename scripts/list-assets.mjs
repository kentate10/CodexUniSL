const html = await fetch("https://www.usloccidente.com/").then((response) =>
  response.text(),
);

const urls = [
  ...html.matchAll(/https:\/\/[^"'\s]+\.(?:png|jpg|jpeg|webp)/gi),
].map((match) => match[0]);

for (const url of [...new Set(urls)].slice(0, 80)) {
  console.log(url);
}
