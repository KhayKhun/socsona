import { TraitKey } from "../data/dialogs";

// Utility to pick from the C/E/L group
function pickCel(scores: { C: number; E: number; L: number }): string {
  const { C, E, L } = scores;
  if (C >= E && C >= L) return "C";
  if (E >= C && E >= L) return "E";
  return "L";
}

// Utility to pick from the O/D/S group
function pickOds(scores: { O: number; D: number; S: number }): string {
  const { O, D, S } = scores;
  if (O >= D && O >= S) return "O";
  if (D >= O && D >= S) return "D";
  return "S";
}

// Utility to pick from the P/V group
function pickPv(scores: { P: number; V: number }): string {
  const { P, V } = scores;
  return P >= V ? "P" : "V";
}

// Combine them into a 3-letter code: e.g. C+O+P = "COP" 

export function getGroupCode(allScores: Record<TraitKey, number>): string {
  const first = pickCel({ C: allScores.C, E: allScores.E, L: allScores.L });
  const second = pickOds({ O: allScores.O, D: allScores.D, S: allScores.S });
  const third = pickPv({ P: allScores.P, V: allScores.V });
  return first + second + third;
}
