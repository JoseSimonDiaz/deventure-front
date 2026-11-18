export function shuffleItems<TItem>(items: readonly TItem[]): TItem[] {
  const shuffledItems = [...items];
  for (let currentIndex = shuffledItems.length - 1; currentIndex > 0; currentIndex -= 1) {
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    const currentItem = shuffledItems[currentIndex] as TItem;
    shuffledItems[currentIndex] = shuffledItems[randomIndex] as TItem;
    shuffledItems[randomIndex] = currentItem;
  }
  return shuffledItems;
}
