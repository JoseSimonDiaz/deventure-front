export const RUNE_GLYPHS = ['fehu', 'ansuz', 'raido', 'kenaz', 'thurisaz', 'algiz'] as const;

export type RuneGlyph = (typeof RUNE_GLYPHS)[number];
