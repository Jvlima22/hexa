import { CategoryTile } from "./category-tile";

export function CategoryGrid() {
  const categories = [
    {
      title: "Seleção Brasileira",
      src: "https://imgnike-a.akamaihd.net/branding/futebol-sbf-10.07.23/assets/img/alegria-que-apavora-vini-jr-grid-item-a.jpg",
      href: "/search/brasil",
      size: "full" as const,
    },
    {
      title: "Mantos Masculinos",
      src: "https://imgnike-a.akamaihd.net/branding/futebol-sbf-10.07.23/assets/img/alegria-que-apavora-bnt-camisa-i-grid-item-b.jpg",
      href: "/search/masculino",
      size: "half" as const,
    },
    {
      title: "Mantos Femininos",
      src: "https://imgnike-a.akamaihd.net/branding/futebol-sbf-10.07.23/assets/img/alegria-que-apavora-bnt-camisa-i-grid-item-c.jpg",
      href: "/search/feminino",
      size: "half" as const,
    },
  ];

  return (
    <section className="mx-auto grid max-w-(--breakpoint-2xl) gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2 lg:max-h-[calc(100vh-200px)]">
      {categories.map((category, index) => (
        <CategoryTile
          key={category.title}
          src={category.src}
          title={category.title}
          href={category.href}
          size={category.size}
          priority={index === 0}
        />
      ))}
    </section>
  );
}
