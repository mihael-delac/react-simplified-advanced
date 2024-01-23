interface FormGroupProps {
  children: React.JSX.Element;
}

export function FormGroup({ children }: FormGroupProps) {
  return <div className="form-group">{children}</div>;
}
