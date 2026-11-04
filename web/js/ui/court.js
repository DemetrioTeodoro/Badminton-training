/* Desenho da meia-quadra (SVG), vista de trás, com a rede no topo. */
import { BASE, POSITIONS } from '../data/court.js';

export function courtSVG({ active = [], interactive = false } = {}) {
  const marks = Object.entries(POSITIONS).map(([k, p]) => {
    const on = active.includes(k);
    const a11y = interactive ? `role="button" tabindex="0" aria-pressed="${on}" aria-label="${p.name}"` : '';
    return `<g class="pos ${on ? 'on' : ''}" data-pos="${k}" ${a11y}>
      <circle cx="${p.x}" cy="${p.y}" r="22"/><text x="${p.x}" y="${p.y}">${p.n}</text></g>`;
  }).join('');
  return `<svg class="court${interactive ? ' interactive' : ''}" viewBox="0 0 300 345" aria-hidden="${!interactive}">
    <rect class="floor" x="10" y="22" width="280" height="308" rx="2"/>
    <g class="lines">
      <rect x="10" y="22" width="280" height="308"/>
      <line x1="31" y1="22" x2="31" y2="330"/><line x1="269" y1="22" x2="269" y2="330"/>
      <line x1="10" y1="113" x2="290" y2="113"/><line x1="10" y1="295" x2="290" y2="295"/>
      <line x1="150" y1="113" x2="150" y2="330"/>
    </g>
    <line class="net" x1="4" y1="22" x2="296" y2="22"/>
    <text class="net-label" x="150" y="13">REDE</text>
    <line class="path" x1="${BASE.x}" y1="${BASE.y}" x2="${BASE.x}" y2="${BASE.y}"/>
    <circle class="base" cx="${BASE.x}" cy="${BASE.y}" r="14"/>
    ${marks}
    <circle class="runner" cx="${BASE.x}" cy="${BASE.y}" r="9"/>
  </svg>`;
}
