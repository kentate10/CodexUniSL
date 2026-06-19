const API_BASE = "https://www.usloccidente.com/wp-json/wp/v2";

function stripHtml(value = "") {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8211;/g, "-")
    .replace(/&#8212;/g, "-")
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/&#8217;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

async function getJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${url}`);
  }
  return response.json();
}

async function listCollection(type) {
  const output = [];
  for (let page = 1; page <= 10; page += 1) {
    const url = `${API_BASE}/${type}?per_page=100&page=${page}&_embed=1`;
    const items = await getJson(url).catch(() => []);
    if (!items.length) break;

    for (const item of items) {
      output.push({
        id: item.id,
        slug: item.slug,
        title: stripHtml(item.title?.rendered),
        link: item.link,
        date: item.date,
        excerpt: stripHtml(item.excerpt?.rendered).slice(0, 420),
        content: stripHtml(item.content?.rendered).slice(0, 1800),
      });
    }
  }
  return output;
}

const [pages, posts] = await Promise.all([
  listCollection("pages"),
  listCollection("posts"),
]);

for (const [label, items] of [
  ["PAGES", pages],
  ["POSTS", posts],
]) {
  console.log(`\n## ${label}`);
  for (const item of items) {
    console.log(`${item.id} | ${item.slug} | ${item.title}`);
    console.log(`URL: ${item.link}`);
    if (item.excerpt) console.log(`EXCERPT: ${item.excerpt}`);
    if (item.content) console.log(`CONTENT: ${item.content}`);
    console.log("");
  }
}
