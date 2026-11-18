import type { SqlTable } from '@/shared/contracts/content';

type SqlTablePreviewProps = { table: SqlTable; caption?: string };

export function SqlTablePreview({ table, caption }: SqlTablePreviewProps) {
  return (
    <div className="overflow-x-auto rounded-xl border-2 border-fjord-600 bg-fjord-950">
      <table className="w-full font-code text-sm">
        <caption className="px-3 py-2 text-left font-semibold text-rune-gold">
          {caption ?? table.name}
        </caption>
        <thead>
          <tr>
            {table.columns.map((column, columnIndex) => (
              <th
                key={`${column}-${columnIndex}`}
                scope="col"
                className="border-t-2 border-fjord-600 px-3 py-2 text-left text-aurora"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="odd:bg-fjord-900">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-3 py-1.5 text-frost">
                  {String(cell ?? 'NULL')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
