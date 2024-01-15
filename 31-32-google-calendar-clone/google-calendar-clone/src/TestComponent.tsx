export function TestComponent({ testProp }: { testProp: number[] }) {
  return <h1>{testProp.join(",")}</h1>;
}
