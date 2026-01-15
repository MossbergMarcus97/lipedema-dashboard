import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';
import mammoth from 'mammoth';

export const metadata = {
  title: 'Rapport | Lipedema-studie',
  description: 'Klinisk rapport for lipedema-studien ved IbsenSykehusene (2021–2025).'
};

const REPORT_TITLE =
  'Lipedema at IbsenSykehusene: Health-Related Quality of Life and Disease-Specific Symptom Burden among Women Undergoing Lipedema Surgery versus Consultation Only';
const REPORT_PERIOD = 'August 2021 – August 2025';
const DOCX_PATH = path.join(
  process.cwd(),
  'public',
  'reports',
  'lipedema-rapport.docx'
);
const DOCX_HREF = '/reports/lipedema-rapport.docx';

const highlightCards = [
  {
    label: 'Inviterte',
    value: '719',
    detail: 'Elektronisk spørreundersøkelse'
  },
  {
    label: 'Respondenter',
    value: '202',
    detail: '28% svarprosent'
  },
  {
    label: 'PCS-differanse',
    value: '+15.2',
    detail: 'Fysisk komposittskår (operert vs konsultasjon)'
  },
  {
    label: 'MCS-differanse',
    value: '+15.3',
    detail: 'Mental komposittskår (operert vs konsultasjon)'
  },
  {
    label: 'Symptomkompositt',
    value: '2.99 → 2.27',
    detail: 'Lavere symptombyrde etter kirurgi'
  },
  {
    label: 'Heltidsarbeid',
    value: '+15.0 pp',
    detail: 'Operert vs konsultasjon'
  }
];

const methodologyPoints = [
  'Anonym tverrsnittsundersøkelse av kvinner diagnostisert med lipedema (Aug 2021–Aug 2025).',
  'Primærsammenligning: konsultasjon alene vs kirurgisk behandlet (any).',
  'RAND-12 domener 0–100; uvektede PCS/MCS brukt for denne studien.',
  'Symptomer målt på skala 0–4 (aldri–alltid), lavere skår = mindre byrde.',
  'Arbeidsstatus rapportert med ikke-manglende nevner (konsultasjon n=93, operert n=68).'
];

const treatmentTable = [
  {
    category: 'Konsultasjon alene',
    n: '114',
    percent: '56.4%'
  },
  {
    category: 'Kirurgisk behandlet ved IbsenSykehusene',
    n: '65',
    percent: '32.2%'
  },
  {
    category: 'Kirurgisk behandlet andre steder',
    n: '11',
    percent: '5.4%'
  },
  {
    category: 'Kirurgisk behandlet både ved IbsenSykehusene og andre steder',
    n: '12',
    percent: '5.9%'
  }
];

const employmentTable = [
  {
    status: 'Heltidsarbeid',
    consultation: '38 (40.9%)',
    operated: '38 (55.9%)'
  },
  {
    status: 'Deltid',
    consultation: '13 (14.0%)',
    operated: '9 (13.2%)'
  },
  {
    status: 'Sykmelding',
    consultation: '14 (15.1%)',
    operated: '6 (8.8%)'
  },
  {
    status: 'Uføretrygd',
    consultation: '21 (22.6%)',
    operated: '11 (16.2%)'
  },
  {
    status: 'Ikke i arbeid',
    consultation: '7 (7.5%)',
    operated: '4 (5.9%)'
  },
  {
    status: 'Manglende/annet',
    consultation: '21',
    operated: '20'
  }
];

const rand12Table = [
  {
    domain: 'GH',
    consultation: '39.2 (26.0), n=111',
    operated: '50.6 (22.7), n=81',
    diff: '11.4',
    ci: '4.5–18.4',
    p: '0.001433',
    g: '0.46'
  },
  {
    domain: 'PF',
    consultation: '61.0 (30.1), n=111',
    operated: '73.4 (30.3), n=79',
    diff: '12.4',
    ci: '3.6–21.2',
    p: '0.006',
    g: '0.41'
  },
  {
    domain: 'RP',
    consultation: '25.5 (39.0), n=108',
    operated: '50.0 (46.3), n=78',
    diff: '24.5',
    ci: '11.8–37.3',
    p: '0.0002051',
    g: '0.58'
  },
  {
    domain: 'BP',
    consultation: '50.0 (29.2), n=105',
    operated: '62.5 (29.0), n=76',
    diff: '12.5',
    ci: '3.8–21.2',
    p: '0.004901',
    g: '0.43'
  },
  {
    domain: 'VT',
    consultation: '21.4 (21.2), n=103',
    operated: '34.8 (24.0), n=73',
    diff: '13.4',
    ci: '6.5–20.4',
    p: '0.0001885',
    g: '0.60'
  },
  {
    domain: 'SF',
    consultation: '60.0 (28.0), n=102',
    operated: '67.5 (28.4), n=72',
    diff: '7.5',
    ci: '-1.1–16.1',
    p: '0.08626',
    g: '0.27'
  },
  {
    domain: 'RE',
    consultation: '26.9 (37.7), n=108',
    operated: '51.9 (43.0), n=78',
    diff: '25.1',
    ci: '13.1–37.1',
    p: '5.946e-05',
    g: '0.62'
  },
  {
    domain: 'MH',
    consultation: '47.6 (18.1), n=104',
    operated: '61.5 (21.2), n=74',
    diff: '13.9',
    ci: '7.9–19.9',
    p: '1.079e-05',
    g: '0.71'
  },
  {
    domain: 'PCS',
    consultation: '44.0 (25.5), n=111',
    operated: '59.1 (26.4), n=81',
    diff: '15.2',
    ci: '7.7–22.7',
    p: '9.831e-05',
    g: '0.58'
  },
  {
    domain: 'MCS',
    consultation: '37.8 (21.2), n=108',
    operated: '53.1 (23.8), n=78',
    diff: '15.3',
    ci: '8.6–22.0',
    p: '1.15e-05',
    g: '0.68'
  }
];

const HEADING_MAP = [
  { text: 'Abstract', level: 2 },
  { text: 'Introduction', level: 2 },
  { text: 'Methods', level: 2 },
  { text: 'Design and recruitment', level: 3 },
  { text: 'Measures', level: 3 },
  { text: 'RAND Scale Definitions:', level: 3 },
  { text: 'Response & scoring', level: 3 },
  { text: 'Results', level: 2 },
  { text: 'Participants & treatment categories', level: 3 },
  { text: 'Anthropometrics', level: 3 },
  { text: 'RAND-12 & composites', level: 3 },
  { text: 'Lipedema-specific symptoms', level: 3 },
  { text: 'Employment', level: 3 },
  { text: 'Sensitivity analyses', level: 3 },
  { text: 'Discussion', level: 2 },
  { text: 'Limitations', level: 2 },
  { text: 'Conclusion', level: 2 },
  { text: 'Implications for QI & practice', level: 2 },
  { text: 'Tables', level: 2 }
];

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const stripTags = (value) => value.replace(/<[^>]+>/g, '');
const normalizeText = (value) =>
  stripTags(value)
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

const applyHeadingMap = (html) =>
  HEADING_MAP.reduce((updated, { text, level }) => {
    const pattern = new RegExp(`<p>\\s*${escapeRegExp(text)}\\s*</p>`, 'g');
    return updated.replace(pattern, `<h${level}>${text}</h${level}>`);
  }, html);

const stripFirstMatchingBlock = (html, targetText) => {
  const normalizedTarget = normalizeText(targetText);
  const blockPattern = /<(h[1-6]|p)>(.*?)<\/\1>/i;
  let removed = false;

  return html.replace(blockPattern, (match, tag, inner) => {
    if (removed) {
      return match;
    }

    const normalizedBlock = normalizeText(inner);
    if (normalizedBlock === normalizedTarget) {
      removed = true;
      return '';
    }

    return match;
  });
};

const addHeadingIds = (html) => {
  const used = new Map();
  const headings = [];
  const updated = html.replace(/<h([1-6])>(.*?)<\/h\1>/g, (match, level, inner) => {
    const text = stripTags(inner).trim();
    if (!text) {
      return match;
    }

    const slugBase = text
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    const count = (used.get(slugBase) || 0) + 1;
    used.set(slugBase, count);
    const id = count > 1 ? `${slugBase}-${count}` : slugBase;

    headings.push({ id, text, level: Number(level) });

    return `<h${level} id="${id}">${inner}</h${level}>`;
  });

  return { html: updated, headings };
};

const stripFromHeading = (html, headingText) => {
  const headingPattern = new RegExp(
    `<h[1-6][^>]*>\\s*${escapeRegExp(headingText)}\\s*</h[1-6]>`,
    'i'
  );
  const match = html.match(headingPattern);
  if (!match) {
    return { html, removed: false };
  }

  const index = html.indexOf(match[0]);
  return {
    html: html.slice(0, index),
    removed: true
  };
};

const getReportContent = async () => {
  try {
    await fs.access(DOCX_PATH);
    const { value } = await mammoth.convertToHtml({ path: DOCX_PATH });
    let html = applyHeadingMap(value);
    html = stripFirstMatchingBlock(html, REPORT_TITLE);
    html = stripFirstMatchingBlock(html, REPORT_PERIOD);

    const { html: trimmedHtml } = stripFromHeading(html, 'Tables');
    const { html: htmlWithIds, headings } = addHeadingIds(trimmedHtml);

    return { html: htmlWithIds, headings };
  } catch (error) {
    return {
      html:
        '<p>Rapporten kunne ikke konverteres akkurat nå. Last ned originalfilen for full tilgang.</p>',
      headings: []
    };
  }
};

const HighlightCard = ({ label, value, detail }) => (
  <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">{label}</p>
    <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
    <p className="mt-1 text-sm text-gray-500">{detail}</p>
  </div>
);

const DataTable = ({ caption, columns, rows, note }) => (
  <div className="space-y-3">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold text-gray-900">{caption}</h3>
      {note && <span className="text-xs text-gray-400">{note}</span>}
    </div>
    <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={`px-4 py-3 text-left font-semibold ${column.align === 'right' ? 'text-right' : ''}`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((row, index) => (
            <tr key={`${caption}-${index}`} className="text-gray-700">
              {columns.map((column) => (
                <td
                  key={`${caption}-${column.key}-${index}`}
                  className={`px-4 py-3 ${column.align === 'right' ? 'text-right' : ''}`}
                >
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default async function RapportPage() {
  const { html, headings } = await getReportContent();
  const tocItems = headings.filter((item) => item.level <= 3);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <Link href="/" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500">
            ← Tilbake til dashboard
          </Link>
        </div>

        <header className="rounded-3xl bg-white p-8 shadow-lg">
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-500">Klinisk rapport</p>
          <h1 className="mt-3 text-2xl font-bold text-gray-900 md:text-3xl">
            {REPORT_TITLE}
          </h1>
          <p className="mt-2 text-sm text-gray-500">{REPORT_PERIOD}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={DOCX_HREF}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              Last ned original DOCX
            </a>
            <a
              href="#rapport"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-gray-200 transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              Gå til rapport
            </a>
          </div>
        </header>

        <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {highlightCards.map((card) => (
            <HighlightCard key={card.label} {...card} />
          ))}
        </section>

        <section className="mt-8 rounded-3xl bg-white p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-gray-900">Kort oppsummert</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-gray-600">
            {methodologyPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_240px]">
          <article
            id="rapport"
            className="rounded-3xl bg-white p-6 shadow-lg"
          >
            <div
              className="report-content"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </article>

          {tocItems.length > 0 && (
            <aside className="hidden lg:block">
              <div className="sticky top-6 rounded-3xl bg-white p-6 shadow-lg">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Innhold</p>
                <nav className="mt-4 space-y-2 text-sm text-gray-600">
                  {tocItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block hover:text-indigo-600 ${item.level === 3 ? 'pl-3 text-gray-500' : ''}`}
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}
        </div>

        <section className="mt-10 space-y-8">
          <DataTable
            caption="Tabell 1. Behandlingskategorier (N = 202)"
            columns={[
              { key: 'category', label: 'Kategori' },
              { key: 'n', label: 'n', align: 'right' },
              { key: 'percent', label: '%', align: 'right' }
            ]}
            rows={treatmentTable}
          />

          <DataTable
            caption="Tabell 2. Arbeidsstatus"
            note="Prosentandel basert på ikke-manglende nevner."
            columns={[
              { key: 'status', label: 'Status' },
              { key: 'consultation', label: 'Konsultasjon alene', align: 'right' },
              { key: 'operated', label: 'Kirurgisk behandlet (any)', align: 'right' }
            ]}
            rows={employmentTable}
          />

          <DataTable
            caption="Tabell 3. RAND-12 domener og komposittskårer"
            columns={[
              { key: 'domain', label: 'Domene/kompositt' },
              { key: 'consultation', label: 'Konsultasjon (mean, SD)', align: 'right' },
              { key: 'operated', label: 'Kirurgi (mean, SD)', align: 'right' },
              { key: 'diff', label: 'Diff', align: 'right' },
              { key: 'ci', label: '95% CI', align: 'right' },
              { key: 'p', label: 'p', align: 'right' },
              { key: 'g', label: 'Hedges g', align: 'right' }
            ]}
            rows={rand12Table}
          />
        </section>
      </div>
    </div>
  );
}
