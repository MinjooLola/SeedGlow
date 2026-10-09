// A streaming projection: omitted columns never become field values or stored rows.
export class ProjectedCsvParser {
  private state: "plain" | "quoted" | "closed" = "plain";
  private column = 0;
  private value = "";
  private row: string[] = [];
  private touched = false;
  private skipLF = false;
  private atStart = true;

  constructor(
    private readonly columns: ReadonlySet<number>,
    private readonly onRow: (row: string[]) => void,
  ) {}

  private append(character: string) {
    if (this.columns.has(this.column)) this.value += character;
    this.atStart = false;
    this.touched = true;
  }

  private field() {
    if (this.columns.has(this.column)) this.row[this.column] = this.value;
    this.column++;
    this.value = "";
    this.atStart = true;
    this.state = "plain";
    this.touched = true;
  }

  private record() {
    const hasRecord = this.touched || this.column > 0;
    this.field();
    if (hasRecord) this.onRow(this.row);
    this.row = [];
    this.column = 0;
    this.touched = false;
    this.atStart = true;
  }

  push(chunk: string) {
    for (const character of chunk) {
      if (this.skipLF) {
        this.skipLF = false;
        if (character === "\n") continue;
      }
      if (this.state === "quoted") {
        if (character === '"') this.state = "closed";
        else this.append(character);
        continue;
      }
      if (this.state === "closed" && character === '"') {
        this.append('"');
        this.state = "quoted";
        continue;
      }
      if (character === ",") { this.field(); continue; }
      if (character === "\r" || character === "\n") {
        this.record();
        this.skipLF = character === "\r";
        continue;
      }
      if (this.state === "closed") {
        if (character === " " || character === "\t") continue;
        throw new Error("CSV의 따옴표 형식이 올바르지 않습니다.");
      }
      if (character === '"') {
        if (!this.atStart) throw new Error("CSV의 따옴표 형식이 올바르지 않습니다.");
        this.state = "quoted";
        this.atStart = false;
        this.touched = true;
      } else this.append(character);
    }
  }

  end() {
    if (this.state === "quoted") throw new Error("CSV의 따옴표가 닫히지 않았습니다.");
    if (this.touched || this.column > 0) this.record();
  }
}

export async function readProjectedCsv(
  response: Response,
  columns: number[],
  onRow: (row: string[]) => void,
) {
  if (!response.body) throw new Error("CSV 응답이 비어 있습니다.");
  const parser = new ProjectedCsvParser(new Set(columns), onRow);
  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let bytes = 0;
  try {
    while (true) {
      const part = await reader.read();
      if (part.done) break;
      bytes += part.value.byteLength;
      if (bytes > 8 * 1024 * 1024) {
        await reader.cancel();
        throw new Error("CSV 응답 크기가 안전 한도를 초과했습니다.");
      }
      parser.push(decoder.decode(part.value, { stream: true }));
    }
    parser.push(decoder.decode());
    parser.end();
  } catch (error) {
    await reader.cancel();
    throw error;
  } finally {
    reader.releaseLock();
  }
}
